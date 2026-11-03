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
  ShieldCheck, 
  Send,
  Linkedin,
  Facebook,
  Twitter,
  Instagram
} from 'lucide-react';
import { SITE_INFO } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-[#071224] text-slate-300 pt-16 pb-10 border-t-4 border-[#2DC55F] relative overflow-hidden">
      {/* Background Decorative Mesh */}
      <div className="absolute inset-0 inzofin-pattern-lines opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#152c4e]">
          {/* Column 1: Company Profile (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-[#2DC55F]/20 group-hover:scale-105 transition-transform bg-white flex items-center justify-center p-0.5 border border-slate-700/50">
                <Image 
                  src="/logo-icon.png" 
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
              SMARTax Global delivers institutional-grade bookkeeping, corporate accounting, and dual US/UK tax compliance services for startups, online businesses, and scaling enterprises worldwide.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2DC55F] shrink-0" />
                <span>US Federal & Multi-State Tax Compliance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2DC55F] shrink-0" />
                <span>HMRC Making Tax Digital (MTD) Recognized Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2DC55F] shrink-0" />
                <span>QuickBooks Online & Xero Certified Advisors</span>
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
                className="w-8 h-8 rounded-full bg-[#0c1e36] border border-[#1e3a63] flex items-center justify-center text-slate-300 hover:text-[#2DC55F] hover:border-[#2DC55F] transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
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

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b-2 border-[#2DC55F] pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-[#2DC55F] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#2DC55F] group-hover:translate-x-1 transition-transform">›</span>
                  <span>Home (Home 1)</span>
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#2DC55F] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#2DC55F] group-hover:translate-x-1 transition-transform">›</span>
                  <span>About Our Firm</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#2DC55F] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#2DC55F] group-hover:translate-x-1 transition-transform">›</span>
                  <span>All Services</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#2DC55F] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#2DC55F] group-hover:translate-x-1 transition-transform">›</span>
                  <span>Pricing Packages</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#2DC55F] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#2DC55F] group-hover:translate-x-1 transition-transform">›</span>
                  <span>Tax Articles & News</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#2DC55F] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#2DC55F] group-hover:translate-x-1 transition-transform">›</span>
                  <span>Contact & Support</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b-2 border-[#2DC55F] pb-2 inline-block">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/services/bookkeeping-accounting-services" className="hover:text-[#2DC55F] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#2DC55F] group-hover:translate-x-1 transition-transform">›</span>
                  <span>Bookkeeping & Ledger Cleanups</span>
                </Link>
              </li>
              <li>
                <Link href="/services/us-tax-compliance-filing-services" className="hover:text-[#2DC55F] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#2DC55F] group-hover:translate-x-1 transition-transform">›</span>
                  <span>US Tax Compliance (1040/1120/1065)</span>
                </Link>
              </li>
              <li>
                <Link href="/services/uk-company-formation-compliance-services" className="hover:text-[#2DC55F] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#2DC55F] group-hover:translate-x-1 transition-transform">›</span>
                  <span>UK Company Formation & CT600</span>
                </Link>
              </li>
              <li>
                <Link href="/services/startup-business-formation-usa" className="hover:text-[#2DC55F] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#2DC55F] group-hover:translate-x-1 transition-transform">›</span>
                  <span>US LLC & EIN Business Formation</span>
                </Link>
              </li>
              <li>
                <Link href="/services/e-commerce-accounting-tax-services-us" className="hover:text-[#2DC55F] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#2DC55F] group-hover:translate-x-1 transition-transform">›</span>
                  <span>E-Commerce & Multi-State Sales Tax</span>
                </Link>
              </li>
              <li>
                <Link href="/services/payroll-tax-management" className="hover:text-[#2DC55F] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#2DC55F] group-hover:translate-x-1 transition-transform">›</span>
                  <span>Payroll Taxes (941/940/W-2)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b-2 border-[#2DC55F] pb-2 inline-block">
              Office & Newsletter
            </h4>
            
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2DC55F] shrink-0 mt-0.5" />
                <span>{SITE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#2DC55F] shrink-0" />
                <a href={`tel:${SITE_INFO.phone}`} className="hover:text-[#2DC55F] transition-colors">
                  {SITE_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#2DC55F] shrink-0" />
                <a href={`mailto:${SITE_INFO.email}`} className="hover:text-[#2DC55F] transition-colors">
                  {SITE_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#2DC55F] shrink-0" />
                <span>{SITE_INFO.workingHours}</span>
              </div>
            </div>

            {/* Newsletter input */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-white mb-2">Subscribe For Tax Updates:</div>
              <form onSubmit={(e) => e.preventDefault()} className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email..." 
                  className="bg-[#0c1e36] text-xs px-3 py-2.5 rounded-l-lg border border-[#1e3a63] text-white focus:outline-none focus:border-[#2DC55F] w-full"
                />
                <button 
                  type="submit" 
                  className="bg-[#2DC55F] hover:bg-[#23a54e] text-slate-950 px-3.5 rounded-r-lg font-bold flex items-center justify-center transition-colors"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} SMARTax Global. All Rights Reserved. Built with Inzofin Finance & Tax Theme.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#2DC55F] transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms-and-conditions" className="hover:text-[#2DC55F] transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#2DC55F] transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}