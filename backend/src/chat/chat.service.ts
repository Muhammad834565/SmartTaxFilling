import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleGenAI } from '@google/genai';
import { Inquiry } from '../entities/inquiry.entity';
import { MailService } from '../mail/mail.service';
import { ChatHistoryItem, BookFromChatDto } from './dto/chat-message.dto';

const SYSTEM_INSTRUCTION = `
You are the official "SMARTax Global AI Tax Advisor" for SMARTax Global (smartaxglobal.com).
Our firm specializes in US, UK, and Pakistan cross-border accounting, taxation, company incorporation, and bookkeeping.

STRICT CONVERSATION RULES:
1. GREETINGS (CRITICAL): If the user says "hi", "hello", "hey", "good morning", "salam", etc., respond ONLY with a short, warm, polite greeting (1-2 sentences). Welcome them and ask how you can help with their taxes, bookkeeping, or business setup today.
   ❌ NEVER output a document checklist, procedure, or service breakdown on a simple greeting!
2. DOCUMENT CHECKLISTS: ONLY provide a "📋 Required Documents" section IF the user explicitly asks for documents, requirements, or paperwork (e.g. "what documents do I need?", "required documents", "what is required to start?"). If they did not ask for documents, DO NOT include a document checklist.
3. ADVICE & PROCEDURES: When the user describes their business problem (e.g. "I want to form a US LLC from Pakistan" or "how to file UK VAT"), explain the high-level steps concisely and clearly.
4. SERVICE RECOMMENDATION: If a specific service matches their request (US LLC, US Tax, UK Ltd, VAT, Pakistan FBR/SECP, Bookkeeping), mention it and invite them to schedule a free appointment if they'd like our CPAs to assist.
5. STYLE: Concise, conversational, structured with clean Markdown, and directly answering what was asked. Keep messages digestible.
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
    const trimmed = userMessage.trim().toLowerCase().replace(/[^a-z0-9\s]/g, '');
    const isSimpleGreeting = ['hi', 'hello', 'hey', 'salam', 'assalam', 'good morning', 'good afternoon', 'good evening', 'how are you', 'aoa'].includes(trimmed);

    // Fast response for simple greetings (prevents unnecessary API calls & ensures clean greeting)
    if (isSimpleGreeting) {
      return {
        reply: `Hello! 👋 Welcome to **SMARTax Global**.\n\nHow can I help you today with your US, UK, or Pakistan tax filing, business formation, or bookkeeping?`,
        suggestedService: undefined,
        canBook: false,
      };
    }

    // Refresh client if env changed
    const liveKey = this.config.get<string>('GEMINI_API_KEY');
    if (liveKey && liveKey !== this.currentApiKey) {
      this.initGeminiClient();
    }

    // Try Gemini first if client is available
    if (this.aiClient) {
      try {
        const modelName = this.config.get<string>('GEMINI_MODEL', 'gemini-3.1-flash-lite');

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
            temperature: 0.3,
          },
        });

        const replyText = response.text || 'How can I assist you with your tax or accounting requirements?';
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

    // Fallback Knowledge Base with user-context awareness
    const fallback = this.getFallbackConsultation(userMessage);
    return {
      reply: fallback.text,
      suggestedService: fallback.service,
      canBook: Boolean(fallback.service),
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

  private detectRecommendedService(text: string): string | undefined {
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
    return undefined;
  }

  private getFallbackConsultation(message: string): { text: string; service?: string } {
    const lower = message.toLowerCase();
    const isAskingForDocs = lower.includes('document') || lower.includes('doc') || lower.includes('paper') || lower.includes('checklist') || lower.includes('what is needed') || lower.includes('what do i need');

    // 1. US LLC / Company Formation
    if (lower.includes('llc') || lower.includes('formation') || lower.includes('incorporate in us') || lower.includes('wyoming') || lower.includes('delaware')) {
      const docsSection = isAskingForDocs ? `\n\n#### 📋 Required Documents:\n- **Passport** (clear valid copy of foreign owner/director)\n- **Proof of Address** (Utility bill or bank statement within 90 days)\n- **Company Name Choice** (Primary name + backup)` : '';

      return {
        service: 'US LLC Formation & Registered Agent',
        text: `### 🇺🇸 US LLC Formation Procedure

We help international and US founders incorporate limited liability companies with full banking and IRS compliance:

1. **State Selection**: We recommend **Wyoming** for low maintenance & asset privacy, or **Delaware** for venture-backed startups.
2. **Name Clearance & Registered Agent**: We verify name availability and assign our registered office.
3. **Articles of Organization**: Electronic filing with the State authority (2-4 business days).
4. **Operating Agreement**: Formalized for US bank accounts (Mercury, Relay) and Stripe.
5. **Federal EIN**: Direct application with the IRS.${docsSection}

Would you like to book a free consultation to set up your US LLC? Click below to schedule!`,
      };
    }

    // 2. EIN / ITIN
    if (lower.includes('ein') || lower.includes('itin') || lower.includes('tax id')) {
      const docsSection = isAskingForDocs ? `\n\n#### 📋 Required Documents:\n- **For EIN**: Approved Certificate of Formation / Articles of Organization + Owner Passport.\n- **For ITIN**: Form W-7, certified passport, and federal tax return justification.` : '';

      return {
        service: 'EIN & ITIN Tax ID Processing',
        text: `### 🏛️ US Tax ID (EIN & ITIN)

- **Federal EIN**: Required for US LLCs to open bank accounts, hire employees, or process payments on Stripe/PayPal. Foreign-owned single-member LLCs do not require an SSN.
- **ITIN (Individual Tax ID)**: Issued by the IRS for foreign individuals with US filing obligations (Form 1040-NR).${docsSection}

Our certified team can file this directly with the IRS for you. Click below to schedule a quick call!`,
      };
    }

    // 3. UK Ltd & VAT
    if (lower.includes('uk') || lower.includes('ltd') || lower.includes('vat') || lower.includes('hmrc')) {
      const docsSection = isAskingForDocs ? `\n\n#### 📋 Required Documents:\n- **Passport or National ID** of Directors / Shareholders\n- **Proof of Residential Address** (Bank statement or utility bill within 3 months)\n- **Registered Office Address** (Provided by SMARTax Global if needed)` : '';

      return {
        service: 'UK Ltd Company Incorporation & VAT',
        text: `### 🇬🇧 UK Company Formation & HMRC Compliance

1. **Companies House Filing**: Official incorporation within 24 hours.
2. **HMRC Corporation Tax Activation**: Set up within 3 months of commencement.
3. **UK VAT & MTD**: Mandatory if taxable turnover exceeds £90,000, or voluntary for input tax reclaiming.${docsSection}

Our London-certified specialists can assist you. Click below to book a free appointment!`,
      };
    }

    // 4. Pakistan SECP / FBR
    if (lower.includes('pakistan') || lower.includes('fbr') || lower.includes('ntn') || lower.includes('secp')) {
      const docsSection = isAskingForDocs ? `\n\n#### 📋 Required Documents:\n- **CNIC / NICOP copies** of all Directors\n- **Office Electricity Bill / Tenancy Agreement**\n- **Mobile SIM registered on Director's CNIC**\n- **Bank Account Maintenance Certificate**` : '';

      return {
        service: 'Pakistan SECP & FBR Tax Compliance',
        text: `### 🇵🇰 Pakistan SECP & FBR Tax Compliance

1. **SECP Incorporation**: Name reservation, digital signature, and certificate of incorporation.
2. **FBR NTN & Active Taxpayer List (ATL)**: Registration on Iris portal for 100% tax benefits.
3. **Provincial Sales Tax**: Registration with PRA (Punjab) / SRB (Sindh) for service providers.${docsSection}

Schedule a free session below to get started with our Pakistan corporate advisors!`,
      };
    }

    // 5. Bookkeeping
    if (lower.includes('bookkeeping') || lower.includes('accounting') || lower.includes('quickbooks') || lower.includes('xero')) {
      return {
        service: 'Monthly Accounting & Catch-up Bookkeeping',
        text: `### 📊 Bookkeeping & Monthly Accounting

SMARTax Global provides certified QuickBooks Elite & Xero Platinum bookkeeping:
- Monthly bank and credit card reconciliations.
- Accurate Profit & Loss, Balance Sheet, and Cash Flow statements.
- Historical ledger cleanup and catch-up bookkeeping.

Would you like to schedule a free review of your books? Click below to book a call!`,
      };
    }

    // 6. Generic query
    return {
      service: undefined,
      text: `Thank you for reaching out to **SMARTax Global**.

We provide specialized corporate accounting, tax compliance, and business formation across the **United States**, **United Kingdom**, and **Pakistan**.

Could you please share a few more details about what you need assistance with (for example: US LLC formation, UK VAT, Pakistan FBR, or bookkeeping)?`,
    };
  }
}
