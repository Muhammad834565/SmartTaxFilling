'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  FileCheck2,
  Cpu,
  CalendarClock,
  Check,
  Receipt,
  FileText,
  ShieldCheck,
  Printer,
  Sparkles,
  ArrowRight,
  Info,
  Building,
  Mail,
  User,
  X
} from 'lucide-react';
import type { ServiceItem, SubServiceItem } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

interface ServiceDetailViewProps {
  service: ServiceItem;
}

export default function ServiceDetailView({ service }: ServiceDetailViewProps) {
  const searchParams = useSearchParams();
  const preselectSubId = searchParams.get('sub');

  const [selectedSubServices, setSelectedSubServices] = useState<SubServiceItem[]>(() => {
    if (preselectSubId && service.subServices) {
      const match = service.subServices.find((s) => s.id === preselectSubId);
      return match ? [match] : [];
    }
    return [];
  });

  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Calculate pricing
  const totalAmount = selectedSubServices.reduce((sum, s) => sum + s.price, 0);
  const currencySymbol = selectedSubServices[0]?.currency || (service.category === 'UK' ? '£' : service.category === 'Pakistan' ? 'PKR ' : '$');

  const removeSubService = (id: string) => {
    setSelectedSubServices((prev) => prev.filter((item) => item.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-16 pb-20">
      {/* ─── Breadcrumb Header Banner ─── */}
      <section className="bg-[#0c1a2e] text-white py-16 sm:py-20 border-b border-[#152c4e] relative overflow-hidden">
        <div className="absolute inset-0 inzofin-pattern-grid opacity-30 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
            {/* Header Text */}
            <div className="flex-1 max-w-xl lg:max-w-2xl space-y-4 text-left">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <Link href="/" className="hover:text-[#2DC55F] transition-colors">Home</Link>
                <span>/</span>
                <Link href="/services" className="hover:text-[#2DC55F] transition-colors">Services</Link>
                <span>/</span>
                <span className="text-[#2DC55F] truncate max-w-xs">{service.title}</span>
              </div>

              <div className="space-y-3">
                <div className="inzofin-section-subtitle text-[#2DC55F]">
                  <span>// {service.category} SERVICE SPECIALIZATION //</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {service.title}
                </h1>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>
            </div>

            {/* Header Right Visual Card — Hexagon Shape */}
            <div className="shrink-0 flex items-center justify-center py-2">
              <div className="relative group w-[285px] h-[330px] sm:w-[325px] sm:h-[375px] transition-transform duration-500 group-hover:scale-[1.02] drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]">
                <div
                  className="w-full h-full relative overflow-hidden bg-[#071324]"
                  style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a2e]/40 via-transparent to-transparent z-10 pointer-events-none" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.imageUrl || '/sevices/Tax%20Compliance%20&%20Filing%20Services.png'}
                    alt={service.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Grid: Left Side (Details or Live Invoice) & Right Side (Form) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ─── Left Column: Invoice appears ONLY when sub-services are selected; otherwise normal ─── */}
          <div className="lg:col-span-7 space-y-10">

            {/* LIVE INVOICE / QUOTATION BREAKDOWN (Shown only when sub-services are selected) */}
            {selectedSubServices.length > 0 && (
              <div className="bg-white rounded-2xl border-2 border-[#2DC55F] shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                {/* Decorative background accents */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#2DC55F]/5 rounded-bl-full pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#2DC55F] via-emerald-400 to-[#0c1a2e]" />

                {/* Invoice Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2DC55F] animate-pulse" />
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2DC55F]">
                        Live Estimate & Official Quotation
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-[#0c1e36] tracking-tight">
                      Service Invoice Breakdown
                    </h2>
                    <p className="text-xs text-slate-500">
                      Itemized summary generated for {service.title}
                    </p>
                  </div>

                  <div className="text-right sm:text-right space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200 shrink-0">
                    <div className="text-[11px] font-mono text-slate-500 font-bold">
                      REF: INV-{service.category}-{service.slug.substring(0, 4).toUpperCase()}-2026
                    </div>
                    <div className="text-xs font-semibold text-slate-700">
                      Date: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="text-[10px] font-extrabold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md inline-block">
                      Instant Online Quote
                    </div>
                  </div>
                </div>

                {/* Client & Engagement Summary Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Prepared For (Prospective Client):
                    </span>
                    <div className="font-bold text-[#0c1e36] flex items-center gap-1.5 text-sm">
                      <User className="w-3.5 h-3.5 text-[#2DC55F]" />
                      <span>{clientInfo.name || 'Valued Business Client'}</span>
                    </div>
                    <div className="text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{clientInfo.email || 'Pending form submission'}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Service Category & Jurisdiction:
                    </span>
                    <div className="font-bold text-[#0c1e36] flex items-center gap-1.5 text-sm">
                      <Building className="w-3.5 h-3.5 text-[#2DC55F]" />
                      <span>{service.title}</span>
                    </div>
                    <div className="text-emerald-700 font-semibold mt-0.5">
                      {service.category} Regulatory Compliance
                    </div>
                  </div>
                </div>

                {/* Itemized Table of Selected Sub-Services */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="pb-3 w-8">#</th>
                        <th className="pb-3">Sub-Service Description</th>
                        <th className="pb-3 text-right">Unit Price</th>
                        <th className="pb-3 w-8 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {selectedSubServices.map((sub, idx) => (
                        <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 text-slate-400 font-bold">{idx + 1}</td>
                          <td className="py-3.5 pr-4">
                            <div className="font-bold text-slate-900 text-xs sm:text-sm">
                              {sub.name}
                            </div>
                            {sub.description && (
                              <div className="text-[11px] text-slate-500 mt-0.5 font-normal leading-relaxed">
                                {sub.description}
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 text-right font-black text-slate-900 whitespace-nowrap text-sm">
                            {sub.formattedPrice}
                          </td>
                          <td className="py-3.5 text-center">
                            <button
                              type="button"
                              onClick={() => removeSubService(sub.id)}
                              title="Remove item"
                              className="text-slate-400 hover:text-rose-500 p-1 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Financial Summary & Total Box */}
                <div className="p-5 rounded-xl bg-[#0c1a2e] text-white space-y-3 border-2 border-[#2DC55F]/40 shadow-lg">
                  <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-slate-800">
                    <span>Subtotal ({selectedSubServices.length} {selectedSubServices.length === 1 ? 'Service' : 'Services'}):</span>
                    <span className="font-bold text-white text-sm">
                      {currencySymbol}{totalAmount.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-slate-800">
                    <span>Initial Discovery & Systems Setup:</span>
                    <span className="font-semibold text-emerald-400">FREE ($0.00)</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-slate-800">
                    <span>Direct Regulatory / Tax Authority Dispatch:</span>
                    <span className="font-semibold text-emerald-400">Included</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-xs uppercase font-extrabold tracking-wider text-slate-300 block">
                        Total Estimated Investment
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        Fixed CPA fee • No hidden surcharges
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-[#2DC55F] tracking-tight">
                      {currencySymbol}{totalAmount.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Invoice Footer Guarantees & Print */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2 text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-[#2DC55F] shrink-0" />
                    <span className="text-[11px] font-medium">
                      Protected under CPA client confidentiality & IRS/HMRC regulatory standards.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#2DC55F] transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-100 cursor-pointer shrink-0"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Quotation</span>
                  </button>
                </div>
              </div>
            )}

            {/* Overview Card (Normal content) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4 border-t-4 border-t-amber-500">
              <div className="inzofin-section-subtitle text-[#2DC55F]">
                <span>// OVERVIEW //</span>
              </div>
              <h2 className="text-2xl font-black text-[#0c1e36]">Service Overview</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            {/* Key Deliverables */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-[#0c1e36] flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#2DC55F]" />
                <span>Scope of Work & Deliverables</span>
              </h2>

              <ul className="grid grid-cols-1 gap-3.5">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700">
                    <Check className="w-4 h-4 text-[#2DC55F] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Software Stack & Tools */}
            <div className="bg-[#0c1a2e] text-white rounded-2xl p-8 border-2 border-[#2DC55F]/40 shadow-xl space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <Cpu className="w-5 h-5 text-[#2DC55F]" />
                <span>Supported Software & Platforms</span>
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                We integrate seamlessly with your existing tech stack or help you migrate to optimal accounting systems:
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                {service.softwareTools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="bg-white/10 border border-white/20 text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-lg"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Workflow / Onboarding Steps */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-[#0c1e36] flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-[#2DC55F]" />
                <span>How Our Engagement Works</span>
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#2DC55F] text-slate-950 font-black flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div>
                    <span className="font-bold text-[#0c1e36]">Discovery Call & Scope Definition: </span>
                    We review your previous filings, transaction volume, and key compliance requirements.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#2DC55F] text-slate-950 font-black flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-[#0c1e36]">Secure Onboarding & System Setup: </span>
                    We establish view-only bank connections or configure your company portal with 256-bit encryption.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#2DC55F] text-slate-950 font-black flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div>
                    <span className="font-bold text-[#0c1e36]">Execution, Reconciliations & Filing: </span>
                    Our team executes monthly closings or submits tax returns directly with IRS, HMRC, SECP or FBR electronically.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Right Inquiry Sticky Card ─── */}
          <div className="lg:col-span-5 sticky top-28">
            <div
              className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden flex flex-col"
              style={{ maxHeight: 'calc(100vh - 8rem)' }}
            >
              {/* Non-scrolling header */}
              <div className="shrink-0 px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-slate-200 bg-slate-50">
                <div className="inzofin-section-subtitle text-[#2DC55F]">
                  <span>// GET STARTED //</span>
                </div>
                <h3 className="text-lg font-bold text-[#0c1e36] mt-1">
                  Request Consultation
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Select options below for an instant quote and to book your discovery call.
                </p>
              </div>

              {/* Independently scrollable form area */}
              <div className="flex-1 overflow-y-auto custom-scrollbar px-6 sm:px-8 py-6 sm:py-8">
                <ContactForm
                  initialService={service.title}
                  selectedSubServicesExternal={selectedSubServices}
                  onSelectedSubServicesChange={setSelectedSubServices}
                  onClientInfoChange={setClientInfo}
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
