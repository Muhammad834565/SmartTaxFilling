import React from 'react';
import Link from 'next/link';
import { Check, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import PricingCalculator from '@/components/PricingCalculator';
import FaqAccordion from '@/components/FaqAccordion';
import { FAQS } from '@/lib/data';

export default function PricingPage() {
  return (
    <div className="py-16 space-y-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          Transparent Rates
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Clear, Predictable Pricing For Every Business
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          No hidden administrative charges, no sudden invoice inflation. Choose the right monthly plan or schedule one-off corporate formation and tax filings.
        </p>
      </section>

      {/* Interactive Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PricingCalculator />
      </section>

      {/* One-Off & Add-on Services Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">One-Time Corporate Formation & Special Filings</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Need a standalone service without ongoing monthly bookkeeping? We offer fixed-price project engagements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-900 text-sm">US LLC Registration</h3>
                <span className="font-extrabold text-emerald-600 text-sm">From $299</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Includes state filing fees coordination, Operating Agreement drafting, and Registered Agent liaison in DE, WY, FL, etc.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-900 text-sm">IRS EIN Acquisition</h3>
                <span className="font-extrabold text-emerald-600 text-sm">$149</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Federal Tax ID procurement directly from the IRS. Supported for both US residents and non-US residents without SSN/ITIN.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-900 text-sm">FinCEN BOI Report</h3>
                <span className="font-extrabold text-emerald-600 text-sm">$99</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Mandatory Beneficial Ownership Information (BOI) filing with the US Financial Crimes Enforcement Network.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-900 text-sm">UK Ltd Incorporation</h3>
                <span className="font-extrabold text-emerald-600 text-sm">£199</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Complete Companies House registration, Articles of Association, Shareholder certificates, and statutory registers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-900 text-sm">HMRC VAT Registration</h3>
                <span className="font-extrabold text-emerald-600 text-sm">£149</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Complete application with HMRC, VAT number issuance, and Making Tax Digital (MTD) digital portal link.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-900 text-sm">Annual Corporate Tax Return</h3>
                <span className="font-extrabold text-emerald-600 text-sm">From $450</span>
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
          <h2 className="text-3xl font-extrabold text-slate-900">Billing & Pricing FAQs</h2>
          <p className="text-xs sm:text-sm text-slate-600">Answers to common billing questions.</p>
        </div>

        <FaqAccordion faqs={FAQS} />
      </section>
    </div>
  );
}
