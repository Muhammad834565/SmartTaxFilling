import React from 'react';

export default function TermsPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Terms and Conditions</h1>
        <p className="text-xs text-slate-500 mt-2">Last Updated: October 2026</p>
      </div>

      <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Introduction</h2>
          <p>
            Welcome to Smartax Books. By accessing or using our website, client portals, and accounting or advisory services, you agree to be bound by these Terms and Conditions. Please review them carefully before engaging our services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Scope of Services</h2>
          <p>
            Smartax Books provides bookkeeping, financial statement preparation, US and UK tax compliance, corporate formation assistance, and management advisory services. We do not provide statutory legal advice; legal filings are prepared in accordance with client instructions and relevant jurisdictional guidelines.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Client Responsibilities</h2>
          <p>
            The client is responsible for delivering timely, accurate, and complete financial records, bank statements, sales summaries, and supporting documentation. Tax returns and financial statements are prepared based on records supplied by the client.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Confidentiality & Security</h2>
          <p>
            We adhere to strict CPA professional ethics and confidentiality guidelines. All proprietary financial data, employee details, and corporate documentation are protected under strict non-disclosure obligations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">5. Fees and Payment Terms</h2>
          <p>
            Monthly bookkeeping subscriptions are billed in advance on the first of each billing cycle. Specific tax returns and formation services are invoiced upon engagement commencement.
          </p>
        </section>
      </div>
    </div>
  );
}
