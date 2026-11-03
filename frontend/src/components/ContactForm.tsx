'use client';

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitInquiry } from '@/lib/api';
import { SERVICES } from '@/lib/data';

interface ContactFormProps {
  initialService?: string;
}

// Map service category to country select value
const CATEGORY_TO_COUNTRY: Record<string, string> = {
  USA: 'United States',
  UK: 'United Kingdom',
  Pakistan: 'Pakistan',
  General: '',
};

// Map country select value to service category filter
const COUNTRY_TO_CATEGORY: Record<string, string> = {
  'United States': 'USA',
  'United Kingdom': 'UK',
  Pakistan: 'Pakistan',
};

export default function ContactForm({ initialService = '' }: ContactFormProps) {
  // Derive initial country from initialService if provided
  const getInitialCountry = (svc: string) => {
    if (!svc) return '';
    const match = SERVICES.find((s) => s.title === svc);
    if (!match) return '';
    return CATEGORY_TO_COUNTRY[match.category] ?? '';
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: getInitialCountry(initialService),
    service: initialService,
    message: '',
  });

  // When initialService changes (e.g. from URL params), sync both service + country
  useEffect(() => {
    if (initialService) {
      const country = getInitialCountry(initialService);
      setFormData((prev) => ({ ...prev, service: initialService, country }));
    }
  }, [initialService]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Services filtered by selected country
  const filteredServices =
    formData.country && COUNTRY_TO_CATEGORY[formData.country]
      ? SERVICES.filter((s) => s.category === COUNTRY_TO_CATEGORY[formData.country])
      : SERVICES;

  // When user changes the SERVICE → auto-update country
  const handleServiceChange = (title: string) => {
    const match = SERVICES.find((s) => s.title === title);
    const country = match ? (CATEGORY_TO_COUNTRY[match.category] ?? formData.country) : formData.country;
    setFormData((prev) => ({ ...prev, service: title, country }));
  };

  // When user changes the COUNTRY → clear service if it doesn't belong to that country
  const handleCountryChange = (country: string) => {
    const cat = COUNTRY_TO_CATEGORY[country];
    const currentMatch = SERVICES.find((s) => s.title === formData.service);
    const serviceStillValid = !cat || (currentMatch && currentMatch.category === cat);
    setFormData((prev) => ({
      ...prev,
      country,
      service: serviceStillValid ? prev.service : '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await submitInquiry(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', country: '', service: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'There was an issue submitting your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-8 text-center animate-in fade-in duration-200">
        <div className="w-12 h-12 bg-emerald-100 text-[#2DC55F] rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-300">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-[#0c1e36] mb-2">Consultation Request Received!</h3>
        <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
          Thank you for reaching out to SMARTax Global. One of our certified tax advisors will review your business requirements and contact you within 24 business hours.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-[#2DC55F] hover:bg-[#23a54e] px-5 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-5">
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#0c1e36] mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#2DC55F] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#0c1e36] mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#2DC55F] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#0c1e36] mb-1.5">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#2DC55F] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#0c1e36] mb-1.5">Country / Region</label>
          <select
            value={formData.country}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#2DC55F] transition-colors bg-white font-medium text-slate-800"
          >
            <option value="">— Select Country —</option>
            <option value="United States">🇺🇸 United States</option>
            <option value="United Kingdom">🇬🇧 United Kingdom</option>
            <option value="Pakistan">🇵🇰 Pakistan</option>
            <option value="Canada">Canada</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="Other">Other International</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#0c1e36] mb-1.5">
          Service Required
          {formData.country && COUNTRY_TO_CATEGORY[formData.country] && (
            <span className="ml-2 normal-case font-normal text-[#2DC55F]">
              — showing {formData.country} services
            </span>
          )}
        </label>
        <select
          value={formData.service}
          onChange={(e) => handleServiceChange(e.target.value)}
          className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#2DC55F] transition-colors bg-white font-medium text-slate-800"
        >
          <option value="">Select a service (Optional)</option>
          {filteredServices.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#0c1e36] mb-1.5">
          Tell us about your requirements <span className="text-rose-500">*</span>
        </label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Briefly describe your business entity (LLC, C-Corp, Ltd), monthly transaction volume, or target filing deadlines..."
          className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#2DC55F] transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#2DC55F] hover:bg-[#23a54e] disabled:bg-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting To Advisor...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit Consultation Request</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-center text-slate-500">
        🔒 All communications are protected under strict CPA confidentiality and IRS/HMRC compliance standards.
      </p>
    </form>
  );
}
