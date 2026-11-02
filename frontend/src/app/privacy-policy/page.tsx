import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Inzofin Breadcrumb Header Banner */}
      <section className="bg-[#0c1a2e] text-white py-16 sm:py-20 border-b border-[#152c4e] relative overflow-hidden">
        <div className="absolute inset-0 inzofin-pattern-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 relative z-10">
          <div className="inzofin-section-subtitle justify-center text-[#2DC55F]">
            <span>// LEGAL & COMPLIANCE //</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Privacy Policy
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 pt-2">
            <Link href="/" className="hover:text-[#2DC55F] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#2DC55F]">Privacy Policy</span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-[#0c1e36]">Client Data Protection Standards</h2>
          <p className="text-xs text-slate-500 mt-1">Last Updated: October 2026</p>
        </div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0c1e36]">1. Commitment to Privacy</h3>
            <p>
              SMARTax Global (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy. This policy explains how we collect, process, and safeguard your personal and business financial information when you visit our website or engage our professional services.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0c1e36]">2. Information We Collect</h3>
            <p>
              We may collect personal identification information (such as name, email address, phone number), corporate registration details (LLC/Ltd names, EIN, VAT numbers), and financial records (bank statements, general ledger data, invoices, payroll reports) solely for the execution of requested accounting and tax services.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0c1e36]">3. Data Security & Storage</h3>
            <p>
              We maintain stringent administrative, technical, and physical safeguards designed to prevent unauthorized access, disclosure, or loss of client information. All electronic records are stored using industry-standard 256-bit SSL encryption.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#0c1e36]">4. Third-Party Disclosures</h3>
            <p>
              We never sell, rent, or trade your personal or financial data. Information is only transmitted to authorized governmental bodies (such as the Internal Revenue Service, state tax authorities, Companies House, or HM Revenue & Customs) as explicitly authorized by you for statutory compliance.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}