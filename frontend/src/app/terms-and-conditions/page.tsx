import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Inzofin Breadcrumb Header Banner */}
      <section className="bg-[#0c1e36] text-white py-16 sm:py-20 border-b border-[#152c4e] relative overflow-hidden">
        <div className="absolute inset-0 inzofin-pattern-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 relative z-10">
          <div className="inzofin-section-subtitle justify-center text-amber-400">
            <span>// TERMS OF SERVICE //</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Terms and Conditions
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 pt-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400">Terms & Conditions</span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-[#0c1e36]">Client Engagement Terms</h2>
          <p className="text-xs text-slate-500 mt-1">Last Updated: October 2026</p>
        </div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0c1e36]">1. Introduction</h3>
            <p>
              Welcome to Smartax Books. By accessing or using our website, client portals, and accounting or advisory services, you agree to be bound by these Terms and Conditions. Please review them carefully before engaging our services.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0c1e36]">2. Scope of Services</h3>
            <p>
              Smartax Books provides bookkeeping, financial statement preparation, US and UK tax compliance, corporate formation assistance, and management advisory services. We do not provide statutory legal advice; legal filings are prepared in accordance with client instructions and relevant jurisdictional guidelines.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0c1e36]">3. Client Responsibilities</h3>
            <p>
              The client is responsible for delivering timely, accurate, and complete financial records, bank statements, sales summaries, and supporting documentation. Tax returns and financial statements are prepared based on records supplied by the client.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0c1e36]">4. Confidentiality & Security</h3>
            <p>
              We adhere to strict CPA professional ethics and confidentiality guidelines. All proprietary financial data, employee details, and corporate documentation are protected under strict non-disclosure obligations.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0c1e36]">5. Fees and Payment Terms</h3>
            <p>
              Monthly bookkeeping subscriptions are billed in advance on the first of each billing cycle. Specific tax returns and formation services are invoiced upon engagement commencement.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}