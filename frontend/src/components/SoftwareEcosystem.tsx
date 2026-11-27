'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

interface HexTool {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  category: 'uk-tax' | 'us-tax' | 'bookkeeping' | 'payments';
  badge: string;
  capability: string;
  serviceSlug: string;
}

// 8 Columns x 3 Rows = 24 Hexagons in one seamless repeating block
// All 19 unique software platforms from public/software are mapped
const ROW_1_TOOLS: HexTool[] = [
  {
    id: 'freeagent',
    name: 'FreeAgent',
    shortName: 'FreeAgent',
    logo: '/software/uk tax software/freeagent.jpg',
    category: 'uk-tax',
    badge: 'HMRC MTD',
    capability: 'Self Assessment & VAT',
    serviceSlug: 'uk-tax-compliance-filing-services',
  },
  {
    id: 'drake-tax',
    name: 'Drake Tax',
    shortName: 'Drake Tax',
    logo: '/software/us tax software/drake-tax.png',
    category: 'us-tax',
    badge: 'IRS E-File',
    capability: 'All 50 States & Fed',
    serviceSlug: 'individual-tax-filing',
  },
  {
    id: 'sage',
    name: 'Sage',
    shortName: 'Sage Cloud',
    logo: '/software/accountant software/sage.png',
    category: 'bookkeeping',
    badge: 'ERP Ledger',
    capability: 'Enterprise Accounting',
    serviceSlug: 'uk-bookkeeping-accounting',
  },
  {
    id: 'wise',
    name: 'Wise',
    shortName: 'Wise',
    logo: '/software/payment software/wise.png',
    category: 'payments',
    badge: 'Multi-Currency',
    capability: 'Real Mid-Market FX',
    serviceSlug: 'uk-virtual-business-accounts-payments',
  },
  {
    id: 'gofile',
    name: '#GoFile',
    shortName: '#GoFile',
    logo: '/software/uk tax software/gofile.jpg',
    category: 'uk-tax',
    badge: 'MTD Filing',
    capability: 'VAT & Accounts',
    serviceSlug: 'uk-tax-compliance-filing-services',
  },
  {
    id: 'mytaxprepoffice',
    name: 'MyTAXPrepOffice',
    shortName: 'MyTAXPrep',
    logo: '/software/us tax software/mytaxprepoffice.png',
    category: 'us-tax',
    badge: 'Professional',
    capability: '1040, 1120 & 1065',
    serviceSlug: 'individual-tax-filing',
  },
  {
    id: 'xero',
    name: 'Xero',
    shortName: 'Xero',
    logo: '/software/accountant software/xero.png',
    category: 'bookkeeping',
    badge: 'Platinum',
    capability: 'Automated Bank Feeds',
    serviceSlug: 'uk-bookkeeping-accounting',
  },
  {
    id: 'airwallex',
    name: 'Airwallex',
    shortName: 'Airwallex',
    logo: '/software/payment software/airwallex.png',
    category: 'payments',
    badge: 'Global Treasury',
    capability: 'Virtual Cards & FX',
    serviceSlug: 'uk-virtual-business-accounts-payments',
  },
];

const ROW_2_TOOLS: HexTool[] = [
  {
    id: 'paypal',
    name: 'PayPal',
    shortName: 'PayPal',
    logo: '/software/payment software/paypal.png',
    category: 'payments',
    badge: 'Merchant Gateway',
    capability: 'Global Checkout',
    serviceSlug: 'uk-virtual-business-accounts-payments',
  },
  {
    id: 'iris-element',
    name: 'IRIS Element',
    shortName: 'IRIS Element',
    logo: '/software/uk tax software/iris-element.jpg',
    category: 'uk-tax',
    badge: 'Practice Suite',
    capability: 'CT600 & Accounts',
    serviceSlug: 'uk-tax-compliance-filing-services',
  },
  {
    id: 'proconnect-tax',
    name: 'ProConnect Tax',
    shortName: 'ProConnect',
    logo: '/software/us tax software/proconnect-tax.png',
    category: 'us-tax',
    badge: 'Intuit Cloud',
    capability: 'Direct QuickBooks Sync',
    serviceSlug: 'individual-tax-filing',
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    shortName: 'QuickBooks',
    logo: '/software/accountant software/quickbooks.png',
    category: 'bookkeeping',
    badge: 'Elite Partner',
    capability: 'Ledger & Payroll',
    serviceSlug: 'uk-bookkeeping-accounting',
  },
  {
    id: 'taptap',
    name: 'Taptap',
    shortName: 'Taptap',
    logo: '/software/payment software/taptap.png',
    category: 'payments',
    badge: 'Fast Remit',
    capability: 'Cross-Border Payouts',
    serviceSlug: 'uk-virtual-business-accounts-payments',
  },
  {
    id: 'taxcalc',
    name: 'TaxCalc',
    shortName: 'TaxCalc',
    logo: '/software/uk tax software/taxcalc.jpg',
    category: 'uk-tax',
    badge: 'iXBRL Certified',
    capability: 'CT600 & SA100',
    serviceSlug: 'uk-tax-compliance-filing-services',
  },
  {
    id: 'turbotax',
    name: 'TurboTax',
    shortName: 'TurboTax',
    logo: '/software/us tax software/turbotax.png',
    category: 'us-tax',
    badge: 'Intuit Standard',
    capability: 'Schedule C & K-1',
    serviceSlug: 'individual-tax-filing',
  },
  {
    id: 'zoho',
    name: 'Zoho Books',
    shortName: 'Zoho Books',
    logo: '/software/accountant software/zoho.png',
    category: 'bookkeeping',
    badge: 'Enterprise Suite',
    capability: 'Automated Workflows',
    serviceSlug: 'uk-bookkeeping-accounting',
  },
];

const ROW_3_TOOLS: HexTool[] = [
  {
    id: 'payoneer',
    name: 'Payoneer',
    shortName: 'Payoneer',
    logo: '/software/payment software/payoneer.png',
    category: 'payments',
    badge: 'Global Payouts',
    capability: 'USD, EUR, GBP Accounts',
    serviceSlug: 'uk-virtual-business-accounts-payments',
  },
  {
    id: 'wefile',
    name: 'WeFile',
    shortName: 'WeFile',
    logo: '/software/uk tax software/wefile.jpg',
    category: 'uk-tax',
    badge: 'HMRC Gateway',
    capability: 'Digital Submissions',
    serviceSlug: 'uk-tax-compliance-filing-services',
  },
  {
    id: 'taxact',
    name: 'TaxAct',
    shortName: 'TaxAct',
    logo: '/software/us tax software/taxact.png',
    category: 'us-tax',
    badge: 'Federal & State',
    capability: '1120S & 1065 Returns',
    serviceSlug: 'individual-tax-filing',
  },
  {
    id: 'quickbooks-online',
    name: 'QuickBooks Online',
    shortName: 'QBO Live',
    logo: '/software/accountant software/quickbooks.png',
    category: 'bookkeeping',
    badge: 'Certified',
    capability: 'Real-Time Clearing',
    serviceSlug: 'uk-bookkeeping-accounting',
  },
  {
    id: 'xero-mtd',
    name: 'Xero MTD',
    shortName: 'Xero MTD',
    logo: '/software/accountant software/xero.png',
    category: 'bookkeeping',
    badge: 'HMRC Ready',
    capability: 'Digital VAT Returns',
    serviceSlug: 'uk-bookkeeping-accounting',
  },
  {
    id: 'wise-business',
    name: 'Wise Business',
    shortName: 'Wise Biz',
    logo: '/software/payment software/wise.png',
    category: 'payments',
    badge: 'UK Sort Code',
    capability: 'Commercial Banking',
    serviceSlug: 'uk-virtual-business-accounts-payments',
  },
  {
    id: 'drake-enterprise',
    name: 'Drake Tax Pro',
    shortName: 'Drake Pro',
    logo: '/software/us tax software/drake-tax.png',
    category: 'us-tax',
    badge: 'Entity Filings',
    capability: 'Multi-Member LLCs',
    serviceSlug: 'us-tax-compliance-filing-services',
  },
  {
    id: 'freeagent-mtd',
    name: 'FreeAgent Pro',
    shortName: 'FreeAgent UK',
    logo: '/software/uk tax software/freeagent.jpg',
    category: 'uk-tax',
    badge: 'Sole Trader',
    capability: 'HMRC MTD Filing',
    serviceSlug: 'uk-tax-compliance-filing-services',
  },
];

// Exact Geometric Dimensions for Seamless Honeycomb Grid
const HEX_W = 126;
const HEX_H = 146;
const HEX_DY = 108;
const NUM_COLS = 8;
const BLOCK_WIDTH = NUM_COLS * HEX_W; // Exactly 1008px
const BLOCK_HEIGHT = HEX_H + 2 * HEX_DY; // Exactly 362px

// 4 identical blocks side-by-side (4032px total) ensures infinite seamless loop on any screen
const REPEATED_BLOCK_INDICES = [0, 1, 2, 3];

export default function SoftwareEcosystem() {
  const [activeTool, setActiveTool] = useState<HexTool | null>(null);

  const renderHexCell = (tool: HexTool, key: string) => {
    return (
      <Link
        key={key}
        href={`/services/${tool.serviceSlug}`}
        onMouseEnter={() => setActiveTool(tool)}
        onMouseLeave={() => setActiveTool(null)}
        className="group relative block cursor-pointer select-none transition-all duration-300 hover:scale-105 focus:outline-none"
        style={{
          width: `${HEX_W}px`,
          height: `${HEX_H}px`,
        }}
      >
        {/* SVG Vector Hexagon Shape */}
        <svg
          className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:drop-shadow-[0_8px_20px_rgba(45,197,95,0.35)]"
          viewBox="0 0 126 146"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="63,1 125,37 125,109 63,145 1,109 1,37"
            className="fill-white stroke-slate-300 transition-all duration-300 group-hover:stroke-[#2DC55F] group-hover:stroke-[3.5px] group-hover:fill-white"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* Inner Content Layer */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-3 text-center">
          {/* Tool Logo */}
          <div className="h-8 w-full flex items-center justify-center px-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tool.logo}
              alt={tool.name}
              className="max-h-7 max-w-[76px] w-auto object-contain transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          </div>

          {/* Tool Name */}
          <span className="text-[10px] font-extrabold text-[#0c1e36] tracking-tight leading-none mt-1.5 truncate max-w-[84px] group-hover:text-[#2DC55F] transition-colors">
            {tool.shortName}
          </span>

          {/* Badge */}
          <span className="text-[7.5px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded text-emerald-700 bg-emerald-50 border border-emerald-200/60 mt-1 leading-none font-mono group-hover:bg-emerald-100 group-hover:border-[#2DC55F]/50 transition-colors">
            {tool.badge}
          </span>
        </div>
      </Link>
    );
  };

  const renderSingleBlock = (blockIndex: number) => {
    return (
      <div
        key={`block-${blockIndex}`}
        className="relative shrink-0"
        style={{
          width: `${BLOCK_WIDTH}px`,
          height: `${BLOCK_HEIGHT}px`,
        }}
      >
        {/* Row 1 — Aligned at x = col * 126px, y = 0 */}
        {ROW_1_TOOLS.map((tool, colIndex) => (
          <div
            key={`b${blockIndex}-r1-c${colIndex}`}
            className="absolute transition-all duration-200 hover:z-50 focus-within:z-50"
            style={{
              left: `${colIndex * HEX_W}px`,
              top: '0px',
              width: `${HEX_W}px`,
              height: `${HEX_H}px`,
            }}
          >
            {renderHexCell(tool, `cell-b${blockIndex}-r1-${colIndex}`)}
          </div>
        ))}

        {/* Row 2 — Staggered offset by +63px (half-width), y = 108px */}
        {ROW_2_TOOLS.map((tool, colIndex) => (
          <div
            key={`b${blockIndex}-r2-c${colIndex}`}
            className="absolute transition-all duration-200 hover:z-50 focus-within:z-50"
            style={{
              left: `${colIndex * HEX_W + HEX_W / 2}px`,
              top: `${HEX_DY}px`,
              width: `${HEX_W}px`,
              height: `${HEX_H}px`,
            }}
          >
            {renderHexCell(tool, `cell-b${blockIndex}-r2-${colIndex}`)}
          </div>
        ))}

        {/* Row 3 — Aligned with Row 1 at x = col * 126px, y = 216px */}
        {ROW_3_TOOLS.map((tool, colIndex) => (
          <div
            key={`b${blockIndex}-r3-c${colIndex}`}
            className="absolute transition-all duration-200 hover:z-50 focus-within:z-50"
            style={{
              left: `${colIndex * HEX_W}px`,
              top: `${2 * HEX_DY}px`,
              width: `${HEX_W}px`,
              height: `${HEX_H}px`,
            }}
          >
            {renderHexCell(tool, `cell-b${blockIndex}-r3-${colIndex}`)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="bg-white text-[#0c1e36] pt-8 sm:pt-12 lg:pt-16 pb-6 sm:pb-8 relative overflow-hidden">
      {/* Dynamic Continuous Marquee Animation */}
      <style>{`
        @keyframes honeycombScrollBelt {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-${BLOCK_WIDTH}px, 0, 0);
          }
        }
        .honeycomb-marquee-track {
          animation: honeycombScrollBelt 36s linear infinite;
          will-change: transform;
        }
        .honeycomb-marquee-container:hover .honeycomb-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Header Block — Clean, Centered, Professional */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3 mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#16a34a] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#2DC55F]" />
          <span>Certified Software & Technology Infrastructure</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0c1e36] tracking-tight">
          Powered by Industry-Leading Tax & Financial Platforms
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Direct synchronization across certified US & UK tax filing engines, automated cloud accounting ledgers, and global banking networks for seamless compliance and real-time financial oversight.
        </p>
      </div>

      {/* ─── INFINITE 3-ROW HONEYCOMB MARQUEE BELT ─── */}
      <div className="relative w-full overflow-hidden py-4 honeycomb-marquee-container">
        {/* Left & Right Cinematic Fades (White Background) */}
        <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-20" />
        <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-20" />

        {/* Marquee Motion Belt */}
        <div
          className="flex select-none honeycomb-marquee-track"
          style={{
            width: `${BLOCK_WIDTH * REPEATED_BLOCK_INDICES.length}px`,
            height: `${BLOCK_HEIGHT}px`,
          }}
        >
          {REPEATED_BLOCK_INDICES.map((blockIdx) => renderSingleBlock(blockIdx))}
        </div>
      </div>

      {/* Active Tool Inspector Card — Fixed height prevents layout shift */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 pt-4 min-h-[88px]">
        {activeTool ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-md animate-in fade-in duration-150">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 bg-white rounded-xl p-2 flex items-center justify-center border border-slate-200 shadow-xs shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activeTool.logo} alt={activeTool.name} className="max-h-8 max-w-full object-contain" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-[#0c1e36]">{activeTool.name}</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {activeTool.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  <strong className="text-[#0c1e36] font-bold">{activeTool.capability}</strong> — Fully integrated into our tax & accounting services.
                </p>
              </div>
            </div>

            <Link
              href={`/services/${activeTool.serviceSlug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0c1e36] hover:bg-[#2DC55F] hover:text-slate-950 transition-colors cursor-pointer shrink-0"
            >
              <span>Explore Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 py-4 text-xs text-slate-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2DC55F] animate-pulse" />
            <span>Hover over any certified software platform to inspect capabilities and compliant workflows</span>
          </div>
        )}
      </div>
    </section>
  );
}
