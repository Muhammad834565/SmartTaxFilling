'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  FileText,
  BookOpen,
  Building2,
  Receipt,
  Users,
  Globe,
  ShoppingBag,
  Building,
  Truck,
  CreditCard,
  Landmark,
  Coins,
  ExternalLink
} from 'lucide-react';

interface FaceDef {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  icon: React.ElementType;
  image: string;
  type: 'pentagon' | 'hexagon';
  cx: number;
  cy: number;
  points: string;
  isCenter?: boolean;
}

// 16 True Interlocking Connected Football Faces:
const FOOTBALL_CONNECTED_FACES: FaceDef[] = [
  // ── 0. CENTER PENTAGON ──
  {
    id: 'center',
    title: 'TAX ADVISORY',
    subtitle: 'US • UK • PK',
    slug: 'us-tax-compliance-filing-services',
    icon: Globe,
    image: '/sevices/US%20Tax%20Compliance%20%26%20Filing%20Services.png',
    type: 'pentagon',
    cx: 380,
    cy: 380,
    points: '315.4,291.1 444.6,291.1 484.5,413.9 380.0,489.8 275.5,413.9',
    isCenter: true,
  },

  // ── 1. HEXAGON (Connected to center bottom-right) ──
  {
    id: 'bookkeeping',
    title: 'BOOKKEEPING',
    subtitle: 'QuickBooks & Xero',
    slug: 'bookkeeping-accounting-services',
    icon: BookOpen,
    image: '/sevices/Bookkeeping%20&%20Tax%20Compliance.png',
    type: 'hexagon',
    cx: 484.5,
    cy: 523.8,
    points: '380.0,489.8 484.5,413.9 588.9,447.9 588.9,557.7 484.5,633.6 380.0,599.7',
  },

  // ── 2. HEXAGON (Connected to center bottom-left) ──
  {
    id: 'us-formation',
    title: 'US LLC SETUP',
    subtitle: 'Delaware & WY',
    slug: 'startup-business-formation-usa',
    icon: Building2,
    image: '/sevices/UK%20Company%20Formation%20&%20Compliance.png',
    type: 'hexagon',
    cx: 275.5,
    cy: 523.8,
    points: '171.1,447.9 275.5,413.9 380.0,489.8 380.0,599.7 275.5,633.6 171.1,557.7',
  },

  // ── 3. HEXAGON (Connected to center top edge) ──
  {
    id: 'global-tax',
    title: 'GLOBAL TAX',
    subtitle: 'Cross-Border Hub',
    slug: 'us-tax-compliance-filing-services',
    icon: Globe,
    image: '/sevices/US%20Tax%20Compliance%20%26%20Filing%20Services.png',
    type: 'hexagon',
    cx: 380,
    cy: 202.3,
    points: '315.4,113.4 444.6,113.4 509.1,202.3 444.6,291.1 315.4,291.1 250.9,202.3',
  },

  // ── 4. HEXAGON (Connected to center top-right) ──
  {
    id: 'ecommerce',
    title: 'E-COMMERCE',
    subtitle: 'Amazon & Shopify',
    slug: 'e-commerce-accounting-tax-services-us',
    icon: ShoppingBag,
    image: '/sevices/E-Commerce%20Accounting%20&%20Tax%20Services%20(US).png',
    type: 'hexagon',
    cx: 549,
    cy: 325.1,
    points: '444.6,291.1 509.1,202.3 613.6,236.2 653.5,359.0 588.9,447.9 484.5,413.9',
  },

  // ── 5. HEXAGON (Connected to center top-left) ──
  {
    id: 'uk-vat',
    title: 'UK VAT & MTD',
    subtitle: 'HMRC Digital Filing',
    slug: 'uk-vat-registration-compliance',
    icon: Receipt,
    image: '/sevices/UK%20VAT%20Registration%20&%20Compliance.jpg',
    type: 'hexagon',
    cx: 211,
    cy: 325.1,
    points: '146.4,236.2 250.9,202.3 315.4,291.1 275.5,413.9 171.1,447.9 106.5,359.0',
  },

  // ── 6. PENTAGON (Bottom Peak) ──
  {
    id: 'fbr-pk',
    title: 'FBR & NTN',
    subtitle: 'Active Taxpayer (ATL)',
    slug: 'fbr-tax-filing-ntn-registration-pakistan',
    icon: Receipt,
    image: '/sevices/FBR%20Income%20Tax%20%26%20NTN%20Registration%20(Pakistan).png',
    type: 'pentagon',
    cx: 380,
    cy: 648.8,
    points: '275.5,633.6 380.0,599.7 484.5,633.6 444.6,688.6 315.4,688.6',
  },

  // ── 7. PENTAGON (Top-Right Flank) ──
  {
    id: 'sales-tax-pk',
    title: 'SALES TAX (PK)',
    subtitle: 'PRA / SRB / KPRA',
    slug: 'sales-tax-pra-srb-fbr-pakistan',
    icon: Landmark,
    image: '/sevices/Provincial%20Sales%20Tax%20PRA%20SRB%20KPRA%20(Pakistan).png',
    type: 'pentagon',
    cx: 538,
    cy: 162.5,
    points: '444.6,113.4 509.1,92.4 613.6,168.3 613.6,236.2 509.1,202.3',
  },

  // ── 8. PENTAGON (Top-Left Flank) ──
  {
    id: 'us-sales-tax',
    title: 'US SALES TAX',
    subtitle: 'Multi-State Nexus',
    slug: 'us-sales-use-tax-compliance',
    icon: Coins,
    image: '/sevices/US%20Sales%20&%20Use%20Tax%20Compliance.png',
    type: 'pentagon',
    cx: 222,
    cy: 162.5,
    points: '250.9,92.4 315.4,113.4 250.9,202.3 146.4,236.2 146.4,168.3',
  },

  // ── 9. PENTAGON (Far-Right Flank) ──
  {
    id: 'payroll',
    title: 'PAYROLL & HR',
    subtitle: 'Form 941 & W-2',
    slug: 'payroll-tax-management',
    icon: Users,
    image: '/sevices/Payroll%20Tax%20Management.png',
    type: 'pentagon',
    cx: 635.7,
    cy: 463.1,
    points: '588.9,447.9 653.5,359.0 693.4,413.9 653.5,536.8 588.9,557.7',
  },

  // ── 10. PENTAGON (Far-Left Flank) ──
  {
    id: 'uk-formation',
    title: 'UK LTD SETUP',
    subtitle: 'Companies House',
    slug: 'uk-company-formation-compliance-services',
    icon: Building,
    image: '/sevices/UK%20Company%20Formation%20&%20Compliance.png',
    type: 'pentagon',
    cx: 124.3,
    cy: 463.1,
    points: '66.6,413.9 106.5,359.0 171.1,447.9 171.1,557.7 106.5,536.8',
  },

  // ── 11. HEXAGON (Top Peak) ──
  {
    id: 'uk-tax',
    title: 'UK CT600 TAX',
    subtitle: 'Corporation Tax',
    slug: 'uk-tax-compliance-filing-services',
    icon: FileText,
    image: '/sevices/UK%20Tax%20Compliance%20&%20Filing%20Services.png',
    type: 'hexagon',
    cx: 380,
    cy: 92.4,
    points: '315.4,71.4 444.6,71.4 509.1,92.4 444.6,113.4 315.4,113.4 250.9,92.4',
  },

  // ── 12. HEXAGON (Bottom-Right Perimeter) ──
  {
    id: 'real-estate',
    title: 'REAL ESTATE',
    subtitle: 'Rental & 1031',
    slug: 'real-estate-financial-tax-services-us',
    icon: Building,
    image: '/sevices/Real%20Estate%20Financial%20&%20Tax%20Services.png',
    type: 'hexagon',
    cx: 549,
    cy: 612.7,
    points: '588.9,557.7 653.5,536.8 613.6,591.7 509.1,667.6 444.6,688.6 484.5,633.6',
  },

  // ── 13. HEXAGON (Bottom-Left Perimeter) ──
  {
    id: 'logistics',
    title: 'LOGISTICS',
    subtitle: 'Trucking & IFTA',
    slug: 'logistics-transport-accounting-tax-support',
    icon: Truck,
    image: '/sevices/Logistics%20&%20Transport%20Accounting%20&%20Tax%20Support.jpg',
    type: 'hexagon',
    cx: 211,
    cy: 612.7,
    points: '146.4,591.7 106.5,536.8 171.1,557.7 275.5,633.6 315.4,688.6 250.9,667.6',
  },

  // ── 14. HEXAGON (Upper-Right Perimeter) ──
  {
    id: 'banking',
    title: 'VIRTUAL BANKING',
    subtitle: 'Mercury & Wise',
    slug: 'virtual-bank-accounts-payment-solutions',
    icon: CreditCard,
    image: '/sevices/Virtual%20Bank%20Accounts%20&%20Payment%20Solutions.png',
    type: 'hexagon',
    cx: 653.5,
    cy: 291.1,
    points: '613.6,236.2 613.6,168.3 653.5,223.2 693.4,346.1 693.4,413.9 653.5,359.0',
  },

  // ── 15. HEXAGON (Upper-Left Perimeter) ──
  {
    id: 'secp-advisory',
    title: 'SECP ADVISORY',
    subtitle: 'Corporate Filings',
    slug: 'secp-company-incorporation-pakistan',
    icon: Building2,
    image: '/sevices/SECP%20Company%20Incorporation%20(Pakistan).png',
    type: 'hexagon',
    cx: 106.5,
    cy: 291.1,
    points: '106.5,223.2 146.4,168.3 146.4,236.2 106.5,359.0 66.6,413.9 66.6,346.1',
  },
];

export default function FootballCircle() {
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Smooth continuous rotation animation
  const animate = useCallback((time: number) => {
    if (!isPaused) {
      const delta = lastTimeRef.current ? (time - lastTimeRef.current) / 1000 : 0;
      lastTimeRef.current = time;
      // 360 degrees in 40 seconds = 9 deg/sec
      setRotationAngle((prev) => (prev + 9 * delta) % 360);
    } else {
      lastTimeRef.current = time;
    }
    animFrameRef.current = requestAnimationFrame(animate);
  }, [isPaused]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [animate]);

  return (
    <div
      className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setHoveredTile(null);
      }}
    >
      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] bg-[#2DC55F]/15 rounded-full blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] bg-[#2DC55F]/25 rounded-full blur-[80px] pointer-events-none" />

      {/* ── Interlocking Rotating Football Dome ── */}
      <div className="relative w-full max-w-[760px] h-full flex items-center justify-center z-10">
        <svg
          viewBox="40 40 680 680"
          className="w-full h-full max-h-[640px] drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Glowing neon filters */}
            <filter id="fbGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="fbIntenseGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur1" />
              <feGaussianBlur stdDeviation="10" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Colors matching Honeycomb */}
            <linearGradient id="fbHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0c1d33" />
              <stop offset="100%" stopColor="#071322" />
            </linearGradient>

            <linearGradient id="fbPentagonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#103628" />
              <stop offset="100%" stopColor="#09241a" />
            </linearGradient>

            <linearGradient id="fbCenterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f2b4c" />
              <stop offset="100%" stopColor="#091b30" />
            </linearGradient>

            {/* Clip paths for each face to clip the hovered service image */}
            {FOOTBALL_CONNECTED_FACES.map((node) => (
              <clipPath key={`clip-fb-${node.id}`} id={`clip-fb-${node.id}`}>
                <polygon points={node.points} />
              </clipPath>
            ))}
          </defs>

          {/* ── Football Outer Circular Boundary Rim ── */}
          <circle
            cx="380"
            cy="380"
            r="320"
            fill="#061220"
            stroke="#2DC55F"
            strokeWidth="3.5"
            strokeOpacity="0.4"
            filter="url(#fbGlow)"
          />

          {/* ── ROTATING GROUP: Rotates smoothly around ball center (380, 380) ── */}
          <g
            style={{
              transformOrigin: '380px 380px',
              transform: `rotate(${rotationAngle}deg)`,
              transition: isPaused ? 'transform 0.1s ease-out' : 'none',
            }}
          >
            {/* ── Shared Edge Wireframe underlay (Like Honeycomb joints) ── */}
            <g stroke="#2DC55F" strokeWidth="2.5" strokeOpacity="0.3" fill="none">
              {FOOTBALL_CONNECTED_FACES.map((node) => (
                <polygon key={`wf-${node.id}`} points={node.points} />
              ))}
            </g>

            {/* ── 16 Interlocking Seamless Football Faces ── */}
            {[...FOOTBALL_CONNECTED_FACES]
              .sort((a, b) => {
                const aActive = hoveredTile === a.id;
                const bActive = hoveredTile === b.id;
                if (aActive) return 1;
                if (bActive) return -1;
                return 0;
              })
              .map((node) => {
                const Icon = node.icon;
                const isCenter = !!node.isCenter;
                const isPentagon = node.type === 'pentagon';
                const isHovered = hoveredTile === node.id;

                return (
                  <Link
                    key={node.id}
                    href={`/services/${node.slug}`}
                    passHref
                    legacyBehavior
                  >
                    <g
                      onMouseEnter={() => setHoveredTile(node.id)}
                      onMouseLeave={() => setHoveredTile(null)}
                      className="cursor-pointer group"
                      style={{
                        transformOrigin: `${node.cx}px ${node.cy}px`,
                        transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.35s ease',
                        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                      }}
                    >
                      {/* Face Polygon */}
                      <polygon
                        points={node.points}
                        fill={
                          isCenter
                            ? 'url(#fbCenterGrad)'
                            : isPentagon
                              ? 'url(#fbPentagonGrad)'
                              : 'url(#fbHexGrad)'
                        }
                        stroke={
                          isHovered
                            ? '#2DC55F'
                            : isCenter
                              ? '#2DC55F'
                              : isPentagon
                                ? '#2DC55F'
                                : '#1e486b'
                        }
                        strokeWidth={isHovered ? 4 : isCenter ? 3 : isPentagon ? 2.5 : 1.8}
                        filter={
                          isHovered
                            ? 'url(#fbIntenseGlow)'
                            : isCenter || isPentagon
                              ? 'url(#fbGlow)'
                              : undefined
                        }
                        className="transition-all duration-300 ease-in-out"
                      />

                      {/* Image Reveal on Hover (Clipped seamlessly to face) */}
                      <g clipPath={`url(#clip-fb-${node.id})`} className="transition-opacity duration-300">
                        <image
                          href={node.image}
                          x={node.cx - 100}
                          y={node.cy - 100}
                          width={200}
                          height={200}
                          preserveAspectRatio="xMidYMid slice"
                          className={`transition-opacity duration-500 ease-in-out pointer-events-none ${
                            isHovered ? 'opacity-85' : 'opacity-0'
                          }`}
                        />
                        {/* Dark overlay so text is crystal clear */}
                        <rect
                          x={node.cx - 100}
                          y={node.cy - 100}
                          width={200}
                          height={200}
                          className={`transition-opacity duration-300 fill-[#071324]/75 pointer-events-none ${
                            isHovered ? 'opacity-90' : 'opacity-0'
                          }`}
                        />
                      </g>

                      {/* Content Container (Icon + Title + Subtitle + Explore) */}
                      {/* Counter-rotate content so text and icon stay upright during rotation */}
                      <foreignObject
                        x={node.cx - 72}
                        y={node.cy - 72}
                        width={144}
                        height={144}
                        className="pointer-events-none"
                        style={{
                          transformOrigin: `${node.cx}px ${node.cy}px`,
                          transform: `rotate(${-rotationAngle}deg)`,
                          transition: isPaused ? 'transform 0.1s ease-out' : 'none',
                        }}
                      >
                        <div className="w-full h-full flex flex-col items-center justify-center p-1 text-center select-none">
                          {/* Icon */}
                          <div
                            className={`rounded-full flex items-center justify-center mb-0.5 transition-all duration-300 ${
                              isCenter ? 'w-11 h-11 sm:w-12 sm:h-12' : 'w-8 h-8 sm:w-9 sm:h-9'
                            } ${
                              isHovered
                                ? 'bg-[#2DC55F] text-slate-950 shadow-md shadow-[#2DC55F]/60 scale-110'
                                : isCenter
                                  ? 'bg-[#2DC55F] text-slate-950 shadow-md shadow-[#2DC55F]/30'
                                  : isPentagon
                                    ? 'bg-[#2DC55F]/20 text-[#2DC55F] border border-[#2DC55F]/50'
                                    : 'bg-[#2DC55F]/15 text-[#2DC55F] border border-[#2DC55F]/35'
                            }`}
                          >
                            <Icon className={isCenter ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-4 h-4 sm:w-4.5 sm:h-4.5'} />
                          </div>

                          {/* Title */}
                          <span
                            className={`font-black uppercase tracking-tight leading-tight transition-colors duration-200 ${
                              isCenter ? 'text-[12px] sm:text-[13px]' : 'text-[10px] sm:text-[11px]'
                            } ${
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
                          <span
                            className={`text-slate-300 font-semibold tracking-tight line-clamp-1 mt-0.5 ${
                              isCenter ? 'text-[9.5px] sm:text-[10px]' : 'text-[8.5px] sm:text-[9px]'
                            }`}
                          >
                            {node.subtitle}
                          </span>

                          {/* Explore action prompt on hover */}
                          <div
                            className={`mt-0.5 flex items-center gap-0.5 text-[8.5px] font-extrabold text-[#2DC55F] transition-all duration-200 ${
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
          </g>
        </svg>
      </div>
    </div>
  );
}
