import React from 'react';
import Link from 'next/link';
import { Check, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import PricingCalculator from '@/components/PricingCalculator';
import FaqAccordion from '@/components/FaqAccordion';
import { FAQS } from '@/lib/data';

export default function PricingPage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Inzofin Breadcrumb Header Banner */}
      <section className="bg-[#0c1e36] text-white py-16 sm:py-20 border-b border-[#152c4e] relative overflow-hidden">
        <div className="absolute inset-0 inzofin-pattern-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 relative z-10">
          <div className="inzofin-section-subtitle justify-center text-amber-400">
            <span>// TRANSPARENT RATES //</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Clear, Predictable Pricing For Every Business
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 pt-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400">Pricing</span>
          </div>
        </div>
      </section>

      {/* Interactive Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PricingCalculator />
      </section>

      {/* One-Off & Add-on Services Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f7f9fc] border border-slate-200 rounded-2xl p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inzofin-section-subtitle text-amber-600 justify-center">
              <span>// FIXED-FEE SERVICES //</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c1e36]">
              One-Time Corporate Formation & Special Filings
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Need a standalone service without ongoing monthly bookkeeping? We offer guaranteed fixed-fee engagements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3 card-hover border-t-2 border-t-amber-500">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-[#0c1e36] text-sm">US LLC Registration</h3>
                <span className="font-extrabold text-amber-600 text-sm">From $299</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Includes state filing coordination, Operating Agreement drafting, and Registered Agent liaison in DE, WY, FL, etc.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3 card-hover border-t-2 border-t-amber-500">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-[#0c1e36] text-sm">IRS EIN Acquisition</h3>
                <span className="font-extrabold text-amber-600 text-sm">$149</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Federal Tax ID procurement directly from the IRS. Supported for both US residents and international non-residents without SSN/ITIN.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3 card-hover border-t-2 border-t-amber-500">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-[#0c1e36] text-sm">FinCEN BOI Report</h3>
                <span className="font-extrabold text-amber-600 text-sm">$99</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Mandatory Beneficial Ownership Information (BOI) compliance report filed with the US Financial Crimes Enforcement Network.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3 card-hover border-t-2 border-t-amber-500">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-[#0c1e36] text-sm">UK Ltd Incorporation</h3>
                <span className="font-extrabold text-amber-600 text-sm">£199</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Complete Companies House registration, Articles of Association, Shareholder certificates, and statutory registers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3 card-hover border-t-2 border-t-amber-500">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-[#0c1e36] text-sm">HMRC VAT Registration</h3>
                <span className="font-extrabold text-amber-600 text-sm">£149</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Complete application with HMRC, VAT number issuance, and Making Tax Digital (MTD) digital portal link.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3 card-hover border-t-2 border-t-amber-500">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-[#0c1e36] text-sm">Annual Corporate Tax Return</h3>
                <span className="font-extrabold text-amber-600 text-sm">From $450</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Standalone preparation and electronic filing of IRS Form 1120/1120-S/1065 or UK HMRC CT600.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inzofin-section-subtitle justify-center text-amber-600">
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