'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  FileText,
  BookOpen,
  Building2,
  Receipt,
  Users,
  Globe,
  TrendingUp,
  Award,
  ExternalLink
} from 'lucide-react';

interface HexService {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  icon: React.ElementType;
  tag: string;
  x: number; // percentage in viewBox
  y: number;
}

const HEX_NODES: HexService[] = [
  {
    id: 'center',
    title: 'GLOBAL COMPLIANCE',
    subtitle: 'US • UK • PK Standards',
    slug: 'us-tax-compliance-filing-services',
    icon: Globe,
    tag: 'Core Hub',
    x: 50,
    y: 50,
  },
  {
    id: 'top',
    title: 'TAX ADVISORY',
    subtitle: 'IRS 1040 / 1120 / 5472',
    slug: 'us-tax-compliance-filing-services',
    icon: FileText,
    tag: 'USA Federal & State',
    x: 50,
    y: 20,
  },
  {
    id: 'top-right',
    title: 'BOOKKEEPING',
    subtitle: 'QuickBooks & Xero Elite',
    slug: 'bookkeeping-accounting-services',
    icon: BookOpen,
    tag: 'Monthly Reconciliations',
    x: 75,
    y: 35.5,
  },
  {
    id: 'bottom-right',
    title: 'BUSINESS SETUP',
    subtitle: 'US LLC & Startup Hub',
    slug: 'startup-business-formation-usa',
    icon: Building2,
    tag: 'Formation & EIN',
    x: 75,
    y: 64.5,
  },
  {
    id: 'bottom',
    title: 'FBR & SECP',
    subtitle: 'Pakistan NTN & Filing',
    slug: 'fbr-tax-filing-ntn-registration-pakistan',
    icon: Receipt,
    tag: 'Active Taxpayer (ATL)',
    x: 50,
    y: 80,
  },
  {
    id: 'bottom-left',
    title: 'UK VAT & MTD',
    subtitle: 'HMRC CT600 & Returns',
    slug: 'uk-vat-registration-compliance',
    icon: Receipt,
    tag: 'Companies House',
    x: 25,
    y: 64.5,
  },
  {
    id: 'top-left',
    title: 'PAYROLL & HR',
    subtitle: 'Form 941 & PAYE Taxes',
    slug: 'payroll-tax-management',
    icon: Users,
    tag: 'Direct Deposit & W-2',
    x: 25,
    y: 35.5,
  },
];

export default function HoneycombHero() {
  const [hoveredHex, setHoveredHex] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[540px] sm:h-[580px] lg:h-[620px] flex items-center justify-center select-none overflow-hidden">
      {/* ─── Ambient Glow Layers & Background Grid ──────────────────── */}
      <div className="absolute inset-0 bg-[#071324]/85 rounded-3xl border border-[#2DC55F]/30 backdrop-blur-md overflow-hidden shadow-2xl shadow-[#071324]/90">
        {/* Radial Neon Core Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-[#2DC55F]/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-[#2DC55F]/35 rounded-full blur-[60px] pointer-events-none" />

        {/* High-Tech Circuit Board SVG Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2DC55F" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#2DC55F" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2DC55F" stopOpacity="0.2" />
            </linearGradient>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Circuit Lines connecting from center out to corners */}
          <path
            d="M 50% 50% L 50% 12% L 20% 12% M 50% 50% L 80% 12% M 50% 50% L 80% 88% M 50% 50% L 20% 88%"
            stroke="url(#circuitGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="none"
          />
          <path
            d="M 12% 35.5% L 25% 35.5% M 88% 35.5% L 75% 35.5% M 12% 64.5% L 25% 64.5% M 88% 64.5% L 75% 64.5%"
            stroke="#2DC55F"
            strokeWidth="1.2"
            strokeOpacity="0.5"
            fill="none"
          />
          <circle cx="12%" cy="35.5%" r="3.5" fill="#2DC55F" filter="url(#neonGlow)" />
          <circle cx="88%" cy="35.5%" r="3.5" fill="#2DC55F" filter="url(#neonGlow)" />
          <circle cx="12%" cy="64.5%" r="3.5" fill="#2DC55F" filter="url(#neonGlow)" />
          <circle cx="88%" cy="64.5%" r="3.5" fill="#2DC55F" filter="url(#neonGlow)" />
        </svg>

        {/* ─── Satellite HUD Cards ────────────────────────────────────── */}
        {/* Top-Left HUD */}
        <div className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-[#0a182b]/90 border border-[#2DC55F]/40 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl backdrop-blur-md shadow-lg shadow-[#2DC55F]/10 flex items-center gap-2.5 z-20">
          <div className="w-7 h-7 rounded-lg bg-[#2DC55F]/20 text-[#2DC55F] flex items-center justify-center border border-[#2DC55F]/30">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[9px] sm:text-[10px] uppercase font-extrabold text-[#2DC55F] tracking-wider">US Tax Advisory</div>
            <div className="text-[10px] sm:text-[11px] font-bold text-white">Federal & State Filings</div>
          </div>
        </div>

        {/* Top-Right HUD */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-[#0a182b]/90 border border-[#2DC55F]/40 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl backdrop-blur-md shadow-lg shadow-[#2DC55F]/10 flex items-center gap-2.5 z-20">
          <div className="w-7 h-7 rounded-lg bg-[#2DC55F]/20 text-[#2DC55F] flex items-center justify-center border border-[#2DC55F]/30">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[9px] sm:text-[10px] uppercase font-extrabold text-[#2DC55F] tracking-wider">UK & Global Tax</div>
            <div className="text-[10px] sm:text-[11px] font-bold text-white">HMRC & Cross-Border Hub</div>
          </div>
        </div>
      </div>

      {/* ─── Honeycomb Cluster Container ──────────────────────────────── */}
      <div className="relative w-full max-w-[460px] h-[460px] flex items-center justify-center z-10">
        {HEX_NODES.map((node) => {
          const Icon = node.icon;
          const isCenter = node.id === 'center';
          const isHovered = hoveredHex === node.id;

          return (
            <Link
              key={node.id}
              href={`/services/${node.slug}`}
              onMouseEnter={() => setHoveredHex(node.id)}
              onMouseLeave={() => setHoveredHex(null)}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
              title={`Click to view ${node.title} service`}
              className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 ease-out ${
                /* USER REQUEST: "when i hower on it create zoom out effect" -> zoom-out / scale down */
                isHovered
                  ? 'scale-90 z-30'
                  : hoveredHex
                  ? 'scale-95 opacity-85 z-10'
                  : 'scale-100 z-20 hover:scale-90'
              }`}
            >
              {/* Outer Hexagon Shape */}
              <div
                className={`relative w-28 h-32 sm:w-32 sm:h-36 flex items-center justify-center transition-all duration-300 drop-shadow-xl ${
                  isCenter ? 'sm:w-36 sm:h-40' : ''
                }`}
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              >
                {/* Hexagon Border Glow Frame */}
                <div
                  className={`absolute inset-0 transition-all duration-300 ${
                    isCenter
                      ? isHovered
                        ? 'bg-[#2DC55F] shadow-[0_0_35px_#2DC55F]'
                        : 'bg-gradient-to-b from-[#2DC55F] to-[#1a6e38]'
                      : isHovered
                      ? 'bg-[#2DC55F] shadow-[0_0_30px_#2DC55F]'
                      : 'bg-gradient-to-b from-[#2DC55F]/60 via-[#163a56] to-[#0c1e36]'
                  }`}
                />

                {/* Inner Hexagon Fill / Content Container */}
                <div
                  className={`absolute inset-[2.5px] transition-all duration-300 flex flex-col items-center justify-center p-2 text-center ${
                    isCenter
                      ? isHovered
                        ? 'bg-[#0b2416]'
                        : 'bg-[#081b2f]'
                      : isHovered
                      ? 'bg-[#082218]'
                      : 'bg-[#091829]'
                  }`}
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                >
                  {/* Hexagon Circuit Pattern Texture */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#2DC55F_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />

                  {/* Icon with Glowing Pulse */}
                  <div
                    className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center mb-1.5 transition-transform duration-300 ${
                      isHovered ? 'scale-110' : ''
                    } ${
                      isCenter
                        ? 'bg-[#2DC55F] text-slate-950 shadow-md shadow-[#2DC55F]/40'
                        : 'bg-[#2DC55F]/15 text-[#2DC55F] border border-[#2DC55F]/40'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    {isHovered && (
                      <span className="absolute inset-0 rounded-full bg-[#2DC55F] animate-ping opacity-35" />
                    )}
                  </div>

                  {/* Node Title */}
                  <span
                    className={`text-[9.5px] sm:text-[11px] font-black uppercase tracking-tight leading-tight transition-colors duration-200 ${
                      isCenter
                        ? 'text-[#2DC55F]'
                        : isHovered
                        ? 'text-[#2DC55F]'
                        : 'text-white'
                    }`}
                  >
                    {node.title}
                  </span>

                  {/* Short Subtitle */}
                  <span className="text-[8px] sm:text-[9px] text-slate-300 font-medium tracking-tight line-clamp-1 mt-0.5 max-w-[85%]">
                    {node.subtitle}
                  </span>

                  {/* Click Redirect Indicator on Hover */}
                  <div
                    className={`mt-1 flex items-center gap-0.5 text-[8px] font-bold text-[#2DC55F] transition-opacity duration-200 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <span>EXPLORE</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
