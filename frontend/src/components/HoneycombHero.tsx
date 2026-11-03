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

interface HexService {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  icon: React.ElementType;
  image: string;
  cx: number;
  cy: number;
}

// 13 Services True Honeycomb Lattice matching the exact diagram (1-3-4-3-1 rows):
//
// Diagram Row Breakdown:
// Row 1 (top):    1 hexagon  (Col 0)
// Row 2:          3 hexagons (Col -1, Col 0, Col 1)
// Row 3 (middle): 4 hexagons (Col -1.5, Col -0.5, Col 0.5, Col 1.5)
// Row 4:          3 hexagons (Col -1, Col 0, Col 1)
// Row 5 (bottom): 1 hexagon  (Col 0)
// Total: 1 + 3 + 4 + 3 + 1 = 12? Wait:
// In the user's diagram:
// Row 1: 1 hex (center)
// Row 2: 3 hexes (staggered below row 1)
// Row 3: 4 hexes (staggered below row 2)
// Row 4: 4 hexes? Let's check:
// Looking at the black & white diagram:
// - Top-most: 1 hex at x=0, y=0.
// - Directly attached below it: 2 hexes, left and right?
// Wait! Let's check the vertices:
// The top hex has a bottom-left edge and bottom-right edge.
// A hexagon shares edges!
// In a standard pointed-top grid:
// If top hex is at (0, 0):
// Its bottom two neighbors are at (-w/2, +1.5R) and (+w/2, +1.5R).
// So row 2 has 2 hexes? But in the diagram:
// There is 1 hex on top.
// Below it, attached to its bottom-left and bottom-right edges, are 2 hexes. And next to them?
// Let's count the columns in the diagram:
// Col -2 (left-most): 2 hexes
// Col -1: 3 hexes
// Col 0 (center): 4 hexes (top one, middle two, bottom one)
// Col +1: 3 hexes
// Col +2 (right-most): 2 hexes
// Total = 2 + 3 + 4 + 3 + 2 = 14 hexes!
//
// Let's verify the exact positions in pointed-top coordinate math:
// R = 55
// dx = sqrt(3) * R = 95.26px
// dy = 1.5 * R = 82.5px
// Center is (340, 285)
//
// Col 0 (x = 340):
// - cy = 285 - 2*dy = 120 (Row 1 top peak)
// - cy = 285 - dy/something?
// With hexagonal tiling:
// If Col 0 has even rows: y = 285 - 2*dy (120), 285 (center? Wait, if 4 in col 0:
// they are at y = 285 - 3*dy/2, 285 - dy/2, 285 + dy/2, 285 + 3*dy/2)
// Let's check the top hex: it's on the centerline!
// If the top hex is on the centerline x = 340, then in pointed-top:
// Neighbors sharing edges are at x = 340 - dx/2, y = cy + dy, and x = 340 + dx/2, y = cy + dy!
// Then the next row has neighbors at x = 340 - dx, y = cy + 2*dy; x = 340, y = cy + 2*dy; x = 340 + dx, y = cy + 2*dy!
// Let's count how many hexes that produces:
// Level 0 (cy = 90):           1 hex  at x = 340
// Level 1 (cy = 90 + 82.5 = 172.5):  2 hexes at x = 340 - 47.6 (292.4), 340 + 47.6 (387.6)
// Level 2 (cy = 90 + 165 = 255):    3 hexes at x = 340 - 95.3 (244.7), 340, 340 + 95.3 (435.3)
// Level 3 (cy = 90 + 247.5 = 337.5): 4 hexes at x = 340 - 142.9 (197.1), 340 - 47.6 (292.4), 340 + 47.6 (387.6), 340 + 142.9 (482.9)
// But look at the diagram:
// The diagram is completely symmetric top-to-bottom and left-to-right!
// Let's look at the top and bottom of the diagram:
// - Top has ONE hex.
// - Bottom has ONE hex.
// - Left has TWO hexes (or three?).
// In the diagram:
// Look at the top hex.
// Directly below it is NOT an edge, it has TWO lower sloped edges.
// Connected to those two lower edges are TWO hexagons.
// Connected to their outer edges are TWO more hexagons!
// Wait! Look at Row 2 in the image:
// Row 2 has 3 hexagons: one directly under the left shoulder, one center-ish? No!
// Look at the black lines in media_1793710218937_81eda287.png:
// Top row: 1 hexagon.
// Its bottom-left edge connects to a hexagon.
// Its bottom-right edge connects to a hexagon.
// That's 2 hexagons in row 2.
// BUT look at the left and right: there is a hexagon to the upper-left and upper-right!
// Wait! Look at the top hexagon:
// Its left vertical edge connects to... nothing.
// Its top-left sloped edge connects to nothing.
// Its top-right sloped edge connects to nothing.
// Its right vertical edge connects to nothing.
// Its bottom-left sloped edge connects to a hexagon below-left.
// Its bottom-right sloped edge connects to a hexagon below-right.
// Look at the two hexagons flanking it:
// There is one to the far-left, one to the left-center, one to the right-center, one to the far-right!
// Wait, count the total hexagons in media_1793710218937_81eda287.png:
// Top: 1
// Next level down: 2 (under the top one) + 2 on the outer sides? Let's count them:
// Look at the vertical line of symmetry:
// Top: 1
// Next down on center: NO, there is a vertical edge on the center line!
// Wait! Look closely at the center of the diagram:
// THERE IS A HEXAGON RIGHT IN THE DEAD CENTER!
// Look at the center of the image:
// There is a central hexagon!
// Surrounding that central hexagon are 6 hexagons (the standard first ring of a honeycomb)!
// 1 center + 6 surrounding = 7 hexagons.
// Now look at the second ring:
// In a full 2-ring honeycomb, there are 1 + 6 + 12 = 19 hexagons.
// But here, some are omitted:
// Which ones are present?
// - Top-most: 1 hexagon (directly above the center? In pointed-top, directly above is at distance 2*dy = 3R). YES!
// - Bottom-most: 1 hexagon (directly below the center at distance 3R). YES!
// - Left-most: 2 hexagons!
// - Right-most: 2 hexagons!
// Let's count:
// 1 center
// + 6 (inner ring)
// + 1 (top peak)
// + 1 (bottom peak)
// + 2 (left side)
// + 2 (right side)
// Wait! 1 + 6 + 1 + 1 + 2 + 2 = 13 HEXAGONS!
// EXACTLY 13 HEXAGONS!
// Let's re-verify:
// In the diagram:
// - Center: 1 hexagon.
// - Inner ring of 6:
//   1. Top-Right: (cx + dx/2, cy - dy)
//   2. Right: wait, in pointed-top, the 6 neighbors of (0,0) are:
//      - (0 - dx/2, -dy)  -> Upper-Left
//      - (0 + dx/2, -dy)  -> Upper-Right
//      - (0 - dx, 0)      -> Direct Left
//      - (0 + dx, 0)      -> Direct Right
//      - (0 - dx/2, +dy)  -> Lower-Left
//      - (0 + dx/2, +dy)  -> Lower-Right
//   Wait! Do pointed-top hexagons have direct left and right neighbors?
//   In pointed-top hexagons, the VERTICAL edges are on the left and right!
//   YES! The left edge is vertical, the right edge is vertical!
//   So two pointed-top hexagons share a VERTICAL edge when placed side-by-side horizontally at (x + dx, y)!
//   YES! That is why they connect directly left and right at dx = sqrt(3)*R!
//   And the other 4 neighbors share the 4 slanted edges at (x ± dx/2, y ± 1.5R)!
//   YES! Pointed-top hexagons have:
//   - 2 horizontal neighbors: (x - dx, y) and (x + dx, y)
//   - 4 diagonal neighbors: (x - dx/2, y - 1.5R), (x + dx/2, y - 1.5R), (x - dx/2, y + 1.5R), (x + dx/2, y + 1.5R)
//   That's the 6 immediate neighbors of the center!
//
// Now look at the remaining 6 hexagons in the 13-hex diagram:
// 1. Top peak: directly above the two upper-diagonal neighbors!
//    Its center is at (x, y - 3R) = (0, -3R)!
//    It shares slanted edges with (x - dx/2, y - 1.5R) and (x + dx/2, y - 1.5R)!
// 2. Bottom peak: directly below the two lower-diagonal neighbors!
//    Its center is at (x, y + 3R) = (0, +3R)!
//    It shares slanted edges with (x - dx/2, y + 1.5R) and (x + dx/2, y + 1.5R)!
// 3. Left-upper: shares edge with direct left (x - dx, y) and upper-left (x - dx/2, y - 1.5R)!
//    Its center is at (x - 1.5*dx, y - 1.5R)? Wait:
//    (x - dx, y) has an upper-left slanted edge to (x - 1.5*dx, y - 0.75R) or:
//    From (x - dx, y), its upper-right neighbor is (x - dx/2, y - 1.5R).
//    Its upper-left neighbor is (x - 1.5*dx, y - 1.5R)? No, (x - dx) - dx/2 = x - 1.5*dx, y - 1.5R!
//    And (x - dx/2, y - 1.5R) has a direct-left neighbor at (x - dx/2 - dx, y - 1.5R) = (x - 1.5*dx, y - 1.5R)!
//    THEY SHARE AN EDGE!
//    So:
//    - Upper-Left outer: (x - 1.5*dx, y - 0.75R? No: in pointed-top, y step is always 1.5*R = dy)!
//      Wait, (x - dx, y) has diagonal neighbors at y ± 1.5*R, and x is (x - dx) ± dx/2!
//      So (x - 1.5*dx, y - 1.5*R) and (x - 1.5*dx, y + 1.5*R)!
//      Wait! If x is -1.5*dx, does that share the vertical edge?
//      No, the vertical edge is horizontal distance dx.
//
// Let's do the exact pointed-top hexagon math rigorously:
// For any pointed-top hexagon at (cx, cy):
// The 6 neighbors that share its 6 edges are:
// 1. Right:        (cx + dx, cy)             [shares vertical right edge]
// 2. Left:         (cx - dx, cy)             [shares vertical left edge]
// 3. Top-Right:    (cx + dx/2, cy - 1.5*R)   [shares top-right edge]
// 4. Top-Left:     (cx - dx/2, cy - 1.5*R)   [shares top-left edge]
// 5. Bottom-Right: (cx + dx/2, cy + 1.5*R)   [shares bottom-right edge]
// 6. Bottom-Left:  (cx - dx/2, cy + 1.5*R)   [shares bottom-left edge]
//
// THIS IS 100% MATHEMATICALLY EXACT FOR POINTED-TOP HEXAGONS!
// Every edge length is R.
// Width = dx = sqrt(3)*R.
// Height = 2*R.
// Vertical step dy = 1.5*R.
// Horizontal step for diagonal neighbors = dx/2 = (sqrt(3)/2)*R.
// Horizontal step for direct side neighbors = dx = sqrt(3)*R.

// MATHEMATICALLY EXACT POINTED-TOP HONEYCOMB COORDINATES:
// R = 84 (Significant enlargement for maximum readability, high impact & visual clarity)
// dx = sqrt(3) * R = 145.49px
// dy = 1.5 * R = 126px
// CX = 460, CY = 360
// Total Width: ~940px, Total Height: ~740px
// viewBox: "10 90 900 540"
const R = 100;
const dx = Math.sqrt(3) * R; // 145.49px
const dy = 1.5 * R;          // 126px
const CX = 450;
const CY = 360;

const HEX_SERVICES: HexService[] = [
  // ── Row 1: Top Peak (1 node: y = CY - 2*dy = 108) ─────────────────
  {
    id: 'global-tax',
    title: 'GLOBAL TAX',
    subtitle: 'Cross-Border Hub',
    slug: 'us-tax-compliance-filing-services',
    icon: Globe,
    image: '/sevices/Tax%20Compliance%20&%20Filing%20Services.png',
    cx: CX,
    cy: CY - 2 * dy,
  },

  // ── Row 2: Upper Tier (4 nodes: y = CY - dy = 234) ────────────────
  {
    id: 'ecommerce',
    title: 'E-COMMERCE',
    subtitle: 'Amazon & Shopify',
    slug: 'e-commerce-accounting-tax-services-us',
    icon: ShoppingBag,
    image: '/sevices/E-Commerce%20Accounting%20&%20Tax%20Services%20(US).png',
    cx: CX - 1.5 * dx,
    cy: CY - dy,
  },
  {
    id: 'bookkeeping',
    title: 'BOOKKEEPING',
    subtitle: 'QuickBooks & Xero',
    slug: 'bookkeeping-accounting-services',
    icon: BookOpen,
    image: '/sevices/Bookkeeping%20&%20Tax%20Compliance.png',
    cx: CX - 0.5 * dx,
    cy: CY - dy,
  },
  {
    id: 'us-formation',
    title: 'US LLC SETUP',
    subtitle: 'Delaware & WY',
    slug: 'startup-business-formation-usa',
    icon: Building2,
    image: '/sevices/UK%20Company%20Formation%20&%20Compliance.png',
    cx: CX + 0.5 * dx,
    cy: CY - dy,
  },
  {
    id: 'provincial-tax',
    title: 'SALES TAX (PK)',
    subtitle: 'PRA / SRB / KPRA',
    slug: 'sales-tax-pra-srb-fbr-pakistan',
    icon: Landmark,
    image: '/sevices/Provincial%20Sales%20Tax%20PRA%20SRB%20KPRA%20(Pakistan).png',
    cx: CX + 1.5 * dx,
    cy: CY - dy,
  },

  // ── Row 3: Middle Tier (3 nodes: y = CY = 360) ────────────────────
  {
    id: 'uk-vat',
    title: 'UK VAT & MTD',
    subtitle: 'HMRC Digital Filing',
    slug: 'uk-vat-registration-compliance',
    icon: Receipt,
    image: '/sevices/UK%20VAT%20Registration%20&%20Compliance.jpg',
    cx: CX - dx,
    cy: CY,
  },
  {
    id: 'center',
    title: 'TAX ADVISORY',
    subtitle: 'US • UK • PK',
    slug: 'us-tax-compliance-filing-services',
    icon: Globe,
    image: '/sevices/Tax%20Compliance%20&%20Filing%20Services.png',
    cx: CX,
    cy: CY,
  },
  {
    id: 'us-sales-tax',
    title: 'US SALES TAX',
    subtitle: 'Multi-State Nexus',
    slug: 'us-sales-use-tax-compliance',
    icon: Coins,
    image: '/sevices/US%20Sales%20&%20Use%20Tax%20Compliance.png',
    cx: CX + dx,
    cy: CY,
  },

  // ── Row 4: Lower Tier (4 nodes: y = CY + dy = 486) ────────────────
  {
    id: 'uk-formation',
    title: 'UK LTD SETUP',
    subtitle: 'Companies House',
    slug: 'uk-company-formation-compliance-services',
    icon: Building,
    image: '/sevices/UK%20Company%20Formation%20&%20Compliance.png',
    cx: CX - 1.5 * dx,
    cy: CY + dy,
  },
  {
    id: 'uk-tax',
    title: 'UK CT600 TAX',
    subtitle: 'Corporation Tax',
    slug: 'uk-tax-compliance-filing-services',
    icon: FileText,
    image: '/sevices/UK%20Tax%20Compliance%20&%20Filing%20Services.png',
    cx: CX - 0.5 * dx,
    cy: CY + dy,
  },
  {
    id: 'payroll',
    title: 'PAYROLL & HR',
    subtitle: 'Form 941 & W-2',
    slug: 'payroll-tax-management',
    icon: Users,
    image: '/sevices/Payroll%20Tax%20Management.png',
    cx: CX + 0.5 * dx,
    cy: CY + dy,
  },
  {
    id: 'real-estate',
    title: 'REAL ESTATE',
    subtitle: 'Rental & 1031',
    slug: 'real-estate-financial-tax-services-us',
    icon: Building,
    image: '/sevices/Real%20Estate%20Financial%20&%20Tax%20Services.png',
    cx: CX + 1.5 * dx,
    cy: CY + dy,
  },

  // ── Row 5: Bottom Peak (1 node: y = CY + 2*dy = 612) ──────────────
  {
    id: 'fbr-pk',
    title: 'FBR & NTN',
    subtitle: 'Active Taxpayer (ATL)',
    slug: 'fbr-tax-filing-ntn-registration-pakistan',
    icon: Receipt,
    image: '/sevices/FBR%20Income%20Tax%20%26%20NTN%20Registration%20(Pakistan).png',
    cx: CX,
    cy: CY + 2 * dy,
  },
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

  useEffect(() => {
    // Random / organic wind-like wave revealing images softly across tiles
    const ids = HEX_SERVICES.map((s) => s.id);
    let lastId: string | null = null;

    const interval = setInterval(() => {
      if (isHoveredRef.current) {
        setAutoHighlightedId(null);
        return;
      }
      // Pick random service different from the previous one
      const available = ids.filter((id) => id !== lastId);
      const nextId = available[Math.floor(Math.random() * available.length)];
      lastId = nextId;
      setAutoHighlightedId(nextId);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[580px] flex items-center justify-center select-none">
      {/* ─── Ambient Glow Layers blending into Hero section ───────────── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[#2DC55F]/15 rounded-full blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] bg-[#2DC55F]/25 rounded-full blur-[80px] pointer-events-none" />

      {/* ─── Large Pointed-Top Interlocking SVG Honeycomb ───────────── */}
      <div className="relative w-full max-w-[760px] h-full flex items-center justify-center z-10">
        <svg
          viewBox="70 -40 760 800"
          className="w-full h-full max-h-[580px] drop-shadow-2xl overflow-visible"
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
            {HEX_SERVICES.map((node) => (
              <clipPath key={`clip-${node.id}`} id={`clip-${node.id}`}>
                <polygon points={getHexPoints(node.cx, node.cy, R - 1.5)} />
              </clipPath>
            ))}
          </defs>

          {/* ── Outer High-Tech Circuit Radiations ────────────────────── */}
          <g opacity="0.55">
            <path
              d="M 450 360 L 450 10 M 450 360 L 760 100 M 450 360 L 760 620 M 450 360 L 450 710 M 450 360 L 140 620 M 450 360 L 140 100"
              stroke="url(#circuitLineGrad)"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              fill="none"
            />
            <circle cx="140" cy="100" r="3" fill="#2DC55F" filter="url(#hexGlow)" />
            <circle cx="760" cy="100" r="3" fill="#2DC55F" filter="url(#hexGlow)" />
            <circle cx="140" cy="620" r="3" fill="#2DC55F" filter="url(#hexGlow)" />
            <circle cx="760" cy="620" r="3" fill="#2DC55F" filter="url(#hexGlow)" />





          </g>

          {/* ── Background Shared Honeycomb Grid Joints ───────────────── */}
          <g stroke="#2DC55F" strokeWidth="2" strokeOpacity="0.3" fill="none">
            {HEX_SERVICES.map((node) => (
              <polygon
                key={`wireframe-${node.id}`}
                points={getHexPoints(node.cx, node.cy, R + 0.8)}
              />
            ))}
          </g>

          {/* ── 15 Interactive Interlocking Honeycomb Cells ───────────── */}
          {[...HEX_SERVICES]
            .sort((a, b) => {
              // Bring the hovered/active tile to the front of DOM so no adjacent tile covers its borders
              const aActive = hoveredHex === a.id || (!hoveredHex && autoHighlightedId === a.id);
              const bActive = hoveredHex === b.id || (!hoveredHex && autoHighlightedId === b.id);
              if (aActive) return 1;
              if (bActive) return -1;
              return 0;
            })
            .map((node) => {
              const Icon = node.icon;
              const isCenter = node.id === 'center';
              const isUserHovered = hoveredHex === node.id;
              const isAutoActive = !hoveredHex && autoHighlightedId === node.id;
              const isHovered = isUserHovered || isAutoActive;
              const tileR = R - 1.2;

              return (
                <Link
                  key={node.id}
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
                      /* Zoom ONLY when user physically hovers; in auto-wind mode keep scale 1.00 */
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

                  {/* USER REQUEST: "when i hower then show images" */}
                  <g clipPath={`url(#clip-${node.id})`} className="transition-opacity duration-300">
                    <image
                      href={node.image}
                      x={node.cx - tileR}
                      y={node.cy - tileR}
                      width={tileR * 2}
                      height={tileR * 2}
                      preserveAspectRatio="xMidYMid slice"
                      className={`transition-opacity duration-700 ease-in-out pointer-events-none ${isHovered ? 'opacity-85' : 'opacity-0'
                        }`}
                    />
                    {/* Dark gradient overlay on hover so text is super crisp */}
                    <rect
                      x={node.cx - tileR}
                      y={node.cy - tileR}
                      width={tileR * 2}
                      height={tileR * 2}
                      className={`transition-opacity duration-300 fill-[#071324]/75 pointer-events-none ${isHovered ? 'opacity-90' : 'opacity-0'
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
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-1 transition-all duration-300 ${isHovered
                          ? 'bg-[#2DC55F] text-slate-950 shadow-md shadow-[#2DC55F]/60 scale-110'
                          : isCenter
                            ? 'bg-[#2DC55F] text-slate-950 shadow-md shadow-[#2DC55F]/30'
                            : 'bg-[#2DC55F]/15 text-[#2DC55F] border border-[#2DC55F]/40'
                          }`}
                      >
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                      </div>

                      {/* Title */}
                      <span
                        className={`text-[15px] sm:text-[17px] font-black uppercase tracking-tight leading-tight transition-colors duration-200 ${isHovered
                          ? 'text-[#2DC55F]'
                          : isCenter
                            ? 'text-[#2DC55F]'
                            : 'text-white'
                          }`}
                      >
                        {node.title}
                      </span>

                      {/* Subtitle */}
                      <span className="text-[12px] sm:text-[13px] text-slate-300 font-semibold tracking-tight line-clamp-1 mt-0.5">
                        {node.subtitle}
                      </span>

                      {/* Explore Action Prompt on Hover */}
                      <div
                        className={`mt-1 flex items-center gap-0.5 text-[11.5px] font-extrabold text-[#2DC55F] transition-all duration-200 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                          }`}
                      >
                        <span>EXPLORE</span>
                        <ExternalLink className="w-3.5 h-3.5" />
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
