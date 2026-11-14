'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Send,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  Headphones
} from 'lucide-react';
import { SITE_INFO } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-[#071224] text-slate-300 relative overflow-hidden">
      {/* ─── Top Contact Strip (Exact Inzofin Signature 3-Block Header) ─── */}
      <div className="border-b border-[#152c4e] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 items-stretch">

            {/* Block 1: Location */}
            <div className="flex items-center gap-4 py-8 md:pr-6 border-b md:border-b-0 md:border-r border-[#152c4e]">
              <div className="w-13 h-13 rounded-lg bg-[#2DC55F] text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-[#2DC55F]/20">
                <MapPin className="w-6 h-6 text-slate-950" />
              </div>
              <div className="leading-tight">
                <div className="text-xs font-bold text-[#2DC55F] uppercase tracking-wider mb-1">
                  Location
                </div>
                <div className="text-sm font-bold text-white leading-snug">
                  {SITE_INFO.address}
                </div>
              </div>
            </div>

            {/* Block 2: Send email */}
            <div className="flex items-center gap-4 py-8 md:px-6 border-b md:border-b-0 md:border-r border-[#152c4e]">
              <div className="w-13 h-13 rounded-lg bg-[#2DC55F] text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-[#2DC55F]/20">
                <Mail className="w-6 h-6 text-slate-950" />
              </div>
              <div className="leading-tight">
                <div className="text-xs font-bold text-[#2DC55F] uppercase tracking-wider mb-1">
                  Send email
                </div>
                <a
                  href={`mailto:${SITE_INFO.email}`}
                  className="text-sm font-bold text-white hover:text-[#2DC55F] transition-colors block"
                >
                  {SITE_INFO.email}
                </a>
                <span className="text-xs text-slate-400">info@smartaxglobal.com</span>
              </div>
            </div>

            {/* Block 3: Chevron (> shape) Green Phone / Question Banner */}
            <div className="relative py-8 md:pl-12 flex items-center bg-[#2DC55F] text-slate-950 md:[clip-path:polygon(28px_0,100%_0,100%_100%,28px_100%,0_50%)] -mx-4 sm:-mx-6 lg:-mx-8 px-8 sm:px-10">
              <div className="w-13 h-13 rounded-lg bg-[#0c1a2e] text-[#2DC55F] flex items-center justify-center shrink-0 mr-4 shadow-md">
                <Headphones className="w-6 h-6 text-[#2DC55F]" />
              </div>
              <div className="leading-tight">
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-1">
                  Have any question?
                </div>
                <a
                  href={SITE_INFO.whatsappUrl || `https://wa.me/19362206795`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-lg font-black text-slate-950 hover:underline transition-all block"
                >
                  {SITE_INFO.phone}
                </a>
                <span className="text-[11px] font-bold text-slate-900/80">WhatsApp / Direct Call</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ─── Main 4-Column Footer Content ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#152c4e]">

          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-[#2DC55F]/20 group-hover:scale-105 transition-transform bg-white flex items-center justify-center p-0.5 border border-slate-700/50">
                <Image
                  src="/logo-icon.jpg"
                  alt="SMARTax Global Icon"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                SMARTax <span className="text-[#2DC55F] font-extrabold">Global</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Professional accounting, tax compliance, corporate bookkeeping, and business incorporation advisory across the United States, United Kingdom, and Pakistan.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2DC55F] shrink-0" />
                <span>IRS Registered & Certified Advisory</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2DC55F] shrink-0" />
                <span>HMRC Making Tax Digital (MTD) Recognized</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#0c1e36] border border-[#1e3a63] flex items-center justify-center text-slate-300 hover:text-[#2DC55F] hover:border-[#2DC55F] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#0c1e36] border border-[#1e3a63] flex items-center justify-center text-slate-300 hover:text-[#2DC55F] hover:border-[#2DC55F] transition-all font-bold text-xs"
                aria-label="Twitter / X"
              >
                𝕏
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#0c1e36] border border-[#1e3a63] flex items-center justify-center text-slate-300 hover:text-[#2DC55F] hover:border-[#2DC55F] transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#0c1e36] border border-[#1e3a63] flex items-center justify-center text-slate-300 hover:text-[#2DC55F] hover:border-[#2DC55F] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Our Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-black text-sm tracking-wider uppercase flex items-center gap-2">
              <span>Our Services</span>
            </h4>
            <div className="w-8 h-0.5 bg-[#2DC55F] -mt-2 mb-4" />
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <Link href="/services/bookkeeping-accounting-services" className="hover:text-[#2DC55F] transition-colors flex items-center gap-2 group">
                  <span className="text-[#2DC55F] font-bold group-hover:translate-x-1 transition-transform">›</span>
                  <span>Bookkeeping & Ledger Cleanups</span>
                </Link>
              </li>
              <li>
                <Link href="/services/us-tax-compliance-filing-services" className="hover:text-[#2DC55F] transition-colors flex items-center gap-2 group">
                  <span className="text-[#2DC55F] font-bold group-hover:translate-x-1 transition-transform">›</span>
                  <span>US Tax Compliance (1040/1120/1065)</span>
                </Link>
              </li>
              <li>
                <Link href="/services/uk-company-formation-compliance-services" className="hover:text-[#2DC55F] transition-colors flex items-center gap-2 group">
                  <span className="text-[#2DC55F] font-bold group-hover:translate-x-1 transition-transform">›</span>
                  <span>UK Company Formation & CT600</span>
                </Link>
              </li>
              <li>
                <Link href="/services/startup-business-formation-usa" className="hover:text-[#2DC55F] transition-colors flex items-center gap-2 group">
                  <span className="text-[#2DC55F] font-bold group-hover:translate-x-1 transition-transform">›</span>
                  <span>Startup Business Formation (USA)</span>
                </Link>
              </li>
              <li>
                <Link href="/services/fbr-tax-filing-ntn-registration-pakistan" className="hover:text-[#2DC55F] transition-colors flex items-center gap-2 group">
                  <span className="text-[#2DC55F] font-bold group-hover:translate-x-1 transition-transform">›</span>
                  <span>Pakistan FBR NTN & Sales Tax</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-black text-sm tracking-wider uppercase flex items-center gap-2">
              <span>Useful Links</span>
            </h4>
            <div className="w-8 h-0.5 bg-[#2DC55F] -mt-2 mb-4" />
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <Link href="/about-us" className="hover:text-[#2DC55F] transition-colors flex items-center gap-2 group">
                  <span className="text-[#2DC55F] font-bold group-hover:translate-x-1 transition-transform">›</span>
                  <span>About Our Firm</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#2DC55F] transition-colors flex items-center gap-2 group">
                  <span className="text-[#2DC55F] font-bold group-hover:translate-x-1 transition-transform">›</span>
                  <span>Services Directory</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#2DC55F] transition-colors flex items-center gap-2 group">
                  <span className="text-[#2DC55F] font-bold group-hover:translate-x-1 transition-transform">›</span>
                  <span>Pricing & Plans</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#2DC55F] transition-colors flex items-center gap-2 group">
                  <span className="text-[#2DC55F] font-bold group-hover:translate-x-1 transition-transform">›</span>
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-[#2DC55F] transition-colors flex items-center gap-2 group">
                  <span className="text-[#2DC55F] font-bold group-hover:translate-x-1 transition-transform">›</span>
                  <span>Terms of Use</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Subscribe Us */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-black text-sm tracking-wider uppercase flex items-center gap-2">
              <span>Subscribe Us</span>
            </h4>
            <div className="w-8 h-0.5 bg-[#2DC55F] -mt-2 mb-4" />
            <p className="text-xs text-slate-400 leading-relaxed">
              Stay ahead with regular updates on US & UK tax deadlines, HMRC notices, and tax-saving tips.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="flex mt-3">
              <input
                type="email"
                placeholder="Enter your email..."
                className="bg-[#0c1e36] text-xs px-3.5 py-3 rounded-l-lg border border-[#1e3a63] text-white focus:outline-none focus:border-[#2DC55F] w-full"
              />
              <button
                type="submit"
                className="bg-[#2DC55F] hover:bg-[#23a54e] text-slate-950 px-4 rounded-r-lg font-bold flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} SMARTax Global. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#2DC55F] transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms-and-conditions" className="hover:text-[#2DC55F] transition-colors">Terms Of Use</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#2DC55F] transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
