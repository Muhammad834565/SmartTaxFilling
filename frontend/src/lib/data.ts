import serviceData from '../data/service.json';

export type ServiceCategory = 'USA' | 'UK' | 'Pakistan' | 'General';

export interface ServiceItem {
  slug: string;
  title: string;
  category: ServiceCategory;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  softwareTools: string[];
  imageUrl?: string;
}

// Flat array of all services loaded dynamically from service.json
export const SERVICES: ServiceItem[] = Array.isArray(serviceData)
  ? (serviceData as ServiceItem[])
  : [
      ...((serviceData as any).USA || []),
      ...((serviceData as any).UK || []),
      ...((serviceData as any).Pakistan || []),
      ...((serviceData as any).General || []),
    ];

// Grouped services by region for convenient regional access
export const SERVICES_BY_REGION: Record<'USA' | 'UK' | 'Pakistan', ServiceItem[]> = Array.isArray(serviceData)
  ? {
      USA: SERVICES.filter((s) => s.category === 'USA'),
      UK: SERVICES.filter((s) => s.category === 'UK'),
      Pakistan: SERVICES.filter((s) => s.category === 'Pakistan'),
    }
  : (serviceData as any);

export const SERVICE_IMAGES: Record<string, string> = SERVICES.reduce((acc, s) => {
  if (s.imageUrl) acc[s.slug] = s.imageUrl;
  return acc;
}, {} as Record<string, string>);

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
  title: 'SMARTax Global',
  tagline: 'Bookkeeping, Accounting & Tax Compliance for Growing Businesses in the US & UK',
  email: 'smartaxbooks@gmail.com',
  phone: '+1 936 220 6795',
  whatsapp: '+19362206795',
  whatsappUrl: 'https://wa.me/19362206795',
  address: '401 Timbered dr. Lufkin Texas 75901',
  workingHours: 'Mon - Fri: 9:00 AM - 6:00 PM CST',
  logoText: 'SMARTax Global',
  logoImage: '/uploads/2025/11/logo-2.png',
};

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
    author: 'SMARTax Global Advisory Team',
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
    author: 'SMARTax Global Advisory Team',
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
    quote: 'SMARTax Global made my bookkeeping and tax filing incredibly easy. Their team is professional, responsive, and truly understands small business needs. Highly recommend!',
    rating: 5,
    avatarUrl: '/uploads/2025/11/about_img.png'
  },
  {
    clientName: 'Sarah Jenkins',
    company: 'Vanguard Retail Brands',
    role: 'Managing Director',
    quote: 'Managing multi-state sales tax on Amazon and Shopify used to be an ongoing nightmare until SMARTax Global stepped in. They resolved our backlog and automated everything seamlessly.',
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
