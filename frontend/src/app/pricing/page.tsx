import React from 'react';
import Link from 'next/link';
import {
  Check,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Clock,
  BadgeCheck,
  Sparkles
} from 'lucide-react';
import { Metadata } from 'next';
import InteractivePricingDirectory from '@/components/InteractivePricingDirectory';
import FaqAccordion from '@/components/FaqAccordion';
import { FAQS } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Pricing & Transparent Rates | SMARTax Global',
  description:
    'Explore transparent pricing for US, UK, and Pakistan bookkeeping, tax compliance, company incorporation, and payment setup services.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Transparent Pricing Plans | SMARTax Global',
    description:
      'Clear, predictable rates for monthly bookkeeping, corporate tax preparation, and business entity formation.',
    url: '/pricing',
  },
};

export default function PricingPage() {
  return (
    <div className="space-y-20 pb-20">
      {/* ─── Breadcrumb Header Banner ─── */}
      <section className="bg-[#0c1a2e] text-white py-16 sm:py-20 border-b border-[#152c4e] relative overflow-hidden">
        <div className="absolute inset-0 inzofin-pattern-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 relative z-10">
          <div className="inzofin-section-subtitle justify-center text-[#2DC55F]">
            <span>// TRANSPARENT RATES //</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Clear, Predictable Pricing For Every Business
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            Choose between flexible monthly accounting retainers or transparent fixed-fee filings across the US, UK, Pakistan, and Global jurisdictions.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 pt-2">
            <Link href="/" className="hover:text-[#2DC55F] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#2DC55F]">Pricing</span>
          </div>
        </div>
      </section>

      {/* ─── Interactive Pricing Directory (Monthly Plans + Fixed-Fee Regional Catalog) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractivePricingDirectory />
      </section>

      {/* ─── Value Propositions & Guarantees ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0c1a2e] text-white rounded-2xl p-8 sm:p-12 border-2 border-[#2DC55F]/40 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 inzofin-pattern-lines opacity-20 pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-2">
            <div className="inzofin-section-subtitle text-[#2DC55F] justify-center">
              <span>// THE SMARTAX COMMITMENT //</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Why Businesses Trust Our Pricing Model
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              No surprise hourly billing. No hidden filing fees. Every engagement is protected by strict service level agreements.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#2DC55F]/20 text-[#2DC55F] flex items-center justify-center font-bold">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">100% Fixed Upfront Quotes</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                You know exactly what you will pay before any work begins. Never a surprise bill or hourly add-on.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#2DC55F]/20 text-[#2DC55F] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">CPA & Certified Sign-off</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every calculation, tax return, and statutory filing is prepared and reviewed by licensed accounting specialists.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#2DC55F]/20 text-[#2DC55F] flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">Direct Authority Submission</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct electronic submission with the IRS, HMRC, Companies House, SECP, or FBR included in your rate.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#2DC55F]/20 text-[#2DC55F] flex items-center justify-center font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">Bank-Grade Confidentiality</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your financial books, bank statements, and tax IDs are secured with 256-bit encryption and strict NDAs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQs ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inzofin-section-subtitle justify-center text-[#2DC55F]">
            <span>// COMMON INQUIRIES //</span>
          </div>
          <h2 className="text-3xl font-black text-[#0c1e36]">Billing & Engagement FAQs</h2>
          <p className="text-xs sm:text-sm text-slate-600">Answers to common billing and onboarding questions.</p>
        </div>

        <FaqAccordion faqs={FAQS} />
      </section>
    </div>
  );
}
