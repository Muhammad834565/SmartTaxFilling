export interface ServiceItem {
  slug: string;
  title: string;
  category: 'USA' | 'UK' | 'General';
  icon: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  softwareTools: string[];
}

export interface PostItem {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

export interface PricingPlanItem {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  isPopular: boolean;
  ctaText: string;
  features: string[];
}

export interface TestimonialItem {
  clientName: string;
  company: string;
  role: string;
  quote: string;
  rating: number;
  avatarUrl: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const SITE_INFO = {
  title: 'Smartax Books',
  tagline: 'Bookkeeping, Accounting & Tax Compliance for Growing Businesses in the US & UK',
  email: 'info@smartaxbooks.com',
  phone: '+1 (813) 555-0199',
  address: '401 Timbered Knoll Dr, Valrico, FL 33594, United States',
  workingHours: 'Mon - Fri: 9:00 AM - 6:00 PM EST',
  logoText: 'Smartax Books',
  logoImage: '/uploads/2025/11/logo-2.png',
};

export const SERVICES: ServiceItem[] = [
  // USA Services
  {
    slug: 'bookkeeping-accounting-services',
    title: 'Bookkeeping & Accounting Services',
    category: 'USA',
    icon: 'BookOpen',
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

export const POSTS: PostItem[] = [
  {
    slug: 'want-happy-accounting-clients-these-strategies-will-help-you',
    title: 'Want Happy Accounting Clients? These Strategies Will Help You',
    category: 'Client Success',
    readTime: '6 min read',
    author: 'Muhammad Aslam, CPA',
    date: 'Dec 12, 2025',
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
    date: 'Dec 12, 2025',
    imageUrl: '/uploads/2025/12/analyzing-financial-diagram-1536x1025-1.jpg',
    excerpt: 'Client Advisory Services (CAS) are the highest-growth segment in public accounting. Learn how automated bookkeeping forms the bedrock of high-value advisory.',
    content: `Client Advisory Services (CAS) have transformed the modern firm. However, high-level strategic advisory cannot exist on inaccurate underlying numbers. Flawless bookkeeping is the fuel that powers advisory insights.

Automating the Transaction Layer:
By implementing bank feeds, OCR receipt capture (such as Dext or Hubdoc), and standardized charts of accounts, firms reduce manual data entry by up to 80%. This frees up accounting professionals to analyze trends, model scenario forecasting, and optimize working capital for entrepreneurs.`
  },
  {
    slug: 'how-your-firm-defines-cas-will-determine-your-growth-strategy',
    title: 'How Your Firm Defines CAS Will Determine Your Growth Strategy',
    category: 'Strategy & Scaling',
    readTime: '7 min read',
    author: 'Smartax Advisory Team',
    date: 'Dec 12, 2025',
    imageUrl: '/uploads/2025/12/business-trainer-explainig-strategy-of-development-e1638180959911.jpg',
    excerpt: 'Whether your advisory practice focuses on outsourced CFO services, tax planning, or vertical-specific controller support, defining your specialty is key to scaling.',
    content: `The scope of CAS can range from outsourced controller services to comprehensive virtual CFO mandates. To scale sustainably, firms must establish clear boundaries around their service levels and align their technology stack accordingly.

Choosing Your Vertical Specialization:
Firms that focus on defined industries—such as e-commerce brands, real estate portfolios, or technology startups—consistently achieve higher margins because they build repeatable workflows and understand industry-specific tax credits and compliance obligations.`
  }
];

export const PRICING_PLANS: PricingPlanItem[] = [
  {
    id: 'starter',
    name: 'Starter Package',
    priceMonthly: 199,
    priceAnnual: 179,
    description: 'Essential bookkeeping and compliance support for solo entrepreneurs, freelancers, and micro startups.',
    isPopular: false,
    ctaText: 'Get Started',
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
    id: 'growth',
    name: 'Growth Package',
    priceMonthly: 399,
    priceAnnual: 349,
    description: 'Ideal for scaling businesses, e-commerce stores, and service companies with higher transaction volume.',
    isPopular: true,
    ctaText: 'Start Free Consultation',
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
    id: 'enterprise',
    name: 'Enterprise Package',
    priceMonthly: 799,
    priceAnnual: 699,
    description: 'Comprehensive outsourced CFO & full-charge accounting department for established companies.',
    isPopular: false,
    ctaText: 'Contact Advisory Team',
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

export const TESTIMONIALS: TestimonialItem[] = [
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

export const FAQS: FaqItem[] = [
  {
    question: 'Can you help non-US residents form an LLC and get an EIN?',
    answer: 'Absolutely. We handle end-to-end US LLC registration in states like Delaware, Wyoming, and Florida for non-US residents. We obtain your IRS EIN without needing an SSN/ITIN, prepare your Operating Agreement, and guide you through opening a US business bank account with Mercury or Wise.',
    category: 'Formation'
  },
  {
    question: 'Which accounting software do you support?',
    answer: 'We specialize in QuickBooks Online, Xero, Wave, and FreshBooks. We also integrate specialized e-commerce tools like A2X, Stripe, Shopify, Gusto, and Avalara.',
    category: 'Bookkeeping'
  },
  {
    question: 'What US and UK tax returns do you file?',
    answer: 'For the US, we file Forms 1040 (individuals), 1120/1120-S (Corporations), 1065 (Partnerships), and 5472/1120 (foreign-owned single-member LLCs), plus state filings and 941/940 payroll taxes. For the UK, we handle HMRC Corporation Tax (CT600), Annual Accounts for Companies House, Self-Assessment (SA100), and quarterly MTD VAT returns.',
    category: 'Taxation'
  },
  {
    question: 'How do we submit our receipts and financial documents?',
    answer: 'You can upload your files securely through our client portal, connect your bank feeds directly via secure read-only API tokens, or share documents through Google Drive/Dropbox.',
    category: 'Onboarding'
  },
  {
    question: 'Are there any setup fees or long-term contracts?',
    answer: 'No long-term contracts are required for our monthly bookkeeping plans; you can cancel with 30 days notice. We believe in earning your trust month after month through impeccable service.',
    category: 'Billing'
  }
];
