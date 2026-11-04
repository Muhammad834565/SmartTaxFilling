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
import { SERVICES, POSTS, FAQS, SITE_INFO } from '@/lib/data';
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
      <section className="relative pt-6 sm:pt-8 md:pt-10 pb-6 md:pb-8 inzofin-hero-bg text-white overflow-hidden border-b border-[#152c4e]">
        {/* Decorative Grid & Glow */}
        <div className="absolute inset-0 inzofin-pattern-grid opacity-60 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[700px] h-[500px] bg-[#2DC55F]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#2DC55F]/40 text-[#2DC55F] text-xs font-bold uppercase tracking-widest shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#2DC55F]" />
                <span>Trusted Finance & Tax Consultancy</span>
              </div>

              {/* Headline */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.18]">
                Reliable Financial & Tax Solutions For Your{' '}
                <span className="inzofin-emerald-text">
                  Business Growth
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-xs sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                Professional bookkeeping, US, UK & Pakistan tax compliance, and business advisory services that empower entrepreneurs and growing companies worldwide to scale with complete confidence.
              </p>

              {/* Dual CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/services"
                  className="w-full sm:w-auto px-5 py-3 sm:px-8 sm:py-4 bg-[#2DC55F] hover:bg-[#23a54e] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-xl shadow-[#2DC55F]/20 hover:shadow-[#2DC55F]/30 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Our Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-5 py-3 sm:px-8 sm:py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-lg border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2 hover:border-[#2DC55F]"
                >
                  <span>Book Free Consultation</span>
                </Link>
              </div>

              {/* Inzofin Trust Strip */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-[11px] sm:text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2 justify-center lg:justify-start px-3 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xs">
                  <ShieldCheck className="w-4 h-4 text-[#2DC55F] shrink-0" />
                  <span>US Tax Advisory</span>
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
              <div className="text-2xl font-black text-white">Top Rated</div>
              <div className="text-xs text-slate-300 font-medium">
                Proven Excellence in Cross-Border Corporate Accounting & Tax Advisory
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

      {/* 4b. Our Services / What We Provide Grid */}
      <section className="bg-[#f7f9fc] py-20 border-y border-slate-200 relative overflow-hidden">
        {/* Subtle abstract wavy line pattern in background */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1440 600"
          >
            <path d="M0,120 C320,180 480,40 800,140 C1120,240 1280,60 1440,120" fill="none" stroke="#2DC55F" strokeWidth="1.5" strokeOpacity="0.15" />
            <path d="M0,280 C360,200 600,340 960,220 C1200,140 1360,260 1440,240" fill="none" stroke="#2DC55F" strokeWidth="1.5" strokeOpacity="0.12" />
            <path d="M0,450 C280,520 560,380 900,480 C1180,560 1340,420 1440,450" fill="none" stroke="#2DC55F" strokeWidth="1.5" strokeOpacity="0.08" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="flex items-center justify-center gap-2">
              <span className="w-6 h-0.5 bg-[#2DC55F]" />
              <span className="text-[#2DC55F] text-xs font-black uppercase tracking-widest">OUR SERVICES</span>
              <span className="w-6 h-0.5 bg-[#2DC55F]" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0c1e36] tracking-tight">
              What We Provide
            </h2>
          </div>

          {/* Service Cards matching the new design: Entire card clickable Link with hover transformation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => {
              const IconComponent = iconMap[service.icon] || BookOpen;
              const numberStr = String(index + 1).padStart(2, '0');

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative bg-white rounded-md border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 p-8 flex flex-col justify-between overflow-hidden cursor-pointer block"
                >
                  {/* Top-Right Badge: switches from number to organic green arrow circle on hover */}
                  <div className="absolute top-6 right-0 z-20 transition-all duration-300">
                    {/* Default: Angled Ribbon with larger size and bigger number */}
                    <div
                      className="bg-[#2DC55F] text-white font-black text-lg sm:text-xl pl-9 pr-6 py-2 shadow-lg flex items-center justify-center tracking-widest transition-all duration-300 group-hover:opacity-0 group-hover:scale-75 group-hover:pointer-events-none"
                      style={{ clipPath: 'polygon(24px 0, 100% 0, 100% 100%, 0 100%)' }}
                    >
                      {numberStr}
                    </div>

                    {/* Hover State: Organic shape badge with arrow right */}
                    <div className="absolute top-0 right-6 w-12 h-12 bg-[#2DC55F] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg shadow-[#2DC55F]/30"
                      style={{ borderRadius: '58% 42% 65% 35% / 46% 56% 44% 54%' }}>
                      <ArrowRight className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* Hover background image with dark overlay */}
                  {service.imageUrl && (
                    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                      <div className="absolute inset-0 bg-[#071324]/80 z-10" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071324]/90 via-[#071324]/50 to-transparent z-10" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="space-y-4 relative z-10">
                    {/* Outline Icon */}
                    <div className="w-14 h-14 rounded-lg flex items-center justify-start text-[#2DC55F] group-hover:text-white transition-colors duration-300">
                      <IconComponent className="w-12 h-12 stroke-[1.6]" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-black text-[#0c1e36] group-hover:text-[#2DC55F] transition-colors duration-200">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-500 group-hover:text-slate-200 transition-colors duration-300 leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Bottom Hover Accent Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2DC55F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
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

      {/* 4. Services Working Process Section */}
      <section className="relative">
        {/* Dark top banner with dot-grid pattern */}
        <div className="relative bg-[#0b1728] pt-16 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Abstract wavy line pattern */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              viewBox="0 0 1440 400"
            >
              <path d="M0,80 C180,140 360,20 540,100 C720,180 900,40 1080,120 C1260,200 1350,80 1440,100" fill="none" stroke="#2DC55F" strokeWidth="1.5" strokeOpacity="0.18" />
              <path d="M0,140 C200,200 400,80 600,160 C800,240 1000,100 1200,180 C1320,220 1400,150 1440,160" fill="none" stroke="#2DC55F" strokeWidth="1.5" strokeOpacity="0.13" />
              <path d="M0,200 C160,260 360,140 540,220 C720,300 920,160 1100,240 C1280,310 1380,210 1440,220" fill="none" stroke="#2DC55F" strokeWidth="1.5" strokeOpacity="0.10" />
              <path d="M0,260 C220,310 440,200 640,275 C840,350 1040,230 1240,290 C1360,330 1420,270 1440,280" fill="none" stroke="#2DC55F" strokeWidth="1.5" strokeOpacity="0.08" />
              <path d="M0,320 C180,360 400,280 600,330 C800,380 1000,300 1200,350 C1360,390 1420,330 1440,340" fill="none" stroke="#2DC55F" strokeWidth="1.5" strokeOpacity="0.06" />
              {/* Brighter accent waves */}
              <path d="M0,60 C240,0 480,120 720,60 C960,0 1200,120 1440,60" fill="none" stroke="#2DC55F" strokeWidth="2" strokeOpacity="0.22" />
              <path d="M0,180 C300,120 600,240 900,180 C1200,120 1350,200 1440,180" fill="none" stroke="#2DC55F" strokeWidth="1.8" strokeOpacity="0.15" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Left: heading block */}
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="block w-8 h-0.5 bg-[#2DC55F]" />
                <span className="text-[#2DC55F] text-xs font-extrabold uppercase tracking-widest">WORKING PROCESS!</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-snug">
                Easy Steps To Get Finance & Tax Solution
              </h2>
              <p className="text-sm text-slate-300">
                We guide you through simple, streamlined steps to quickly receive the professional solutions your business needs.
              </p>
            </div>
            {/* Right: play button — double ring effect */}
            <div className="shrink-0">
              <Link
                href={SITE_INFO.whatsappUrl || `https://wa.me/19362206795`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-24 h-24 rounded-full flex items-center justify-center group"
                aria-label="Contact us"
              >
                {/* Outer ring */}
                <span className="absolute inset-0 rounded-full border-4 border-[#1a7a40] bg-[#1a7a40]/40" />
                {/* Inner filled circle */}
                <span className="absolute inset-3 rounded-full bg-[#2DC55F] group-hover:bg-emerald-400 transition-colors shadow-lg shadow-[#2DC55F]/40" />
                {/* Play icon */}
                <svg viewBox="0 0 24 24" className="relative z-10 w-7 h-7 fill-white translate-x-0.5" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="6,3 20,12 6,21" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Process Cards: Unified single bar with visible vertical dividing lines between sections */}
        <div className="-mt-20 pb-16 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 bg-white shadow-2xl rounded-sm border border-slate-200 divide-y md:divide-y-0 md:divide-x divide-slate-200">

            {/* Card 1 — High Quality */}
            {(() => {
              const s = SERVICES[0];
              return (
                <div className="group relative bg-white pt-14 pb-10 px-8 flex flex-col items-center text-center overflow-visible">
                  {/* Angled Polygon Badge hanging half-above top border */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                    <div
                      className="bg-[#2DC55F] text-white font-black text-sm px-6 py-2.5 inline-block shadow-md tracking-wider"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }}
                    >
                      01
                    </div>
                  </div>

                  {/* Hover Image Overlay */}
                  {s?.imageUrl && (
                    <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                      <div className="absolute inset-0 bg-[#071324]/80 z-10" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.imageUrl}
                        alt="High Quality"
                        className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}

                  {/* Icon */}
                  <div className="relative z-20 w-16 h-16 flex items-center justify-center text-[#2DC55F] group-hover:text-white transition-colors duration-300 mb-4">
                    <ShieldCheck className="w-12 h-12 stroke-[1.75]" />
                  </div>

                  {/* Title */}
                  <h3 className="relative z-20 text-xl font-extrabold text-[#0c1e36] group-hover:text-[#2DC55F] transition-colors duration-300 mb-3">
                    High Quality
                  </h3>

                  {/* Description */}
                  <p className="relative z-20 text-xs sm:text-sm text-slate-500 group-hover:text-slate-200 transition-colors duration-300 leading-relaxed mb-6">
                    We deliver high-precision financial solutions, tailored tax strategies, and compliance services
                  </p>

                  {/* READ MORE link */}
                  <div className="relative z-20 mt-auto">
                    <Link
                      href="/services/bookkeeping-accounting-services"
                      className="inline-block text-xs font-black tracking-wider uppercase text-[#2DC55F] group-hover:text-white transition-colors duration-300 underline underline-offset-4 decoration-2 decoration-[#2DC55F]"
                    >
                      READ MORE
                    </Link>
                  </div>
                </div>
              );
            })()}

            {/* Card 2 — Advanced Analytics */}
            {(() => {
              const s = SERVICES[1];
              return (
                <div className="group relative bg-white pt-14 pb-10 px-8 flex flex-col items-center text-center overflow-visible">
                  {/* Angled Polygon Badge hanging half-above top border */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                    <div
                      className="bg-[#2DC55F] text-white font-black text-sm px-6 py-2.5 inline-block shadow-md tracking-wider"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }}
                    >
                      02
                    </div>
                  </div>

                  {/* Hover Image Overlay */}
                  {s?.imageUrl && (
                    <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                      <div className="absolute inset-0 bg-[#071324]/80 z-10" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.imageUrl}
                        alt="Advanced Analytics"
                        className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}

                  {/* Icon */}
                  <div className="relative z-20 w-16 h-16 flex items-center justify-center text-[#2DC55F] group-hover:text-white transition-colors duration-300 mb-4">
                    <BarChart3 className="w-12 h-12 stroke-[1.75]" />
                  </div>

                  {/* Title */}
                  <h3 className="relative z-20 text-xl font-extrabold text-[#0c1e36] group-hover:text-[#2DC55F] transition-colors duration-300 mb-3">
                    Advanced Analytics
                  </h3>

                  {/* Description */}
                  <p className="relative z-20 text-xs sm:text-sm text-slate-500 group-hover:text-slate-200 transition-colors duration-300 leading-relaxed mb-6">
                    Our data-driven approach uncovers key insights into spending patterns, revenue trends, tax efficiency
                  </p>

                  {/* READ MORE link */}
                  <div className="relative z-20 mt-auto">
                    <Link
                      href="/services/us-tax-compliance-filing-services"
                      className="inline-block text-xs font-black tracking-wider uppercase text-[#2DC55F] group-hover:text-white transition-colors duration-300 underline underline-offset-4 decoration-2 decoration-[#2DC55F]"
                    >
                      READ MORE
                    </Link>
                  </div>
                </div>
              );
            })()}

            {/* Card 3 — Growth Strategies */}
            {(() => {
              const s = SERVICES[2];
              return (
                <div className="group relative bg-white pt-14 pb-10 px-8 flex flex-col items-center text-center overflow-visible">
                  {/* Angled Polygon Badge hanging half-above top border */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                    <div
                      className="bg-[#2DC55F] text-white font-black text-sm px-6 py-2.5 inline-block shadow-md tracking-wider"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }}
                    >
                      03
                    </div>
                  </div>

                  {/* Hover Image Overlay */}
                  {s?.imageUrl && (
                    <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                      <div className="absolute inset-0 bg-[#071324]/80 z-10" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.imageUrl}
                        alt="Growth Strategies"
                        className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}

                  {/* Icon */}
                  <div className="relative z-20 w-16 h-16 flex items-center justify-center text-[#2DC55F] group-hover:text-white transition-colors duration-300 mb-4">
                    <TrendingUp className="w-12 h-12 stroke-[1.75]" />
                  </div>

                  {/* Title */}
                  <h3 className="relative z-20 text-xl font-extrabold text-[#0c1e36] group-hover:text-[#2DC55F] transition-colors duration-300 mb-3">
                    Growth Strategies
                  </h3>

                  {/* Description */}
                  <p className="relative z-20 text-xs sm:text-sm text-slate-500 group-hover:text-slate-200 transition-colors duration-300 leading-relaxed mb-6">
                    We design intelligent growth strategies that align with your business goals and financial capacity
                  </p>

                  {/* READ MORE link */}
                  <div className="relative z-20 mt-auto">
                    <Link
                      href="/services/startup-business-formation-usa"
                      className="inline-block text-xs font-black tracking-wider uppercase text-[#2DC55F] group-hover:text-white transition-colors duration-300 underline underline-offset-4 decoration-2 decoration-[#2DC55F]"
                    >
                      READ MORE
                    </Link>
                  </div>
                </div>
              );
            })()}

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
                  <span>US & UK Tax Filing Compliance</span>
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

      {/* 10. Frequently Asked Questions (Matching Reference Layout) */}
      <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              href={SITE_INFO.whatsappUrl || `https://wa.me/19362206795`} target="_blank" rel="noopener noreferrer"
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