'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronDown, 
  Menu, 
  X, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowRight
} from 'lucide-react';
import { SITE_INFO } from '@/lib/data';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs">
      {/* Top Bar: Slanted Dark Navy & Vibrant Green */}
      <div className="bg-[#0c1a2e] text-slate-300 text-xs py-2.5 px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Left: Green badge with address */}
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-1.5 bg-[#10b981] text-white font-semibold px-3 py-1 rounded-sm text-xs">
              <MapPin className="w-3.5 h-3.5" />
              <span>{SITE_INFO.address.split(',')[0]}, FL</span>
            </div>
            <a href={`mailto:${SITE_INFO.email}`} className="hidden sm:flex items-center gap-1.5 hover:text-emerald-400 text-slate-300 transition-colors">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{SITE_INFO.email}</span>
            </a>
          </div>

          {/* Right: Phone & Socials */}
          <div className="flex items-center gap-6">
            <a href={`tel:${SITE_INFO.phone}`} className="flex items-center gap-1.5 hover:text-emerald-400 text-white font-bold transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{SITE_INFO.phone}</span>
            </a>

            <div className="hidden sm:flex items-center gap-3 text-slate-400 border-l border-slate-700 pl-4">
              <a href="#" className="hover:text-emerald-400 transition-colors" aria-label="Facebook"><Facebook className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:text-emerald-400 transition-colors" aria-label="Twitter"><Twitter className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:text-emerald-400 transition-colors" aria-label="LinkedIn"><Linkedin className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:text-emerald-400 transition-colors" aria-label="Instagram"><Instagram className="w-3.5 h-3.5" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Inzofin Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2 font-black text-2xl tracking-tight text-[#0c1a2e]">
              <span className="w-7 h-7 bg-[#10b981] rounded-sm flex items-center justify-center text-white text-base">
                ◈
              </span>
              <span>inzofin<span className="text-[#10b981]">.</span></span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[14px] font-bold text-slate-800">
            <Link href="/" className="text-[#10b981] hover:text-[#059669] transition-colors py-1">
              Home
            </Link>
            <Link href="/about-us" className="hover:text-[#10b981] transition-colors py-1">
              About Us
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#10b981] transition-colors py-2">
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full -left-4 w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-2 grid gap-1 z-50">
                  <Link href="/services/bookkeeping-accounting-services" className="p-2.5 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-800 hover:text-emerald-600">
                    Bookkeeping & Accounting
                  </Link>
                  <Link href="/services/us-tax-compliance-filing-services" className="p-2.5 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-800 hover:text-emerald-600">
                    Tax Planning & Compliance
                  </Link>
                  <Link href="/services/startup-business-formation-usa" className="p-2.5 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-800 hover:text-emerald-600">
                    Startup Business Formation
                  </Link>
                  <Link href="/services/uk-company-formation-compliance-services" className="p-2.5 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-800 hover:text-emerald-600">
                    UK Corporate Compliance
                  </Link>
                  <Link href="/services" className="p-2.5 rounded-lg hover:bg-emerald-50 text-xs font-bold text-emerald-600 border-t border-slate-100">
                    View All Services →
                  </Link>
                </div>
              )}
            </div>

            <Link href="/pricing" className="hover:text-[#10b981] transition-colors py-1">
              Pricing
            </Link>
            <Link href="/blog" className="hover:text-[#10b981] transition-colors py-1">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-[#10b981] transition-colors py-1">
              Contact Us
            </Link>
          </nav>

          {/* Right: Phone CTA Box */}
          <div className="hidden lg:flex items-center gap-3 pl-6 border-l border-slate-100">
            <div className="w-10 h-10 rounded-full border-2 border-emerald-500/30 flex items-center justify-center text-emerald-600">
              <Phone className="w-4 h-4 text-[#10b981]" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Free Consultation</div>
              <a href={`tel:${SITE_INFO.phone}`} className="text-xs font-black text-[#0c1a2e] hover:text-[#10b981] transition-colors block">
                {SITE_INFO.phone}
              </a>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-800 hover:text-emerald-600 p-2 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-[#10b981] font-bold border-b border-slate-100">
            Home
          </Link>
          <Link href="/about-us" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold border-b border-slate-100">
            About Us
          </Link>
          <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold border-b border-slate-100">
            Services
          </Link>
          <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold border-b border-slate-100">
            Pricing
          </Link>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold border-b border-slate-100">
            Blog
          </Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold border-b border-slate-100">
            Contact Us
          </Link>
          <div className="pt-3">
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider"
            >
              Get Free Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}