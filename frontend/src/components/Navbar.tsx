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
  CreditCard 
} from 'lucide-react';
import { SITE_INFO } from '@/lib/data';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [usaDropdownOpen, setUsaDropdownOpen] = useState(false);
  const [ukDropdownOpen, setUkDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <a href={`tel:${SITE_INFO.phone}`} className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{SITE_INFO.phone}</span>
            </a>
            <a href={`mailto:${SITE_INFO.email}`} className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{SITE_INFO.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Certified IRS Agent & HMRC MTD Partner</span>
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">{SITE_INFO.workingHours}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
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
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <Link href="/about-us" className="hover:text-emerald-600 transition-colors">
              About
            </Link>

            {/* USA Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setUsaDropdownOpen(true)}
              onMouseLeave={() => setUsaDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-emerald-600 transition-colors py-2">
                <span>USA Services</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {usaDropdownOpen && (
                <div className="absolute top-full -left-10 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 p-3 grid gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link 
                    href="/services/bookkeeping-accounting-services" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <BookOpen className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">Bookkeeping & Accounting</div>
                      <div className="text-[11px] text-slate-500">Monthly books & ledger balancing</div>
                    </div>
                  </Link>

                  <Link 
                    href="/services/us-tax-compliance-filing-services" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <FileText className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">US Tax Compliance & Filing</div>
                      <div className="text-[11px] text-slate-500">Forms 1040, 1120, 1065, 5472</div>
                    </div>
                  </Link>

                  <Link 
                    href="/services/startup-business-formation-usa" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <Rocket className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">Startup Business Formation</div>
                      <div className="text-[11px] text-slate-500">US LLC, C-Corp, EIN, BOI filings</div>
                    </div>
                  </Link>

                  <Link 
                    href="/services/e-commerce-accounting-tax-services-us" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <ShoppingBag className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">E-Commerce Accounting & Tax</div>
                      <div className="text-[11px] text-slate-500">Shopify, Amazon, Stripe reconciliations</div>
                    </div>
                  </Link>

                  <Link 
                    href="/services/payroll-tax-management" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <Coins className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">Payroll Tax Management</div>
                      <div className="text-[11px] text-slate-500">Forms 941, 940, W-2, 1099 filings</div>
                    </div>
                  </Link>

                  <Link 
                    href="/services/real-estate-financial-tax-services-us" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <Building className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">Real Estate Financial & Tax</div>
                      <div className="text-[11px] text-slate-500">Rental income, Schedule E, 1031</div>
                    </div>
                  </Link>

                  <Link 
                    href="/services/logistics-transport-accounting-tax-support" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <Truck className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">Logistics & Transport Accounting</div>
                      <div className="text-[11px] text-slate-500">Form 2290 HVUT, per-mile reports</div>
                    </div>
                  </Link>

                  <Link 
                    href="/services/virtual-bank-accounts-payment-solutions" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <CreditCard className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">Virtual Bank Accounts & Payment</div>
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
              <button className="flex items-center gap-1 hover:text-emerald-600 transition-colors py-2">
                <span>UK Services</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {ukDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 p-3 grid gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link 
                    href="/services/uk-company-formation-compliance-services" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <Landmark className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">UK Company Formation</div>
                      <div className="text-[11px] text-slate-500">Companies House Ltd registration</div>
                    </div>
                  </Link>

                  <Link 
                    href="/services/uk-tax-compliance-filing-services" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <FileText className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">UK Tax Compliance & Filing</div>
                      <div className="text-[11px] text-slate-500">Corporation Tax CT600 & Accounts</div>
                    </div>
                  </Link>

                  <Link 
                    href="/services/uk-vat-registration-compliance" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <Coins className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">UK VAT Registration & Compliance</div>
                      <div className="text-[11px] text-slate-500">Making Tax Digital (MTD) quarterly returns</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/services" className="hover:text-emerald-600 transition-colors">
              All Services
            </Link>
            <Link href="/pricing" className="hover:text-emerald-600 transition-colors">
              Pricing
            </Link>
            <Link href="/blog" className="hover:text-emerald-600 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-emerald-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Consultation Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/contact" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg shadow-sm shadow-emerald-500/20 hover:shadow-md transition-all duration-150"
            >
              Book Free Consultation
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-700 hover:text-slate-900 p-2"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 font-medium border-b border-slate-100"
          >
            Home
          </Link>
          <Link 
            href="/about-us" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 font-medium border-b border-slate-100"
          >
            About Us
          </Link>
          <Link 
            href="/services" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 font-medium border-b border-slate-100"
          >
            Services (USA & UK)
          </Link>
          <Link 
            href="/pricing" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 font-medium border-b border-slate-100"
          >
            Pricing
          </Link>
          <Link 
            href="/blog" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 font-medium border-b border-slate-100"
          >
            Blog
          </Link>
          <Link 
            href="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 font-medium border-b border-slate-100"
          >
            Contact
          </Link>
          <div className="pt-2">
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-emerald-600 text-white font-medium py-3 rounded-lg"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
