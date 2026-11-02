import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Award, CheckCircle2, ArrowRight, Globe, Users, Target, Check, Star } from 'lucide-react';
import { SITE_INFO } from '@/lib/data';

export default function AboutPage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Inzofin Breadcrumb Page Header Banner */}
      <section className="bg-[#0c1e36] text-white py-16 sm:py-20 border-b border-[#152c4e] relative overflow-hidden">
        <div className="absolute inset-0 inzofin-pattern-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 relative z-10">
          <div className="inzofin-section-subtitle justify-center text-amber-400">
            <span>// ABOUT OUR FIRM //</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Pioneering Financial Clarity For Global Businesses
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 pt-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400">About Us</span>
          </div>
        </div>
      </section>

      {/* Main Story & Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative h-96 sm:h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-200">
              <Image
                src="/uploads/2025/11/about_img.png"
                alt="Smartax Financial Team"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Overlapping Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#0c1e36] text-white p-6 rounded-2xl border-2 border-amber-500 shadow-2xl max-w-xs space-y-2">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <div className="text-2xl font-black text-white">25+ Years</div>
              <div className="text-xs text-slate-300 font-medium">
                Combined Expertise in Corporate Tax & Bookkeeping
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inzofin-section-subtitle">
              <span>// OUR STORY //</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0c1e36] leading-snug">
              Dedicated Bookkeeping, Tax Compliance & Cross-Border Advisory
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Smartax Books was founded on a simple principle: high-growth businesses and international founders deserve transparent, proactive, and institutional-grade financial guidance without the bureaucratic overhead and surprise fees of legacy accounting firms.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Our team of experienced accountants, certified tax specialists, and financial consultants works closely with clients worldwide to simplify complex financial regulations, optimize tax deductions, and support long-term business wealth.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-[#0c1e36] text-sm">IRS Licensed Originator</div>
                  <div className="text-xs text-slate-500">Authorized ERO Provider</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-[#0c1e36] text-sm">HMRC MTD Specialist</div>
                  <div className="text-xs text-slate-500">Making Tax Digital verified</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-[#0c1e36] text-sm">QuickBooks Elite</div>
                  <div className="text-xs text-slate-500">Advanced Certified ProAdvisor</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-[#0c1e36] text-sm">Xero Platinum Partner</div>
                  <div className="text-xs text-slate-500">Cloud ecosystem certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="bg-[#f7f9fc] py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inzofin-section-subtitle">
              <span>// OUR CORE PILLARS //</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0c1e36]">The Standards That Drive Every Filing</h2>
            <p className="text-xs sm:text-sm text-slate-600">Built on integrity, precision, and relentless client advocacy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm card-hover space-y-4 border-t-4 border-t-amber-500">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0c1e36]">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To empower business owners and entrepreneurs around the world with pristine financial clarity, flawless regulatory compliance, and proactive financial intelligence so they can scale with complete confidence.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm card-hover space-y-4 border-t-4 border-t-amber-500">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0c1e36]">Global Reach</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whether you are establishing an LLC from abroad, selling on Amazon US from Europe, or incorporating in London, we seamlessly bridge international commercial banking, bilateral tax treaties, and local filings.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm card-hover space-y-4 border-t-4 border-t-amber-500">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0c1e36]">Dedicated Partnership</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We believe in genuine relationships over transactional data processing. You are assigned a designated account manager and senior CPA who knows your business nuances inside and out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="bg-[#0c1e36] text-white rounded-3xl p-8 sm:p-12 border-2 border-amber-500 shadow-xl space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black text-white">Work With Our Advisory Team</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Experience what stress-free bookkeeping and tax compliance feels like. Let us handle the numbers while you build your dream company.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-lg shadow-md transition-all"
            >
              <span>Speak With a Specialist Today</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}