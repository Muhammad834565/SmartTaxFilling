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
  FileSpreadsheet,
  Users,
  Truck,
  MessageSquare,
  Search,
  Facebook,
  Twitter,
  Instagram
} from 'lucide-react';
import { SERVICES, SITE_INFO } from '@/lib/data';
import SearchOverlay from '@/components/SearchOverlay';

interface ServiceLink {
  title: string;
  href: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  FileText,
  Rocket,
  ShoppingBag,
  Coins,
  CreditCard,
  Building,
  Landmark,
  Receipt,
  FileSpreadsheet,
  Users,
  Truck,
};

const USA_SERVICES: ServiceLink[] = SERVICES
  .filter((s) => s.category === 'USA')
  .map((s) => ({
    title: s.title,
    href: `/services/${s.slug}`,
    desc: s.shortDescription,
    icon: navIconMap[s.icon] || BookOpen,
  }));

const UK_SERVICES: ServiceLink[] = SERVICES
  .filter((s) => s.category === 'UK')
  .map((s) => ({
    title: s.title,
    href: `/services/${s.slug}`,
    desc: s.shortDescription,
    icon: navIconMap[s.icon] || Landmark,
  }));

const PAKISTAN_SERVICES: ServiceLink[] = SERVICES
  .filter((s) => s.category === 'Pakistan')
  .map((s) => ({
    title: s.title,
    href: `/services/${s.slug}`,
    desc: s.shortDescription,
    icon: navIconMap[s.icon] || FileText,
  }));

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState<'USA' | 'UK' | 'PAKISTAN'>('USA');
  const [searchOpen, setSearchOpen] = useState(false);

  const currentRegionServices =
    activeRegion === 'USA'
      ? USA_SERVICES
      : activeRegion === 'UK'
        ? UK_SERVICES
        : PAKISTAN_SERVICES;

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* ─── Top Bar: Inzofin Signature Slanted Theme ─── */}
      <div className="bg-[#0b1728] text-slate-300 text-xs relative h-10 overflow-hidden">
        {/* Full-width flex container */}
        <div className="w-full h-full flex items-stretch justify-between">

          {/* Left: Green badge with chevron point (> shape) */}
          <div className="flex items-stretch h-full">
            {/* Green rectangle container holding the location text */}
            <div className="bg-[#2DC55F] text-white font-bold flex items-center pl-4 sm:pl-8 pr-2 text-[11px] sm:text-xs tracking-tight">
              <MapPin className="w-3.5 h-3.5 mr-2 text-white shrink-0" />
              <span className="truncate max-w-[260px] sm:max-w-none text-white font-semibold">{SITE_INFO.address}</span>
            </div>

            {/* Seamless SVG chevron pointer (> shape with white stroke) */}
            <svg
              viewBox="0 0 24 40"
              className="h-full w-6 block shrink-0 overflow-visible"
              preserveAspectRatio="none"
            >
              {/* Green chevron fill */}
              <polygon points="0,0 20,20 0,40" fill="#2DC55F" />
              {/* Crisp white chevron stroke on top */}
              <polyline points="0,0 20,20 0,40" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinejoin="miter" strokeLinecap="square" />
            </svg>
          </div>

          {/* Right: Email on the left, then social icons on the far right */}
          <div className="flex items-stretch h-full text-[12px] font-semibold text-slate-300">
            {/* Email item - no border on left so dark navy runs continuous */}
            <div className="flex items-center px-4 sm:px-6">
              <a
                href={`mailto:${SITE_INFO.email}`}
                className="flex items-center gap-2 text-white hover:text-[#2DC55F] transition-colors font-medium"
              >
                <Mail className="w-4 h-4 text-[#2DC55F]" />
                <span className="hidden sm:inline text-white">{SITE_INFO.email}</span>
              </a>
            </div>

            {/* Social Icons group (Facebook, X, Instagram, Pinterest) */}
            <div className="flex items-stretch border-l border-slate-700/60">
              <a
                href="#"
                aria-label="Facebook"
                className="flex items-center justify-center px-3 sm:px-3.5 border-r border-slate-700/60 text-white hover:text-[#2DC55F] transition-colors"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>

              <a
                href="#"
                aria-label="Twitter / X"
                className="flex items-center justify-center px-3 sm:px-3.5 border-r border-slate-700/60 text-white hover:text-[#2DC55F] transition-colors font-bold text-xs"
              >
                𝕏
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex items-center justify-center px-3 sm:px-3.5 border-r border-slate-700/60 text-white hover:text-[#2DC55F] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>

              <a
                href="#"
                aria-label="Pinterest"
                className="flex items-center justify-center px-3 sm:px-3.5 border-r border-slate-700/60 text-white hover:text-[#2DC55F] transition-colors font-bold text-xs"
              >
                🅿
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ─── Main Navigation Bar ─── */}
      <div className="w-full pl-4 sm:pl-8 lg:pl-12 pr-0 border-b border-slate-100">
        <div className="flex items-center justify-between h-20">

          {/* Brand Logo - SMARTax Global with brand icon */}
          <Link href="/" className="flex items-center gap-3 group shrink-0 py-2">
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
          <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-bold tracking-wide uppercase text-slate-700">
            <Link
              href="/"
              className={`transition-colors py-2 relative flex flex-col items-center ${pathname === '/'
                  ? 'text-[#2DC55F]'
                  : 'hover:text-[#2DC55F]'
                }`}
            >
              <span>HOME</span>
              {pathname === '/' && (
                <div className="flex flex-col items-center -mb-2 mt-0.5">
                  <span className="w-0.5 h-1.5 bg-[#2DC55F]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2DC55F]" />
                </div>
              )}
            </Link>

            <Link
              href="/about-us"
              className={`transition-colors py-2 relative flex flex-col items-center ${pathname === '/about-us'
                  ? 'text-[#2DC55F]'
                  : 'hover:text-[#2DC55F]'
                }`}
            >
              <span>ABOUT US</span>
              {pathname === '/about-us' && (
                <div className="flex flex-col items-center -mb-2 mt-0.5">
                  <span className="w-0.5 h-1.5 bg-[#2DC55F]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2DC55F]" />
                </div>
              )}
            </Link>

            {/* Unified "Services" Menu with UK, USA, Pakistan Flyout */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 py-2 transition-colors cursor-pointer uppercase ${pathname?.startsWith('/services')
                    ? 'text-[#2DC55F]'
                    : 'hover:text-[#2DC55F]'
                  }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>SERVICES</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#2DC55F]' : 'text-slate-400'}`} />
              </button>

              {/* Flyout Submenu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full -left-20 pt-2 z-50">
                  <div className="w-[680px] max-h-[80vh] sm:max-h-[540px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex animate-in fade-in slide-in-from-top-2 duration-150 normal-case tracking-normal">

                    {/* Left Column: Countries Tabs (USA, UK, PAKISTAN) */}
                    <div className="w-52 bg-slate-50/80 p-3 border-r border-slate-100 flex flex-col gap-1.5 shrink-0">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 pt-2 pb-1">
                        Select Region
                      </div>

                      {/* USA Tab */}
                      <button
                        onMouseEnter={() => setActiveRegion('USA')}
                        onClick={() => setActiveRegion('USA')}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${activeRegion === 'USA'
                            ? 'bg-[#2DC55F] text-white shadow-md shadow-[#2DC55F]/25'
                            : 'text-slate-700 hover:bg-slate-100'
                          }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="inline-block w-6 h-4 rounded-sm overflow-hidden shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="16"><rect width="60" height="30" fill="#B22234" /><rect y="4.6" width="60" height="4.6" fill="#fff" /><rect y="9.2" width="60" height="4.6" fill="#B22234" /><rect y="13.8" width="60" height="4.6" fill="#fff" /><rect y="18.4" width="60" height="4.6" fill="#B22234" /><rect y="23" width="60" height="4.6" fill="#fff" /><rect width="24" height="16" fill="#3C3B6E" /></svg></span>
                          <span>USA Services</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${activeRegion === 'USA' ? 'text-white' : 'text-slate-400'}`} />
                      </button>

                      {/* UK Tab */}
                      <button
                        onMouseEnter={() => setActiveRegion('UK')}
                        onClick={() => setActiveRegion('UK')}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${activeRegion === 'UK'
                            ? 'bg-[#2DC55F] text-white shadow-md shadow-[#2DC55F]/25'
                            : 'text-slate-700 hover:bg-slate-100'
                          }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="inline-block w-6 h-4 rounded-sm overflow-hidden shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="16"><rect width="60" height="30" fill="#012169" /><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" /><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" /><path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" /><path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" /></svg></span>
                          <span>UK Services</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${activeRegion === 'UK' ? 'text-white' : 'text-slate-400'}`} />
                      </button>

                      {/* Pakistan Tab */}
                      <button
                        onMouseEnter={() => setActiveRegion('PAKISTAN')}
                        onClick={() => setActiveRegion('PAKISTAN')}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${activeRegion === 'PAKISTAN'
                            ? 'bg-[#2DC55F] text-white shadow-md shadow-[#2DC55F]/25'
                            : 'text-slate-700 hover:bg-slate-100'
                          }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="inline-block w-6 h-4 rounded-sm overflow-hidden shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="16"><rect width="60" height="30" fill="#01411C" /><rect width="15" height="30" fill="#fff" /><circle cx="35" cy="15" r="8" fill="#fff" /><circle cx="37" cy="15" r="6.5" fill="#01411C" /></svg></span>
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

                    {/* Right Column: Dynamic Services of Active Region */}
                    <div className="flex-1 p-5 bg-white flex flex-col overflow-hidden">
                      {/* Pinned Header */}
                      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 shrink-0">
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#2DC55F]" />
                          <span>
                            {activeRegion === 'USA' && 'United States Tax & Accounting Solutions'}
                            {activeRegion === 'UK' && 'United Kingdom Statutory & Tax Solutions'}
                            {activeRegion === 'PAKISTAN' && 'Pakistan FBR, SECP & Provincial Sales Tax'}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {currentRegionServices.length} Services
                        </span>
                      </div>

                      {/* Scrollable List with custom-scrollbar */}
                      <div className="overflow-y-auto pr-1.5 custom-scrollbar flex-1 space-y-1.5 max-h-[440px]">
                        {currentRegionServices.map((service) => {
                          const IconComponent = service.icon;
                          return (
                            <Link
                              key={service.href}
                              href={service.href}
                              onClick={() => setServicesDropdownOpen(false)}
                              className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#2DC55F] group-hover:bg-[#2DC55F] group-hover:text-slate-950 flex items-center justify-center shrink-0 transition-colors">
                                <IconComponent className="w-4 h-4" />
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
              className={`transition-colors py-2 relative flex flex-col items-center ${pathname === '/pricing'
                  ? 'text-[#2DC55F]'
                  : 'hover:text-[#2DC55F]'
                }`}
            >
              <span>PRICING</span>
              {pathname === '/pricing' && (
                <div className="flex flex-col items-center -mb-2 mt-0.5">
                  <span className="w-0.5 h-1.5 bg-[#2DC55F]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2DC55F]" />
                </div>
              )}
            </Link>

            <Link
              href="/blog"
              className={`transition-colors py-2 relative flex flex-col items-center ${pathname === '/blog'
                  ? 'text-[#2DC55F]'
                  : 'hover:text-[#2DC55F]'
                }`}
            >
              <span>BLOG</span>
              {pathname === '/blog' && (
                <div className="flex flex-col items-center -mb-2 mt-0.5">
                  <span className="w-0.5 h-1.5 bg-[#2DC55F]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2DC55F]" />
                </div>
              )}
            </Link>

            <Link
              href="/contact"
              className={`transition-colors py-2 relative flex flex-col items-center ${pathname === '/contact'
                  ? 'text-[#2DC55F]'
                  : 'hover:text-[#2DC55F]'
                }`}
            >
              <span>CONTACT US</span>
              {pathname === '/contact' && (
                <div className="flex flex-col items-center -mb-2 mt-0.5">
                  <span className="w-0.5 h-1.5 bg-[#2DC55F]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2DC55F]" />
                </div>
              )}
            </Link>

            {/* Search Icon */}
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="text-slate-700 hover:text-[#2DC55F] transition-colors p-1 cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          </nav>

          {/* Right Side: Exact Inzofin Full-Height Chevron (> shape) Callout Box */}
          <div className="hidden lg:flex items-stretch self-stretch">
            <div className="relative flex items-center bg-[#def4e5]/70 h-full pl-12 pr-8 xl:pr-10 [clip-path:polygon(28px_0,100%_0,100%_100%,28px_100%,0_50%)]">
              {/* Message outline icon */}
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[#2DC55F] mr-3.5 shrink-0">
                <MessageSquare className="w-8 h-8 stroke-[2.2]" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-xs font-bold text-[#0c1a2e] tracking-tight">Have any question?</div>
                <a
                  href={SITE_INFO.whatsappUrl || `https://wa.me/19362206795`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm xl:text-[15px] font-black text-[#2DC55F] hover:text-emerald-700 transition-colors tracking-tight block mt-0.5"
                >
                  {SITE_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex lg:hidden pr-4 sm:pr-8">
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
            className="block py-2 text-sm font-bold text-slate-800 hover:text-[#2DC55F]"
          >
            Home
          </Link>
          <Link
            href="/about-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-slate-800 hover:text-[#2DC55F]"
          >
            About Us
          </Link>

          {/* Services Accordion in Mobile */}
          <div className="border-t border-b border-slate-100 py-2 space-y-1">
            <div className="text-xs uppercase font-extrabold text-[#2DC55F] tracking-wider py-1">
              All Services
            </div>
            <div className="pl-2 space-y-1">
              <div className="text-xs font-bold text-slate-700 pt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2DC55F]" /> USA Services
              </div>
              {USA_SERVICES.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block pl-3 py-1 text-xs text-slate-600 hover:text-[#2DC55F]"
                >
                  {s.title}
                </Link>
              ))}

              <div className="text-xs font-bold text-slate-700 pt-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2DC55F]" /> UK Services
              </div>
              {UK_SERVICES.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block pl-3 py-1 text-xs text-slate-600 hover:text-[#2DC55F]"
                >
                  {s.title}
                </Link>
              ))}

              <div className="text-xs font-bold text-slate-700 pt-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2DC55F]" /> Pakistan Services
              </div>
              {PAKISTAN_SERVICES.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block pl-3 py-1 text-xs text-slate-600 hover:text-[#2DC55F]"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-slate-800 hover:text-[#2DC55F]"
          >
            Pricing
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-slate-800 hover:text-[#2DC55F]"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-slate-800 hover:text-[#2DC55F]"
          >
            Contact
          </Link>

          <div className="pt-2">
            <a
              href={SITE_INFO.whatsappUrl || `https://wa.me/19362206795`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#2DC55F] hover:bg-[#23a54e] text-slate-950 font-bold text-xs uppercase tracking-wider py-3 rounded-lg shadow-md flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-slate-950" />
              <span>{SITE_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}

      {/* Search Overlay — rendered outside <header> flow so it covers full viewport */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
