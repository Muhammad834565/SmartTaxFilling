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
  Coins 
} from 'lucide-react';
import { SERVICES, POSTS, TESTIMONIALS, FAQS } from '@/lib/data';
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

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 gradient-hero overflow-hidden border-b border-slate-100">
        {/* Subtle AI Grid and Tech Accents */}
        <div className="absolute inset-0 ai-grid-pattern opacity-60 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-400/10 via-teal-300/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-emerald-500/25 text-emerald-900 text-xs font-semibold shadow-xs shadow-emerald-500/10 hover:border-emerald-500/40 transition-colors">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span className="tracking-wide">AI-Powered US & UK Accounting & Tax Advisory</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Bookkeeping Services To Evolve Your{' '}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                  Business & Tax Practice
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                We provide seamless, dependable solutions for international business accounts, company formations, bookkeeping, and corporate tax compliance—helping businesses in the US, UK, and worldwide operate with complete confidence.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-600/25 hover:shadow-emerald-500/35 transition-all flex items-center justify-center gap-2 group ring-1 ring-emerald-400/20"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/services"
                  className="w-full sm:w-auto px-7 py-3.5 bg-white/90 hover:bg-white text-slate-800 font-semibold text-sm rounded-xl border border-slate-200/90 shadow-xs backdrop-blur-sm transition-all flex items-center justify-center gap-2 hover:border-slate-300"
                >
                  <span>Explore All Services</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-2 justify-center lg:justify-start px-3 py-2 rounded-xl bg-white/60 border border-slate-200/60 backdrop-blur-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>IRS Authorized ERO</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start px-3 py-2 rounded-xl bg-white/60 border border-slate-200/60 backdrop-blur-xs">
                  <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>HMRC MTD Partner</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start px-3 py-2 rounded-xl bg-white/60 border border-slate-200/60 backdrop-blur-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>QuickBooks Pro</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start px-3 py-2 rounded-xl bg-white/60 border border-slate-200/60 backdrop-blur-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Xero Certified</span>
                </div>
              </div>
            </div>

            {/* Right Graphic / Photo Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative AI Glow */}
                <div className="absolute -top-8 -right-8 w-80 h-80 bg-gradient-to-tr from-emerald-500/20 via-teal-400/15 to-emerald-300/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-6 -left-6 w-60 h-60 bg-teal-500/15 rounded-full blur-2xl pointer-events-none" />

                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 ring-1 ring-slate-900/5">
                  {/* Top Live AI Engine Pill */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 text-xs font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500">AI Bookkeeping Sync</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                      ACTIVE
                    </span>
                  </div>

                  <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden mb-6 bg-slate-50 border border-slate-100">
                    <Image
                      src="/uploads/2025/11/about_img.png"
                      alt="Smartax Financial Advisors"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Floating Stat Card */}
                  <div className="bg-slate-900 text-white p-4.5 rounded-2xl flex items-center justify-between gap-4 shadow-xl border border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Total Capital Reconciled</div>
                        <div className="text-lg font-bold text-white tracking-tight">$15,000,000+</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">On-Time Filings</div>
                      <div className="text-sm font-bold text-emerald-400">99.8%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          <div className="text-center pt-4 md:pt-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mb-1">500+</div>
            <div className="text-xs text-slate-400 font-medium">Businesses Supported</div>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mb-1">50</div>
            <div className="text-xs text-slate-400 font-medium">US States & UK Covered</div>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mb-1">100%</div>
            <div className="text-xs text-slate-400 font-medium">Tax Compliance Rate</div>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mb-1">24/7</div>
            <div className="text-xs text-slate-400 font-medium">Client Advisory Access</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            What Services We Offer
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Specialized Accounting & Compliance for High-Growth Companies
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            From daily transaction reconciliations to cross-border corporate tax returns, our certified CPAs and tax consultants deliver turnkey financial clarity.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || BookOpen;

            return (
              <div
                key={service.slug}
                className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between card-hover group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        service.category === 'UK'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {service.category} Service
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 font-medium">
                    {service.softwareTools.slice(0, 2).join(', ')}
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Smartax Books */}
      <section className="bg-slate-50 py-20 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                Why Choose Us
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Your Complete Offshore & Onshore Accounting Department
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Rather than hiring an expensive in-house finance team or juggling disjointed freelancers, Smartax Books provides a dedicated squad of seasoned accountants, tax specialists, and financial controllers at a fraction of the cost.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Cross-Border Dual Jurisdiction Mastery</h4>
                    <p className="text-xs text-slate-600">Specialized expertise in both US IRS and UK HMRC regulatory frameworks, allowing international businesses to scale seamlessly across the Atlantic.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Modern Cloud Automation</h4>
                    <p className="text-xs text-slate-600">Direct API integration with QuickBooks, Xero, Stripe, Shopify, Gusto, and Avalara ensures automated data flows and eliminates manual spreadsheet errors.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Zero Surprises & Flat-Fee Subscriptions</h4>
                    <p className="text-xs text-slate-600">Enjoy full cost transparency. You always know exactly what your monthly accounting costs are, with no unexpected hourly bills.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/about-us"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  <span>Read our full company story & team profile</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-96 w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <Image
                  src="/uploads/2025/12/managers-working-with-financial-chart-e1638180766443.jpg"
                  alt="Team analyzing financial data"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            Transparent Pricing Plans
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Affordable Plans Designed for Every Stage of Growth
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            No hidden fees, no hourly surprises. Select the perfect monthly or annual plan for your business.
          </p>
        </div>

        <PricingCalculator />
      </section>

      {/* Testimonials */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Client Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Trusted by Founders, E-Commerce Sellers & CFOs
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Here is what real business owners say about partnering with Smartax Books.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 rounded-2xl p-8 border border-slate-700 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-emerald-400 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed italic mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-700">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-700 shrink-0">
                    <Image
                      src={t.avatarUrl}
                      alt={t.clientName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{t.clientName}</div>
                    <div className="text-xs text-slate-400">{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Have Questions? We Have Answers.
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Got questions about company formation, IRS deadlines, or software migrations? Find quick answers below.
          </p>
        </div>

        <FaqAccordion faqs={FAQS} />
      </section>

      {/* Latest Blog & Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
              Knowledge Base
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Latest Insights & Accounting Guides
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between card-hover group"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-[11px] text-slate-400 font-medium mb-2">
                    {post.date} • {post.readTime}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug mb-3">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-14 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Streamline Your Financial & Tax Operations?
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Schedule a 30-minute free discovery call with a senior advisor. We will review your current bookkeeping, analyze your upcoming filing deadlines, and give you an actionable roadmap.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-950 text-white font-semibold text-sm px-8 py-4 rounded-xl shadow-lg transition-all"
              >
                <span>Schedule Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
