'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  Mail, 
  ChevronDown, 
  Menu, 
  X, 
  ShieldCheck, 
  BookOpen, 
  FileText, 
  Rocket, 
  ShoppingBag, 
  Building, 
  Truck, 
  Landmark, 
  Coins, 
  CreditCard,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SITE_INFO } from '@/lib/data';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [usaDropdownOpen, setUsaDropdownOpen] = useState(false);
  const [ukDropdownOpen, setUkDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-100 transition-all">
      {/* Top Bar - Inzofin Dark Navy & Gold */}
      <div className="bg-[#071224] text-slate-300 text-xs py-2 px-4 border-b border-[#152c4e]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Left contact info */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
            <a 
              href={`tel:${SITE_INFO.phone}`} 
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{SITE_INFO.phone}</span>
            </a>
            <a 
              href={`mailto:${SITE_INFO.email}`} 
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              <span>{SITE_INFO.email}</span>
            </a>
            <span className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>401 Timbered Knoll Dr, Valrico, FL</span>
            </span>
          </div>

          {/* Right timing & certifications */}
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden sm:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>{SITE_INFO.workingHours}</span>
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>IRS Authorized ERO & HMRC MTD Partner</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation - Inzofin Home 1 Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative h-12 w-48">
              <Image 
                src="/uploads/2025/11/logo-2.png" 
                alt="Smartax Books Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-[14px] font-semibold text-slate-700">
            <Link 
              href="/" 
              className="text-[#0c1e36] font-bold hover:text-amber-500 transition-colors flex items-center gap-1 relative py-1 border-b-2 border-amber-500"
            >
              <span>Home</span>
            </Link>
            
            <Link href="/about-us" className="hover:text-amber-500 transition-colors py-1">
              About Us
            </Link>

            {/* USA Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setUsaDropdownOpen(true)}
              onMouseLeave={() => setUsaDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-amber-500 transition-colors py-2">
                <span>USA Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {usaDropdownOpen && (
                <div className="absolute top-full -left-10 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 p-3 grid gap-1 z-50">
                  <Link 
                    href="/services/bookkeeping-accounting-services" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-amber-50/50 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-md bg-amber-100/60 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs group-hover:text-amber-600 transition-colors">Bookkeeping & Accounting</div>
                      <div className="text-[11px] text-slate-500">Monthly books & ledger balancing</div>
                    </div>
                  </Link>

                  <Link 
                    href="/services/us-tax-compliance-filing-services" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-amber-50/50 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-md bg-amber-100/60 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs group-hover:text-amber-600 transition-colors">US Tax Compliance & Filing</div>
                      <div className="text-[11px] text-slate-500">Forms 1040, 1120, 1065, 5472</div>
                    </div>
                  </Link>

                  <Link 
                    href="/services/startup-business-formation-usa" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-amber-50/50 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-md bg-amber-100/60 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <Rocket className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs group-hover:text-amber-600 transition-colors">Startup Business Formation</div>
                      <div className="text-[11px] text-slate-500">US LLC, C-Corp, EIN, BOI filings</div>
                    </div>
                  </Link>

                  <Link 
                    href="/services/e-commerce-accounting-tax-services-us" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-amber-50/50 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-md bg-amber-100/60 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs group-hover:text-amber-600 transition-colors">E-Commerce Accounting & Tax</div>
                      <div className="text-[11px] text-slate-500">Shopify, Amazon, Stripe reconciliations</div>
                    </div>
                  </Link>

                  <Link 
                    href="/services/payroll-tax-management" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-amber-50/50 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-md bg-amber-100/60 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <Coins className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs group-hover:text-amber-600 transition-colors">Payroll Tax Management</div>
                      <div className="text-[11px] text-slate-500">Forms 941, 940, W-2, 1099 filings</div>
                    </div>
                  </Link>

                  <Link 
                    href="/services/virtual-bank-accounts-payment-solutions" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-amber-50/50 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-md bg-amber-100/60 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs group-hover:text-amber-600 transition-colors">Virtual Bank Accounts & Payment</div>
                      <div className="text-[11px] text-slate-500">Mercury, Wise, Relay, Stripe onboarding</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* UK Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setUkDropdownOpen(true)}
              onMouseLeave={() => setUkDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-amber-500 transition-colors py-2">
                <span>UK Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {ukDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 p-3 grid gap-1 z-50">
                  <Link 
                    href="/services/uk-company-formation-compliance-services" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-amber-50/50 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-md bg-amber-100/60 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <Landmark className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs group-hover:text-amber-600 transition-colors">UK Company Formation</div>
                      <div className="text-[11px] text-slate-500">Companies House Ltd registration</div>
                    </div>
                  </Link>

                  <Link 
                    href="/services/uk-tax-compliance-filing-services" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-amber-50/50 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-md bg-amber-100/60 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs group-hover:text-amber-600 transition-colors">UK Tax Compliance & Filing</div>
                      <div className="text-[11px] text-slate-500">Corporation Tax CT600 & Accounts</div>
                    </div>
                  </Link>

                  <Link 
                    href="/services/uk-vat-registration-compliance" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-amber-50/50 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-md bg-amber-100/60 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <Coins className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs group-hover:text-amber-600 transition-colors">UK VAT Registration & Compliance</div>
                      <div className="text-[11px] text-slate-500">Making Tax Digital (MTD) quarterly returns</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/services" className="hover:text-amber-500 transition-colors py-1">
              All Services
            </Link>
            <Link href="/pricing" className="hover:text-amber-500 transition-colors py-1">
              Pricing
            </Link>
            <Link href="/blog" className="hover:text-amber-500 transition-colors py-1">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-amber-500 transition-colors py-1">
              Contact
            </Link>
          </nav>

          {/* Inzofin Header Right: Quick Call & CTA Button */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Quick Call Widget */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Call Us Anytime</div>
                <a href={`tel:${SITE_INFO.phone}`} className="text-xs xl:text-sm font-extrabold text-[#0c1e36] hover:text-amber-600 transition-colors">
                  {SITE_INFO.phone}
                </a>
              </div>
            </div>

            {/* Inzofin Gold CTA Button */}
            <Link 
              href="/contact" 
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 group"
            >
              <span>Get A Free Quote</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-800 hover:text-amber-600 p-2 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#0c1e36] font-bold border-b border-slate-100"
          >
            Home (Home 1)
          </Link>
          <Link 
            href="/about-us" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 font-medium border-b border-slate-100 hover:text-amber-600"
          >
            About Us
          </Link>
          <Link 
            href="/services" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 font-medium border-b border-slate-100 hover:text-amber-600"
          >
            Services (USA & UK)
          </Link>
          <Link 
            href="/pricing" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 font-medium border-b border-slate-100 hover:text-amber-600"
          >
            Pricing
          </Link>
          <Link 
            href="/blog" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 font-medium border-b border-slate-100 hover:text-amber-600"
          >
            Blog
          </Link>
          <Link 
            href="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 font-medium border-b border-slate-100 hover:text-amber-600"
          >
            Contact
          </Link>
          
          <div className="pt-3 space-y-2">
            <a 
              href={`tel:${SITE_INFO.phone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-slate-800 bg-slate-100 rounded-lg"
            >
              <Phone className="w-4 h-4 text-amber-600" />
              <span>{SITE_INFO.phone}</span>
            </a>
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-lg text-xs uppercase tracking-wider shadow-sm"
            >
              Get A Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}