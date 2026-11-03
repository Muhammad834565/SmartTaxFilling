import React, { Suspense } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SITE_INFO } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

function ContactFormWrapper({ searchParams }: { searchParams?: { service?: string; plan?: string } }) {
  const initial = searchParams?.service || (searchParams?.plan ? `${searchParams.plan} Plan` : '');
  return <ContactForm initialService={initial} />;
}

export default function ContactPage({
  searchParams,
}: {
  searchParams?: { service?: string; plan?: string };
}) {
  return (
    <div className="space-y-20 pb-20">
      {/* Inzofin Breadcrumb Header Banner */}
      <section className="bg-[#0c1a2e] text-white py-16 sm:py-20 border-b border-[#152c4e] relative overflow-hidden">
        <div className="absolute inset-0 inzofin-pattern-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 relative z-10">
          <div className="inzofin-section-subtitle justify-center text-[#2DC55F]">
            <span>// GET IN TOUCH //</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Connect With Our Financial & Tax Advisors
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 pt-2">
            <Link href="/" className="hover:text-[#2DC55F] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#2DC55F]">Contact</span>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0c1a2e] text-white rounded-2xl p-8 space-y-8 shadow-xl border-2 border-[#2DC55F]/40 relative overflow-hidden">
              <div className="absolute inset-0 inzofin-pattern-lines opacity-20 pointer-events-none" />

              <div className="relative z-10 space-y-2">
                <div className="inzofin-section-subtitle text-[#2DC55F]">
                  <span>// OFFICE DETAILS //</span>
                </div>
                <h2 className="text-2xl font-black text-white">Office Information</h2>
                <p className="text-xs text-slate-300">
                  We are available to assist your enterprise across all US and UK time zones.
                </p>
              </div>

              <div className="space-y-6 text-sm relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-[#2DC55F] flex items-center justify-center shrink-0 border border-white/15">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Main Office Address</div>
                    <div className="font-semibold text-white mt-0.5">{SITE_INFO.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-[#2DC55F] flex items-center justify-center shrink-0 border border-white/15">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Direct Phone Support</div>
                    <a href={SITE_INFO.whatsappUrl || `https://wa.me/19362206795`} target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:text-[#2DC55F] transition-colors mt-0.5 block">
                      {SITE_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-[#2DC55F] flex items-center justify-center shrink-0 border border-white/15">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Email Inquiries</div>
                    <a href={`mailto:${SITE_INFO.email}`} className="font-semibold text-white hover:text-[#2DC55F] transition-colors mt-0.5 block">
                      {SITE_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-[#2DC55F] flex items-center justify-center shrink-0 border border-white/15">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Hours of Operation</div>
                    <div className="font-semibold text-white mt-0.5">{SITE_INFO.workingHours}</div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-700/60 space-y-3 text-xs text-slate-300 relative z-10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2DC55F] shrink-0" />
                  <span>Rapid response within 24 business hours guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2DC55F] shrink-0" />
                  <span>Complimentary initial ledger & tax health audit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading form...</div>}>
              <ContactFormWrapper searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}