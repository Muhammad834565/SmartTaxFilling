'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Check,
  Sparkles,
  ArrowRight,
  Search,
  Building,
  Landmark,
  FileText,
  CreditCard,
  ShoppingBag,
  Receipt,
  Users,
  Coins,
  BookOpen,
  FileSpreadsheet,
  Truck,
  ShieldCheck,
  HelpCircle,
  X,
  Plus,
  Calendar,
  Layers,
  ChevronRight,
  ChevronDown,
  Filter
} from 'lucide-react';
import { SERVICES, PRICING_PLANS, SubServiceItem, ServiceItem } from '@/lib/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  FileText,
  Rocket: Sparkles,
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

type RegionTab = 'USA' | 'UK' | 'Pakistan' | 'General';

export default function InteractivePricingDirectory() {
  // Pricing tab: 'plans' (Monthly Retainers) or 'fixed' (Fixed-fee itemized catalog)
  const [activeTab, setActiveTab] = useState<'plans' | 'fixed'>('plans');
  const [isAnnual, setIsAnnual] = useState(false);

  // Region tab for itemized pricing
  const [activeRegion, setActiveRegion] = useState<RegionTab>('USA');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected sub-services for live quotation basket
  const [selectedSubServices, setSelectedSubServices] = useState<
    Array<{ serviceTitle: string; serviceSlug: string; sub: SubServiceItem }>
  >([]);

  // Expanded sub-services state for collapsible view
  const [expandedSubServices, setExpandedSubServices] = useState<Record<string, boolean>>({});

  // Expanded state for service category boxes (collapsed by default, expanded if user searches)
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({});

  const toggleServiceExpand = (slug: string) => {
    setExpandedServices((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const toggleSubServiceExpand = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setExpandedSubServices((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter services by region
  const regionServices = useMemo(() => {
    return SERVICES.filter((s) => s.category === activeRegion);
  }, [activeRegion]);

  // Search filter across sub-services
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return regionServices;
    const q = searchQuery.toLowerCase();

    return regionServices
      .map((service) => {
        const titleMatch = service.title.toLowerCase().includes(q);
        const matchedSubs = (service.subServices || []).filter(
          (sub) =>
            sub.name.toLowerCase().includes(q) ||
            (sub.description && sub.description.toLowerCase().includes(q))
        );

        if (titleMatch || matchedSubs.length > 0) {
          return {
            ...service,
            subServices: titleMatch ? service.subServices : matchedSubs,
          };
        }
        return null;
      })
      .filter(Boolean) as ServiceItem[];
  }, [regionServices, searchQuery]);

  // Toggle selection of subservice
  const toggleSubService = (service: ServiceItem, sub: SubServiceItem) => {
    setSelectedSubServices((prev) => {
      const exists = prev.some((item) => item.sub.id === sub.id);
      if (exists) {
        return prev.filter((item) => item.sub.id !== sub.id);
      } else {
        return [...prev, { serviceTitle: service.title, serviceSlug: service.slug, sub }];
      }
    });
  };

  const isSubSelected = (subId: string) => {
    return selectedSubServices.some((item) => item.sub.id === subId);
  };

  // Total price calculation for quote
  const totalPrice = selectedSubServices.reduce((sum, item) => sum + item.sub.price, 0);
  const currentCurrency = selectedSubServices[0]?.sub.currency || (activeRegion === 'UK' ? '£' : activeRegion === 'Pakistan' ? 'PKR ' : '$');

  return (
    <div className="space-y-12">
      {/* ─── Mode Switcher Bar ─── */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('plans')}
          className={`w-full sm:w-1/2 py-3 px-5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'plans'
              ? 'bg-[#0c1a2e] text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4 text-[#2DC55F]" />
          <span>Monthly Retainer Packages</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('fixed')}
          className={`w-full sm:w-1/2 py-3 px-5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'fixed'
              ? 'bg-[#2DC55F] text-slate-950 shadow-md font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Fixed-Fee Service Rates ({SERVICES.length} Services)</span>
        </button>
      </div>

      {/* ─── TAB 1: MONTHLY RETAINER PACKAGES ─── */}
      {activeTab === 'plans' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          {/* Annual Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-bold ${!isAnnual ? 'text-[#0c1e36]' : 'text-slate-400'}`}>
              Monthly Billing
            </span>
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer ${
                isAnnual ? 'bg-[#2DC55F]' : 'bg-slate-300'
              }`}
              aria-label="Toggle annual billing"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                  isAnnual ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-bold flex items-center gap-1.5 ${isAnnual ? 'text-[#0c1e36]' : 'text-slate-400'}`}>
              Annual Billing
              <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                Save ~15%
              </span>
            </span>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PRICING_PLANS.map((plan) => {
              const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 card-hover ${
                    plan.isPopular
                      ? 'bg-[#0c1a2e] text-white border-2 border-[#2DC55F] shadow-2xl scale-[1.02]'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-sm'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2DC55F] text-slate-950 text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                      Most Popular Choice
                    </div>
                  )}

                  <div>
                    <h3 className={`text-xl font-extrabold mb-2 ${plan.isPopular ? 'text-white' : 'text-[#0c1e36]'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-xs mb-6 leading-relaxed ${plan.isPopular ? 'text-slate-300' : 'text-slate-500'}`}>
                      {plan.description}
                    </p>

                    <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-slate-200/20">
                      <span className={`text-4xl font-extrabold tracking-tight ${plan.isPopular ? 'text-[#2DC55F]' : 'text-[#0c1e36]'}`}>
                        ${price}
                      </span>
                      <span className={`text-xs ${plan.isPopular ? 'text-slate-300' : 'text-slate-500'}`}>
                        / month {isAnnual ? '(billed annually)' : ''}
                      </span>
                    </div>

                    <div className="space-y-3 mb-8">
                      <div className={`text-xs font-bold uppercase tracking-wider ${plan.isPopular ? 'text-[#2DC55F]' : 'text-[#0c1e36]'}`}>
                        What is included:
                      </div>
                      <ul className="space-y-2.5 text-xs">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-[#2DC55F] shrink-0 mt-0.5" />
                            <span className={plan.isPopular ? 'text-slate-200' : 'text-slate-600'}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <Link
                      href={`/contact?plan=${encodeURIComponent(plan.name)}`}
                      className={`w-full py-3.5 px-5 rounded-lg text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer ${
                        plan.isPopular
                          ? 'bg-[#2DC55F] hover:bg-[#23a54e] text-slate-950 font-black'
                          : 'bg-[#0c1a2e] hover:bg-[#152c4e] text-white'
                      }`}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── TAB 2: ITEMIZED FIXED-FEE SERVICES DIRECTORY ─── */}
      {activeTab === 'fixed' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Controls Bar: Region Tabs & Search */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Region Tabs */}
            <div className="flex items-center flex-wrap gap-2 w-full md:w-auto">
              {(
                [
                  { id: 'USA', label: 'United States', flag: '🇺🇸', count: 8 },
                  { id: 'UK', label: 'United Kingdom', flag: '🇬🇧', count: 7 },
                  { id: 'Pakistan', label: 'Pakistan', flag: '🇵🇰', count: 8 },
                  { id: 'General', label: 'Global & Specialized', flag: '🌐', count: 4 },
                ] as const
              ).map((tab) => {
                const isActive = activeRegion === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveRegion(tab.id as RegionTab)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-[#2DC55F] text-slate-950 shadow-md font-extrabold'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{tab.flag}</span>
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-slate-950/20 text-slate-950 font-black' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search service, form, or fee..."
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#2DC55F] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Service Categories and Sub-Service Rates Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {filteredServices.map((service) => {
              const IconComponent = iconMap[service.icon] || BookOpen;
              const subServices = service.subServices || [];
              const isServiceOpen = searchQuery.trim().length > 0 || !!expandedServices[service.slug];
              const selectedCountInService = subServices.filter((s) => isSubSelected(s.id)).length;

              return (
                <div
                  key={service.slug}
                  className={`bg-white rounded-2xl border transition-all shadow-sm relative overflow-hidden border-t-4 border-t-[#2DC55F] ${
                    isServiceOpen ? 'p-6 sm:p-7 shadow-md' : 'p-5 hover:shadow-md'
                  }`}
                >
                  {/* Service Header - Clickable to Expand / Collapse */}
                  <div
                    onClick={() => toggleServiceExpand(service.slug)}
                    className="flex items-start justify-between gap-3 cursor-pointer select-none group"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2DC55F] flex items-center justify-center shrink-0 border border-emerald-200 group-hover:scale-105 transition-transform">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-extrabold text-[#0c1e36] text-base leading-tight group-hover:text-[#2DC55F] transition-colors">
                            {service.title}
                          </h3>
                          {selectedCountInService > 0 && (
                            <span className="text-[10px] font-extrabold bg-[#2DC55F] text-slate-950 px-2 py-0.5 rounded-full">
                              {selectedCountInService} in basket
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mt-0.5">
                          {service.category} Jurisdiction • {subServices.length} Fixed-Fee Options
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pt-1">
                      <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-600 hidden sm:inline">
                        {isServiceOpen ? 'Collapse' : 'View Rates'}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-all ${
                          isServiceOpen ? 'rotate-180 bg-emerald-100 text-[#2DC55F]' : 'text-slate-500'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Collapsible Body: Sub-Services & Links */}
                  {isServiceOpen && (
                    <div className="pt-5 mt-4 border-t border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      {/* Sub-Services Checklist with Prices */}
                      <div className="space-y-2">
                        {subServices.map((sub) => {
                          const selected = isSubSelected(sub.id);
                          const isExpanded = !!expandedSubServices[sub.id];

                          return (
                            <div
                              key={sub.id}
                              className={`rounded-xl border transition-all select-none overflow-hidden ${
                                selected
                                  ? 'bg-emerald-50/70 border-[#2DC55F] shadow-xs ring-1 ring-[#2DC55F]'
                                  : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'
                              }`}
                            >
                              {/* Compact Row: Checkbox + Name + Expand Arrow */}
                              <div
                                onClick={() => toggleSubService(service, sub)}
                                className="p-3 flex items-center justify-between gap-3 cursor-pointer"
                              >
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                  {/* Checkbox indicator */}
                                  <div
                                    className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 transition-colors ${
                                      selected
                                        ? 'bg-[#2DC55F] border-[#2DC55F] text-slate-950 font-black'
                                        : 'border-slate-300 bg-white'
                                    }`}
                                  >
                                    {selected && <Check className="w-3 h-3 stroke-[3]" />}
                                  </div>

                                  {/* Title (truncated when collapsed, full on expand) */}
                                  <span
                                    className={`text-xs sm:text-sm font-semibold ${
                                      isExpanded ? 'break-words leading-snug' : 'truncate'
                                    } ${selected ? 'text-slate-950 font-bold' : 'text-slate-800'}`}
                                  >
                                    {sub.name}
                                  </span>
                                </div>

                                {/* Arrow button to expand details & price */}
                                <button
                                  type="button"
                                  onClick={(e) => toggleSubServiceExpand(e, sub.id)}
                                  title={isExpanded ? 'Hide details & fee' : 'Show details & fee'}
                                  className={`p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-white/80 transition-all shrink-0 cursor-pointer ${
                                    isExpanded ? 'text-[#2DC55F] bg-white shadow-2xs rotate-180' : ''
                                  }`}
                                >
                                  <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                                </button>
                              </div>

                              {/* Expanded Details: Fee Badge & Full Description */}
                              {isExpanded && (
                                <div className="px-3 pb-3 pt-1 border-t border-slate-200/60 bg-white/60 space-y-2 animate-in fade-in slide-in-from-top-1 duration-150">
                                  <div className="flex items-center justify-between gap-2 pt-1">
                                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                      Fixed Fee Rate:
                                    </span>
                                    <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-900 shadow-2xs">
                                      {sub.formattedPrice}
                                    </span>
                                  </div>
                                  {sub.description && (
                                    <p className="text-[11px] text-slate-600 leading-relaxed">
                                      {sub.description}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Bottom link to service page */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span className="text-[11px] text-slate-400">
                          Standard CPA turnaround: 24–48 hrs
                        </span>
                        <Link
                          href={`/services/${service.slug}`}
                          className="text-xs font-bold text-slate-800 hover:text-[#2DC55F] transition-colors flex items-center gap-1"
                        >
                          <span>Full Scope Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredServices.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <Search className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800 text-base">No services matching &quot;{searchQuery}&quot;</h3>
              <p className="text-xs text-slate-500">Try searching for other terms like 1040, Wise, VAT, LLC, or NTN.</p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-[#2DC55F] hover:underline"
              >
                Clear search filter
              </button>
            </div>
          )}

          {/* ─── Floating / Sticky Live Quote Cart Summary ─── */}
          {selectedSubServices.length > 0 && (
            <div className="sticky bottom-6 z-40 bg-[#0c1a2e] text-white p-4 sm:p-5 rounded-2xl shadow-2xl border-2 border-[#2DC55F] flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-3 duration-200">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="w-10 h-10 rounded-xl bg-[#2DC55F] text-slate-950 font-black flex items-center justify-center text-sm shrink-0">
                  {selectedSubServices.length}
                </div>
                <div>
                  <div className="text-xs text-slate-300 font-semibold flex items-center gap-2">
                    <span>Selected Services Quote Basket</span>
                    <button
                      type="button"
                      onClick={() => setSelectedSubServices([])}
                      className="text-[10px] text-rose-400 hover:underline cursor-pointer"
                    >
                      (Clear All)
                    </button>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-[#2DC55F] tracking-tight">
                    Total Estimated Fee: {currentCurrency}{totalPrice.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <Link
                  href={`/contact?service=${encodeURIComponent(
                    selectedSubServices.map((s) => s.sub.name).join(', ')
                  )}`}
                  className="w-full md:w-auto py-3 px-6 rounded-xl bg-[#2DC55F] hover:bg-[#23a54e] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <span>Book Consultation With Selected ({currentCurrency}{totalPrice.toLocaleString()})</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
