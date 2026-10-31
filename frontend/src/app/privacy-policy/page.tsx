import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-500 mt-2">Last Updated: October 2026</p>
      </div>

      <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Commitment to Privacy</h2>
          <p>
            Smartax Books (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy. This policy explains how we collect, process, and safeguard your personal and business financial information when you visit our website or engage our professional services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Information We Collect</h2>
          <p>
            We may collect personal identification information (such as name, email address, phone number), corporate registration details (LLC/Ltd names, EIN, VAT numbers), and financial records (bank statements, general ledger data, invoices, payroll reports) solely for the execution of requested accounting and tax services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Data Security & Storage</h2>
          <p>
            We maintain stringent administrative, technical, and physical safeguards designed to prevent unauthorized access, disclosure, or loss of client information. All electronic records are stored using industry-standard 256-bit SSL encryption.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Third-Party Disclosures</h2>
          <p>
            We never sell, rent, or trade your personal or financial data. Information is only transmitted to authorized governmental bodies (such as the Internal Revenue Service, state tax authorities, Companies House, or HM Revenue & Customs) as explicitly authorized by you for statutory compliance.
          </p>
        </section>
      </div>
    </div>
  );
}
