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
import { SERVICES, SITE_INFO, SubServiceItem } from '@/lib/data';
import SearchOverlay from '@/components/SearchOverlay';

interface ServiceLink {
  slug: string;
  title: string;
  href: string;
  desc: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  subServices: SubServiceItem[];
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
    slug: s.slug,
    title: s.title,
    href: `/services/${s.slug}`,
    desc: s.shortDescription,
    category: s.category,
    icon: navIconMap[s.icon] || BookOpen,
    subServices: s.subServices || [],
  }));

const UK_SERVICES: ServiceLink[] = SERVICES
  .filter((s) => s.category === 'UK')
  .map((s) => ({
    slug: s.slug,
    title: s.title,
    href: `/services/${s.slug}`,
    desc: s.shortDescription,
    category: s.category,
    icon: navIconMap[s.icon] || Landmark,
    subServices: s.subServices || [],
  }));

const PAKISTAN_SERVICES: ServiceLink[] = SERVICES
  .filter((s) => s.category === 'Pakistan')
  .map((s) => ({
    slug: s.slug,
    title: s.title,
    href: `/services/${s.slug}`,
    desc: s.shortDescription,
    category: s.category,
    icon: navIconMap[s.icon] || FileText,
    subServices: s.subServices || [],
  }));

const GLOBAL_SERVICES: ServiceLink[] = SERVICES
  .filter((s) => s.category === 'General')
  .map((s) => ({
    slug: s.slug,
    title: s.title,
    href: `/services/${s.slug}`,
    desc: s.shortDescription,
    category: s.category,
    icon: navIconMap[s.icon] || BookOpen,
    subServices: s.subServices || [],
  }));

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileActiveRegion, setMobileActiveRegion] = useState<'USA' | 'UK' | 'PAKISTAN' | 'GLOBAL' | null>('USA');
  const [activeRegion, setActiveRegion] = useState<'USA' | 'UK' | 'PAKISTAN' | 'GLOBAL'>('USA');
  const [hoveredServiceSlug, setHoveredServiceSlug] = useState<string>('');
  const [searchOpen, setSearchOpen] = useState(false);

  const currentRegionServices =
    activeRegion === 'USA'
      ? USA_SERVICES
      : activeRegion === 'UK'
        ? UK_SERVICES
        : activeRegion === 'PAKISTAN'
          ? PAKISTAN_SERVICES
          : GLOBAL_SERVICES;

  const activeHoveredService =
    currentRegionServices.find((s) => s.slug === hoveredServiceSlug) || currentRegionServices[0];

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
                <div className="absolute top-full -left-48 lg:-left-56 pt-2 z-50">
                  <div className="w-[940px] max-w-[95vw] max-h-[82vh] sm:max-h-[560px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex animate-in fade-in slide-in-from-top-2 duration-150 normal-case tracking-normal">

                    {/* Left Column: Countries Tabs (USA, UK, PAKISTAN, GLOBAL) */}
                    <div className="w-48 bg-slate-50/80 p-3 border-r border-slate-100 flex flex-col gap-1.5 shrink-0">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 pt-2 pb-1">
                        Select Region
                      </div>

                      {/* USA Tab */}
                      <button
                        onMouseEnter={() => {
                          setActiveRegion('USA');
                          setHoveredServiceSlug(USA_SERVICES[0]?.slug || '');
                        }}
                        onClick={() => {
                          setActiveRegion('USA');
                          setHoveredServiceSlug(USA_SERVICES[0]?.slug || '');
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeRegion === 'USA'
                          ? 'bg-[#2DC55F] text-white shadow-md shadow-[#2DC55F]/25'
                          : 'text-slate-700 hover:bg-slate-100'
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="inline-block w-5 h-3.5 rounded-xs overflow-hidden shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="20" height="14"><rect width="60" height="30" fill="#B22234" /><rect y="4.6" width="60" height="4.6" fill="#fff" /><rect y="9.2" width="60" height="4.6" fill="#B22234" /><rect y="13.8" width="60" height="4.6" fill="#fff" /><rect y="18.4" width="60" height="4.6" fill="#B22234" /><rect y="23" width="60" height="4.6" fill="#fff" /><rect width="24" height="16" fill="#3C3B6E" /></svg></span>
                          <span className="truncate">USA Services</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 ${activeRegion === 'USA' ? 'text-white' : 'text-slate-400'}`} />
                      </button>

                      {/* UK Tab */}
                      <button
                        onMouseEnter={() => {
                          setActiveRegion('UK');
                          setHoveredServiceSlug(UK_SERVICES[0]?.slug || '');
                        }}
                        onClick={() => {
                          setActiveRegion('UK');
                          setHoveredServiceSlug(UK_SERVICES[0]?.slug || '');
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeRegion === 'UK'
                          ? 'bg-[#2DC55F] text-white shadow-md shadow-[#2DC55F]/25'
                          : 'text-slate-700 hover:bg-slate-100'
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="inline-block w-5 h-3.5 rounded-xs overflow-hidden shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="20" height="14"><rect width="60" height="30" fill="#012169" /><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" /><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" /><path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" /><path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" /></svg></span>
                          <span className="truncate">UK Services</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 ${activeRegion === 'UK' ? 'text-white' : 'text-slate-400'}`} />
                      </button>

                      {/* Pakistan Tab */}
                      <button
                        onMouseEnter={() => {
                          setActiveRegion('PAKISTAN');
                          setHoveredServiceSlug(PAKISTAN_SERVICES[0]?.slug || '');
                        }}
                        onClick={() => {
                          setActiveRegion('PAKISTAN');
                          setHoveredServiceSlug(PAKISTAN_SERVICES[0]?.slug || '');
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeRegion === 'PAKISTAN'
                          ? 'bg-[#2DC55F] text-white shadow-md shadow-[#2DC55F]/25'
                          : 'text-slate-700 hover:bg-slate-100'
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="inline-block w-5 h-3.5 rounded-xs overflow-hidden shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="20" height="14"><rect width="60" height="30" fill="#01411C" /><rect width="15" height="30" fill="#fff" /><circle cx="35" cy="15" r="8" fill="#fff" /><circle cx="37" cy="15" r="6.5" fill="#01411C" /></svg></span>
                          <span className="truncate">Pakistan Services</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 ${activeRegion === 'PAKISTAN' ? 'text-white' : 'text-slate-400'}`} />
                      </button>

                      {/* Global / Other Services Tab */}
                      <button
                        onMouseEnter={() => {
                          setActiveRegion('GLOBAL');
                          setHoveredServiceSlug(GLOBAL_SERVICES[0]?.slug || '');
                        }}
                        onClick={() => {
                          setActiveRegion('GLOBAL');
                          setHoveredServiceSlug(GLOBAL_SERVICES[0]?.slug || '');
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeRegion === 'GLOBAL'
                          ? 'bg-[#2DC55F] text-white shadow-md shadow-[#2DC55F]/25'
                          : 'text-slate-700 hover:bg-slate-100'
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-3.5 rounded-xs overflow-hidden shrink-0 bg-slate-800 text-emerald-400 inline-flex items-center justify-center text-[9px] font-black">
                            GL
                          </span>
                          <span className="truncate">Global / Other</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 ${activeRegion === 'GLOBAL' ? 'text-white' : 'text-slate-400'}`} />
                      </button>

                      {/* View all link */}
                      <div className="mt-auto pt-3 border-t border-slate-200/70">
                        <Link
                          href="/services"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-[#2DC55F] hover:text-emerald-700 hover:underline"
                        >
                          <span>Explore All Services</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>

                    {/* Middle Column: Services of Active Region (Hover reveals right panel) */}
                    <div className="w-[340px] p-4 bg-white flex flex-col border-r border-slate-100 overflow-hidden shrink-0">
                      {/* Pinned Header */}
                      <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-100 shrink-0">
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#2DC55F]" />
                          <span>
                            {activeRegion === 'USA' && 'USA Solutions'}
                            {activeRegion === 'UK' && 'UK Solutions'}
                            {activeRegion === 'PAKISTAN' && 'Pakistan Solutions'}
                            {activeRegion === 'GLOBAL' && 'Global Solutions'}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {currentRegionServices.length} Services
                        </span>
                      </div>

                      {/* Scrollable List with custom-scrollbar */}
                      <div className="overflow-y-auto pr-1 custom-scrollbar flex-1 space-y-1.5 max-h-[440px]">
                        {currentRegionServices.map((service) => {
                          const IconComponent = service.icon;
                          const isHovered = activeHoveredService?.slug === service.slug;

                          return (
                            <Link
                              key={service.href}
                              href={service.href}
                              onMouseEnter={() => setHoveredServiceSlug(service.slug)}
                              onClick={() => setServicesDropdownOpen(false)}
                              className={`group flex items-start gap-2.5 p-2.5 rounded-xl transition-all cursor-pointer border ${
                                isHovered
                                  ? 'bg-emerald-50/70 border-emerald-300 text-slate-900 shadow-2xs'
                                  : 'border-transparent hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                isHovered
                                  ? 'bg-[#2DC55F] text-slate-950 font-bold'
                                  : 'bg-emerald-50 text-[#2DC55F] group-hover:bg-[#2DC55F] group-hover:text-slate-950'
                              }`}>
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className={`text-xs font-bold leading-tight flex items-center justify-between gap-1 ${
                                  isHovered ? 'text-[#0c1e36]' : 'group-hover:text-[#2DC55F]'
                                }`}>
                                  <span className="truncate">{service.title}</span>
                                  {service.subServices && service.subServices.length > 0 && (
                                    <span className="shrink-0 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600">
                                      {service.subServices.length}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-slate-500 truncate mt-0.5">
                                  {service.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Column: Hovered Service Sub-Services & Pricing Options */}
                    <div className="flex-1 p-5 bg-gradient-to-br from-slate-50/70 via-white to-emerald-50/30 flex flex-col overflow-hidden">
                      {activeHoveredService ? (
                        <>
                          {/* Hovered Service Title & Scope */}
                          <div className="pb-3 mb-3 border-b border-slate-200/80 shrink-0">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                                  {activeHoveredService.category} Option
                                </span>
                                <span className="text-[11px] font-bold text-slate-400">
                                  Sub-Services
                                </span>
                              </div>
                              <span className="text-[10px] font-extrabold text-[#2DC55F]">
                                Interactive Solutions
                              </span>
                            </div>

                            <h3 className="text-sm font-black text-[#0c1e36] mt-1 flex items-center gap-1.5">
                              <span>{activeHoveredService.title}</span>
                            </h3>
                            <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                              {activeHoveredService.desc}
                            </p>
                          </div>

                          {/* Sub-Services List with Live Prices */}
                          <div className="overflow-y-auto pr-1.5 custom-scrollbar flex-1 space-y-2 max-h-[360px]">
                            {activeHoveredService.subServices && activeHoveredService.subServices.length > 0 ? (
                              activeHoveredService.subServices.map((sub) => (
                                <Link
                                  key={sub.id}
                                  href={`/services/${activeHoveredService.slug}?sub=${sub.id}`}
                                  onClick={() => setServicesDropdownOpen(false)}
                                  className="group/sub flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 bg-white hover:border-[#2DC55F] hover:bg-emerald-50/60 hover:shadow-sm transition-all"
                                >
                                  <div className="flex-1 min-w-0 pr-2">
                                    <div className="text-xs font-bold text-slate-800 group-hover/sub:text-[#2DC55F] transition-colors leading-tight truncate">
                                      {sub.name}
                                    </div>
                                    {sub.description && (
                                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                                        {sub.description}
                                      </p>
                                    )}
                                  </div>
                                  <div className="shrink-0 flex items-center gap-1.5">
                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover/sub:text-[#2DC55F] transition-transform group-hover/sub:translate-x-0.5" />
                                  </div>
                                </Link>
                              ))
                            ) : (
                              <div className="text-xs text-slate-400 py-6 text-center">
                                Detailed consultation & customized quotation available.
                              </div>
                            )}
                          </div>

                          {/* Bottom Action Footer */}
                          <div className="mt-auto pt-3 border-t border-slate-200/80 flex items-center justify-between shrink-0">
                            <span className="text-[11px] text-slate-500">
                              Click any sub-service to learn more
                            </span>
                            <Link
                              href={`/services/${activeHoveredService.slug}`}
                              onClick={() => setServicesDropdownOpen(false)}
                              className="text-xs font-bold text-[#2DC55F] hover:text-emerald-700 flex items-center gap-1 hover:underline"
                            >
                              <span>Explore Service Details</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full text-xs text-slate-400">
                          Hover a service to view sub-services and pricing
                        </div>
                      )}
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

          {/* Mobile Right Controls: Search Icon + Hamburger Menu */}
          <div className="flex items-center gap-1 lg:hidden pr-4 sm:pr-8">
            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="text-slate-700 hover:text-[#2DC55F] p-2 rounded-lg transition-colors cursor-pointer"
              aria-label="Search website"
            >
              <Search className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-800 hover:text-[#2DC55F] p-2 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 stroke-[2.2]" /> : <Menu className="w-6 h-6 stroke-[2.2]" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer with smooth scroll and max-height */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-8 space-y-3 max-h-[calc(100vh-120px)] overflow-y-auto overscroll-contain shadow-2xl">
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

          {/* Services Collapsible Accordion in Mobile */}
          <div className="border-t border-b border-slate-100 py-1">
            <button
              type="button"
              onClick={() => setMobileServicesOpen((prev) => !prev)}
              className="w-full flex items-center justify-between py-2 text-sm font-bold text-slate-800 hover:text-[#2DC55F] cursor-pointer"
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180 text-[#2DC55F]' : ''
                  }`}
              />
            </button>

            {/* Accordion Content */}
            {mobileServicesOpen && (
              <div className="space-y-3 pb-2 pt-1 animate-in fade-in duration-150">
                {/* Region Selector Pills */}
                <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl">
                  {(['USA', 'UK', 'PAKISTAN', 'GLOBAL'] as const).map((r) => {
                    const isActive = mobileActiveRegion === r;
                    const label = r === 'USA' ? 'USA' : r === 'UK' ? 'UK' : r === 'PAKISTAN' ? 'Pakistan' : 'Global';
                    const count =
                      r === 'USA'
                        ? USA_SERVICES.length
                        : r === 'UK'
                          ? UK_SERVICES.length
                          : r === 'PAKISTAN'
                            ? PAKISTAN_SERVICES.length
                            : GLOBAL_SERVICES.length;
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setMobileActiveRegion(r)}
                        className={`py-1.5 px-1 text-[11px] font-bold rounded-lg transition-all text-center flex flex-col items-center justify-center cursor-pointer ${isActive
                          ? 'bg-[#2DC55F] text-white shadow-sm font-extrabold'
                          : 'text-slate-600 hover:text-slate-900'
                          }`}
                      >
                        <span className="truncate">{label}</span>
                        <span className={`text-[9px] px-1 rounded-full mt-0.5 ${isActive ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Filtered Services List based on active region tab */}
                <div className="space-y-1 pl-1">
                  {(mobileActiveRegion === 'USA'
                    ? USA_SERVICES
                    : mobileActiveRegion === 'UK'
                      ? UK_SERVICES
                      : mobileActiveRegion === 'PAKISTAN'
                        ? PAKISTAN_SERVICES
                        : GLOBAL_SERVICES
                  ).map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-[#2DC55F] transition-colors"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>

                {/* Explore all services link */}
                <Link
                  href="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2 text-xs font-black uppercase tracking-wider text-[#2DC55F] hover:underline border-t border-slate-100 pt-2"
                >
                  View All Services →
                </Link>
              </div>
            )}
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
