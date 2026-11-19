'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Football2D from '@/components/Football2D';
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
  ExternalLink,
  Hexagon,
  Circle,
} from 'lucide-react';

// ─── Shared Service Data ─────────────────────────────────────────────────────
interface ServiceNode {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  icon: React.ElementType;
  image: string;
  isCenter?: boolean;
}

const ALL_SERVICES: ServiceNode[] = [
  {
    id: 'global-tax',
    title: 'GLOBAL TAX',
    subtitle: 'Cross-Border Hub',
    slug: 'us-tax-compliance-filing-services',
    icon: Globe,
    image: '/sevices/US%20Tax%20Compliance%20%26%20Filing%20Services.png',
  },
  {
    id: 'ecommerce',
    title: 'E-COMMERCE',
    subtitle: 'Amazon & Shopify',
    slug: 'e-commerce-accounting-tax-services-us',
    icon: ShoppingBag,
    image: '/sevices/E-Commerce%20Accounting%20%26%20Tax%20Services%20(US).png',
  },
  {
    id: 'bookkeeping',
    title: 'BOOKKEEPING',
    subtitle: 'QuickBooks & Xero',
    slug: 'bookkeeping-accounting-services',
    icon: BookOpen,
    image: '/sevices/Bookkeeping%20%26%20Tax%20Compliance.png',
  },
  {
    id: 'us-formation',
    title: 'US LLC SETUP',
    subtitle: 'Delaware & WY',
    slug: 'startup-business-formation-usa',
    icon: Building2,
    image: '/sevices/UK%20Company%20Formation%20%26%20Compliance.png',
  },
  {
    id: 'provincial-tax',
    title: 'SALES TAX (PK)',
    subtitle: 'PRA / SRB / KPRA',
    slug: 'sales-tax-pra-srb-fbr-pakistan',
    icon: Landmark,
    image: '/sevices/Provincial%20Sales%20Tax%20PRA%20SRB%20KPRA%20(Pakistan).png',
  },
  {
    id: 'uk-vat',
    title: 'UK VAT & MTD',
    subtitle: 'HMRC Digital Filing',
    slug: 'uk-vat-registration-compliance',
    icon: Receipt,
    image: '/sevices/UK%20VAT%20Registration%20%26%20Compliance.jpg',
  },
  {
    id: 'center',
    title: 'TAX ADVISORY',
    subtitle: 'US • UK • PK',
    slug: 'us-tax-compliance-filing-services',
    icon: Globe,
    image: '/sevices/US%20Tax%20Compliance%20%26%20Filing%20Services.png',
    isCenter: true,
  },
  {
    id: 'us-sales-tax',
    title: 'US SALES TAX',
    subtitle: 'Multi-State Nexus',
    slug: 'us-sales-use-tax-compliance',
    icon: Coins,
    image: '/sevices/US%20Sales%20%26%20Use%20Tax%20Compliance.png',
  },
  {
    id: 'uk-formation',
    title: 'UK LTD SETUP',
    subtitle: 'Companies House',
    slug: 'uk-company-formation-compliance-services',
    icon: Building,
    image: '/sevices/UK%20Company%20Formation%20%26%20Compliance.png',
  },
  {
    id: 'uk-tax',
    title: 'UK CT600 TAX',
    subtitle: 'Corporation Tax',
    slug: 'uk-tax-compliance-filing-services',
    icon: FileText,
    image: '/sevices/UK%20Tax%20Compliance%20%26%20Filing%20Services.png',
  },
  {
    id: 'payroll',
    title: 'PAYROLL & HR',
    subtitle: 'Form 941 & W-2',
    slug: 'payroll-tax-management',
    icon: Users,
    image: '/sevices/Payroll%20Tax%20Management.png',
  },
  {
    id: 'real-estate',
    title: 'REAL ESTATE',
    subtitle: 'Rental & 1031',
    slug: 'real-estate-financial-tax-services-us',
    icon: Building,
    image: '/sevices/Real%20Estate%20Financial%20%26%20Tax%20Services.png',
  },
  {
    id: 'fbr-pk',
    title: 'FBR & NTN',
    subtitle: 'Active Taxpayer (ATL)',
    slug: 'fbr-tax-filing-ntn-registration-pakistan',
    icon: Receipt,
    image: '/sevices/FBR%20Income%20Tax%20%26%20NTN%20Registration%20(Pakistan).png',
  },
  {
    id: 'logistics',
    title: 'LOGISTICS',
    subtitle: 'Trucking & IFTA',
    slug: 'logistics-transport-accounting-tax-support',
    icon: Truck,
    image: '/sevices/Logistics%20%26%20Transport%20Accounting%20%26%20Tax%20Support.jpg',
  },
  {
    id: 'banking',
    title: 'VIRTUAL BANKING',
    subtitle: 'Mercury & Wise',
    slug: 'virtual-bank-accounts-payment-solutions',
    icon: CreditCard,
    image: '/sevices/Virtual%20Bank%20Accounts%20%26%20Payment%20Solutions.png',
  },
];

// Services for orbit view (excluding center)
const ORBIT_SERVICES = ALL_SERVICES.filter((s) => !s.isCenter);

// ─── Honeycomb Math ───────────────────────────────────────────────────────────
const R = 100;
const dx = Math.sqrt(3) * R;
const dy = 1.5 * R;
const CX = 450;
const CY = 360;

// 13 services in honeycomb layout
const HONEYCOMB_SERVICES = ALL_SERVICES.slice(0, 13).map((s, i) => {
  const positions = [
    { cx: CX, cy: CY - 2 * dy },           // top peak
    { cx: CX - 1.5 * dx, cy: CY - dy },    // row2 left
    { cx: CX - 0.5 * dx, cy: CY - dy },    // row2 center-left
    { cx: CX + 0.5 * dx, cy: CY - dy },    // row2 center-right
    { cx: CX + 1.5 * dx, cy: CY - dy },    // row2 right
    { cx: CX - dx, cy: CY },               // row3 left
    { cx: CX, cy: CY },                    // center
    { cx: CX + dx, cy: CY },               // row3 right
    { cx: CX - 1.5 * dx, cy: CY + dy },    // row4 left
    { cx: CX - 0.5 * dx, cy: CY + dy },    // row4 center-left
    { cx: CX + 0.5 * dx, cy: CY + dy },    // row4 center-right
    { cx: CX + 1.5 * dx, cy: CY + dy },    // row4 right
    { cx: CX, cy: CY + 2 * dy },           // bottom peak
  ];
  return { ...s, ...positions[i] };
});

function getHexPoints(cx: number, cy: number, r: number): string {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 90);
    points.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return points.join(' ');
}

// ─── Honeycomb View ───────────────────────────────────────────────────────────
function HoneycombView() {
  const [hoveredHex, setHoveredHex] = useState<string | null>(null);
  const [autoHighlightedId, setAutoHighlightedId] = useState<string | null>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const ids = HONEYCOMB_SERVICES.map((s) => s.id);
    let lastId: string | null = null;
    const interval = setInterval(() => {
      if (isHoveredRef.current) { setAutoHighlightedId(null); return; }
      const available = ids.filter((id) => id !== lastId);
      const nextId = available[Math.floor(Math.random() * available.length)];
      lastId = nextId;
      setAutoHighlightedId(nextId);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[580px] flex items-center justify-center select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[#2DC55F]/15 rounded-full blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] bg-[#2DC55F]/25 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative w-full max-w-[760px] h-full flex items-center justify-center z-10">
        <svg viewBox="70 -40 760 800" className="w-full h-full max-h-[580px] drop-shadow-2xl overflow-visible">
          <defs>
            <filter id="hcHexGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="hcIntenseGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur1" />
              <feGaussianBlur stdDeviation="10" result="blur2" />
              <feMerge><feMergeNode in="blur2" /><feMergeNode in="blur1" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <linearGradient id="hcLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2DC55F" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#2DC55F" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#2DC55F" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="hcTileBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0c1d33" />
              <stop offset="100%" stopColor="#071322" />
            </linearGradient>
            <linearGradient id="hcCenterBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f2b4c" />
              <stop offset="100%" stopColor="#091b30" />
            </linearGradient>
            {HONEYCOMB_SERVICES.map((node) => (
              <clipPath key={`hc-clip-${node.id}`} id={`hc-clip-${node.id}`}>
                <polygon points={getHexPoints(node.cx, node.cy, R - 1.5)} />
              </clipPath>
            ))}
          </defs>

          {/* Circuit lines */}
          <g opacity="0.55">
            <path
              d="M 450 360 L 450 10 M 450 360 L 760 100 M 450 360 L 760 620 M 450 360 L 450 710 M 450 360 L 140 620 M 450 360 L 140 100"
              stroke="url(#hcLineGrad)" strokeWidth="1.2" strokeDasharray="4 4" fill="none"
            />
            {[[140,100],[760,100],[140,620],[760,620]].map(([x,y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#2DC55F" filter="url(#hcHexGlow)" />
            ))}
          </g>

          {/* Wireframe grid */}
          <g stroke="#2DC55F" strokeWidth="2" strokeOpacity="0.3" fill="none">
            {HONEYCOMB_SERVICES.map((node) => (
              <polygon key={`hc-wf-${node.id}`} points={getHexPoints(node.cx, node.cy, R + 0.8)} />
            ))}
          </g>

          {/* Interactive cells */}
          {[...HONEYCOMB_SERVICES]
            .sort((a, b) => {
              const aA = hoveredHex === a.id || (!hoveredHex && autoHighlightedId === a.id);
              const bA = hoveredHex === b.id || (!hoveredHex && autoHighlightedId === b.id);
              if (aA) return 1; if (bA) return -1; return 0;
            })
            .map((node) => {
              const Icon = node.icon;
              const isCenter = node.id === 'center';
              const isUserHovered = hoveredHex === node.id;
              const isAutoActive = !hoveredHex && autoHighlightedId === node.id;
              const isHovered = isUserHovered || isAutoActive;
              const tileR = R - 1.2;
              return (
                <Link key={node.id} href={`/services/${node.slug}`} passHref legacyBehavior>
                  <g
                    onMouseEnter={() => { isHoveredRef.current = true; setHoveredHex(node.id); }}
                    onMouseLeave={() => { isHoveredRef.current = false; setHoveredHex(null); }}
                    className="cursor-pointer"
                    style={{
                      transformOrigin: `${node.cx}px ${node.cy}px`,
                      transition: 'transform 0.35s cubic-bezier(0.2,0.8,0.2,1)',
                      transform: isUserHovered ? 'scale(1.10)' : hoveredHex ? 'scale(0.97)' : 'scale(1)',
                    }}
                  >
                    <polygon
                      points={getHexPoints(node.cx, node.cy, tileR)}
                      fill={isCenter ? 'url(#hcCenterBg)' : 'url(#hcTileBg)'}
                      stroke={isHovered ? '#2DC55F' : isCenter ? '#2DC55F' : '#1e486b'}
                      strokeWidth={isHovered ? 3.5 : isCenter ? 2.5 : 1.5}
                      filter={isHovered ? 'url(#hcIntenseGlow)' : isCenter ? 'url(#hcHexGlow)' : undefined}
                    />
                    <g clipPath={`url(#hc-clip-${node.id})`}>
                      <image
                        href={node.image} x={node.cx - tileR} y={node.cy - tileR}
                        width={tileR * 2} height={tileR * 2} preserveAspectRatio="xMidYMid slice"
                        className={`transition-opacity duration-700 pointer-events-none ${isHovered ? 'opacity-85' : 'opacity-0'}`}
                      />
                      <rect
                        x={node.cx - tileR} y={node.cy - tileR} width={tileR * 2} height={tileR * 2}
                        className={`transition-opacity duration-300 fill-[#071324]/75 pointer-events-none ${isHovered ? 'opacity-90' : 'opacity-0'}`}
                      />
                    </g>
                    <foreignObject x={node.cx - (tileR - 2)} y={node.cy - (tileR - 2)} width={(tileR - 2) * 2} height={(tileR - 2) * 2} className="pointer-events-none">
                      <div className="w-full h-full flex flex-col items-center justify-center p-1 text-center select-none">
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-1 transition-all duration-300 ${isHovered ? 'bg-[#2DC55F] text-slate-950 shadow-md shadow-[#2DC55F]/60 scale-110' : isCenter ? 'bg-[#2DC55F] text-slate-950 shadow-md shadow-[#2DC55F]/30' : 'bg-[#2DC55F]/15 text-[#2DC55F] border border-[#2DC55F]/40'}`}>
                          <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                        </div>
                        <span className={`text-[15px] sm:text-[17px] font-black uppercase tracking-tight leading-tight transition-colors duration-200 ${isHovered ? 'text-[#2DC55F]' : isCenter ? 'text-[#2DC55F]' : 'text-white'}`}>
                          {node.title}
                        </span>
                        <span className="text-[12px] sm:text-[13px] text-slate-300 font-semibold tracking-tight line-clamp-1 mt-0.5">
                          {node.subtitle}
                        </span>
                        <div className={`mt-1 flex items-center gap-0.5 text-[11.5px] font-extrabold text-[#2DC55F] transition-all duration-200 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                          <span>EXPLORE</span><ExternalLink className="w-3.5 h-3.5" />
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

// ─── Football Orbit View ──────────────────────────────────────────────────────
// Sizes for the two rings
const INNER_R = 34;   // hex circumradius for inner ring nodes
const OUTER_R = 28;   // hex circumradius for outer ring nodes
const CENTER_R = 52;  // hex circumradius for the center node

const ORBIT_INNER_RADIUS = 158;  // distance from center to inner node centers
const ORBIT_OUTER_RADIUS = 268;  // distance from center to outer node centers
const INNER_SPEED = 24;          // seconds per full rotation (clockwise)
const OUTER_SPEED = 40;          // seconds per full rotation (counter-clockwise)

/** Returns 6 flat-top hexagon points centred on (0,0) */
function hexPoints(r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i); // flat-top: 0° offset
    return `${(r * Math.cos(a)).toFixed(3)},${(r * Math.sin(a)).toFixed(3)}`;
  }).join(' ');
}

/** Same but centred on (cx, cy) — used for clipPaths in defs */
function hexPointsAt(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i);
    return `${(cx + r * Math.cos(a)).toFixed(3)},${(cy + r * Math.sin(a)).toFixed(3)}`;
  }).join(' ');
}

function FootballOrbitView() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [rotation1, setRotation1] = useState(0);
  const [rotation2, setRotation2] = useState(180);
  const animRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const pausedRef = useRef(false);

  const innerServices = ORBIT_SERVICES.slice(0, 6);
  const outerServices = ORBIT_SERVICES.slice(6, 15);
  const centerService = ALL_SERVICES.find((s) => s.isCenter)!;

  const animate = useCallback((time: number) => {
    if (!pausedRef.current) {
      const delta = lastTimeRef.current ? (time - lastTimeRef.current) / 1000 : 0;
      lastTimeRef.current = time;
      setRotation1((prev) => (prev + (360 / INNER_SPEED) * delta) % 360);
      setRotation2((prev) => (prev - (360 / OUTER_SPEED) * delta + 360) % 360);
    } else {
      lastTimeRef.current = time;
    }
    animRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [animate]);

  const SIZE = 600;
  const MID = SIZE / 2;

  /** polar → SVG cartesian */
  const orbitPos = (idx: number, total: number, radius: number, rot: number) => {
    const a = ((idx / total) * 360 + rot) * (Math.PI / 180);
    return { x: MID + radius * Math.cos(a), y: MID + radius * Math.sin(a) };
  };

  // Pre-compute live positions so we can build clipPath IDs in defs
  const innerPos = innerServices.map((_, i) => orbitPos(i, innerServices.length, ORBIT_INNER_RADIUS, rotation1));
  const outerPos = outerServices.map((_, i) => orbitPos(i, outerServices.length, ORBIT_OUTER_RADIUS, rotation2));

  return (
    <div
      className="relative w-full flex items-center justify-center select-none"
      style={{ height: '620px' }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; setHoveredId(null); }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[520px] h-[520px] bg-[#2DC55F]/8 rounded-full blur-[90px]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[200px] h-[200px] bg-[#2DC55F]/18 rounded-full blur-[60px]" />
      </div>

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width={SIZE}
        height={SIZE}
        className="relative z-10"
        style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'visible' }}
      >
        <defs>
          {/* ── Filters ── */}
          <filter id="oGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="oGlowStrong" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" result="b1" />
            <feGaussianBlur stdDeviation="14" result="b2" />
            <feMerge><feMergeNode in="b2" /><feMergeNode in="b1" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* ── Gradients ── */}
          <linearGradient id="oNodeBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0c1d33" />
            <stop offset="100%" stopColor="#071322" />
          </linearGradient>
          <linearGradient id="oCenterBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f2b4c" />
            <stop offset="100%" stopColor="#091b30" />
          </linearGradient>

          {/* ── ClipPaths for inner nodes (move with orbit) ── */}
          {innerServices.map((svc, i) => (
            <clipPath key={`ic-${svc.id}`} id={`ic-${svc.id}`}>
              <polygon points={hexPointsAt(innerPos[i].x, innerPos[i].y, INNER_R - 1)} />
            </clipPath>
          ))}

          {/* ── ClipPaths for outer nodes ── */}
          {outerServices.map((svc, i) => (
            <clipPath key={`oc-${svc.id}`} id={`oc-${svc.id}`}>
              <polygon points={hexPointsAt(outerPos[i].x, outerPos[i].y, OUTER_R - 1)} />
            </clipPath>
          ))}

          {/* ── ClipPath for center node ── */}
          <clipPath id="cc-center">
            <polygon points={hexPointsAt(MID, MID, CENTER_R - 1)} />
          </clipPath>

          {/* ── Football texture ── */}
          <pattern id="oLines" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="18" y2="18" stroke="#2DC55F" strokeWidth="0.3" strokeOpacity="0.12" />
            <line x1="18" y1="0" x2="0" y2="18" stroke="#2DC55F" strokeWidth="0.3" strokeOpacity="0.12" />
          </pattern>
        </defs>

        {/* ── Orbit ring tracks ── */}
        <circle cx={MID} cy={MID} r={ORBIT_OUTER_RADIUS}
          fill="none" stroke="#2DC55F" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="6 6" />
        <circle cx={MID} cy={MID} r={ORBIT_INNER_RADIUS}
          fill="none" stroke="#2DC55F" strokeWidth="1" strokeOpacity="0.22" strokeDasharray="4 4" />
        <circle cx={MID} cy={MID} r={ORBIT_OUTER_RADIUS + 12}
          fill="none" stroke="#2DC55F" strokeWidth="0.4" strokeOpacity="0.07" />

        {/* ── Radial spokes ── */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = deg * (Math.PI / 180);
          return (
            <line key={deg}
              x1={MID} y1={MID}
              x2={MID + ORBIT_OUTER_RADIUS * Math.cos(rad)}
              y2={MID + ORBIT_OUTER_RADIUS * Math.sin(rad)}
              stroke="#2DC55F" strokeWidth="0.5" strokeOpacity="0.1"
            />
          );
        })}

        {/* ── Football body fill ── */}
        <circle cx={MID} cy={MID} r={ORBIT_INNER_RADIUS - 12}
          fill="url(#oLines)" fillOpacity="0.35"
          stroke="#2DC55F" strokeWidth="0.4" strokeOpacity="0.08"
        />

        {/* ════════════════════════════════════
            OUTER RING — flat-top hexagon nodes
            ════════════════════════════════════ */}
        {outerServices.map((svc, i) => {
          const { x, y } = outerPos[i];
          const Icon = svc.icon;
          const isHov = hoveredId === svc.id;
          const r = OUTER_R;
          const imgBox = r * 2;

          return (
            <g key={svc.id}
              onMouseEnter={() => setHoveredId(svc.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: 'pointer' }}
            >
              <Link href={`/services/${svc.slug}`}>
                <g>
                  {/* spoke to center */}
                  <line x1={x} y1={y} x2={MID} y2={MID}
                    stroke="#2DC55F" strokeWidth="0.7"
                    strokeOpacity={isHov ? 0.45 : 0.08} strokeDasharray="3 5" />

                  {/* glow halo */}
                  {isHov && (
                    <polygon
                      points={hexPointsAt(x, y, r + 10)}
                      fill="#2DC55F" fillOpacity="0.12"
                      filter="url(#oGlow)"
                    />
                  )}

                  {/* hex body */}
                  <polygon
                    points={hexPointsAt(x, y, r)}
                    fill="url(#oNodeBg)"
                    stroke="#2DC55F"
                    strokeWidth={isHov ? 2.5 : 1.5}
                    strokeOpacity={isHov ? 1 : 0.5}
                    filter={isHov ? 'url(#oGlowStrong)' : undefined}
                  />

                  {/* service image — clipped to hex, fades in on hover */}
                  <image
                    href={svc.image}
                    x={x - r} y={y - r}
                    width={imgBox} height={imgBox}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#oc-${svc.id})`}
                    opacity={isHov ? 0.82 : 0}
                    style={{ transition: 'opacity 0.4s ease' }}
                  />
                  {/* dark overlay so text stays legible */}
                  <polygon
                    points={hexPointsAt(x, y, r - 0.5)}
                    fill="#071324"
                    fillOpacity={isHov ? 0.55 : 0}
                    style={{ transition: 'fill-opacity 0.4s ease' }}
                  />

                  {/* icon + label (hidden on hover so image shows) */}
                  <foreignObject
                    x={x - r} y={y - r}
                    width={imgBox} height={imgBox}
                    style={{ pointerEvents: 'none', overflow: 'visible' }}
                  >
                    <div
                      className="w-full h-full flex flex-col items-center justify-center text-center"
                      style={{ gap: 2, opacity: isHov ? 0 : 1, transition: 'opacity 0.3s ease' }}
                    >
                      <Icon style={{ width: 16, height: 16, color: '#2DC55F', flexShrink: 0 }} />
                      <span style={{
                        fontSize: 6.5, fontWeight: 900, color: '#fff',
                        lineHeight: 1.2, maxWidth: r * 1.7, textAlign: 'center',
                        textTransform: 'uppercase', letterSpacing: '0.03em',
                      }}>
                        {svc.title}
                      </span>
                    </div>
                  </foreignObject>

                  {/* subtitle that appears on hover */}
                  <foreignObject
                    x={x - r} y={y - r}
                    width={imgBox} height={imgBox}
                    style={{ pointerEvents: 'none', overflow: 'visible' }}
                  >
                    <div
                      className="w-full h-full flex flex-col items-center justify-center text-center"
                      style={{ gap: 3, opacity: isHov ? 1 : 0, transition: 'opacity 0.4s ease 0.1s' }}
                    >
                      <span style={{
                        fontSize: 7, fontWeight: 900, color: '#2DC55F',
                        textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.2,
                      }}>
                        {svc.title}
                      </span>
                      <span style={{ fontSize: 6, color: '#cbd5e1', fontWeight: 600, lineHeight: 1.2 }}>
                        {svc.subtitle}
                      </span>
                    </div>
                  </foreignObject>
                </g>
              </Link>
            </g>
          );
        })}

        {/* ════════════════════════════════════
            INNER RING — flat-top hexagon nodes
            ════════════════════════════════════ */}
        {innerServices.map((svc, i) => {
          const { x, y } = innerPos[i];
          const Icon = svc.icon;
          const isHov = hoveredId === svc.id;
          const r = INNER_R;
          const imgBox = r * 2;

          return (
            <g key={svc.id}
              onMouseEnter={() => setHoveredId(svc.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: 'pointer' }}
            >
              <Link href={`/services/${svc.slug}`}>
                <g>
                  {/* glow halo */}
                  {isHov && (
                    <polygon
                      points={hexPointsAt(x, y, r + 12)}
                      fill="#2DC55F" fillOpacity="0.13"
                      filter="url(#oGlow)"
                    />
                  )}

                  {/* hex body */}
                  <polygon
                    points={hexPointsAt(x, y, r)}
                    fill="url(#oNodeBg)"
                    stroke="#2DC55F"
                    strokeWidth={isHov ? 3 : 2}
                    strokeOpacity={isHov ? 1 : 0.6}
                    filter={isHov ? 'url(#oGlowStrong)' : undefined}
                  />

                  {/* service image */}
                  <image
                    href={svc.image}
                    x={x - r} y={y - r}
                    width={imgBox} height={imgBox}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#ic-${svc.id})`}
                    opacity={isHov ? 0.85 : 0}
                    style={{ transition: 'opacity 0.4s ease' }}
                  />
                  {/* overlay */}
                  <polygon
                    points={hexPointsAt(x, y, r - 0.5)}
                    fill="#071324"
                    fillOpacity={isHov ? 0.52 : 0}
                    style={{ transition: 'fill-opacity 0.4s ease' }}
                  />

                  {/* default icon+label */}
                  <foreignObject
                    x={x - r} y={y - r}
                    width={imgBox} height={imgBox}
                    style={{ pointerEvents: 'none', overflow: 'visible' }}
                  >
                    <div
                      className="w-full h-full flex flex-col items-center justify-center text-center"
                      style={{ gap: 2, opacity: isHov ? 0 : 1, transition: 'opacity 0.3s ease' }}
                    >
                      <Icon style={{ width: 18, height: 18, color: '#2DC55F', flexShrink: 0 }} />
                      <span style={{
                        fontSize: 7, fontWeight: 900, color: '#fff',
                        lineHeight: 1.2, maxWidth: r * 1.7,
                        textTransform: 'uppercase', letterSpacing: '0.03em',
                      }}>
                        {svc.title}
                      </span>
                    </div>
                  </foreignObject>

                  {/* hover label */}
                  <foreignObject
                    x={x - r} y={y - r}
                    width={imgBox} height={imgBox}
                    style={{ pointerEvents: 'none', overflow: 'visible' }}
                  >
                    <div
                      className="w-full h-full flex flex-col items-center justify-center text-center"
                      style={{ gap: 3, opacity: isHov ? 1 : 0, transition: 'opacity 0.4s ease 0.1s' }}
                    >
                      <span style={{
                        fontSize: 8, fontWeight: 900, color: '#2DC55F',
                        textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.2,
                      }}>
                        {svc.title}
                      </span>
                      <span style={{ fontSize: 6.5, color: '#cbd5e1', fontWeight: 600, lineHeight: 1.2 }}>
                        {svc.subtitle}
                      </span>
                    </div>
                  </foreignObject>
                </g>
              </Link>
            </g>
          );
        })}

        {/* ════════════════════════════════════
            CENTER — large flat-top hexagon
            ════════════════════════════════════ */}
        {(() => {
          const Icon = centerService.icon;
          const isHov = hoveredId === centerService.id;
          const r = CENTER_R;
          const imgBox = r * 2;

          return (
            <g
              onMouseEnter={() => { pausedRef.current = true; setHoveredId(centerService.id); }}
              onMouseLeave={() => { pausedRef.current = false; setHoveredId(null); }}
              style={{ cursor: 'pointer' }}
            >
              <Link href={`/services/${centerService.slug}`}>
                <g>
                  {/* outer pulsing hex ring */}
                  <polygon
                    points={hexPointsAt(MID, MID, r + 18)}
                    fill="none" stroke="#2DC55F" strokeWidth="1.5" strokeOpacity="0.25"
                    style={{ animation: 'pulse 2.8s cubic-bezier(0.4,0,0.6,1) infinite' }}
                  />
                  <polygon
                    points={hexPointsAt(MID, MID, r + 8)}
                    fill="none" stroke="#2DC55F" strokeWidth="1" strokeOpacity="0.45"
                  />

                  {/* main center hex */}
                  <polygon
                    points={hexPointsAt(MID, MID, r)}
                    fill="url(#oCenterBg)"
                    stroke="#2DC55F"
                    strokeWidth={isHov ? 3.5 : 2.5}
                    filter={isHov ? 'url(#oGlowStrong)' : 'url(#oGlow)'}
                  />

                  {/* image on hover */}
                  <image
                    href={centerService.image}
                    x={MID - r} y={MID - r}
                    width={imgBox} height={imgBox}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#cc-center)"
                    opacity={isHov ? 0.78 : 0}
                    style={{ transition: 'opacity 0.45s ease' }}
                  />
                  <polygon
                    points={hexPointsAt(MID, MID, r - 0.5)}
                    fill="#071324"
                    fillOpacity={isHov ? 0.6 : 0}
                    style={{ transition: 'fill-opacity 0.45s ease' }}
                  />

                  {/* default content */}
                  <foreignObject x={MID - r} y={MID - r} width={imgBox} height={imgBox}
                    style={{ pointerEvents: 'none', overflow: 'visible' }}>
                    <div
                      className="w-full h-full flex flex-col items-center justify-center text-center"
                      style={{ gap: 4, opacity: isHov ? 0 : 1, transition: 'opacity 0.3s ease' }}
                    >
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(45,197,95,0.18)', border: '1.5px solid rgba(45,197,95,0.6)',
                      }}>
                        <Icon style={{ width: 20, height: 20, color: '#2DC55F' }} />
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 900, color: '#2DC55F', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.2 }}>
                        TAX<br />ADVISORY
                      </span>
                      <span style={{ fontSize: 8, color: '#94a3b8', fontWeight: 600 }}>US • UK • PK</span>
                    </div>
                  </foreignObject>

                  {/* hover content */}
                  <foreignObject x={MID - r} y={MID - r} width={imgBox} height={imgBox}
                    style={{ pointerEvents: 'none', overflow: 'visible' }}>
                    <div
                      className="w-full h-full flex flex-col items-center justify-center text-center"
                      style={{ gap: 4, opacity: isHov ? 1 : 0, transition: 'opacity 0.4s ease 0.1s' }}
                    >
                      <span style={{ fontSize: 11, fontWeight: 900, color: '#2DC55F', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.2 }}>
                        TAX<br />ADVISORY
                      </span>
                      <span style={{ fontSize: 8.5, color: '#e2e8f0', fontWeight: 600 }}>US • UK • PK</span>
                      <span style={{ fontSize: 7.5, color: '#2DC55F', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
                        EXPLORE →
                      </span>
                    </div>
                  </foreignObject>
                </g>
              </Link>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}

// ─── Main ServicesShowcase with Slider ───────────────────────────────────────
type ViewMode = 'honeycomb' | 'football';

export default function ServicesShowcase() {
  const [view, setView] = useState<ViewMode>('honeycomb');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const switchView = (next: ViewMode) => {
    if (next === view) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setView(next);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="w-full">
      {/* ── View Toggle Slider ── */}
      <div className="flex justify-center mb-6">
        <div className="relative inline-flex items-center bg-[#071322]/80 border border-[#2DC55F]/20 rounded-2xl p-1.5 shadow-xl backdrop-blur-sm gap-1">
          {/* Sliding pill */}
          <div
            className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl bg-[#2DC55F] shadow-md shadow-[#2DC55F]/30 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ left: view === 'honeycomb' ? '6px' : 'calc(50% + 2px)' }}
          />
          {/* Honeycomb button */}
          <button
            onClick={() => switchView('honeycomb')}
            className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
          >
            <Hexagon
              className={`w-4 h-4 transition-colors duration-200 ${view === 'honeycomb' ? 'text-slate-900' : 'text-[#2DC55F]'}`}
            />
            <span
              className={`text-xs font-black uppercase tracking-widest transition-colors duration-200 ${view === 'honeycomb' ? 'text-slate-900' : 'text-slate-300'}`}
            >
              Honeycomb
            </span>
          </button>
          {/* Football button */}
          <button
            onClick={() => switchView('football')}
            className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
          >
            <Circle
              className={`w-4 h-4 transition-colors duration-200 ${view === 'football' ? 'text-slate-900' : 'text-[#2DC55F]'}`}
            />
            <span
              className={`text-xs font-black uppercase tracking-widest transition-colors duration-200 ${view === 'football' ? 'text-slate-900' : 'text-slate-300'}`}
            >
              Football
            </span>
          </button>
        </div>
      </div>

      {/* ── Animated View Container ── */}
      <div
        className="transition-all duration-300"
        style={{ opacity: isTransitioning ? 0 : 1, transform: isTransitioning ? 'scale(0.97)' : 'scale(1)' }}
      >
        {view === 'honeycomb' ? <HoneycombView /> : <Football2D />}
      </div>
    </div>
  );
}

