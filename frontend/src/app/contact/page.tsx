import React, { Suspense } from 'react';
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
    <div className="py-16 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          Get In Touch
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Connect With Smartax Books
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Connect with Smartax for tailored financial solutions, expert guidance, and dedicated support to streamline your business operations, enhance growth, and ensure long-term success.
        </p>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-8 shadow-xl">
              <div>
                <h2 className="text-2xl font-bold mb-2">Office Information</h2>
                <p className="text-xs text-slate-400">
                  We are here to assist your company across all US and UK time zones.
                </p>
              </div>

              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Main Office Address</div>
                    <div className="font-semibold text-white mt-0.5">{SITE_INFO.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Phone Support</div>
                    <a href={`tel:${SITE_INFO.phone}`} className="font-semibold text-white hover:text-emerald-400 transition-colors mt-0.5 block">
                      {SITE_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Email Inquiries</div>
                    <a href={`mailto:${SITE_INFO.email}`} className="font-semibold text-white hover:text-emerald-400 transition-colors mt-0.5 block">
                      {SITE_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Hours of Operation</div>
                    <div className="font-semibold text-white mt-0.5">{SITE_INFO.workingHours}</div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 space-y-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Rapid response within 24 business hours guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
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
