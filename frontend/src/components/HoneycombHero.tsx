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
  cx: number;
  cy: number;
}

// Exact regular hexagonal tiling math (flat top & bottom):
// R = 90, h = (sqrt(3)/2)*90 = 77.942
// Centers:
// Center: (300, 260)
// Top: (300, 260 - 2*h) = (300, 104.1)
// Bottom: (300, 260 + 2*h) = (300, 415.9)
// Top-Right: (300 + 1.5*R, 260 - h) = (435, 182.1)
// Bottom-Right: (300 + 1.5*R, 260 + h) = (435, 337.9)
// Bottom-Left: (300 - 1.5*R, 260 + h) = (165, 337.9)
// Top-Left: (300 - 1.5*R, 260 - h) = (165, 182.1)

const R = 86; // Hexagon radius
const H = (Math.sqrt(3) / 2) * R; // 74.47px

const HEX_SERVICES: HexService[] = [
  {
    id: 'center',
    title: 'COMPLIANCE',
    subtitle: 'Global Standards',
    slug: 'us-tax-compliance-filing-services',
    icon: Globe,
    tag: 'Core Hub',
    cx: 300,
    cy: 260,
  },
  {
    id: 'top',
    title: 'TAX ADVISORY',
    subtitle: 'IRS 1040 / 1120 / 5472',
    slug: 'us-tax-compliance-filing-services',
    icon: FileText,
    tag: 'Federal & State',
    cx: 300,
    cy: 104.1,
  },
  {
    id: 'top-right',
    title: 'BOOKKEEPING',
    subtitle: 'QuickBooks & Xero',
    slug: 'bookkeeping-accounting-services',
    icon: BookOpen,
    tag: 'Reconciliations',
    cx: 435,
    cy: 182.1,
  },
  {
    id: 'bottom-right',
    title: 'BUSINESS SETUP',
    subtitle: 'US LLC & Startup Hub',
    slug: 'startup-business-formation-usa',
    icon: Building2,
    tag: 'Incorporation',
    cx: 435,
    cy: 337.9,
  },
  {
    id: 'bottom',
    title: 'FBR & SECP',
    subtitle: 'Pakistan NTN & Filing',
    slug: 'fbr-tax-filing-ntn-registration-pakistan',
    icon: Receipt,
    tag: 'Active Taxpayer',
    cx: 300,
    cy: 415.9,
  },
  {
    id: 'bottom-left',
    title: 'UK VAT & MTD',
    subtitle: 'HMRC CT600 & Returns',
    slug: 'uk-vat-registration-compliance',
    icon: Receipt,
    tag: 'Companies House',
    cx: 165,
    cy: 337.9,
  },
  {
    id: 'top-left',
    title: 'PAYROLL & HR',
    subtitle: 'Form 941 & PAYE',
    slug: 'payroll-tax-management',
    icon: Users,
    tag: 'Payroll Filing',
    cx: 165,
    cy: 182.1,
  },
];

// Helper to compute SVG points string for a hexagon with flat top & bottom
function getHexPoints(cx: number, cy: number, r: number): string {
  const h = (Math.sqrt(3) / 2) * r;
  return [
    `${cx + r},${cy}`,
    `${cx + r / 2},${cy - h}`,
    `${cx - r / 2},${cy - h}`,
    `${cx - r},${cy}`,
    `${cx - r / 2},${cy + h}`,
    `${cx + r / 2},${cy + h}`,
  ].join(' ');
}

export default function HoneycombHero() {
  const [hoveredHex, setHoveredHex] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[540px] sm:h-[580px] lg:h-[620px] flex items-center justify-center select-none overflow-hidden">
      {/* ─── Ambient Glow Layers & Background Grid ──────────────────── */}
      <div className="absolute inset-0 bg-[#071324]/90 rounded-3xl border border-[#2DC55F]/30 backdrop-blur-md overflow-hidden shadow-2xl shadow-[#071324]/90">
        {/* Radial Neon Core Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[#2DC55F]/15 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-[#2DC55F]/25 rounded-full blur-[60px] pointer-events-none" />

        {/* ─── Top Corner HUD Cards ───────────────────────────────────── */}
        <div className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-[#0a182b]/90 border border-[#2DC55F]/40 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl backdrop-blur-md shadow-lg shadow-[#2DC55F]/10 flex items-center gap-2.5 z-20">
          <div className="w-7 h-7 rounded-lg bg-[#2DC55F]/20 text-[#2DC55F] flex items-center justify-center border border-[#2DC55F]/30">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[9px] sm:text-[10px] uppercase font-extrabold text-[#2DC55F] tracking-wider">US Tax Advisory</div>
            <div className="text-[10px] sm:text-[11px] font-bold text-white">Federal & State Filings</div>
          </div>
        </div>

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

      {/* ─── Perfect Interlocking SVG Honeycomb ───────────────────────── */}
      <div className="relative w-full max-w-[560px] h-full flex items-center justify-center z-10 p-2">
        <svg
          viewBox="0 0 600 520"
          className="w-full h-full max-h-[520px] drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Glowing neon filters */}
            <filter id="hexGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="intenseGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur1" />
              <feGaussianBlur stdDeviation="12" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Circuit trace gradients */}
            <linearGradient id="circuitLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2DC55F" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#2DC55F" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2DC55F" stopOpacity="0.1" />
            </linearGradient>

            {/* Base tile gradient */}
            <linearGradient id="tileBgNormal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0a1d33" />
              <stop offset="100%" stopColor="#061221" />
            </linearGradient>
            <linearGradient id="tileBgCenter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0d2642" />
              <stop offset="100%" stopColor="#081729" />
            </linearGradient>
            <linearGradient id="tileBgHover" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0e3020" />
              <stop offset="100%" stopColor="#091f14" />
            </linearGradient>
          </defs>

          {/* ── Outer High-Tech Circuit Tracks ──────────────────────── */}
          <g opacity="0.6">
            <path
              d="M 300 260 L 300 25 L 80 25 M 300 260 L 520 25 M 300 260 L 520 495 M 300 260 L 300 495 L 80 495"
              stroke="url(#circuitLineGrad)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              fill="none"
            />
            <path
              d="M 40 182 L 165 182 M 560 182 L 435 182 M 40 338 L 165 338 M 560 338 L 435 338"
              stroke="#2DC55F"
              strokeWidth="1"
              strokeOpacity="0.4"
              fill="none"
            />
            <circle cx="40" cy="182" r="3" fill="#2DC55F" filter="url(#hexGlow)" />
            <circle cx="560" cy="182" r="3" fill="#2DC55F" filter="url(#hexGlow)" />
            <circle cx="40" cy="338" r="3" fill="#2DC55F" filter="url(#hexGlow)" />
            <circle cx="560" cy="338" r="3" fill="#2DC55F" filter="url(#hexGlow)" />
          </g>

          {/* ── Background Shared Honeycomb Grid Outline (Joints) ───── */}
          <g stroke="#2DC55F" strokeWidth="2.5" strokeOpacity="0.35" fill="none">
            {HEX_SERVICES.map((node) => (
              <polygon
                key={`wireframe-${node.id}`}
                points={getHexPoints(node.cx, node.cy, R + 1)}
              />
            ))}
          </g>

          {/* ── Interactive Interlocking Honeycomb Cells ─────────────── */}
          {HEX_SERVICES.map((node) => {
            const Icon = node.icon;
            const isCenter = node.id === 'center';
            const isHovered = hoveredHex === node.id;
            const tileR = R - 1.5; // Seamless snug fit with 3px seam

            return (
              <Link
                key={node.id}
                href={`/services/${node.slug}`}
                passHref
                legacyBehavior
              >
                <g
                  onMouseEnter={() => setHoveredHex(node.id)}
                  onMouseLeave={() => setHoveredHex(null)}
                  className="cursor-pointer group"
                  style={{
                    transformOrigin: `${node.cx}px ${node.cy}px`,
                    transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease',
                    /* USER REQUEST: "when i hower on it create zoom out effect" -> scale-90 */
                    transform: isHovered
                      ? 'scale(0.88)'
                      : hoveredHex
                      ? 'scale(0.97)'
                      : 'scale(1)',
                  }}
                >
                  {/* Hexagon Body Polygon */}
                  <polygon
                    points={getHexPoints(node.cx, node.cy, tileR)}
                    fill={
                      isHovered
                        ? 'url(#tileBgHover)'
                        : isCenter
                        ? 'url(#tileBgCenter)'
                        : 'url(#tileBgNormal)'
                    }
                    stroke={
                      isHovered
                        ? '#2DC55F'
                        : isCenter
                        ? '#2DC55F'
                        : '#1e486b'
                    }
                    strokeWidth={isHovered ? 3.5 : isCenter ? 2.5 : 1.8}
                    filter={isHovered ? 'url(#intenseGlow)' : isCenter ? 'url(#hexGlow)' : undefined}
                    className="transition-all duration-300"
                  />

                  {/* Inner Decorative Micro-Border for High-Tech Fintech Look */}
                  <polygon
                    points={getHexPoints(node.cx, node.cy, tileR - 6)}
                    fill="none"
                    stroke="#2DC55F"
                    strokeWidth="0.8"
                    strokeDasharray="8 6"
                    strokeOpacity={isHovered ? 0.7 : isCenter ? 0.4 : 0.2}
                    className="transition-all duration-300"
                  />

                  {/* Content Container (ForeignObject for rich HTML icons and text) */}
                  <foreignObject
                    x={node.cx - (tileR - 8)}
                    y={node.cy - (tileR - 8)}
                    width={(tileR - 8) * 2}
                    height={(tileR - 8) * 2}
                    className="pointer-events-none"
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center select-none">
                      {/* Icon with glowing badge */}
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-1 transition-all duration-300 ${
                          isHovered
                            ? 'bg-[#2DC55F] text-slate-950 shadow-md shadow-[#2DC55F]/50 scale-110'
                            : isCenter
                            ? 'bg-[#2DC55F] text-slate-950 shadow-md shadow-[#2DC55F]/30'
                            : 'bg-[#2DC55F]/15 text-[#2DC55F] border border-[#2DC55F]/40'
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>

                      {/* Title */}
                      <span
                        className={`text-[10px] sm:text-[11px] font-black uppercase tracking-tight leading-tight transition-colors duration-200 ${
                          isHovered
                            ? 'text-[#2DC55F]'
                            : isCenter
                            ? 'text-[#2DC55F]'
                            : 'text-white'
                        }`}
                      >
                        {node.title}
                      </span>

                      {/* Subtitle */}
                      <span className="text-[8.5px] sm:text-[9.5px] text-slate-300 font-medium tracking-tight line-clamp-1 mt-0.5">
                        {node.subtitle}
                      </span>

                      {/* Explore Action Prompt on Hover */}
                      <div
                        className={`mt-1 flex items-center gap-1 text-[8.5px] font-bold text-[#2DC55F] transition-all duration-200 ${
                          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                        }`}
                      >
                        <span>EXPLORE</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </foreignObject>
                </g>
              </Link>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
