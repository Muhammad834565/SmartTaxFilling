import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, ArrowRight, FileQuestion, HelpCircle, Compass, Sparkles } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | SMARTax Global',
  description: 'The requested page could not be found. Return to SMARTax Global homepage.',
};

export default function NotFound() {
  return (
    <div className="min-h-[85vh] bg-[#0c1a2e] text-white relative flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Honeycomb & Dot Grid Patterns */}
      <div className="absolute inset-0 inzofin-pattern-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07101e]/60 via-transparent to-[#07101e]/90 pointer-events-none" />

      {/* Ambient Glowing Emerald Light Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2DC55F]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#2DC55F]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
        
        {/* Honeycomb 404 Visual Cluster */}
        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-md h-64 sm:h-72">
            <svg
              viewBox="0 0 500 320"
              className="w-full h-full drop-shadow-[0_0_30px_rgba(45,197,95,0.25)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Circuit lines connecting honeycomb nodes */}
              <g stroke="#2DC55F" strokeWidth="1.2" strokeDasharray="4 4" strokeOpacity="0.4">
                <line x1="250" y1="160" x2="140" y2="160" />
                <line x1="250" y1="160" x2="360" y2="160" />
                <line x1="250" y1="160" x2="195" y2="65" />
                <line x1="250" y1="160" x2="305" y2="65" />
                <line x1="250" y1="160" x2="250" y2="265" />
              </g>

              {/* Top-Left Secondary Hexagon */}
              <g opacity="0.6">
                <polygon
                  points="195,30 225,48 225,82 195,100 165,82 165,48"
                  fill="#0c1d33"
                  stroke="#2DC55F"
                  strokeWidth="1.5"
                />
                <circle cx="195" cy="65" r="3" fill="#2DC55F" />
              </g>

              {/* Top-Right Secondary Hexagon */}
              <g opacity="0.6">
                <polygon
                  points="305,30 335,48 335,82 305,100 275,82 275,48"
                  fill="#0c1d33"
                  stroke="#2DC55F"
                  strokeWidth="1.5"
                />
                <circle cx="305" cy="65" r="3" fill="#2DC55F" />
              </g>

              {/* Left Flanking Hexagon */}
              <g opacity="0.8">
                <polygon
                  points="140,115 175,135 175,185 140,205 105,185 105,135"
                  fill="#0c1d33"
                  stroke="#2DC55F"
                  strokeWidth="2"
                />
                {/* Search / Question mark glyph */}
                <text
                  x="140"
                  y="167"
                  textAnchor="middle"
                  fill="#2DC55F"
                  fontSize="22"
                  fontWeight="bold"
                  opacity="0.85"
                >
                  ?
                </text>
              </g>

              {/* Right Flanking Hexagon */}
              <g opacity="0.8">
                <polygon
                  points="360,115 395,135 395,185 360,205 325,185 325,135"
                  fill="#0c1d33"
                  stroke="#2DC55F"
                  strokeWidth="2"
                />
                <text
                  x="360"
                  y="167"
                  textAnchor="middle"
                  fill="#2DC55F"
                  fontSize="22"
                  fontWeight="bold"
                  opacity="0.85"
                >
                  !
                </text>
              </g>

              {/* Bottom Decorative Hexagon */}
              <g opacity="0.5">
                <polygon
                  points="250,235 275,250 275,280 250,295 225,280 225,250"
                  fill="#0c1d33"
                  stroke="#2DC55F"
                  strokeWidth="1.5"
                />
              </g>

              {/* CENTRAL MAIN 404 HEXAGON */}
              <g>
                {/* Glow Filter Polygon */}
                <polygon
                  points="250,85 315,122.5 315,197.5 250,235 185,197.5 185,122.5"
                  fill="#071324"
                  stroke="#2DC55F"
                  strokeWidth="3.5"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                />

                {/* Inner Border Accent */}
                <polygon
                  points="250,95 305,127.5 305,192.5 250,225 195,192.5 195,127.5"
                  fill="none"
                  stroke="#2DC55F"
                  strokeWidth="1"
                  strokeOpacity="0.35"
                />

                {/* 404 Bold Text Centered in Hexagon */}
                <text
                  x="250"
                  y="173"
                  textAnchor="middle"
                  fill="url(#emeraldGrad)"
                  fontSize="46"
                  fontWeight="900"
                  letterSpacing="2"
                >
                  404
                </text>
              </g>

              {/* Gradients */}
              <defs>
                <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="45%" stopColor="#2DC55F" />
                  <stop offset="100%" stopColor="#23a54e" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Text Block */}
        <div className="space-y-4 max-w-2xl mx-auto">
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2DC55F]/10 border border-[#2DC55F]/30 text-[#2DC55F] text-xs font-black uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#2DC55F] animate-pulse" />
            <span>ERROR 404 // PAGE NOT FOUND</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Oops! This Node Doesn&apos;t Exist
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
            The link you followed may be broken, outdated, or the service route has been moved. Don&apos;t worry — our full suite of financial and tax services is right where you need it.
          </p>
        </div>

        {/* Action Buttons: Return Home & Explore Services */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {/* Primary Button: Go to Home Page */}
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#2DC55F] hover:bg-[#23a54e] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#2DC55F]/30 hover:shadow-xl hover:shadow-[#2DC55F]/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            <Home className="w-4 h-4 text-slate-950" />
            <span>Go Back To Home Page</span>
          </Link>

          {/* Secondary Button: Explore Services */}
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#0c1a2e]/90 hover:bg-[#122644] text-white border-2 border-slate-700 hover:border-[#2DC55F] font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer group"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4 text-[#2DC55F] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Quick Regional Links */}
        <div className="pt-6 border-t border-slate-800/80 max-w-lg mx-auto">
          <p className="text-xs text-slate-400 font-semibold mb-3">Popular Portals:</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <Link href="/services/bookkeeping-accounting-services" className="px-3 py-1.5 rounded-lg bg-slate-900/60 hover:bg-[#2DC55F]/20 text-slate-300 hover:text-white border border-slate-800 hover:border-[#2DC55F]/40 transition-colors">
              Bookkeeping (US)
            </Link>
            <Link href="/services/us-tax-compliance-filing-services" className="px-3 py-1.5 rounded-lg bg-slate-900/60 hover:bg-[#2DC55F]/20 text-slate-300 hover:text-white border border-slate-800 hover:border-[#2DC55F]/40 transition-colors">
              US Tax Compliance
            </Link>
            <Link href="/services/uk-company-formation-compliance-services" className="px-3 py-1.5 rounded-lg bg-slate-900/60 hover:bg-[#2DC55F]/20 text-slate-300 hover:text-white border border-slate-800 hover:border-[#2DC55F]/40 transition-colors">
              UK Company Formation
            </Link>
            <Link href="/services/fbr-tax-filing-ntn-registration-pakistan" className="px-3 py-1.5 rounded-lg bg-slate-900/60 hover:bg-[#2DC55F]/20 text-slate-300 hover:text-white border border-slate-800 hover:border-[#2DC55F]/40 transition-colors">
              Pakistan FBR Tax
            </Link>
            <Link href="/contact" className="px-3 py-1.5 rounded-lg bg-slate-900/60 hover:bg-[#2DC55F]/20 text-slate-300 hover:text-white border border-slate-800 hover:border-[#2DC55F]/40 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

