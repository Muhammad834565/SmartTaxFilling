import React from 'react';
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
  Check
} from 'lucide-react';
import { SERVICES } from '@/lib/data';

export default function ServicesPage() {
  const iconMap: Record<string, any> = {
    BookOpen,
    FileText,
    Rocket,
    ShoppingBag,
    Building,
    Truck,
    CreditCard,
    Landmark,
    Coins,
  };

  const usaServices = SERVICES.filter((s) => s.category === 'USA');
  const ukServices = SERVICES.filter((s) => s.category === 'UK');

  return (
    <div className="space-y-20 pb-20">
      {/* Inzofin Breadcrumb Header Banner */}
      <section className="bg-[#0c1a2e] text-white py-16 sm:py-20 border-b border-[#152c4e] relative overflow-hidden">
        <div className="absolute inset-0 inzofin-pattern-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 relative z-10">
          <div className="inzofin-section-subtitle justify-center text-[#2DC55F]">
            <span>// SERVICE DIRECTORY //</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Corporate Accounting, Taxation & Advisory Solutions
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 pt-2">
            <Link href="/" className="hover:text-[#2DC55F] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#2DC55F]">Services</span>
          </div>
        </div>
      </section>

      {/* USA Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
          <div>
            <div className="inzofin-section-subtitle text-[#2DC55F]">
              <span>// US JURISDICTION //</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c1e36]">USA Business & Tax Services</h2>
            <p className="text-xs text-slate-500">IRS compliance, state registrations, monthly bookkeeping, and multi-state nexus management.</p>
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3.5 py-1.5 rounded-full border border-emerald-300">
            {usaServices.length} Services
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {usaServices.map((service, index) => {
            const Icon = iconMap[service.icon] || BookOpen;

            return (
              <div
                key={service.slug}
                className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col justify-between card-hover group border-t-4 border-t-amber-500 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#2DC55F]/10 text-[#2DC55F] flex items-center justify-center group-hover:bg-[#2DC55F] group-hover:text-slate-950 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-400">0{index + 1}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0c1e36] mb-3 group-hover:text-[#2DC55F] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  <ul className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                    {service.features.slice(0, 4).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-[#2DC55F] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 font-medium">
                    {service.softwareTools.slice(0, 3).join(', ')}
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-bold text-[#0c1e36] group-hover:text-[#2DC55F] flex items-center gap-1 group-hover:translate-x-1 transition-all"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* UK Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
          <div>
            <div className="inzofin-section-subtitle text-[#2DC55F]">
              <span>// UK JURISDICTION //</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c1e36]">United Kingdom Services</h2>
            <p className="text-xs text-slate-500">Companies House incorporation, HMRC Corporation Tax (CT600), and Making Tax Digital (MTD) VAT filings.</p>
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3.5 py-1.5 rounded-full border border-emerald-300">
            {ukServices.length} Services
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ukServices.map((service, index) => {
            const Icon = iconMap[service.icon] || Landmark;

            return (
              <div
                key={service.slug}
                className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col justify-between card-hover group border-t-4 border-t-amber-500 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#2DC55F]/10 text-[#2DC55F] flex items-center justify-center group-hover:bg-[#2DC55F] group-hover:text-slate-950 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-400">0{index + 1}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0c1e36] mb-3 group-hover:text-[#2DC55F] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  <ul className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                    {service.features.slice(0, 4).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-[#2DC55F] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 font-medium">
                    {service.softwareTools.slice(0, 3).join(', ')}
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-bold text-[#0c1e36] group-hover:text-[#2DC55F] flex items-center gap-1 group-hover:translate-x-1 transition-all"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
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