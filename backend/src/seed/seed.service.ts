import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from '../entities/page.entity';
import { Service } from '../entities/service.entity';
import { Post } from '../entities/post.entity';
import { PricingPlan } from '../entities/pricing-plan.entity';
import { Testimonial } from '../entities/testimonial.entity';
import { Faq } from '../entities/faq.entity';
import { SiteSetting } from '../entities/site-setting.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Page) private pageRepo: Repository<Page>,
    @InjectRepository(Service) private serviceRepo: Repository<Service>,
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(PricingPlan) private pricingRepo: Repository<PricingPlan>,
    @InjectRepository(Testimonial) private testimonialRepo: Repository<Testimonial>,
    @InjectRepository(Faq) private faqRepo: Repository<Faq>,
    @InjectRepository(SiteSetting) private settingRepo: Repository<SiteSetting>,
  ) {}

  async onApplicationBootstrap() {
    this.logger.log('Checking database seed status...');
    await this.seedSiteSettings();
    await this.seedServices();
    await this.seedPages();
    await this.seedPosts();
    await this.seedPricing();
    await this.seedTestimonials();
    await this.seedFaqs();
    this.logger.log('Database initialization & seeding complete.');
  }

  private async seedSiteSettings() {
    const settings = [
      { key: 'site_title', value: 'Smartax Books' },
      { key: 'tagline', value: 'Bookkeeping, Accounting & Tax Compliance for USA & UK Businesses' },
      { key: 'admin_email', value: 'info@smartaxbooks.com' },
      { key: 'phone', value: '+1 (813) 555-0199' },
      { key: 'address', value: '401 Timbered Knoll Dr, Valrico, FL 33594, United States' },
      { key: 'working_hours', value: 'Mon - Fri: 9:00 AM - 6:00 PM EST' },
    ];

    for (const s of settings) {
      const exists = await this.settingRepo.findOne({ where: { key: s.key } });
      if (!exists) {
        await this.settingRepo.save(this.settingRepo.create(s));
      }
    }
  }

  private async seedServices() {
    const count = await this.serviceRepo.count();
    if (count > 0) return;

    const services = [
      // USA Services
      {
        slug: 'bookkeeping-accounting-services',
        title: 'Bookkeeping & Accounting Services',
        category: 'USA',
        icon: 'BookOpen',
        displayOrder: 1,
        shortDescription: 'Comprehensive bookkeeping and monthly management accounting for small businesses, startups, and e-commerce sellers.',
        fullDescription: 'Comprehensive bookkeeping and accounting for small businesses, startups, and e-commerce sellers. Our dedicated accounting team reconciles transactions, balances books, and ensures complete financial transparency with monthly reports.',
        features: [
          'Bank reconciliations and account balancing',
          'Accounts Receivable (AR) management',
          'Accounts Payable (AP) management',
          'Financial statements: P&L, Balance Sheet, Cash Flow',
          'General ledger maintenance & ledger cleanups',
          'Monthly management reporting & financial analysis'
        ],
        softwareTools: ['QuickBooks Online', 'Xero', 'Wave', 'FreshBooks', 'Zoho Books']
      },
      {
        slug: 'us-tax-compliance-filing-services',
        title: 'US Tax Compliance & Filing Services',
        category: 'USA',
        icon: 'FileText',
        displayOrder: 2,
        shortDescription: 'Professional US federal and state tax filing for individuals, single-member LLCs, multi-member partnerships, and corporations.',
        fullDescription: 'Professional US tax filing for individuals and businesses. We guarantee maximum deductions, strict IRS compliance, and timely filing across all 50 states.',
        features: [
          'Individual Tax Returns: Forms 1040, 1040-SR, 1040-NR',
          'Business Tax Returns: Form 1120 (C-Corp), Form 1120-S (S-Corp)',
          'Partnership Tax Returns: Form 1065 & Schedule K-1s',
          'Foreign-Owned US Disregarded Entities: Form 5472 & Form 1120',
          'State tax filings & multi-state apportionment',
          'IRS notice responses, audit support & correspondence'
        ],
        softwareTools: ['ProConnect Tax', 'Drake', 'Lacerte', 'UltraTax']
      },
      {
        slug: 'payroll-tax-management',
        title: 'Payroll Tax Management',
        category: 'USA',
        icon: 'Users',
        displayOrder: 3,
        shortDescription: 'End-to-end payroll tax processing, automated filings, quarterly reporting, and year-end tax compliance.',
        fullDescription: 'End-to-end payroll tax services for US businesses. From wage calculations to timely payroll tax deposits and reporting, we keep you fully compliant with federal and state regulations.',
        features: [
          'Federal quarterly payroll tax filings: Form 941 & Annual Form 940 (FUTA)',
          'State payroll tax & unemployment insurance filings (SUTA)',
          'Employee W-2 and independent contractor 1099-NEC preparation & filing',
          'Automated direct deposit calculation & withholding management',
          'Payroll reconciliations & journal entries'
        ],
        softwareTools: ['QuickBooks Payroll', 'Gusto', 'ADP', 'Paychex', 'Rippling']
      },
      {
        slug: 'us-sales-use-tax-compliance',
        title: 'US Sales & Use Tax Compliance',
        category: 'USA',
        icon: 'Receipt',
        displayOrder: 4,
        shortDescription: 'Multi-state sales tax registration, economic nexus analysis, exemption certificate management, and return filings.',
        fullDescription: 'Sales tax registration and compliance support for online and brick-and-mortar merchants. We identify where you have physical or economic nexus and handle all registrations and returns.',
        features: [
          'Multi-state economic and physical nexus analysis',
          'State sales tax permit registrations',
          'Periodic sales tax return filings (monthly, quarterly, annual)',
          'E-commerce marketplace facilitator reconciliation (Amazon, Shopify, Etsy)',
          'Local jurisdiction rate tracking & compliance monitoring'
        ],
        softwareTools: ['Avalara', 'TaxJar', 'Vertex', 'TaxCloud']
      },
      {
        slug: 'startup-business-formation-usa',
        title: 'Startup Business Formation – USA',
        category: 'USA',
        icon: 'Rocket',
        displayOrder: 5,
        shortDescription: 'Full setup for US LLCs and C-Corps in Delaware, Wyoming, Florida, and other states including EIN and BOI filings.',
        fullDescription: 'Full support for US startups and foreign founders. We register your LLC or Corporation, acquire your IRS EIN, prepare your Operating Agreement, and advise on opening US business bank accounts.',
        features: [
          'LLC & Corporation registration in DE, WY, FL, TX, NM, and all 50 states',
          'Federal Employer Identification Number (EIN) acquisition with the IRS',
          'Custom Operating Agreement & Corporate Bylaws drafting guidance',
          'Corporate Transparency Act / FinCEN BOI (Beneficial Ownership Information) filing',
          'Registered Agent service coordination & Annual Report filing reminders'
        ],
        softwareTools: ['Stripe Atlas', 'LegalZoom', 'Clerky', 'Firstbase']
      },
      {
        slug: 'e-commerce-accounting-tax-services-us',
        title: 'E-Commerce Accounting & Tax Services (US)',
        category: 'USA',
        icon: 'ShoppingBag',
        displayOrder: 6,
        shortDescription: 'Specialized inventory accounting, multi-channel payment reconciliation, COGS tracking, and marketplace tax compliance.',
        fullDescription: 'Accounting and tax services tailored specifically for US e-commerce sellers. We automate the sync between your selling platforms, payment processors, and accounting software.',
        features: [
          'Sales and gross revenue reconciliation across channels',
          'COGS (Cost of Goods Sold) and inventory tracking',
          'Multi-channel payment processor clearing (Shopify Payments, Stripe, PayPal, Amazon Pay)',
          'Marketplace fee breakdown and margin optimization',
          'Annual income tax return preparation for online merchants'
        ],
        softwareTools: ['Shopify', 'Amazon Seller Central', 'A2X', 'QuickBooks Online']
      },
      {
        slug: 'real-estate-financial-tax-services-us',
        title: 'Real Estate Financial & Tax Services (US)',
        category: 'USA',
        icon: 'Building',
        displayOrder: 7,
        shortDescription: 'Dedicated financial and tax services for real estate investors, property managers, syndications, and landlords.',
        fullDescription: 'Accounting and tax support for real estate investors. We maximize cash flow and minimize tax liability with depreciation schedules, 1031 exchanges, and passive activity loss planning.',
        features: [
          'Property rental income tracking & tenant deposit accounting',
          'Mortgage interest, property tax, and operating expense categorization',
          'MACRS depreciation and cost segregation analysis',
          'Tax returns: Form 1040 Schedule E, Form 1065, Form 1120',
          'Capital gains and 1031 exchange transaction support'
        ],
        softwareTools: ['QuickBooks', 'Stessa', 'Buildium', 'AppFolio']
      },
      {
        slug: 'logistics-transport-accounting-tax-support',
        title: 'Logistics & Transport Accounting & Tax Support',
        category: 'USA',
        icon: 'Truck',
        displayOrder: 8,
        shortDescription: 'Specialized financial services for freight companies, owner-operators, trucking fleets, and logistics providers.',
        fullDescription: 'Specialized accounting and tax services for logistics and transportation fleets. We understand per-mile costs, fuel tax compliance, and fleet depreciation.',
        features: [
          'Trucking bookkeeping and per-truck profitability reporting',
          'Payroll tax filings for fleet drivers and dispatchers',
          'Heavy Highway Vehicle Use Tax (Form 2290 / HVUT)',
          'Corporate tax filings (Forms 1120, 1120-S, 1065)',
          'IFTA fuel tax recordkeeping & expense allocation'
        ],
        softwareTools: ['TruckingOffice', 'Axon', 'QuickBooks', 'Gusto']
      },
      {
        slug: 'virtual-bank-accounts-payment-solutions',
        title: 'Virtual Bank Accounts & Payment Solutions',
        category: 'USA',
        icon: 'CreditCard',
        displayOrder: 9,
        shortDescription: 'Guidance and setup assistance for US & international business banking, merchant gateways, and multicurrency accounts.',
        fullDescription: 'We help global businesses and US entities establish compliant commercial bank accounts and payment processing systems to receive international funds friction-free.',
        features: [
          'US business bank account onboarding guidance (Mercury, Relay, Wise Business)',
          'Payment processor application setup (Stripe, PayPal, Payoneer)',
          'Multicurrency conversion and international wire reconciliation',
          'KYC/AML documentation review and compliance preparation'
        ],
        softwareTools: ['Mercury', 'Wise', 'Relay', 'Stripe', 'Payoneer']
      },
      // UK Services
      {
        slug: 'uk-company-formation-compliance-services',
        title: 'UK Company Formation & Compliance Services',
        category: 'UK',
        icon: 'Landmark',
        displayOrder: 10,
        shortDescription: 'Complete UK Private Limited Company (Ltd) incorporation via Companies House with registered address and statutory registers.',
        fullDescription: 'Full support for UK company formations and continuous Companies House compliance. Suitable for UK residents and international entrepreneurs establishing a British corporate entity.',
        features: [
          'UK Private Limited Company (Ltd) registration with Companies House',
          'Memorandum & Articles of Association and Share Certificates',
          'Companies House Annual Confirmation Statement (CS01) filing',
          'PSC (Persons with Significant Control) register maintenance',
          'Company secretary and statutory compliance advisory'
        ],
        softwareTools: ['Companies House Direct', 'Inform Direct', 'Docracy']
      },
      {
        slug: 'uk-tax-compliance-filing-services',
        title: 'UK Tax Compliance & Filing Services',
        category: 'UK',
        icon: 'FileSpreadsheet',
        displayOrder: 11,
        shortDescription: 'HMRC Corporation Tax returns (CT600), Statutory Annual Accounts, and Individual Self-Assessment tax filings.',
        fullDescription: 'Comprehensive UK tax compliance and filing for companies and directors. We ensure full HMRC compliance while optimizing allowable business expense claims.',
        features: [
          'Corporation Tax Return (Form CT600) preparation and HMRC electronic submission',
          'Statutory Annual Accounts preparation in iXBRL format for Companies House',
          'Director Self-Assessment Tax Returns (SA100)',
          'Dividend vouchers and board minutes preparation',
          'HMRC correspondence and payment scheduling'
        ],
        softwareTools: ['Taxfiler', 'Xero UK', 'QuickBooks UK', 'FreeAgent']
      },
      {
        slug: 'uk-vat-registration-compliance',
        title: 'UK VAT Registration & Compliance',
        category: 'UK',
        icon: 'Coins',
        displayOrder: 12,
        shortDescription: 'HMRC VAT registration, Making Tax Digital (MTD) quarterly submissions, and cross-border VAT reconciliation.',
        fullDescription: 'Expert guidance on UK Value Added Tax. We monitor your rolling 12-month taxable turnover, register your company for VAT, and submit digital quarterly returns.',
        features: [
          'HMRC VAT registration & VAT number acquisition',
          'Making Tax Digital (MTD) compliant quarterly VAT return filings',
          'Standard rate, Flat Rate Scheme, and Cash Accounting evaluations',
          'Import VAT & Postponed VAT Accounting (PVA) reconciliations',
          'Cross-border digital services and Amazon/eBay marketplace VAT analysis'
        ],
        softwareTools: ['HMRC Online Services', 'Xero MTD', 'QuickBooks Online']
      }
    ];

    for (const s of services) {
      await this.serviceRepo.save(this.serviceRepo.create(s));
    }
  }

  private async seedPages() {
    const count = await this.pageRepo.count();
    if (count > 0) return;

    const pages = [
      {
        slug: 'about-us',
        title: 'About Smartax Books',
        excerpt: 'SmartaxBooks is dedicated to providing reliable, professional, and affordable bookkeeping, accounting, and tax compliance services.',
        content: `SmartaxBooks is dedicated to providing reliable, professional, and affordable bookkeeping, accounting, and tax compliance services for individuals, startups, and established businesses. We specialize in US and UK taxation, company formations, payroll management, and business advisory services.

Our team of experienced accountants, certified tax specialists, and financial consultants works closely with clients worldwide to simplify complex financial regulations, optimize tax savings, and support long-term business growth.

Our Mission:
To empower business owners and entrepreneurs around the world with pristine financial clarity, flawless regulatory compliance, and proactive financial intelligence so they can scale with complete confidence.

Core Values:
• Integrity & Transparency: Zero hidden fees, honest counsel, and ethical tax strategies.
• Client-Centric Partnership: We don’t just crunch numbers; we act as your dedicated remote finance department.
• Technical Excellence: Certified across QuickBooks, Xero, IRS tax codes, and HMRC digital frameworks.`
      },
      {
        slug: 'pricing',
        title: 'Transparent & Predictable Pricing Plans',
        excerpt: 'Affordable, straightforward pricing designed to deliver professional financial services without compromising on accuracy.',
        content: `We provide cost-effective pricing plans designed to deliver professional financial services without compromising quality or reliability. Whether you are an early-stage startup or a high-volume enterprise, we have a plan tailored for your operational scale.`
      },
      {
        slug: 'contact',
        title: 'Contact Smartax Books',
        excerpt: 'Connect with Smartax for tailored financial solutions, expert guidance, and dedicated accounting support.',
        content: `Get In Touch With Smartax. Connect with Smartax for tailored financial solutions, expert guidance, and dedicated support to streamline your business operations, enhance growth, and ensure long-term success. We are here to help every step of the way.

Office Address: 401 Timbered Knoll Dr, Valrico, FL 33594, United States
Email: info@smartaxbooks.com / webmosolutions@gmail.com
Phone: +1 (813) 555-0199
Hours: Monday – Friday: 9:00 AM – 6:00 PM EST`
      },
      {
        slug: 'terms-and-conditions',
        title: 'Terms and Conditions',
        excerpt: 'Standard terms and conditions governing the engagement of Smartax Books accounting and taxation services.',
        content: `1. Introduction: Welcome to SmartaxBooks. By accessing or using our website and services, you agree to be bound by these Terms and Conditions. Please read them carefully before engaging our services.
2. Services: SmartaxBooks provides professional bookkeeping, tax preparation, consulting, and corporate compliance services.
3. Client Responsibilities: The client agrees to provide accurate, complete, and timely financial records, statements, and documentation required for statutory filings.
4. Confidentiality: We enforce strict professional standards of confidentiality and data security regarding all client financial information.`
      },
      {
        slug: 'privacy-policy',
        title: 'Privacy Policy',
        excerpt: 'How Smartax Books collects, stores, and safeguards your financial and personal data.',
        content: `Smartax is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
We implement industry-standard 256-bit encryption, access controls, and strict compliance procedures to protect your proprietary business records, tax filings, and personal identifying data.`
      }
    ];

    for (const p of pages) {
      await this.pageRepo.save(this.pageRepo.create(p));
    }
  }

  private async seedPosts() {
    const count = await this.postRepo.count();
    if (count > 0) return;

    const posts = [
      {
        slug: 'want-happy-accounting-clients-these-strategies-will-help-you',
        title: 'Want Happy Accounting Clients? These Strategies Will Help You',
        category: 'Client Success',
        readTime: '6 min read',
        author: 'Muhammad Aslam, CPA',
        imageUrl: '/uploads/2025/12/managers-working-with-financial-chart-e1638180766443.jpg',
        excerpt: 'Discover actionable strategies to improve accounting workflow communication, set transparent expectations, and deliver proactive financial advisory that clients love.',
        content: `Building long-term client loyalty in financial services requires moving beyond transactional bookkeeping into strategic advisory. When business owners feel that their accounting partner understands their cash cycle and anticipates tax pitfalls, client retention skyrockets.

Key Pillars for Client Satisfaction:
1. Proactive Monthly Check-ins: Don't wait until tax season. Deliver monthly financial dashboards highlighting cash burn, gross margins, and upcoming tax liabilities.
2. Technology Integration: Leverage modern cloud accounting tools like QuickBooks Online and Xero to provide real-time ledger visibility to clients.
3. Transparent Pricing: Replace unpredictable hourly billing with clear, packaged subscriptions so clients are never surprised by invoices.`
      },
      {
        slug: 'how-bookkeeping-fits-into-cas-why-you-should-set-it-to-autopilot',
        title: 'How Bookkeeping Fits Into CAS & Why You Should Set it to Autopilot',
        category: 'Practice Growth',
        readTime: '5 min read',
        author: 'Smartax Advisory Team',
        imageUrl: '/uploads/2025/12/analyzing-financial-diagram-1536x1025-1.jpg',
        excerpt: 'Client Advisory Services (CAS) are the highest-growth segment in public accounting. Learn how automated bookkeeping forms the bedrock of high-value advisory.',
        content: `Client Advisory Services (CAS) have transformed the modern firm. However, high-level strategic advisory cannot exist on inaccurate underlying numbers. Flawless bookkeeping is the fuel that powers advisory insights.

Automating the Transaction Layer:
By implementing bank feeds, OCR receipt capture (such as Dext or Hubdoc), and standardized chart of accounts, firms reduce manual data entry by up to 80%. This frees up accounting professionals to analyze trends, model scenario forecasting, and optimize working capital for entrepreneurs.`
      },
      {
        slug: 'how-your-firm-defines-cas-will-determine-your-growth-strategy',
        title: 'How Your Firm Defines CAS Will Determine Your Growth Strategy',
        category: 'Strategy & Scaling',
        readTime: '7 min read',
        author: 'Smartax Advisory Team',
        imageUrl: '/uploads/2025/12/business-trainer-explainig-strategy-of-development-e1638180959911.jpg',
        excerpt: 'Whether your advisory practice focuses on outsourced CFO services, tax planning, or vertical-specific controller support, defining your specialty is key to scaling.',
        content: `The scope of CAS can range from outsourced controller services to comprehensive virtual CFO mandates. To scale sustainably, firms must establish clear boundaries around their service levels and align their technology stack accordingly.

Choosing Your Vertical Specialization:
Firms that focus on defined industries—such as e-commerce brands, real estate portfolios, or technology startups—consistently achieve higher margins because they build repeatable workflows and understand industry-specific tax credits and compliance obligations.`
      }
    ];

    for (const post of posts) {
      await this.postRepo.save(this.postRepo.create(post));
    }
  }

  private async seedPricing() {
    const count = await this.pricingRepo.count();
    if (count > 0) return;

    const plans = [
      {
        name: 'Starter Package',
        priceMonthly: 199,
        priceAnnual: 179,
        description: 'Essential bookkeeping and compliance support for solo entrepreneurs, freelancers, and micro startups.',
        isPopular: false,
        ctaText: 'Get Started',
        displayOrder: 1,
        features: [
          'Monthly bookkeeping up to 100 transactions',
          'Monthly bank & credit card reconciliation (2 accounts)',
          'Monthly Profit & Loss and Balance Sheet reports',
          'Sales tax recording',
          'Email support with 24-48hr turnaround',
          'Annual 1099 contractor preparation (up to 3)'
        ]
      },
      {
        name: 'Growth Package',
        priceMonthly: 399,
        priceAnnual: 349,
        description: 'Ideal for scaling businesses, e-commerce stores, and service companies with higher transaction volume.',
        isPopular: true,
        ctaText: 'Start Free Consultation',
        displayOrder: 2,
        features: [
          'Monthly bookkeeping up to 300 transactions',
          'Reconciliation of up to 5 bank, card & gateway accounts',
          'Multi-channel e-commerce sync (Shopify, Amazon, Stripe)',
          'Monthly management reporting & video review',
          'Payroll processing support for up to 10 employees',
          'Quarterly federal and state sales tax filings',
          'Priority phone & Slack messaging support',
          'Year-end tax preparation coordination'
        ]
      },
      {
        name: 'Enterprise Package',
        priceMonthly: 799,
        priceAnnual: 699,
        description: 'Comprehensive outsourced CFO & full-charge accounting department for established companies.',
        isPopular: false,
        ctaText: 'Contact Advisory Team',
        displayOrder: 3,
        features: [
          'Unlimited monthly bookkeeping transactions',
          'Full Accounts Payable (AP) and Receivable (AR) management',
          'Dedicated senior CPA and account manager',
          'Weekly cash flow forecasting & budget variance analysis',
          'Multi-entity & international cross-border consolidation',
          'Complete US or UK corporate tax return filing included',
          'Custom KPI executive dashboard & monthly strategy meeting',
          'Audit defense and direct IRS/HMRC agent liaison'
        ]
      }
    ];

    for (const plan of plans) {
      await this.pricingRepo.save(this.pricingRepo.create(plan));
    }
  }

  private async seedTestimonials() {
    const count = await this.testimonialRepo.count();
    if (count > 0) return;

    const testimonials = [
      {
        clientName: 'Abdul Malik',
        company: 'Malik Enterprises LLC',
        role: 'Founder & CEO',
        quote: 'Smartax made my bookkeeping and tax filing incredibly easy. Their team is professional, responsive, and truly understands small business needs. Highly recommend!',
        rating: 5,
        avatarUrl: '/uploads/2025/11/about_img.png'
      },
      {
        clientName: 'Sarah Jenkins',
        company: 'Vanguard Retail Brands',
        role: 'Managing Director',
        quote: 'Managing multi-state sales tax on Amazon and Shopify used to be an ongoing nightmare until Smartax stepped in. They resolved our backlog and automated everything seamlessly.',
        rating: 5,
        avatarUrl: '/uploads/2025/12/managers-working-with-financial-chart-e1638180766443.jpg'
      },
      {
        clientName: 'David Chen',
        company: 'Apex Tech Solutions Ltd',
        role: 'Co-Founder',
        quote: 'As an international founder setting up in the US and UK, their company formation and banking guidance was invaluable. They handle our CT600, VAT, and US 5472 filings flawlessly.',
        rating: 5,
        avatarUrl: '/uploads/2025/12/analyzing-financial-diagram-1536x1025-1.jpg'
      }
    ];

    for (const t of testimonials) {
      await this.testimonialRepo.save(this.testimonialRepo.create(t));
    }
  }

  private async seedFaqs() {
    const count = await this.faqRepo.count();
    if (count > 0) return;

    const faqs = [
      {
        question: 'Can you help non-US residents form an LLC and get an EIN?',
        answer: 'Absolutely. We handle end-to-end US LLC registration in states like Delaware, Wyoming, and Florida for non-US residents. We obtain your IRS EIN without needing an SSN/ITIN, prepare your Operating Agreement, and guide you through opening a US business bank account with Mercury or Wise.',
        category: 'Formation',
        displayOrder: 1
      },
      {
        question: 'Which accounting software do you support?',
        answer: 'We specialize in QuickBooks Online, Xero, Wave, and FreshBooks. We also integrate specialized e-commerce tools like A2X, Stripe, Shopify, Gusto, and Avalara.',
        category: 'Bookkeeping',
        displayOrder: 2
      },
      {
        question: 'What US and UK tax returns do you file?',
        answer: 'For the US, we file Forms 1040 (individuals), 1120/1120-S (Corporations), 1065 (Partnerships), and 5472/1120 (foreign-owned single-member LLCs), plus state filings and 941/940 payroll taxes. For the UK, we handle HMRC Corporation Tax (CT600), Annual Accounts for Companies House, Self-Assessment (SA100), and quarterly MTD VAT returns.',
        category: 'Taxation',
        displayOrder: 3
      },
      {
        question: 'How do we submit our receipts and financial documents?',
        answer: 'You can upload your files securely through our client portal, connect your bank feeds directly via secure read-only API tokens, or share documents through Google Drive/Dropbox.',
        category: 'Onboarding',
        displayOrder: 4
      },
      {
        question: 'Are there any setup fees or long-term contracts?',
        answer: 'No long-term contracts are required for our monthly bookkeeping plans; you can cancel with 30 days notice. We believe in earning your trust month after month through impeccable service.',
        category: 'Billing',
        displayOrder: 5
      }
    ];

    for (const f of faqs) {
      await this.faqRepo.save(this.faqRepo.create(f));
    }
  }
}
