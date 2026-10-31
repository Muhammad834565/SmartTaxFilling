import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SITE_INFO } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="relative h-12 w-48 bg-white/10 p-2 rounded-lg">
              <Image 
                src="/uploads/2025/11/logo-2.png" 
                alt="Smartax Books Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Smartax Books provides expert bookkeeping, corporate accounting, and US/UK tax compliance services. Helping startups, online businesses, and growing enterprises maintain financial precision and regulatory compliance globally.
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>IRS Registered Electronic Return Originator (ERO)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>HMRC Making Tax Digital (MTD) Recognized Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>QuickBooks Online & Xero Certified ProAdvisors</span>
              </div>
            </div>
          </div>

          {/* USA Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">USA Services</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/services/bookkeeping-accounting-services" className="hover:text-emerald-400 transition-colors">
                  Bookkeeping & Accounting
                </Link>
              </li>
              <li>
                <Link href="/services/us-tax-compliance-filing-services" className="hover:text-emerald-400 transition-colors">
                  US Tax Compliance (1040/1120/1065)
                </Link>
              </li>
              <li>
                <Link href="/services/startup-business-formation-usa" className="hover:text-emerald-400 transition-colors">
                  Startup Formation (LLC / EIN / BOI)
                </Link>
              </li>
              <li>
                <Link href="/services/e-commerce-accounting-tax-services-us" className="hover:text-emerald-400 transition-colors">
                  E-Commerce Accounting (Shopify/Amazon)
                </Link>
              </li>
              <li>
                <Link href="/services/payroll-tax-management" className="hover:text-emerald-400 transition-colors">
                  Payroll Tax Filings (941/940/W2)
                </Link>
              </li>
              <li>
                <Link href="/services/us-sales-use-tax-compliance" className="hover:text-emerald-400 transition-colors">
                  Multi-State Sales & Use Tax
                </Link>
              </li>
              <li>
                <Link href="/services/virtual-bank-accounts-payment-solutions" className="hover:text-emerald-400 transition-colors">
                  US Banking Setup (Mercury/Wise)
                </Link>
              </li>
            </ul>
          </div>

          {/* UK Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">UK Services</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/services/uk-company-formation-compliance-services" className="hover:text-emerald-400 transition-colors">
                  UK Ltd Company Formation
                </Link>
              </li>
              <li>
                <Link href="/services/uk-tax-compliance-filing-services" className="hover:text-emerald-400 transition-colors">
                  Corporation Tax (CT600) & Accounts
                </Link>
              </li>
              <li>
                <Link href="/services/uk-vat-registration-compliance" className="hover:text-emerald-400 transition-colors">
                  UK VAT Registration & MTD Returns
                </Link>
              </li>
              <li>
                <Link href="/services/bookkeeping-accounting-services" className="hover:text-emerald-400 transition-colors">
                  UK Statutory Management Accounts
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-emerald-400 transition-colors">
                  Pricing & Monthly Packages
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-400 transition-colors">
                  Accounting & Tax Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Get In Touch</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{SITE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${SITE_INFO.phone}`} className="hover:text-emerald-400 transition-colors">
                  {SITE_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${SITE_INFO.email}`} className="hover:text-emerald-400 transition-colors">
                  {SITE_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{SITE_INFO.workingHours}</span>
              </div>

              <div className="pt-3">
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
                >
                  <span>Request a Callback</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Smartax Books. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms-and-conditions" className="hover:text-slate-400 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy-policy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
