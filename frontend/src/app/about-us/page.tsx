import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, Award, CheckCircle2, ArrowRight, Globe, Users, Target, Check, Star } from 'lucide-react';
import { SITE_INFO } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About Us | Expert CPA & Global Tax Consultants | SMARTax Global',
  description:
    'Meet SMARTax Global. Over a decade of specialized US, UK, and Pakistan tax advisory, QuickBooks ProAdvisor bookkeeping, and corporate entity compliance.',
  alternates: {
    canonical: '/about-us',
  },
  openGraph: {
    title: 'About Us | SMARTax Global Financial Consultants',
    description:
      'Learn about our certified accounting team, values, and global client success stories in the US, UK, and Pakistan.',
    url: '/about-us',
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Inzofin Breadcrumb Page Header Banner */}
      <section className="bg-[#0c1a2e] text-white py-16 sm:py-20 border-b border-[#152c4e] relative overflow-hidden">
        <div className="absolute inset-0 inzofin-pattern-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 relative z-10">
          <div className="inzofin-section-subtitle justify-center text-[#2DC55F]">
            <span>// ABOUT OUR FIRM //</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Pioneering Financial Clarity For Global Businesses
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 pt-2">
            <Link href="/" className="hover:text-[#2DC55F] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#2DC55F]">About Us</span>
          </div>
        </div>
      </section>

      {/* Intro Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-200">
              <Image
                src="/uploads/2025/11/about_img.png"
                alt="About SMARTax Global Team"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#0c1a2e] text-white p-6 rounded-2xl border-2 border-[#2DC55F] shadow-xl hidden sm:block">
              <div className="text-4xl font-black text-[#2DC55F]">10+</div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">Years of Excellence</div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inzofin-section-subtitle text-[#2DC55F]">
              <span>// WHO WE ARE //</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0c1e36] tracking-tight leading-tight">
              Bridging Cross-Border Complexity With Tailored Accounting
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              SMARTax Global was founded with a singular mission: to eliminate the friction and uncertainty entrepreneurs face when navigating multi-jurisdiction tax codes. Whether forming a Delaware LLC from abroad, managing UK VAT registrations, or filing Pakistan tax returns, we provide institutional-grade expertise with boutique responsiveness.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our multidisciplinary team of CPAs, Chartered Tax Advisers, and cloud accounting specialists ensure that your books are audit-ready, your compliance is ironclad, and your cash flow is optimized for aggressive scaling.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2DC55F]" />
                <span className="text-xs font-bold text-slate-800">QuickBooks Elite ProAdvisor</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2DC55F]" />
                <span className="text-xs font-bold text-slate-800">Platinum Xero Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2DC55F]" />
                <span className="text-xs font-bold text-slate-800">IRS Circular 230 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2DC55F]" />
                <span className="text-xs font-bold text-slate-800">HMRC MTD Recognized</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 py-16 sm:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inzofin-section-subtitle justify-center text-[#2DC55F]">
              <span>// OUR CORE PRINCIPLES //</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0c1e36]">
              Built On Integrity, Precision & Client Trust
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#2DC55F] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0c1e36]">Zero-Defect Accuracy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We believe that bookkeeping is the financial foundation of your enterprise. Every entry is cross-checked and reconciles down to the cent.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#2DC55F] flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0c1e36]">Cross-Border Fluency</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We bridge US IRS, UK HMRC, and Pakistan FBR tax frameworks seamlessly, helping multinational founders avoid double taxation penalties.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#2DC55F] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0c1e36]">Proactive Advisory</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We don’t just record history; we help you shape it. Receive actionable tax planning and cash forecast insights before every quarter ends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0c1a2e] to-[#122846] rounded-3xl p-10 sm:p-14 text-white flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/10 shadow-2xl">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-black">Ready To Scale With Complete Financial Peace of Mind?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Schedule a free 30-minute consultation with our senior tax and accounting team today.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-4 bg-[#2DC55F] hover:bg-[#23a54e] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-xl hover:scale-105 shrink-0"
          >
            Book Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
