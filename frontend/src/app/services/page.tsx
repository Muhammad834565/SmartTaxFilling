'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  FileText, 
  Rocket, 
  ShoppingBag, 
  Building, 
  Truck, 
  CreditCard, 
  Landmark, 
  Coins,
  Check,
  Receipt,
  Building2,
  Filter,
  Globe2
} from 'lucide-react';
import { SERVICES } from '@/lib/data';

type CategoryFilter = 'All' | 'USA' | 'UK' | 'Pakistan';

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');

  const iconMap: Record<string, any> = {
    BookOpen,
    FileText,
    Rocket,
    ShoppingBag,
    Building,
    Building2,
    Truck,
    CreditCard,
    Landmark,
    Coins,
    Receipt,
  };

  const filteredServices = selectedCategory === 'All' 
    ? SERVICES 
    : SERVICES.filter((s) => s.category === selectedCategory);

  const usaCount = SERVICES.filter(s => s.category === 'USA').length;
  const ukCount = SERVICES.filter(s => s.category === 'UK').length;
  const pkCount = SERVICES.filter(s => s.category === 'Pakistan').length;

  const renderCard = (service: (typeof SERVICES)[0], index: number) => {
    const Icon = iconMap[service.icon] || BookOpen;
    const numberStr = String(index + 1).padStart(2, '0');

    return (
      <div
        key={service.slug}
        className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between pt-12 pb-8 px-7 text-center"
      >
        {/* Top Green Number Badge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-[#2DC55F] text-slate-950 font-black text-xs px-5 py-1.5 rounded-b-md shadow-md tracking-wider flex items-center justify-center">
            {numberStr}
          </div>
        </div>

        {/* Country Pill Top Right */}
        <div className="absolute top-3 right-3 z-20">
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {service.category}
          </span>
        </div>

        {/* Background Image Container with Smooth Fade & Zoom on Hover */}
        {service.imageUrl && (
          <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[#071324]/60 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071324]/80 via-[#071324]/40 to-[#071324]/70 z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.imageUrl}
              alt={service.title}
              className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out brightness-105 contrast-105"
            />
          </div>
        )}

        {/* Card Content */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 mb-5 rounded-2xl flex items-center justify-center text-[#2DC55F] transition-all duration-300">
            <Icon className="w-10 h-10 stroke-[1.75]" />
          </div>

          <h3 className="text-xl font-extrabold text-[#0c1e36] group-hover:text-[#2DC55F] transition-colors duration-300 mb-3 px-2">
            <Link href={`/services/${service.slug}`} className="hover:underline">
              {service.title}
            </Link>
          </h3>

          <p className="text-xs text-slate-600 group-hover:text-slate-200 transition-colors duration-300 leading-relaxed mb-6 px-1">
            {service.shortDescription}
          </p>

          <ul className="w-full space-y-2 mb-6 border-t border-slate-100 group-hover:border-slate-700/60 pt-4 text-xs text-slate-500 group-hover:text-slate-300 transition-colors duration-300 text-left">
            {service.features.slice(0, 4).map((feat, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#2DC55F] shrink-0 mt-0.5" />
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 pt-3 border-t border-slate-100 group-hover:border-slate-700/60 transition-colors duration-300 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 group-hover:text-slate-400 font-medium truncate max-w-[150px]">
            {service.softwareTools.slice(0, 3).join(', ')}
          </span>
          <Link
            href={`/services/${service.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-black tracking-wider uppercase text-[#0c1e36] group-hover:text-white transition-colors duration-300 relative pb-1 group/link"
          >
            <span>READ MORE</span>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2DC55F] rounded-full transform origin-left group-hover:scale-x-105 transition-transform" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Inzofin Breadcrumb Header Banner */}
      <section className="bg-[#0c1a2e] text-white py-16 sm:py-20 border-b border-[#152c4e] relative overflow-hidden">
        <div className="absolute inset-0 inzofin-pattern-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inzofin-section-subtitle justify-center text-[#2DC55F]">
            <span>// SERVICE DIRECTORY //</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Corporate Accounting, Taxation & Advisory Solutions
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            Comprehensive financial guardianship across the United States, United Kingdom, and Pakistan jurisdictions.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 pt-2">
            <Link href="/" className="hover:text-[#2DC55F] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#2DC55F]">Services</span>
          </div>
        </div>
      </section>

      {/* Main Filter / Region Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Region Tabs (All, USA, UK, Pakistan) */}
          <div className="flex items-center flex-wrap gap-2.5 w-full">
            {(['All', 'USA', 'UK', 'Pakistan'] as CategoryFilter[]).map((cat) => {
              const isActive = selectedCategory === cat;
              const count = cat === 'All' 
                ? SERVICES.length 
                : cat === 'USA' 
                ? usaCount 
                : cat === 'UK' 
                ? ukCount 
                : pkCount;

              const label = cat === 'All' 
                ? 'All Jurisdictions' 
                : cat === 'USA' 
                ? 'United States' 
                : cat === 'UK' 
                ? 'United Kingdom' 
                : 'Pakistan';

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#2DC55F] text-slate-950 shadow-md shadow-[#2DC55F]/25 font-extrabold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-slate-950/20 text-slate-950 font-black' : 'bg-slate-300 text-slate-800'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {selectedCategory === 'All' ? (
          /* Separate sections for USA, UK, Pakistan when All is selected */
          <div className="space-y-16">
            {/* 1. USA Services Section */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-2">
                <div>
                  <div className="inzofin-section-subtitle text-[#2DC55F]">
                    <span>// UNITED STATES //</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0c1e36]">
                    USA Federal & State Tax, LLC & Compliance
                  </h2>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-slate-500">Region: <strong className="text-slate-800">USA</strong></span>
                  <span className="text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
                    {usaCount} Services
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SERVICES.filter(s => s.category === 'USA').map((service, index) => renderCard(service, index))}
              </div>
            </div>

            {/* 2. UK Services Section */}
            <div className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-2">
                <div>
                  <div className="inzofin-section-subtitle text-[#2DC55F]">
                    <span>// UNITED KINGDOM //</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0c1e36]">
                    UK Companies House, HMRC & VAT Solutions
                  </h2>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-slate-500">Region: <strong className="text-slate-800">UK</strong></span>
                  <span className="text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
                    {ukCount} Services
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SERVICES.filter(s => s.category === 'UK').map((service, index) => renderCard(service, index))}
              </div>
            </div>

            {/* 3. Pakistan Services Section */}
            <div className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-2">
                <div>
                  <div className="inzofin-section-subtitle text-[#2DC55F]">
                    <span>// PAKISTAN //</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0c1e36]">
                    Pakistan FBR Tax, SECP & Provincial Sales Tax
                  </h2>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-slate-500">Region: <strong className="text-slate-800">Pakistan</strong></span>
                  <span className="text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
                    {pkCount} Services
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SERVICES.filter(s => s.category === 'Pakistan').map((service, index) => renderCard(service, index))}
              </div>
            </div>
          </div>
        ) : (
          /* Filtered Single Region Section */
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-2">
              <div>
                <div className="inzofin-section-subtitle text-[#2DC55F]">
                  <span>// {selectedCategory.toUpperCase()} SERVICES //</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0c1e36]">
                  {selectedCategory === 'USA' && 'USA Federal & State Tax, LLC & Compliance'}
                  {selectedCategory === 'UK' && 'UK Companies House, HMRC & VAT Solutions'}
                  {selectedCategory === 'Pakistan' && 'Pakistan FBR Tax, SECP & Provincial Sales Tax'}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500">Region: <strong className="text-slate-800">{selectedCategory}</strong></span>
                <span className="text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3.5 py-1.5 rounded-full border border-emerald-300">
                  {filteredServices.length} Services
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => renderCard(service, index))}
            </div>
          </div>
        )}
      </section>

      {/* Custom Proposal CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="bg-[#0c1a2e] text-white rounded-3xl p-10 sm:p-14 border-2 border-[#2DC55F] shadow-2xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white">Need a Custom Accounting Package?</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Tell us about your multi-entity structure, software stack, or specific tax filings. We will craft a bespoke, flat-rate service agreement.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#2DC55F] hover:bg-[#23a54e] text-slate-950 font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-lg shadow-md transition-all"
            >
              <span>Request Tailored Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
