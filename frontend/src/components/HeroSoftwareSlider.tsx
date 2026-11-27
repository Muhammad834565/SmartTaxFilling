'use client';

import React from 'react';

// The 19 certified tax and financial platforms matching the exact screenshot order
const HERO_SOFTWARE = [
  { name: 'ProConnect Tax', logo: '/software/us tax software/proconnect-tax.png' },
  { name: 'Airwallex', logo: '/software/payment software/airwallex.png' },
  { name: 'WeFile', logo: '/software/uk tax software/wefile.jpg' },
  { name: 'TaxAct', logo: '/software/us tax software/taxact.png' },
  { name: 'Taptap', logo: '/software/payment software/taptap.png' },
  { name: 'QuickBooks', logo: '/software/accountant software/quickbooks.png' },
  { name: 'Xero', logo: '/software/accountant software/xero.png' },
  { name: 'FreeAgent', logo: '/software/uk tax software/freeagent.jpg' },
  { name: 'Drake Tax', logo: '/software/us tax software/drake-tax.png' },
  { name: 'Wise', logo: '/software/payment software/wise.png' },
  { name: 'Sage', logo: '/software/accountant software/sage.png' },
  { name: 'TurboTax', logo: '/software/us tax software/turbotax.png' },
  { name: '#GoFile', logo: '/software/uk tax software/gofile.jpg' },
  { name: 'PayPal', logo: '/software/payment software/paypal.png' },
  { name: 'IRIS Element', logo: '/software/uk tax software/iris-element.jpg' },
  { name: 'MyTAXPrepOffice', logo: '/software/us tax software/mytaxprepoffice.png' },
  { name: 'Payoneer', logo: '/software/payment software/payoneer.png' },
  { name: 'Zoho Books', logo: '/software/accountant software/zoho.png' },
  { name: 'TaxCalc', logo: '/software/uk tax software/taxcalc.jpg' },
];

// Duplicate items for a mathematically seamless, infinite continuous loop
const TICKER_ITEMS = [...HERO_SOFTWARE, ...HERO_SOFTWARE];

export default function HeroSoftwareSlider() {
  return (
    <div className="pt-4 sm:pt-5 border-t border-white/10 select-none">
      {/* Dynamic Keyframes for Continuous Seamless Connected Honeycomb Marquee */}
      <style>{`
        @keyframes heroHoneycombMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .hero-honeycomb-track {
          display: flex;
          width: max-content;
          animation: heroHoneycombMarquee 30s linear infinite !important;
          will-change: transform;
        }
      `}</style>

      {/* Top Label with Pulse Dot */}
      <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2DC55F] inline-block shadow-[0_0_8px_#2DC55F] animate-pulse" />
        <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-slate-300">
          WE WORK ACROSS LEADING CERTIFIED TAX & FINANCIAL PLATFORMS
        </span>
      </div>

      {/* Single-Line Honeycomb Slider Container */}
      <div className="relative w-full overflow-hidden py-1">
        {/* Left & Right Seamless Vignette Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-[#07101e] via-[#07101e]/85 to-transparent pointer-events-none z-20" />
        <div className="absolute top-0 bottom-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-[#07101e] via-[#07101e]/85 to-transparent pointer-events-none z-20" />

        {/* Continuous Motion Track of Interlocking Honeycombs (Continuous, uninterrupted scrolling) */}
        <div className="hero-honeycomb-track flex items-center pointer-events-none select-none">
          {TICKER_ITEMS.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="relative w-[78px] h-[72px] shrink-0 flex items-center justify-center pointer-events-none select-none"
            >
              {/* SVG Pointed-Top Hexagon: 80px wide viewBox with 2px stroke overlapping seamlessly at x=78 */}
              <svg
                viewBox="0 0 80 72"
                className="absolute top-0 left-0 w-[80px] h-[72px] pointer-events-none select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon
                  points="40,1 79,18.5 79,53.5 40,71 1,53.5 1,18.5"
                  fill="#ffffff"
                  stroke="#2DC55F"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Centered Software Logo Inside Hexagon */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-2.5 pointer-events-none select-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.logo}
                  alt={item.name}
                  className="max-h-7 max-w-[50px] w-auto object-contain pointer-events-none select-none"
                  loading="eager"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
