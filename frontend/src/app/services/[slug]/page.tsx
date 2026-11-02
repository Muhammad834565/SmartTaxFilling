import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Cpu, 
  FileCheck2, 
  CalendarClock,
  Check
} from 'lucide-react';
import { Metadata } from 'next';
import { SERVICES } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return { title: 'Service Not Found | Smartax Books' };
  return {
    title: `${service.title} | Smartax Books`,
    description: service.shortDescription,
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = SERVICES.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
    return null;
  }

  return (
    <div className="space-y-16 pb-20">
      {/* Inzofin Breadcrumb Header Banner */}
      <section className="bg-[#0c1e36] text-white py-16 sm:py-20 border-b border-[#152c4e] relative overflow-hidden">
        <div className="absolute inset-0 inzofin-pattern-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-amber-400 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-amber-400 truncate max-w-xs">{service.title}</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="inzofin-section-subtitle text-amber-400">
              <span>// {service.category} SERVICE SPECIALIZATION //</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {service.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Details on Left, Contact/Booking Form on Right */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-10">
            {/* Overview */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4 border-t-4 border-t-amber-500">
              <div className="inzofin-section-subtitle text-amber-600">
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
                <FileCheck2 className="w-5 h-5 text-amber-500" />
                <span>Scope of Work & Deliverables</span>
              </h2>

              <ul className="grid grid-cols-1 gap-3.5">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700">
                    <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Software Stack & Tools */}
            <div className="bg-[#0c1e36] text-white rounded-2xl p-8 border-2 border-amber-500/40 shadow-xl space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <Cpu className="w-5 h-5 text-amber-400" />
                <span>Supported Software & Platforms</span>
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                We integrate seamlessly with your existing tech stack or help you migrate to optimal accounting systems:
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                {service.softwareTools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="bg-white/10 border border-white/20 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-lg"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Workflow / Onboarding Steps */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-[#0c1e36] flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-amber-500" />
                <span>How Our Engagement Works</span>
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div>
                    <span className="font-bold text-[#0c1e36]">Discovery Call & Scope Definition: </span>
                    We review your previous filings, transaction volume, and key compliance requirements.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-[#0c1e36]">Secure Onboarding & System Setup: </span>
                    We establish view-only bank connections or configure your company portal with 256-bit encryption.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div>
                    <span className="font-bold text-[#0c1e36]">Execution, Reconciliations & Filing: </span>
                    Our team executes monthly closings or submits tax returns directly with IRS or HMRC electronically.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Inquiry Sticky Card */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
              <div className="mb-6 space-y-2">
                <div className="inzofin-section-subtitle text-amber-600">
                  <span>// GET STARTED //</span>
                </div>
                <h3 className="text-lg font-bold text-[#0c1e36]">
                  Request Consultation For This Service
                </h3>
                <p className="text-xs text-slate-500">
                  Get a personalized quotation or speak directly with an advisor regarding {service.title}.
                </p>
              </div>

              <ContactForm initialService={service.title} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}