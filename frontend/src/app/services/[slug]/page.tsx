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
  CalendarClock 
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
    <div className="py-12 space-y-16">
      {/* Top Breadcrumb & Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </Link>
        </div>

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <span>{service.category} Specialization</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {service.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* Main Grid: Details on Left, Contact/Booking Form on Right */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-10">
            {/* Overview */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Service Overview</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            {/* Key Deliverables */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-emerald-600" />
                <span>Scope of Work & Deliverables</span>
              </h2>

              <ul className="grid grid-cols-1 gap-3.5">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Software Stack & Tools */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <Cpu className="w-5 h-5 text-emerald-400" />
                <span>Supported Software & Platforms</span>
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                We integrate seamlessly with your existing tech stack or help you migrate to optimal accounting systems:
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                {service.softwareTools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-800 border border-slate-700 text-emerald-300 text-xs font-semibold px-3.5 py-1.5 rounded-lg"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Workflow / Onboarding Steps */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-emerald-600" />
                <span>How Our Engagement Works</span>
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Discovery Call & Scope Definition: </span>
                    We review your previous filings, transaction volume, and key compliance requirements.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Secure Onboarding & System Setup: </span>
                    We establish view-only bank connections or configure your company portal with 256-bit encryption.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Execution, Reconciliations & Filing: </span>
                    Our team executes monthly closings or submits tax returns directly with IRS or HMRC electronically.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Inquiry Sticky Card */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
              <div className="mb-6 space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  Request Consultation for This Service
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
