'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  Mail, 
  ChevronDown, 
  ChevronRight,
  Menu, 
  X, 
  ShieldCheck, 
  BookOpen, 
  FileText, 
  Rocket, 
  ShoppingBag, 
  Building, 
  Coins, 
  CreditCard,
  MapPin,
  ArrowRight,
  Landmark,
  Receipt,
  Truck,
  Sparkles
} from 'lucide-react';
import { SITE_INFO } from '@/lib/data';

interface ServiceLink {
  title: string;
  href: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const USA_SERVICES: ServiceLink[] = [
  {
    title: 'Bookkeeping & Accounting',
    href: '/services/bookkeeping-accounting-services',
    desc: 'Monthly books, bank recs & ledger balancing',
    icon: BookOpen,
  },
  {
    title: 'US Tax Compliance & Filing',
    href: '/services/us-tax-compliance-filing-services',
    desc: 'Forms 1040, 1120, 1065, 5472 filings',
    icon: FileText,
  },
  {
    title: 'Startup Business Formation',
    href: '/services/startup-business-formation-usa',
    desc: 'US LLC, C-Corp, EIN & BOI registration',
    icon: Rocket,
  },
  {
    title: 'E-Commerce Accounting & Tax',
    href: '/services/e-commerce-accounting-tax-services-us',
    desc: 'Shopify, Amazon & Stripe reconciliations',
    icon: ShoppingBag,
  },
  {
    title: 'Payroll Tax Management',
    href: '/services/payroll-tax-management',
    desc: 'Forms 941, 940, W-2 & 1099 compliance',
    icon: Coins,
  },
  {
    title: 'Virtual Bank Accounts & Payment',
    href: '/services/virtual-bank-accounts-payment-solutions',
    desc: 'Mercury, Relay, Wise & Stripe onboarding',
    icon: CreditCard,
  },
];

const UK_SERVICES: ServiceLink[] = [
  {
    title: 'UK Company Formation',
    href: '/services/uk-company-formation-compliance-services',
    desc: 'Companies House Ltd incorporation & PSC',
    icon: Landmark,
  },
  {
    title: 'UK Tax Compliance & Filing',
    href: '/services/uk-tax-compliance-filing-services',
    desc: 'Corporation Tax CT600 & Annual Accounts',
    icon: FileText,
  },
  {
    title: 'UK VAT Registration & Compliance',
    href: '/services/uk-vat-registration-compliance',
    desc: 'Making Tax Digital (MTD) quarterly returns',
    icon: Coins,
  },
];

const PAKISTAN_SERVICES: ServiceLink[] = [
  {
    title: 'FBR Income Tax & NTN Registration',
    href: '/services/fbr-tax-filing-ntn-registration-pakistan',
    desc: 'NTN registration, Active Taxpayer (ATL) & IRIS returns',
    icon: FileText,
  },
  {
    title: 'SECP Company Incorporation',
    href: '/services/secp-company-incorporation-pakistan',
    desc: 'Private Limited (SMC-Pvt / Pvt Ltd) incorporation & Form 29',
    icon: Building,
  },
  {
    title: 'Provincial Sales Tax (PRA / SRB)',
    href: '/services/sales-tax-pra-srb-fbr-pakistan',
    desc: 'PRA, SRB, KPRA services sales tax & STRN returns',
    icon: Receipt,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState<'USA' | 'UK' | 'PAKISTAN'>('USA');
  const [mobileRegionOpen, setMobileRegionOpen] = useState<'USA' | 'UK' | 'PAKISTAN' | null>('USA');

  const currentRegionServices = 
    activeRegion === 'USA' ? USA_SERVICES :
    activeRegion === 'UK' ? UK_SERVICES : PAKISTAN_SERVICES;

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-100">
      {/* Inzofin Top Bar */}
      <div className="bg-[#0c1a2e] text-slate-300 text-xs border-b border-[#152c4e] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-10">
          {/* Slanted Green Location Tag */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative inline-flex items-center bg-[#2DC55F] text-slate-950 font-bold px-3 py-1 text-[11px] rounded-r-md -ml-4 sm:-ml-6 pr-4">
              <MapPin className="w-3.5 h-3.5 mr-1 text-slate-950" />
              <span>401 Timbered dr. Lufkin Texas 75901</span>
              <span className="ml-2 bg-[#23a54e]/30 text-emerald-950 px-1.5 py-0.5 rounded text-[10px]">24/7 Support</span>
            </div>
            
            <a 
              href={`mailto:${SITE_INFO.email}`} 
              className="hidden md:flex items-center gap-1.5 hover:text-[#2DC55F] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#2DC55F]" />
              <span>{SITE_INFO.email}</span>
            </a>
          </div>

          {/* Right timing & certifications */}
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="hidden sm:flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2DC55F]" />
              <span className="text-slate-300 font-medium">US, UK & Pakistan Tax Advisory</span>
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a 
              href={`tel:${SITE_INFO.phone}`} 
              className="flex items-center gap-1.5 text-[#2DC55F] font-semibold hover:text-emerald-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#2DC55F]" />
              <span>{SITE_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo - SMARTax Global with brand icon */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 group-hover:scale-105 transition-transform flex items-center justify-center">
              <Image 
                src="/logo-icon.png" 
                alt="SMARTax Global Icon" 
                width={40} 
                height={40} 
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <span className="text-2xl font-black tracking-tight text-[#0c1a2e]">
              SMARTax <span className="text-[#2DC55F] font-extrabold">Global</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[14px] font-semibold text-slate-700">
            <Link 
              href="/" 
              className={`transition-colors py-2 relative ${
                pathname === '/' 
                  ? 'text-[#2DC55F] font-bold border-b-2 border-[#2DC55F]' 
                  : 'hover:text-[#2DC55F]'
              }`}
            >
              Home
            </Link>

            <Link 
              href="/about-us" 
              className={`transition-colors py-2 relative ${
                pathname === '/about-us' 
                  ? 'text-[#2DC55F] font-bold border-b-2 border-[#2DC55F]' 
                  : 'hover:text-[#2DC55F]'
              }`}
            >
              About Us
            </Link>

            {/* SINGLE Unified "Services" Menu with UK, USA, Pakistan Flyout */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button 
                className={`flex items-center gap-1.5 transition-colors py-2 group ${
                  pathname.startsWith('/services') || servicesDropdownOpen
                    ? 'text-[#2DC55F] font-bold' 
                    : 'hover:text-[#2DC55F]'
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#2DC55F]' : 'text-slate-400'}`} />
              </button>

              {/* Flyout Submenu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full -left-20 pt-2 z-50">
                  <div className="w-[680px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex animate-in fade-in slide-in-from-top-2 duration-150">
                    
                    {/* Left Column: Countries Tabs (USA, UK, PAKISTAN) */}
                    <div className="w-52 bg-slate-50/80 p-3 border-r border-slate-100 flex flex-col gap-1.5 shrink-0">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 pt-2 pb-1">
                        Select Region
                      </div>

                      {/* USA Tab */}
                      <button
                        onMouseEnter={() => setActiveRegion('USA')}
                        onClick={() => setActiveRegion('USA')}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                          activeRegion === 'USA'
                            ? 'bg-[#2DC55F] text-white shadow-md shadow-[#2DC55F]/25'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="inline-block w-6 h-4 rounded-sm overflow-hidden shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="16"><rect width="60" height="30" fill="#B22234"/><rect y="4.6" width="60" height="4.6" fill="#fff"/><rect y="9.2" width="60" height="4.6" fill="#B22234"/><rect y="13.8" width="60" height="4.6" fill="#fff"/><rect y="18.4" width="60" height="4.6" fill="#B22234"/><rect y="23" width="60" height="4.6" fill="#fff"/><rect width="24" height="16" fill="#3C3B6E"/></svg></span>
                          <span>USA Services</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${activeRegion === 'USA' ? 'text-white' : 'text-slate-400'}`} />
                      </button>

                      {/* UK Tab */}
                      <button
                        onMouseEnter={() => setActiveRegion('UK')}
                        onClick={() => setActiveRegion('UK')}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                          activeRegion === 'UK'
                            ? 'bg-[#2DC55F] text-white shadow-md shadow-[#2DC55F]/25'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="inline-block w-6 h-4 rounded-sm overflow-hidden shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="16"><rect width="60" height="30" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/><path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/><path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/></svg></span>
                          <span>UK Services</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${activeRegion === 'UK' ? 'text-white' : 'text-slate-400'}`} />
                      </button>

                      {/* Pakistan Tab */}
                      <button
                        onMouseEnter={() => setActiveRegion('PAKISTAN')}
                        onClick={() => setActiveRegion('PAKISTAN')}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                          activeRegion === 'PAKISTAN'
                            ? 'bg-[#2DC55F] text-white shadow-md shadow-[#2DC55F]/25'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="inline-block w-6 h-4 rounded-sm overflow-hidden shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="16"><rect width="60" height="30" fill="#01411C"/><rect width="15" height="30" fill="#fff"/><circle cx="35" cy="15" r="8" fill="#fff"/><circle cx="37" cy="15" r="6.5" fill="#01411C"/></svg></span>
                          <span>Pakistan Services</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${activeRegion === 'PAKISTAN' ? 'text-white' : 'text-slate-400'}`} />
                      </button>

                      {/* View all link */}
                      <div className="mt-auto pt-3 border-t border-slate-200/70">
                        <Link 
                          href="/services" 
                          className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-[#2DC55F] hover:text-emerald-700 hover:underline"
                        >
                          <span>Explore All Services</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Dynamic Services List based on Hovered Country */}
                    <div className="flex-1 p-4 bg-white">
                      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#2DC55F]"></span>
                          <span>
                            {activeRegion === 'USA' && 'United States Tax & Accounting Solutions'}
                            {activeRegion === 'UK' && 'United Kingdom HMRC & Company Services'}
                            {activeRegion === 'PAKISTAN' && 'Pakistan FBR & SECP Compliance'}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {currentRegionServices.length} Services
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-1.5 max-h-[380px] overflow-y-auto pr-1">
                        {currentRegionServices.map((service) => {
                          const IconComp = service.icon;
                          return (
                            <Link
                              key={service.href}
                              href={service.href}
                              onClick={() => setServicesDropdownOpen(false)}
                              className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50/70 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-[#2DC55F] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#2DC55F] group-hover:text-white transition-colors">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold text-slate-900 group-hover:text-[#2DC55F] transition-colors flex items-center gap-1.5">
                                  <span>{service.title}</span>
                                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#2DC55F]" />
                                </div>
                                <p className="text-[11px] text-slate-500 truncate">
                                  {service.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/pricing" 
              className={`transition-colors py-2 relative ${
                pathname === '/pricing' 
                  ? 'text-[#2DC55F] font-bold border-b-2 border-[#2DC55F]' 
                  : 'hover:text-[#2DC55F]'
              }`}
            >
              Pricing
            </Link>

            <Link 
              href="/blog" 
              className={`transition-colors py-2 relative ${
                pathname === '/blog' 
                  ? 'text-[#2DC55F] font-bold border-b-2 border-[#2DC55F]' 
                  : 'hover:text-[#2DC55F]'
              }`}
            >
              Blog
            </Link>

            <Link 
              href="/contact" 
              className={`transition-colors py-2 relative ${
                pathname === '/contact' 
                  ? 'text-[#2DC55F] font-bold border-b-2 border-[#2DC55F]' 
                  : 'hover:text-[#2DC55F]'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Side: Consultation Call & CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2DC55F]/15 border border-[#2DC55F]/30 flex items-center justify-center text-[#2DC55F] shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Free Consultation</div>
                <a 
                  href={`tel:${SITE_INFO.phone}`} 
                  className="text-xs xl:text-sm font-extrabold text-[#0c1a2e] hover:text-[#2DC55F] transition-colors"
                >
                  {SITE_INFO.phone}
                </a>
              </div>
            </div>

            <Link 
              href="/contact" 
              className="bg-[#2DC55F] hover:bg-[#23a54e] text-slate-950 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 group"
            >
              <span>Get A Free Quote</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-800 hover:text-[#2DC55F] p-2 rounded-lg"
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
            className="block py-2 text-[#0c1a2e] font-bold border-b border-slate-100"
          >
            Home
          </Link>

          <Link 
            href="/about-us" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 font-medium border-b border-slate-100 hover:text-[#2DC55F]"
          >
            About Us
          </Link>

          {/* Mobile Services Accordion */}
          <div className="border-b border-slate-100 pb-2">
            <div className="py-2 text-slate-900 font-bold text-sm flex items-center justify-between">
              <span>Services</span>
              <Link 
                href="/services" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-[#2DC55F] font-semibold"
              >
                All Services →
              </Link>
            </div>

            {/* Region toggles for mobile */}
            <div className="space-y-1.5 pl-2">
              {/* USA */}
              <div>
                <button
                  onClick={() => setMobileRegionOpen(mobileRegionOpen === 'USA' ? null : 'USA')}
                  className="w-full flex items-center justify-between py-1.5 text-xs font-bold text-slate-800"
                >
                  <span className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-6 h-4 rounded-sm"><rect width="60" height="30" fill="#B22234"/><rect y="4.6" width="60" height="4.6" fill="#fff"/><rect y="9.2" width="60" height="4.6" fill="#B22234"/><rect y="13.8" width="60" height="4.6" fill="#fff"/><rect y="18.4" width="60" height="4.6" fill="#B22234"/><rect y="23" width="60" height="4.6" fill="#fff"/><rect width="24" height="16" fill="#3C3B6E"/></svg> USA Services</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileRegionOpen === 'USA' ? 'rotate-180' : ''}`} />
                </button>
                {mobileRegionOpen === 'USA' && (
                  <div className="pl-4 space-y-1 py-1">
                    {USA_SERVICES.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-xs text-slate-600 hover:text-[#2DC55F]"
                      >
                        • {s.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* UK */}
              <div>
                <button
                  onClick={() => setMobileRegionOpen(mobileRegionOpen === 'UK' ? null : 'UK')}
                  className="w-full flex items-center justify-between py-1.5 text-xs font-bold text-slate-800"
                >
                  <span className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-6 h-4 rounded-sm"><rect width="60" height="30" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/><path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/><path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/></svg> UK Services</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileRegionOpen === 'UK' ? 'rotate-180' : ''}`} />
                </button>
                {mobileRegionOpen === 'UK' && (
                  <div className="pl-4 space-y-1 py-1">
                    {UK_SERVICES.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-xs text-slate-600 hover:text-[#2DC55F]"
                      >
                        • {s.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* PAKISTAN */}
              <div>
                <button
                  onClick={() => setMobileRegionOpen(mobileRegionOpen === 'PAKISTAN' ? null : 'PAKISTAN')}
                  className="w-full flex items-center justify-between py-1.5 text-xs font-bold text-slate-800"
                >
                  <span className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-6 h-4 rounded-sm"><rect width="60" height="30" fill="#01411C"/><rect width="15" height="30" fill="#fff"/><circle cx="34" cy="15" r="8" fill="#fff"/><circle cx="36" cy="15" r="6.5" fill="#01411C"/></svg> Pakistan Services</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileRegionOpen === 'PAKISTAN' ? 'rotate-180' : ''}`} />
                </button>
                {mobileRegionOpen === 'PAKISTAN' && (
                  <div className="pl-4 space-y-1 py-1">
                    {PAKISTAN_SERVICES.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-xs text-slate-600 hover:text-[#2DC55F]"
                      >
                        • {s.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Link 
            href="/pricing" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 font-medium border-b border-slate-100 hover:text-[#2DC55F]"
          >
            Pricing
          </Link>

          <Link 
            href="/blog" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 font-medium border-b border-slate-100 hover:text-[#2DC55F]"
          >
            Blog
          </Link>

          <Link 
            href="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 font-medium border-b border-slate-100 hover:text-[#2DC55F]"
          >
            Contact
          </Link>
          
          <div className="pt-3 space-y-2">
            <a 
              href={`tel:${SITE_INFO.phone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-slate-800 bg-slate-100 rounded-lg"
            >
              <Phone className="w-4 h-4 text-[#2DC55F]" />
              <span>{SITE_INFO.phone}</span>
            </a>
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-[#2DC55F] hover:bg-[#23a54e] text-slate-950 font-bold py-3 rounded-lg text-xs uppercase tracking-wider shadow-sm"
            >
              Get A Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
