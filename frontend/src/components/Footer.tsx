'use client';

import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowRight
} from 'lucide-react';
import { SITE_INFO } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-[#0c1a2e] text-slate-300 relative">
      {/* 3 Top Contact Cards Strip */}
      <div className="border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Address */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#10223b]/60 border border-slate-800">
              <div className="w-12 h-12 rounded-lg bg-[#10b981] text-white flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="text-xs">
                <div className="text-slate-400 font-semibold">Our Office Location</div>
                <div className="text-white font-bold mt-0.5">{SITE_INFO.address}</div>
              </div>
            </div>

            {/* Card 2: Email */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#10223b]/60 border border-slate-800">
              <div className="w-12 h-12 rounded-lg bg-[#10b981] text-white flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="text-xs">
                <div className="text-slate-400 font-semibold">Send Us An Email</div>
                <a href={`mailto:${SITE_INFO.email}`} className="text-white font-bold hover:text-emerald-400 mt-0.5 block">
                  {SITE_INFO.email}
                </a>
              </div>
            </div>

            {/* Card 3: Phone (Vibrant green container) */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#10b981] text-white">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center shrink-0 text-white">
                <Phone className="w-6 h-6" />
              </div>
              <div className="text-xs">
                <div className="text-white/80 font-semibold">Have Any Question? Call</div>
                <a href={`tel:${SITE_INFO.phone}`} className="text-white font-black text-sm mt-0.5 block hover:underline">
                  {SITE_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-2 font-black text-2xl text-white tracking-tight">
                <span className="w-7 h-7 bg-[#10b981] rounded-sm flex items-center justify-center text-white text-base">
                  ◈
                </span>
                <span>inzofin<span className="text-[#10b981]">.</span></span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              We provide comprehensive business accounting, corporate tax compliance, and financial consulting to empower enterprises worldwide with confidence.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2 pt-2">
              <a href="#" className="w-8 h-8 rounded-sm bg-[#10223b] flex items-center justify-center text-slate-300 hover:bg-[#10b981] hover:text-white transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-sm bg-[#10223b] flex items-center justify-center text-slate-300 hover:bg-[#10b981] hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-sm bg-[#10223b] flex items-center justify-center text-slate-300 hover:bg-[#10b981] hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-sm bg-[#10223b] flex items-center justify-center text-slate-300 hover:bg-[#10b981] hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Col 2: Our Services (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wide">Our Services</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Bookkeeping & Accounting</Link></li>
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Tax Advisory & Strategy</Link></li>
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Corporate Compliance</Link></li>
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Investment Planning</Link></li>
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Business Formations</Link></li>
            </ul>
          </div>

          {/* Col 3: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wide">Useful Links</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/about-us" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Our Services</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-400 transition-colors">Pricing Plan</Link></li>
              <li><Link href="/blog" className="hover:text-emerald-400 transition-colors">Latest News</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter Subscription (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wide">Subscribe Us</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sign up for our weekly financial advice newsletter and stay informed of upcoming corporate tax deadlines.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter Email Address"
                className="bg-[#10223b] text-xs px-3.5 py-3 rounded-md text-white border border-slate-700 focus:outline-none focus:border-emerald-500 w-full"
              />
              <button 
                type="submit" 
                className="bg-[#10b981] hover:bg-[#059669] text-white px-5 py-3 rounded-md text-xs font-bold uppercase transition-colors shrink-0"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        Copyright © {new Date().getFullYear()} Inzofin. All Rights Reserved.
      </div>
    </footer>
  );
}