import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleGenAI } from '@google/genai';
import { Inquiry } from '../entities/inquiry.entity';
import { MailService } from '../mail/mail.service';
import { ChatHistoryItem, BookFromChatDto } from './dto/chat-message.dto';

const SYSTEM_INSTRUCTION = `
You are the elite "SMARTax Global AI Senior Tax & Corporate Advisor" for SMARTax Global (smartaxglobal.com).
Our firm specializes in US, UK, and Pakistan cross-border accounting, taxation, company incorporation, and bookkeeping.

YOUR RESPONSIBILITIES:
1. Understand the user's situation/problem thoroughly.
2. Outline the exact legal/tax PROCEDURE step-by-step in clear, easy-to-follow bullet points.
3. Explicitly list the REQUIRED DOCUMENTS (e.g., Passport, Articles of Organization, Proof of Address, SSN/ITIN/EIN, Bank Statements, Invoices, NTN, etc.) in a distinct "📋 Required Documents" section.
4. Estimate realistic timelines (e.g., 2-5 business days for EIN, 2-3 weeks for ITIN).
5. Recommend the specific SMARTax Global service that matches their case:
   - USA: US LLC / C-Corp Formation & Registered Agent, EIN & ITIN Application, Corporate Tax (Form 1120 / 5472 / 1040-NR), US Sales Tax & Nexus, Multi-State Bookkeeping (QuickBooks/Xero).
   - UK: UK Ltd Company Formation, Companies House Confirmation Statement, HMRC Corporation Tax (CT600), UK VAT Registration & MTD Returns, UK Payroll & PAYE.
   - Pakistan: SECP Private Limited Incorporation, FBR NTN & Active Taxpayer List (ATL) Filing, PRA/SRB Provincial Sales Tax.
6. Invite the user to book a free consultation appointment directly inside this chat! When you identify a specific service, mention: "You can book this service directly below by clicking 'Book Free Appointment'".

COMMUNICATION STYLE:
- Professional, reassuring, authoritative yet friendly.
- Format with clean Markdown headers, bold highlights, and clean bullet lists.
- Keep answers concise, actionable, and structured. Do not overwhelm with excessive legal jargon.
`;

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private aiClient: GoogleGenAI | null = null;
  private currentApiKey: string | null = null;

  constructor(
    private readonly config: ConfigService,
    @InjectRepository(Inquiry)
    private readonly inquiryRepo: Repository<Inquiry>,
    private readonly mailService: MailService,
  ) {
    this.initGeminiClient();
  }

  private initGeminiClient() {
    const key = this.config.get<string>('GEMINI_API_KEY');
    if (key && key !== 'your-gemini-api-key-here' && key.trim().length > 10) {
      try {
        this.aiClient = new GoogleGenAI({ apiKey: key.trim() });
        this.currentApiKey = key.trim();
        this.logger.log('Gemini AI Client initialized successfully');
      } catch (err) {
        this.logger.error(`Failed to initialize Gemini AI: ${err.message}`);
        this.aiClient = null;
      }
    } else {
      this.logger.warn('GEMINI_API_KEY is not set or placeholder. Smart fallback advisor mode active.');
      this.aiClient = null;
    }
  }

  async processMessage(userMessage: string, history: ChatHistoryItem[] = []) {
    // Refresh client if env changed
    const liveKey = this.config.get<string>('GEMINI_API_KEY');
    if (liveKey && liveKey !== this.currentApiKey) {
      this.initGeminiClient();
    }

    // Try Gemini first if client is available
    if (this.aiClient) {
      try {
        const modelName = this.config.get<string>('GEMINI_MODEL', 'gemini-3.1-flash-lite');

        // Build contents from history + current message
        const contents: any[] = [];
        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            contents.push({
              role: item.role === 'model' ? 'model' : 'user',
              parts: [{ text: item.content }],
            });
          }
        }
        contents.push({
          role: 'user',
          parts: [{ text: userMessage }],
        });

        const response = await this.aiClient.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.4,
          },
        });

        const replyText = response.text || 'I am reviewing your request. Please book a free appointment below.';
        const detectedService = this.detectRecommendedService(userMessage + ' ' + replyText);

        return {
          reply: replyText,
          suggestedService: detectedService,
          canBook: true,
        };
      } catch (error) {
        this.logger.error(`Gemini API call failed: ${error.message}. Using intelligent knowledge base fallback.`);
      }
    }

    // Intelligent Fallback Knowledge Base if key is not configured or network error
    const fallback = this.getFallbackConsultation(userMessage);
    return {
      reply: fallback.text,
      suggestedService: fallback.service,
      canBook: true,
      isFallback: !this.aiClient,
    };
  }

  async bookAppointment(dto: BookFromChatDto) {
    const inquiry = this.inquiryRepo.create({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      country: dto.country || 'Global',
      service: dto.service || 'AI Chat Consultation',
      message: `[📅 Booked via AI Chat Assistant]\nPreferred Time: ${dto.preferredTime || 'Earliest Available'}\n\nUser Case Notes:\n${dto.message}`,
      status: 'NEW',
    });

    const saved = await this.inquiryRepo.save(inquiry);

    // Fire email notification
    this.mailService.sendInquiryNotification({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      country: dto.country,
      service: dto.service,
      message: `[AI Chat Appointment]\nPreferred Time: ${dto.preferredTime || 'Earliest'}\nNotes: ${dto.message}`,
    });

    return {
      success: true,
      inquiryId: saved.id,
      message: 'Your appointment request has been scheduled with our senior advisor!',
    };
  }

  private detectRecommendedService(text: string): string {
    const lower = text.toLowerCase();
    if (lower.includes('llc') || lower.includes('wyoming') || lower.includes('delaware') || lower.includes('formation') || lower.includes('register company in us')) {
      return 'US LLC Formation & Registered Agent';
    }
    if (lower.includes('ein') || lower.includes('itin') || lower.includes('tax id') || lower.includes('ssn')) {
      return 'EIN & ITIN Tax ID Processing';
    }
    if (lower.includes('5472') || lower.includes('1120') || lower.includes('1040') || lower.includes('us tax') || lower.includes('irs')) {
      return 'US Corporate & Non-Resident Tax Filing';
    }
    if (lower.includes('ltd') || lower.includes('companies house') || lower.includes('uk company') || lower.includes('uk formation')) {
      return 'UK Ltd Company Incorporation';
    }
    if (lower.includes('vat') || lower.includes('hmrc') || lower.includes('mtd') || lower.includes('ct600')) {
      return 'UK VAT & HMRC Corporation Tax';
    }
    if (lower.includes('fbr') || lower.includes('ntn') || lower.includes('secp') || lower.includes('pakistan') || lower.includes('pra') || lower.includes('srb')) {
      return 'Pakistan SECP & FBR Tax Compliance';
    }
    if (lower.includes('quickbooks') || lower.includes('xero') || lower.includes('bookkeeping') || lower.includes('reconciliation')) {
      return 'Monthly Accounting & Catch-up Bookkeeping';
    }
    return 'Comprehensive Tax & Accounting Consultation';
  }

  private getFallbackConsultation(message: string): { text: string; service: string } {
    const lower = message.toLowerCase();

    if (lower.includes('llc') || lower.includes('usa company') || lower.includes('formation')) {
      return {
        service: 'US LLC Formation & Registered Agent',
        text: `### 🇺🇸 US LLC Formation Procedure & Requirements

Forming a US LLC as a non-resident or resident is straightforward with SMARTax Global. Here is the step-by-step process:

#### 1. Procedure & Steps:
1. **Choose State of Registration**: Most international entrepreneurs choose **Wyoming** (privacy & low fees) or **Delaware** (ideal for venture funding).
2. **Name Availability Check**: We verify your business name with the Secretary of State.
3. **Appoint Registered Agent**: SMARTax Global provides continuous registered office compliance in all 50 states.
4. **File Articles of Organization**: Electronic filing with the State authority (2-4 business days).
5. **Draft Operating Agreement**: Formalizes ownership structure and bank readiness.
6. **Apply for Federal EIN**: Directly with the IRS for opening US bank accounts (Mercury, Relay) and Stripe.

#### 📋 Required Documents:
- **Valid International Passport** (photo page, clear PDF copy)
- **Proof of Residential Address** (Utility bill or bank statement within the last 90 days)
- **Proposed Company Names** (Primary name + 2 backups)
- **Business Description / Website** (Brief 2-line explanation of your business model)

*Estimated Timeline:* State Approval: 2–4 business days | IRS EIN: 4–7 business days.

👉 **Ready to begin? Click "Book Free Appointment" below to schedule a 1-on-1 session with our US CPA.**`,
      };
    }

    if (lower.includes('ein') || lower.includes('itin') || lower.includes('tax id')) {
      return {
        service: 'EIN & ITIN Tax ID Processing',
        text: `### 🏛️ US EIN & ITIN Tax ID Processing

#### 1. Procedure:
- **EIN (Employer Identification Number)**: For US LLCs/Corps. Foreign owners without an SSN require Form SS-4 filing via IRS third-party authorization.
- **ITIN (Individual Taxpayer Identification Number)**: For foreign individuals with US tax filing obligations (Form W-7).

#### 📋 Required Documents:
- **For EIN**: Approved Articles of Organization + Owner Passport.
- **For ITIN**: Certified passport copy or original passport, Form W-7, and federal income tax return justification.

*Timeline:* EIN (Foreign-owned): 3-7 business days | ITIN: 4-7 weeks.

👉 **Click "Book Free Appointment" below to have our certified Acceptance Agents handle your IRS filing.**`,
      };
    }

    if (lower.includes('uk') || lower.includes('ltd') || lower.includes('vat') || lower.includes('hmrc')) {
      return {
        service: 'UK Ltd Company Incorporation & VAT',
        text: `### 🇬🇧 UK Ltd Company Formation & HMRC Compliance

#### 1. Procedure:
1. **Companies House Registration**: Incorporate private limited company within 24 hours.
2. **Registered Office & Service Address**: London/UK address provided for privacy.
3. **HMRC Corporate Tax Registration**: Activation within 3 months of trading.
4. **VAT & MTD Registration**: Mandatory if turnover exceeds £90,000 or voluntary for B2B reclaim.

#### 📋 Required Documents:
- **Valid Passport or National ID** of all Directors and PSCs (Significant Controllers).
- **Proof of Address** (Bank statement or utility bill within 3 months).
- **Company Name & Shareholder Allocation Details**.

👉 **Click "Book Free Appointment" below to finalize your UK expansion with our London-certified accountants.**`,
      };
    }

    if (lower.includes('fbr') || lower.includes('ntn') || lower.includes('secp') || lower.includes('pakistan')) {
      return {
        service: 'Pakistan SECP & FBR Tax Compliance',
        text: `### 🇵🇰 Pakistan SECP Incorporation & FBR NTN Registration

#### 1. Procedure:
1. **Name Reservation with SECP**: Via eServices portal.
2. **Digital Signatures & Incorporation**: Preparation of Memorandum and Articles of Association.
3. **FBR NTN Registration & Active Taxpayer List (ATL)**.
4. **Provincial Sales Tax**: Registration with PRA (Punjab) / SRB (Sindh) for service businesses.

#### 📋 Required Documents:
- **Original CNIC / NICOP copies** of directors.
- **Electricity Bill of Office / Premises** (or registered co-working agreement).
- **Mobile SIM registered on Director's CNIC** for OTP verification.
- **Bank Account Maintenance Certificate**.

👉 **Click "Book Free Appointment" below to discuss your Pakistan corporate setup.**`,
      };
    }

    return {
      service: 'Comprehensive Tax & Accounting Consultation',
      text: `### 💼 SMARTax Global Consultation & Assessment

Welcome to **SMARTax Global**. Our certified CPAs and tax advisors handle complete cross-border compliance across the United States, United Kingdom, and Pakistan.

#### 📋 General Documentation Checklist:
- **Identity Verification**: Valid Passport or National ID.
- **Entity Documents**: Prior Certificate of Incorporation, Operating Agreement, or Articles.
- **Financial Records**: Prior year tax returns, QuickBooks/Xero ledger, or bank statements.
- **Tax IDs**: Existing EIN, ITIN, UK UTR, or FBR NTN (if applicable).

#### Next Steps:
Please tell me more about your business or target country, or **book an appointment directly below** to speak directly with an advisor!`,
    };
  }
}
