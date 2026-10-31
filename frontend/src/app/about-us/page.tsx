import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Award, CheckCircle2, ArrowRight, Globe, Users, Target } from 'lucide-react';
import { SITE_INFO } from '@/lib/data';

export default function AboutPage() {
  return (
    <div className="py-16 space-y-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          About Smartax Books
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Pioneering Financial Clarity for Global Entrepreneurs
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Smartax Books was founded on a simple principle: high-growth businesses and international founders deserve transparent, proactive, and institutional-grade financial guidance without the bureaucratic overhead of legacy accounting firms.
        </p>
      </section>

      {/* Main Story & Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 sm:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            <Image
              src="/uploads/2025/11/about_img.png"
              alt="Smartax Financial Team"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              Dedicated Bookkeeping, Tax Compliance & Cross-Border Advisory
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              SmartaxBooks is dedicated to providing reliable, professional, and affordable bookkeeping, accounting, and tax compliance services for individuals, startups, and established businesses. We specialize in US and UK taxation, company formations, payroll management, and business advisory services.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Our team of experienced accountants, certified tax specialists, and financial consultants works closely with clients worldwide to simplify complex financial regulations, optimize tax savings, and support long-term business growth.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 text-sm">IRS Licensed Originator</div>
                  <div className="text-xs text-slate-500">Authorized Electronic Return Originator (ERO)</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 text-sm">HMRC MTD Specialist</div>
                  <div className="text-xs text-slate-500">Making Tax Digital verified workflow</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 text-sm">QuickBooks Elite</div>
                  <div className="text-xs text-slate-500">Advanced Certified ProAdvisor</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 text-sm">Xero Platinum Partner</div>
                  <div className="text-xs text-slate-500">Global cloud ecosystem certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="bg-slate-50 py-20 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900">Our Core Pillars</h2>
            <p className="text-sm text-slate-600">The standards that drive every ledger entry and tax filing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To empower business owners and entrepreneurs around the world with pristine financial clarity, flawless regulatory compliance, and proactive financial intelligence so they can scale with complete confidence.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Global Reach</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whether you are establishing an LLC from Pakistan, selling on Amazon US from Europe, or incorporating in London, we seamlessly bridge international banking, tax treaties, and local filings.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Dedicated Partnership</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We believe in genuine relationships over transactional data processing. You are assigned a designated account manager and senior CPA who knows your business nuances inside and out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-slate-900">Work With Our Advisory Team</h2>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Experience what stress-free bookkeeping and tax compliance feels like. Let us handle the numbers while you build your dream company.
        </p>
        <div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-7 py-3.5 rounded-xl shadow-md transition-all"
          >
            <span>Speak With a Specialist Today</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
