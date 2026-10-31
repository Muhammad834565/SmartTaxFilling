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
  Coins 
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
    <div className="py-16 space-y-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          Complete Service Directory
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Accounting, Taxation & Corporate Solutions
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Comprehensive compliance and financial management services tailored for businesses operating in the United States and the United Kingdom.
        </p>
      </section>

      {/* USA Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">USA Business & Tax Services</h2>
            <p className="text-xs text-slate-500">IRS compliance, state registrations, monthly bookkeeping, and multi-state nexus management.</p>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
            {usaServices.length} Services
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {usaServices.map((service) => {
            const Icon = iconMap[service.icon] || BookOpen;

            return (
              <div
                key={service.slug}
                className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between card-hover group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
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
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
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
            <h2 className="text-2xl font-bold text-slate-900">United Kingdom Services</h2>
            <p className="text-xs text-slate-500">Companies House incorporation, HMRC Corporation Tax (CT600), and Making Tax Digital (MTD) VAT filings.</p>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {ukServices.length} Services
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ukServices.map((service) => {
            const Icon = iconMap[service.icon] || Landmark;

            return (
              <div
                key={service.slug}
                className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between card-hover group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
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
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
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
        <div className="bg-slate-900 text-white rounded-3xl p-10 sm:p-14">
          <h2 className="text-3xl font-extrabold mb-4">Need a Custom Accounting Package?</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-8">
            Tell us about your multi-entity structure, software stack, or specific tax filings. We will craft a bespoke service agreement.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-8 py-4 rounded-xl transition-all"
          >
            <span>Request Tailored Proposal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
