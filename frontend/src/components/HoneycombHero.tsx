'use client';

import React, { useState, useEffect, useRef } from 'react';
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
import { SERVICES } from '@/lib/data';

interface HexService {
  num: number;
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  icon: React.ElementType;
  image: string;
  cx: number;
  cy: number;
}

// Icon mapping according to service type or icon string
const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  FileText,
  Rocket: Building2,
  Building2,
  Building,
  Receipt,
  Users,
  Coins,
  Landmark,
  CreditCard,
  ShoppingBag,
  Truck,
  Globe,
};

// MATHEMATICALLY EXACT 19-HEXAGON HONEYCOMB (3-4-5-4-3 columns/rows):
// Ring 2 complete hexagon lattice centered at (CX, CY)
// Grid layout matches exact user diagram numbering 1 to 19:
//
//        [ 1]   [ 6]   [11]
//     [ 2]   [ 7]   [12]   [16]
//  [ 3]   [ 8]   [13]   [17]   [19]
//     [ 4]   [ 9]   [14]   [18]
//        [ 5]   [10]   [15]
//
const R = 70;
const dx = Math.sqrt(3) * R; // ~121.24px
const dy = 1.5 * R;          // 105px
const CX = 460;
const CY = 360;

// Coordinate mapping for 19 hexes
const HEX_GRID_LAYOUT = [
  { num: 1,  x: CX - 1.0 * dx, y: CY - 2.0 * dy },
  { num: 2,  x: CX - 1.5 * dx, y: CY - 1.0 * dy },
  { num: 3,  x: CX - 2.0 * dx, y: CY + 0.0 * dy },
  { num: 4,  x: CX - 1.5 * dx, y: CY + 1.0 * dy },
  { num: 5,  x: CX - 1.0 * dx, y: CY + 2.0 * dy },

  { num: 6,  x: CX + 0.0 * dx, y: CY - 2.0 * dy },
  { num: 7,  x: CX - 0.5 * dx, y: CY - 1.0 * dy },
  { num: 8,  x: CX - 1.0 * dx, y: CY + 0.0 * dy },
  { num: 9,  x: CX - 0.5 * dx, y: CY + 1.0 * dy },
  { num: 10, x: CX + 0.0 * dx, y: CY + 2.0 * dy },

  { num: 11, x: CX + 1.0 * dx, y: CY - 2.0 * dy },
  { num: 12, x: CX + 0.5 * dx, y: CY - 1.0 * dy },
  { num: 13, x: CX + 0.0 * dx, y: CY + 0.0 * dy }, // Dead Center
  { num: 14, x: CX + 0.5 * dx, y: CY + 1.0 * dy },
  { num: 15, x: CX + 1.0 * dx, y: CY + 2.0 * dy },

  { num: 16, x: CX + 1.5 * dx, y: CY - 1.0 * dy },
  { num: 17, x: CX + 1.0 * dx, y: CY + 0.0 * dy },
  { num: 18, x: CX + 1.5 * dx, y: CY + 1.0 * dy },

  { num: 19, x: CX + 2.0 * dx, y: CY + 0.0 * dy },
];

// Helper to compute SVG points string for a POINTED-TOP hexagon:
function getHexPoints(cx: number, cy: number, r: number): string {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angleRad = (Math.PI / 180) * (60 * i - 90);
    points.push(`${(cx + r * Math.cos(angleRad)).toFixed(2)},${(cy + r * Math.sin(angleRad)).toFixed(2)}`);
  }
  return points.join(' ');
}

export default function HoneycombHero() {
  const [hoveredHex, setHoveredHex] = useState<string | null>(null);
  const [autoHighlightedId, setAutoHighlightedId] = useState<string | null>(null);
  const isHoveredRef = useRef(false);

  // Dynamically load the first 19 services from service.json (or fallback from SERVICES)
  const hexServices: HexService[] = HEX_GRID_LAYOUT.map((pos, idx) => {
    const service = SERVICES[idx] || SERVICES[idx % SERVICES.length];
    const IconCmp = (service.icon && iconMap[service.icon]) || BookOpen;

    return {
      num: pos.num,
      id: service.slug || `service-${pos.num}`,
      title: service.title,
      subtitle: service.category ? `${service.category} Advisory` : 'Global Tax',
      slug: service.slug,
      icon: IconCmp,
      image: service.imageUrl || '/sevices/Tax%20Compliance%20&%20Filing%20Services.png',
      cx: pos.x,
      cy: pos.y,
    };
  });

  useEffect(() => {
    // Random / organic wind-like wave revealing images softly across tiles
    const ids = hexServices.map((s) => s.id);
    let lastId: string | null = null;

    const interval = setInterval(() => {
      if (isHoveredRef.current) {
        setAutoHighlightedId(null);
        return;
      }
      const available = ids.filter((id) => id !== lastId);
      const nextId = available[Math.floor(Math.random() * available.length)];
      lastId = nextId;
      setAutoHighlightedId(nextId);
    }, 2800);

    return () => clearInterval(interval);
  }, [hexServices]);

  return (
    <div className="relative w-full h-auto aspect-[650/590] max-h-[380px] sm:max-h-[500px] lg:max-h-[640px] flex items-center justify-center select-none overflow-visible mx-auto">
      {/* ─── Ambient Glow Layers blending into Hero section ───────────── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[520px] h-[280px] sm:h-[520px] bg-[#2DC55F]/15 rounded-full blur-[70px] sm:blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] sm:w-[300px] h-[180px] sm:h-[300px] bg-[#2DC55F]/20 rounded-full blur-[50px] sm:blur-[90px] pointer-events-none" />

      {/* ─── 19-Hex Pointed-Top Interlocking SVG Honeycomb ───────────── */}
      <div className="relative w-full max-w-[860px] h-full flex items-center justify-center z-10">
        <svg
          viewBox="135 65 650 590"
          className="w-full h-full max-h-[640px] drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Glowing neon filters */}
            <filter id="hexGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="intenseGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur1" />
              <feGaussianBlur stdDeviation="10" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Circuit line gradient */}
            <linearGradient id="circuitLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2DC55F" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#2DC55F" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#2DC55F" stopOpacity="0.05" />
            </linearGradient>

            {/* Default Tile Gradient */}
            <linearGradient id="tileBgNormal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0c1d33" />
              <stop offset="100%" stopColor="#071322" />
            </linearGradient>
            <linearGradient id="tileBgCenter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f2b4c" />
              <stop offset="100%" stopColor="#091b30" />
            </linearGradient>

            {/* Clip paths for each hexagon so service images clip cleanly to hex */}
            {hexServices.map((node) => (
              <clipPath key={`clip-${node.id}-${node.num}`} id={`clip-${node.num}`}>
                <polygon points={getHexPoints(node.cx, node.cy, R - 1.2)} />
              </clipPath>
            ))}
          </defs>

          {/* ── Outer High-Tech Circuit Radiations ────────────────────── */}
          <g opacity="0.45">
            <path
              d="M 460 360 L 460 70 M 460 360 L 780 120 M 460 360 L 780 600 M 460 360 L 460 650 M 460 360 L 140 600 M 460 360 L 140 120"
              stroke="url(#circuitLineGrad)"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              fill="none"
            />
            <circle cx="140" cy="120" r="3" fill="#2DC55F" filter="url(#hexGlow)" />
            <circle cx="780" cy="120" r="3" fill="#2DC55F" filter="url(#hexGlow)" />
            <circle cx="140" cy="600" r="3" fill="#2DC55F" filter="url(#hexGlow)" />
            <circle cx="780" cy="600" r="3" fill="#2DC55F" filter="url(#hexGlow)" />
          </g>

          {/* ── Background Shared Honeycomb Grid Joints ───────────────── */}
          <g stroke="#2DC55F" strokeWidth="2" strokeOpacity="0.25" fill="none">
            {hexServices.map((node) => (
              <polygon
                key={`wireframe-${node.num}`}
                points={getHexPoints(node.cx, node.cy, R + 0.8)}
              />
            ))}
          </g>

          {/* ── 19 Interactive Interlocking Honeycomb Cells ───────────── */}
          {[...hexServices]
            .sort((a, b) => {
              const aActive = hoveredHex === a.id || (!hoveredHex && autoHighlightedId === a.id);
              const bActive = hoveredHex === b.id || (!hoveredHex && autoHighlightedId === b.id);
              if (aActive) return 1;
              if (bActive) return -1;
              return 0;
            })
            .map((node) => {
              const Icon = node.icon;
              const isCenter = node.num === 13;
              const isUserHovered = hoveredHex === node.id;
              const isAutoActive = !hoveredHex && autoHighlightedId === node.id;
              const isHovered = isUserHovered || isAutoActive;
              const tileR = R - 1.2;

              return (
                <Link
                  key={`${node.id}-${node.num}`}
                  href={`/services/${node.slug}`}
                  passHref
                  legacyBehavior
                >
                  <g
                    onMouseEnter={() => {
                      isHoveredRef.current = true;
                      setHoveredHex(node.id);
                    }}
                    onMouseLeave={() => {
                      isHoveredRef.current = false;
                      setHoveredHex(null);
                    }}
                    className="cursor-pointer group"
                    style={{
                      transformOrigin: `${node.cx}px ${node.cy}px`,
                      transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.35s ease',
                      transform: isUserHovered
                        ? 'scale(1.10)'
                        : hoveredHex
                          ? 'scale(0.97)'
                          : 'scale(1)',
                    }}
                  >
                    {/* Hexagon Body Polygon */}
                    <polygon
                      points={getHexPoints(node.cx, node.cy, tileR)}
                      fill={isCenter ? 'url(#tileBgCenter)' : 'url(#tileBgNormal)'}
                      stroke={isHovered ? '#2DC55F' : isCenter ? '#2DC55F' : '#1e486b'}
                      strokeWidth={isHovered ? 3.5 : isCenter ? 2.5 : 1.5}
                      filter={isHovered ? 'url(#intenseGlow)' : isCenter ? 'url(#hexGlow)' : undefined}
                      className="transition-all duration-500 ease-in-out"
                    />

                    {/* Image overlay on hover */}
                    <g clipPath={`url(#clip-${node.num})`} className="transition-opacity duration-300">
                      <image
                        href={node.image}
                        x={node.cx - tileR}
                        y={node.cy - tileR}
                        width={tileR * 2}
                        height={tileR * 2}
                        preserveAspectRatio="xMidYMid slice"
                        className={`transition-opacity duration-700 ease-in-out pointer-events-none ${
                          isHovered ? 'opacity-85' : 'opacity-0'
                        }`}
                      />
                      {/* Dark gradient overlay on hover so text remains clean & crisp */}
                      <rect
                        x={node.cx - tileR}
                        y={node.cy - tileR}
                        width={tileR * 2}
                        height={tileR * 2}
                        className={`transition-opacity duration-300 fill-[#071324]/75 pointer-events-none ${
                          isHovered ? 'opacity-90' : 'opacity-0'
                        }`}
                      />
                    </g>

                    {/* Content Container */}
                    <foreignObject
                      x={node.cx - (tileR - 2)}
                      y={node.cy - (tileR - 2)}
                      width={(tileR - 2) * 2}
                      height={(tileR - 2) * 2}
                      className="pointer-events-none"
                    >
                      <div className="w-full h-full flex flex-col items-center justify-center p-1 text-center select-none">
                        {/* Icon */}
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-0.5 transition-all duration-300 ${
                            isHovered
                              ? 'bg-[#2DC55F] text-slate-950 shadow-md shadow-[#2DC55F]/60 scale-105'
                              : isCenter
                                ? 'bg-[#2DC55F] text-slate-950 shadow-md shadow-[#2DC55F]/30'
                                : 'bg-[#2DC55F]/15 text-[#2DC55F] border border-[#2DC55F]/40'
                          }`}
                        >
                          <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                        </div>

                        {/* Title */}
                        <span
                          className={`text-[11px] sm:text-[12px] font-black uppercase tracking-tight leading-tight px-1 transition-colors duration-200 line-clamp-2 ${
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
                        <span className="text-[9px] sm:text-[10px] text-slate-300 font-semibold tracking-tight line-clamp-1 mt-0.5">
                          {node.subtitle}
                        </span>

                        {/* Explore Prompt on Hover */}
                        <div
                          className={`mt-0.5 flex items-center gap-0.5 text-[9.5px] font-extrabold text-[#2DC55F] transition-all duration-200 ${
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
