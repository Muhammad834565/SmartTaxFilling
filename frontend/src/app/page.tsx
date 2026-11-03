import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  BarChart3, 
  Clock, 
  Sparkles, 
  Users2, 
  Globe2, 
  BookOpen, 
  FileText, 
  Rocket, 
  ShoppingBag, 
  Building, 
  Truck, 
  CreditCard, 
  Landmark, 
  Coins,
  Phone,
  Check,
  Star,
  TrendingUp,
  FileCheck,
  HelpCircle
} from 'lucide-react';
import { SERVICES, POSTS, TESTIMONIALS, FAQS, SITE_INFO } from '@/lib/data';
import HoneycombHero from '@/components/HoneycombHero';
import PricingCalculator from '@/components/PricingCalculator';
import FaqAccordion from '@/components/FaqAccordion';

export default function HomePage() {
  const iconMap: Record<string, any> = {
    BookOpen,
    FileText,
    Rocket,
    ShoppingBag,
    Building,
    Truck,
    CreditCard,
    Landmark,
    Coins,
  };

  // 6 Featured Services for Home 1
  const featuredServices = SERVICES.slice(0, 6);

  // Case Studies
  const caseStudies = [
    {
      title: 'E-Commerce Multi-State Sales Tax Overhaul',
      category: 'Sales Tax Nexus & IRS Compliance',
      metric: 'Saved $42,000 in penalties',
      summary: 'Streamlined automatic tax collection across 16 US states for a high-volume Shopify & Amazon seller, eliminating prior year non-compliance liabilities.',
      tag: 'E-Commerce'
    },
    {
      title: 'Cross-Border UK to US Corporate Structuring',
      category: 'International Business Formation',
      metric: '100% Tax Optimized Entity',
      summary: 'Formed a Delaware parent entity with UK subsidiary, established US commercial banking, and structured intercompany transfer pricing under dual tax treaties.',
      tag: 'Corporate'
    },
    {
      title: 'Tech Startup R&D Tax Credit & Bookkeeping',
      category: 'R&D Credits & Management Accounts',
      metric: '$85,000 Federal Credit Claimed',
      summary: 'Cleaned up 2 years of backlog QuickBooks records, prepared audit-proof research documentation, and offset payroll taxes with federal R&D tax credits.',
      tag: 'Tax Advisory'
    },
    {
      title: 'Real Estate Holding Group Portfolio Cleanup',
      category: 'Partnership Tax & Bookkeeping',
      metric: '6 Entities Reconciled & Balanced',
      summary: 'Reconciled rental cashflows, depreciation schedules, and 1031 exchange ledgers across multiple multi-member LLCs with pristine K-1 issuance.',
      tag: 'Real Estate'
    }
  ];

  return (
    <div className="space-y-24 bg-white overflow-hidden">
      {/* 1. Hero Section (Inzofin Home 1 Signature Layout) */}
      <section className="relative pt-16 pb-28 md:pt-24 md:pb-36 inzofin-hero-bg text-white overflow-hidden border-b border-[#152c4e]">
        {/* Decorative Grid & Glow */}
        <div className="absolute inset-0 inzofin-pattern-grid opacity-60 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[700px] h-[500px] bg-[#2DC55F]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#2DC55F]/40 text-[#2DC55F] text-xs font-bold uppercase tracking-widest shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#2DC55F]" />
                <span>Trusted Finance & Tax Consultancy</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
                Reliable Financial & Tax Solutions For Your{' '}
                <span className="inzofin-emerald-text">
                  Business Growth
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                IRS Authorized Electronic Return Originator (ERO) & HMRC Making Tax Digital (MTD) Partner. We provide institutional-grade bookkeeping, US & UK tax compliance, and business advisory services that empower entrepreneurs worldwide to scale with complete confidence.
              </p>

              {/* Dual CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/services"
                  className="w-full sm:w-auto px-8 py-4 bg-[#2DC55F] hover:bg-[#23a54e] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-xl shadow-[#2DC55F]/20 hover:shadow-[#2DC55F]/30 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Our Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-lg border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2 hover:border-[#2DC55F]"
                >
                  <span>Book Free Consultation</span>
                </Link>
              </div>

              {/* Inzofin Trust Strip */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2 justify-center lg:justify-start px-3 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xs">
                  <ShieldCheck className="w-4 h-4 text-[#2DC55F] shrink-0" />
                  <span>IRS Authorized ERO</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start px-3 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xs">
                  <Award className="w-4 h-4 text-[#2DC55F] shrink-0" />
                  <span>HMRC MTD Partner</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start px-3 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#2DC55F] shrink-0" />
                  <span>QuickBooks Elite</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start px-3 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#2DC55F] shrink-0" />
                  <span>Platinum Xero Partner</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column (Interactive Services Honeycomb with Zoom-Out Hover & Redirection) */}
            <div className="lg:col-span-6 relative mt-6 lg:mt-0">
              <HoneycombHero />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Feature Overlap Boxes (Inzofin Signature 4-Box Row) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-7 border border-slate-200 shadow-xl card-hover border-t-4 border-t-amber-500 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-[#2DC55F] flex items-center justify-center border border-emerald-200">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-[#0c1e36]">Corporate Tax Compliance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              IRS Form 1040, 1120, 1120S, 1065, Form 5472 and UK CT600 Corporation Tax prepared with maximum deduction security.
            </p>
            <Link href="/services/us-tax-compliance-filing-services" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2DC55F] hover:text-emerald-700 transition-colors pt-1 group">
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="bg-white rounded-xl p-7 border border-slate-200 shadow-xl card-hover border-t-4 border-t-amber-500 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-[#2DC55F] flex items-center justify-center border border-emerald-200">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-[#0c1e36]">Management Bookkeeping</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time QuickBooks & Xero ledgers, monthly reconciliations, balance sheets, and cashflow health reporting.
            </p>
            <Link href="/services/bookkeeping-accounting-services" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2DC55F] hover:text-emerald-700 transition-colors pt-1 group">
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="bg-white rounded-xl p-7 border border-slate-200 shadow-xl card-hover border-t-4 border-t-amber-500 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-[#2DC55F] flex items-center justify-center border border-emerald-200">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-[#0c1e36]">Cross-Border Formation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              End-to-end US LLC (Wyoming, Delaware, Florida) and UK Ltd formation with EIN, BOI, Registered Agent & banking.
            </p>
            <Link href="/services/startup-business-formation-usa" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2DC55F] hover:text-emerald-700 transition-colors pt-1 group">
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="bg-white rounded-xl p-7 border border-slate-200 shadow-xl card-hover border-t-4 border-t-amber-500 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-[#2DC55F] flex items-center justify-center border border-emerald-200">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-[#0c1e36]">Multi-State Sales & Payroll</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              50-state sales tax nexus registration, automated filings, and payroll tax management (941/940/W-2).
            </p>
            <Link href="/services/payroll-tax-management" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2DC55F] hover:text-emerald-700 transition-colors pt-1 group">
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. About Us Section (Inzofin Home 1 Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Image with Experience Ribbon */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[440px] sm:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-200">
              <Image
                src="/uploads/2025/11/about_img.png"
                alt="About SMARTax Global Financial Consultants"
                fill
                className="object-cover"
              />
            </div>

            {/* Overlapping Inzofin Gold Experience Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#0c1e36] text-white p-6 rounded-2xl border-2 border-[#2DC55F] shadow-2xl max-w-xs space-y-2">
              <div className="flex items-center gap-1 text-[#2DC55F]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#2DC55F]" />
                ))}
              </div>
              <div className="text-2xl font-black text-white">25+ Years</div>
              <div className="text-xs text-slate-300 font-medium">
                Proven Excellence in US & UK Corporate Accounting & Tax Advisory
              </div>
            </div>
          </div>

          {/* Right Column: About Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inzofin-section-subtitle">
              <span>// ABOUT OUR COMPANY //</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#0c1e36] leading-snug">
              We Are Leading Financial Advisors & Tax Strategists for Growing Businesses
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              At SMARTax Global, we specialize in removing the bureaucratic complexity of accounting, company formation, and tax compliance. Whether you operate an e-commerce brand, a fast-moving SaaS company, or a global enterprise expanding into US and UK markets, our certified specialists ensure your books are pristine and your taxes strictly optimized.
            </p>

            {/* 4 Feature Points with Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#2DC55F] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0c1e36]">IRS Licensed Originators</div>
                  <div className="text-[11px] text-slate-500">Authorized E-File Providers</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#2DC55F] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0c1e36]">HMRC MTD Specialists</div>
                  <div className="text-[11px] text-slate-500">Making Tax Digital verified</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#2DC55F] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0c1e36]">Transparent Pricing</div>
                  <div className="text-[11px] text-slate-500">Predictable flat rates, no surprises</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#2DC55F] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0c1e36]">100% On-Time Guarantee</div>
                  <div className="text-[11px] text-slate-500">Zero late penalties assured</div>
                </div>
              </div>
            </div>

            {/* Inzofin Quote Card */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0c1e36] text-[#2DC55F] flex items-center justify-center font-bold text-lg shrink-0">
                SB
              </div>
              <div className="space-y-1">
                <p className="text-xs italic text-slate-700">
                  &ldquo;We treat your financial books and tax filings with the meticulous care and precision as if they were our own enterprise.&rdquo;
                </p>
                <div className="text-xs font-bold text-[#0c1e36]">Senior Tax Advisory Board, SMARTax Global</div>
              </div>
            </div>

            {/* Discover Button */}
            <div className="pt-2">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0c1e36] hover:bg-[#152c4e] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all group"
              >
                <span>Discover More About Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#2DC55F]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Inzofin Services Grid (Home 1 Layout) */}
      <section className="bg-[#f7f9fc] py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inzofin-section-subtitle">
              <span>// WHAT WE OFFER //</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0c1e36]">
              High-Quality Financial & Corporate Tax Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tailored solutions designed to guarantee strict regulatory compliance and optimize your bottom line.
            </p>
          </div>

          {/* 6 Inzofin Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => {
              const IconComponent = iconMap[service.icon] || BookOpen;
              const numberStr = `0${index + 1}`;

              return (
                <div
                  key={service.slug}
                  className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm card-hover flex flex-col justify-between relative group"
                >
                  {/* Top Header: Icon & Number Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-xl bg-[#2DC55F]/10 text-[#2DC55F] flex items-center justify-center group-hover:bg-[#2DC55F] group-hover:text-slate-950 transition-colors">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <span className="text-3xl font-black text-slate-200 group-hover:text-[#2DC55F]/30 transition-colors">
                        {numberStr}
                      </span>
                    </div>

                    <div className="inline-block text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-slate-100 text-slate-600 mb-2">
                      {service.category} Service
                    </div>

                    <h3 className="text-lg font-bold text-[#0c1e36] group-hover:text-[#2DC55F] transition-colors mb-3">
                      <Link href={`/services/${service.slug}`}>{service.title}</Link>
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {service.shortDescription}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2 mb-6 border-t border-slate-100 pt-4 text-xs text-slate-500">
                      {service.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#2DC55F] shrink-0" />
                          <span className="truncate">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Read More Link */}
                  <div className="pt-2">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0c1e36] group-hover:text-[#2DC55F] transition-colors"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View All Services Button */}
          <div className="text-center pt-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#2DC55F] hover:bg-[#23a54e] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all"
            >
              <span>View All 12+ Financial Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Inzofin Section (Progress Bars & Value Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inzofin-section-subtitle">
              <span>// WHY CHOOSE SMARTAX //</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#0c1e36] leading-snug">
              We Deliver Measurable Results Through Unrivaled Precision & Insight
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Unlike traditional accountants who look at your numbers once a year at tax time, our team provides active financial guardianship. We protect your company from punitive tax audits and optimize cash flow month after month.
            </p>

            {/* Accordion / Highlights */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                <div className="font-bold text-sm text-[#0c1e36] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2DC55F]"></span>
                  <span>Proactive Year-Round Tax Strategy</span>
                </div>
                <p className="text-xs text-slate-500 pl-4">
                  We don&apos;t just prepare tax returns; we actively implement structural legal deductions, entity elections (S-Corp vs LLC), and treaty advantages.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                <div className="font-bold text-sm text-[#0c1e36] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2DC55F]"></span>
                  <span>Cloud Accounting Tech Stack</span>
                </div>
                <p className="text-xs text-slate-500 pl-4">
                  Full synchronization with QuickBooks Online, Xero, Stripe, Mercury Bank, Shopify, and Amazon Seller Central for instantaneous reporting.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                <div className="font-bold text-sm text-[#0c1e36] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2DC55F]"></span>
                  <span>Dedicated Senior Client Manager</span>
                </div>
                <p className="text-xs text-slate-500 pl-4">
                  Direct WhatsApp, Slack, and email access to your assigned lead accountant. No endless ticket queues or junior staff confusion.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Performance Bars & Stats */}
          <div className="lg:col-span-6 bg-[#0c1e36] text-white p-8 sm:p-10 rounded-2xl border-2 border-[#2DC55F]/40 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 inzofin-pattern-lines opacity-20 pointer-events-none" />

            <div className="space-y-2 relative z-10">
              <div className="text-xs font-bold uppercase tracking-wider text-[#2DC55F]">Our Performance Standards</div>
              <h3 className="text-2xl font-black text-white">Consistently Exceeding Industry Benchmarks</h3>
            </div>

            {/* Progress Bars */}
            <div className="space-y-6 relative z-10">
              {/* Bar 1 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>IRS & HMRC Tax Filing Accuracy</span>
                  <span className="text-[#2DC55F]">99.8%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2DC55F] rounded-full" style={{ width: '99.8%' }}></div>
                </div>
              </div>

              {/* Bar 2 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Bookkeeping Reconciliation Precision</span>
                  <span className="text-[#2DC55F]">100%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2DC55F] rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              {/* Bar 3 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Client Retention & Satisfaction</span>
                  <span className="text-[#2DC55F]">98.5%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2DC55F] rounded-full" style={{ width: '98.5%' }}></div>
                </div>
              </div>

              {/* Bar 4 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Audit Defense & Notice Resolution</span>
                  <span className="text-[#2DC55F]">99.2%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2DC55F] rounded-full" style={{ width: '99.2%' }}></div>
                </div>
              </div>
            </div>

            {/* Callout box */}
            <div className="pt-4 border-t border-slate-700/60 flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-[#2DC55F] text-slate-950 flex items-center justify-center font-bold shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Full Regulatory Defense</div>
                <div className="text-[11px] text-slate-300">Representation before IRS, state tax commissions & HMRC.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Inzofin Milestones & Counter Bar (Home 1 Dark Navy Strip) */}
      <section className="bg-[#071224] py-16 border-y border-[#152c4e] relative overflow-hidden">
        <div className="absolute inset-0 inzofin-pattern-grid opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {/* Stat 1 */}
            <div className="space-y-2 p-4">
              <div className="text-3xl sm:text-5xl font-black text-[#2DC55F]">1,250+</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-300">Active Global Clients</div>
              <p className="text-[11px] text-slate-400">Businesses in 42+ Countries</p>
            </div>

            {/* Stat 2 */}
            <div className="space-y-2 p-4 border-l border-white/10">
              <div className="text-3xl sm:text-5xl font-black text-[#2DC55F]">$45M+</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-300">Tax Deductions Saved</div>
              <p className="text-[11px] text-slate-400">Legally Optimized Filings</p>
            </div>

            {/* Stat 3 */}
            <div className="space-y-2 p-4 border-l border-white/10">
              <div className="text-3xl sm:text-5xl font-black text-[#2DC55F]">15+</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-300">Years Experience</div>
              <p className="text-[11px] text-slate-400">CPA & Enrolled Agents</p>
            </div>

            {/* Stat 4 */}
            <div className="space-y-2 p-4 border-l border-white/10">
              <div className="text-3xl sm:text-5xl font-black text-[#2DC55F]">100%</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-300">On-Time Compliance</div>
              <p className="text-[11px] text-slate-400">Zero Late Penalties</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Case Studies / Project Showcase (Home 1 Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inzofin-section-subtitle">
              <span>// RECENT CASE STUDIES //</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0c1e36]">
              Real Financial Results & Success Stories
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              See how our strategic accounting and compliance frameworks help growing enterprises preserve capital and scale smoothly.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0c1e36] hover:bg-[#152c4e] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all self-start md:self-auto"
          >
            <span>Request A Case Study Review</span>
            <ArrowRight className="w-4 h-4 text-[#2DC55F]" />
          </Link>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((cs, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm card-hover flex flex-col justify-between space-y-6 group border-l-4 border-l-amber-500"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">
                    {cs.tag}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {cs.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0c1e36] group-hover:text-[#2DC55F] transition-colors">
                  {cs.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {cs.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#0c1e36]">
                  <CheckCircle2 className="w-4 h-4 text-[#2DC55F]" />
                  <span>Key Result: <span className="text-[#2DC55F]">{cs.metric}</span></span>
                </div>
                <Link href="/contact" className="text-xs font-bold text-[#0c1e36] group-hover:text-[#2DC55F] flex items-center gap-1">
                  <span>Consult</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Pricing Plans Section (Home 1 Layout) */}
      <section className="bg-[#f7f9fc] py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inzofin-section-subtitle">
              <span>// TRANSPARENT PRICING //</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0c1e36]">
              Clear, Predictable Rates With No Hidden Fees
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Select the optimal plan for your transaction volume or speak with us for custom enterprise multi-entity structures.
            </p>
          </div>

          {/* Pricing Calculator Component */}
          <PricingCalculator />
        </div>
      </section>

      {/* 9. Client Testimonials (Inzofin Home 1 Reviews) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inzofin-section-subtitle">
            <span>// CLIENT TESTIMONIALS //</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0c1e36]">
            What Our Valued Clients Say About Us
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Real feedback from startup founders, international merchants, and business leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm card-hover flex flex-col justify-between space-y-6 relative"
            >
              <div className="space-y-4">
                {/* 5 Gold Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#2DC55F] text-[#2DC55F]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#2DC55F] text-slate-950 font-black text-sm flex items-center justify-center shrink-0">
                  {t.clientName.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#0c1e36]">{t.clientName}</div>
                  <div className="text-[11px] text-slate-500">{t.role}, {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Frequently Asked Questions (Home 1 Layout) */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inzofin-section-subtitle">
              <span>// FAQ //</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0c1e36]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear answers regarding our tax filings, onboarding process, and cross-border compliance.
            </p>
          </div>

          <FaqAccordion faqs={FAQS} />
        </div>
      </section>

      {/* 11. Latest Blog & Tax Insights (Inzofin Home 1 News) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inzofin-section-subtitle">
              <span>// LATEST ARTICLES //</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0c1e36]">
              Financial News & Advisory Insights
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Stay ahead of changing IRS codes, HMRC deadlines, and smart accounting strategies.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2DC55F] hover:text-emerald-700 transition-colors self-start sm:self-auto group"
          >
            <span>View All Insights</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm card-hover flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-[#0c1e36] text-[#2DC55F] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#2DC55F]" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#0c1e36] group-hover:text-[#2DC55F] transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0c1e36] group-hover:text-[#2DC55F] transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 12. Call to Action Banner (Inzofin Home 1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-[#0c1e36] text-white rounded-3xl p-8 sm:p-14 border-2 border-[#2DC55F] shadow-2xl relative overflow-hidden text-center space-y-8">
          <div className="absolute inset-0 inzofin-pattern-grid opacity-30 pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#2DC55F] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complimentary Tax Diagnostic</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready To Streamline Your Books & Eliminate Tax Stress?
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Connect with our senior accountants and tax advisors today for a personalized, zero-obligation financial roadmap. We review your entity structure, past tax filings, and monthly bookkeeping workflows.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-[#2DC55F] hover:bg-[#23a54e] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-xl shadow-[#2DC55F]/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Schedule Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${SITE_INFO.phone}`}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-lg border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2 hover:border-[#2DC55F]"
            >
              <Phone className="w-4 h-4 text-[#2DC55F]" />
              <span>Call Us: {SITE_INFO.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}