'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  icon: React.ElementType;
  image: string;
}

const SERVICES_LIST: ServiceItem[] = [
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
    image: '/sevices/Bookkeeping%20&%20Tax%20Compliance.png',
  },
  {
    id: 'us-formation',
    title: 'US LLC SETUP',
    subtitle: 'Delaware & WY',
    slug: 'startup-business-formation-usa',
    icon: Building2,
    image: '/sevices/UK%20Company%20Formation%20&%20Compliance.png',
  },
  {
    id: 'sales-tax-pk',
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
    image: '/sevices/UK%20VAT%20Registration%20&%20Compliance.jpg',
  },
  {
    id: 'center-tax',
    title: 'TAX ADVISORY',
    subtitle: 'US • UK • PK',
    slug: 'us-tax-compliance-filing-services',
    icon: Globe,
    image: '/sevices/US%20Tax%20Compliance%20%26%20Filing%20Services.png',
  },
  {
    id: 'us-sales-tax',
    title: 'US SALES TAX',
    subtitle: 'Multi-State Nexus',
    slug: 'us-sales-use-tax-compliance',
    icon: Coins,
    image: '/sevices/US%20Sales%20&%20Use%20Tax%20Compliance.png',
  },
  {
    id: 'uk-formation',
    title: 'UK LTD SETUP',
    subtitle: 'Companies House',
    slug: 'uk-company-formation-compliance-services',
    icon: Building,
    image: '/sevices/UK%20Company%20Formation%20&%20Compliance.png',
  },
  {
    id: 'uk-tax',
    title: 'UK CT600 TAX',
    subtitle: 'Corporation Tax',
    slug: 'uk-tax-compliance-filing-services',
    icon: FileText,
    image: '/sevices/UK%20Tax%20Compliance%20&%20Filing%20Services.png',
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
    image: '/sevices/Real%20Estate%20Financial%20&%20Tax%20Services.png',
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
    image: '/sevices/Logistics%20&%20Transport%20Accounting%20&%20Tax%20Support.jpg',
  },
  {
    id: 'banking',
    title: 'VIRTUAL BANKING',
    subtitle: 'Mercury & Wise',
    slug: 'virtual-bank-accounts-payment-solutions',
    icon: CreditCard,
    image: '/sevices/Virtual%20Bank%20Accounts%20&%20Payment%20Solutions.png',
  },
  {
    id: 'secp-advisory',
    title: 'SECP ADVISORY',
    subtitle: 'Corporate Filings',
    slug: 'secp-company-incorporation-pakistan',
    icon: Building2,
    image: '/sevices/SECP%20Company%20Incorporation%20(Pakistan).png',
  },
];

// ─── Mathematical Precomputation of 32 Faces of Truncated Icosahedron ───
interface RawFace {
  id: number;
  type: 'pentagon' | 'hexagon';
  center: [number, number, number];
  vertIndices: number[];
}

function initGeometry() {
  const phi = (1 + Math.sqrt(5)) / 2;
  const bases = [
    [0, 1, 3 * phi],
    [1, 2 + phi, 2 * phi],
    [phi, 2, 2 * phi + 1]
  ];
  const raw: [number, number, number][] = [];
  const seen: Record<string, number> = {};

  bases.forEach((b) => {
    for (let k = 0; k < 3; k++) {
      const p = [b[k % 3], b[(k + 1) % 3], b[(k + 2) % 3]];
      [1, -1].forEach((sx) => {
        [1, -1].forEach((sy) => {
          [1, -1].forEach((sz) => {
            const v: [number, number, number] = [p[0] * sx, p[1] * sy, p[2] * sz];
            const id = v.map((n) => n.toFixed(3)).join(',');
            if (!seen[id]) {
              seen[id] = 1;
              raw.push(v);
            }
          });
        });
      });
    }
  });

  const verts = raw.map((v) => {
    const l = Math.hypot(v[0], v[1], v[2]);
    return [v[0] / l, v[1] / l, v[2] / l] as [number, number, number];
  });

  // 12 pentagon centers
  const pentagonCenters: [number, number, number][] = [];
  [[0, 1, phi], [1, phi, 0], [phi, 0, 1]].forEach((b) => {
    [1, -1].forEach((sa) => {
      [1, -1].forEach((sb) => {
        let c: [number, number, number] = [0, 0, 0];
        if (b[0] === 0) c = [0, b[1] * sa, b[2] * sb];
        else if (b[1] === 0) c = [b[0] * sa, 0, b[2] * sb];
        else c = [b[0] * sa, b[1] * sb, 0];
        const l = Math.hypot(...c);
        c = [c[0] / l, c[1] / l, c[2] / l];
        if (!pentagonCenters.some((o) => Math.hypot(o[0] - c[0], o[1] - c[1], o[2] - c[2]) < 0.01)) {
          pentagonCenters.push(c);
        }
      });
    });
  });

  // 20 hexagon centers
  const hexCenters: [number, number, number][] = [];
  for (let i = 0; i < pentagonCenters.length; i++) {
    for (let j = i + 1; j < pentagonCenters.length; j++) {
      if (Math.hypot(pentagonCenters[i][0] - pentagonCenters[j][0], pentagonCenters[i][1] - pentagonCenters[j][1], pentagonCenters[i][2] - pentagonCenters[j][2]) < 1.1) {
        for (let k = j + 1; k < pentagonCenters.length; k++) {
          if (
            Math.hypot(pentagonCenters[i][0] - pentagonCenters[k][0], pentagonCenters[i][1] - pentagonCenters[k][1], pentagonCenters[i][2] - pentagonCenters[k][2]) < 1.1 &&
            Math.hypot(pentagonCenters[j][0] - pentagonCenters[k][0], pentagonCenters[j][1] - pentagonCenters[k][1], pentagonCenters[j][2] - pentagonCenters[k][2]) < 1.1
          ) {
            let hc: [number, number, number] = [
              pentagonCenters[i][0] + pentagonCenters[j][0] + pentagonCenters[k][0],
              pentagonCenters[i][1] + pentagonCenters[j][1] + pentagonCenters[k][1],
              pentagonCenters[i][2] + pentagonCenters[j][2] + pentagonCenters[k][2]
            ];
            const l = Math.hypot(...hc);
            hc = [hc[0] / l, hc[1] / l, hc[2] / l];
            if (!hexCenters.some((o) => Math.hypot(o[0] - hc[0], o[1] - hc[1], o[2] - hc[2]) < 0.05)) {
              hexCenters.push(hc);
            }
          }
        }
      }
    }
  }

  const faces: RawFace[] = [];
  let faceId = 0;

  pentagonCenters.forEach((c) => {
    const closest = verts
      .map((v, idx) => ({ idx, dot: v[0] * c[0] + v[1] * c[1] + v[2] * c[2] }))
      .sort((a, b) => b.dot - a.dot)
      .slice(0, 5);

    const u = [c[1], -c[0], 0];
    const lu = Math.hypot(...u) || 1;
    const un = [u[0] / lu, u[1] / lu, u[2] / lu];
    const wn = [c[1] * un[2] - c[2] * un[1], c[2] * un[0] - c[0] * un[2], c[0] * un[1] - c[1] * un[0]];

    const sorted = closest.slice().sort((a, b) => {
      const va = verts[a.idx];
      const vb = verts[b.idx];
      const da = Math.atan2(va[0] * wn[0] + va[1] * wn[1] + va[2] * wn[2], va[0] * un[0] + va[1] * un[1] + va[2] * un[2]);
      const db = Math.atan2(vb[0] * wn[0] + vb[1] * wn[1] + vb[2] * wn[2], vb[0] * un[0] + vb[1] * un[1] + vb[2] * un[2]);
      return da - db;
    });

    faces.push({
      id: faceId++,
      type: 'pentagon',
      center: c,
      vertIndices: sorted.map((s) => s.idx)
    });
  });

  hexCenters.forEach((c) => {
    const closest = verts
      .map((v, idx) => ({ idx, dot: v[0] * c[0] + v[1] * c[1] + v[2] * c[2] }))
      .sort((a, b) => b.dot - a.dot)
      .slice(0, 6);

    const u = [c[1], -c[0], 0];
    const lu = Math.hypot(...u) || 1;
    const un = [u[0] / lu, u[1] / lu, u[2] / lu];
    const wn = [c[1] * un[2] - c[2] * un[1], c[2] * un[0] - c[0] * un[2], c[0] * un[1] - c[1] * un[0]];

    const sorted = closest.slice().sort((a, b) => {
      const va = verts[a.idx];
      const vb = verts[b.idx];
      const da = Math.atan2(va[0] * wn[0] + va[1] * wn[1] + va[2] * wn[2], va[0] * un[0] + va[1] * un[1] + va[2] * un[2]);
      const db = Math.atan2(vb[0] * wn[0] + vb[1] * wn[1] + vb[2] * wn[2], vb[0] * un[0] + vb[1] * un[1] + vb[2] * un[2]);
      return da - db;
    });

    faces.push({
      id: faceId++,
      type: 'hexagon',
      center: c,
      vertIndices: sorted.map((s) => s.idx)
    });
  });

  return { verts, faces };
}

// ─── 3D Spherical Coordinate Rotation ───
function rotatePoint(p: [number, number, number], rotX: number, rotY: number): [number, number, number] {
  // Y-axis rotation (left / right)
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
  const x1 = p[0] * cosY + p[2] * sinY;
  const y1 = p[1];
  const z1 = -p[0] * sinY + p[2] * cosY;

  // X-axis rotation (up / down)
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
  const x2 = x1;
  const y2 = y1 * cosX - z1 * sinX;
  const z2 = y1 * sinX + z1 * cosX;

  return [x2, y2, z2];
}

const BALL_RADIUS = 310;
const CENTER_X = 380;
const CENTER_Y = 380;

export default function Football2D() {
  const { verts, faces } = useMemo(() => initGeometry(), []);

  // Ball rotation angles (Spherical roll)
  const [rotX, setRotX] = useState(0.25);
  const [rotY, setRotY] = useState(0);

  const [hoveredFaceId, setHoveredFaceId] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ vx: 0, vy: 0.006 });
  const animFrameRef = useRef<number | null>(null);

  // Smooth continuous rolling loop
  const animate = useCallback(() => {
    if (!isDragging && !isPaused) {
      setRotY((prev) => (prev + velocityRef.current.vy) % (Math.PI * 2));
      setRotX((prev) => (prev + velocityRef.current.vx) % (Math.PI * 2));

      // Gentle inertia deceleration towards slow roll
      velocityRef.current.vy += (0.006 - velocityRef.current.vy) * 0.04;
      velocityRef.current.vx += (0 - velocityRef.current.vx) * 0.04;
    }
    animFrameRef.current = requestAnimationFrame(animate);
  }, [isDragging, isPaused]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [animate]);

  // ── USER REQUEST: "when i move mouse upward it move down when i move down ward it move up" ──
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    // Inverted deltaY so moving/scrolling upward moves the ball down, downward moves the ball up!
    setRotY((prev) => prev + e.deltaX * 0.004 + (Math.abs(e.deltaX) < 1 ? e.deltaY * 0.003 : 0));
    setRotX((prev) => prev + e.deltaY * 0.004);
  };

  // Drag handlers: Inverted dy so moving mouse upward moves down, downward moves up!
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPointerRef.current.x;
    const dy = e.clientY - lastPointerRef.current.y;

    // Direct horizontal roll, inverted vertical roll (mouse up -> ball down, mouse down -> ball up)
    setRotY((prev) => prev + dx * 0.008);
    setRotX((prev) => prev + dy * 0.008);

    velocityRef.current = { vx: dy * 0.002, vy: dx * 0.002 };
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  // ── Project vertices through spherical rotation (Spherical Curvature Distortion for perfect round ball fit) ──
  const rotatedVerts = useMemo(() => {
    return verts.map((v) => {
      const [rx, ry, rz] = rotatePoint(v, rotX, rotY);
      // Normalized spherical projection so every edge strictly stays within BALL_RADIUS
      const xyDist = Math.hypot(rx, ry);
      const sphereFactor = xyDist > 0 ? Math.sin((Math.min(xyDist, 1) * Math.PI) / 2) / xyDist : 1;

      return {
        x: CENTER_X + rx * sphereFactor * BALL_RADIUS,
        y: CENTER_Y - ry * sphereFactor * BALL_RADIUS,
        z: rz,
      };
    });
  }, [verts, rotX, rotY]);

  // ── Project and sort all 32 faces (Front-facing z > 0) ──
  const visibleFaces = useMemo(() => {
    return faces
      .map((face) => {
        const rc = rotatePoint(face.center, rotX, rotY);
        // Repeated services cycled across the 32 panels
        const service = SERVICES_LIST[face.id % SERVICES_LIST.length];

        const pts = face.vertIndices.map((idx) => rotatedVerts[idx]);
        const pointsString = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

        const xs = pts.map((p) => p.x);
        const ys = pts.map((p) => p.y);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        const polyW = Math.max(1, maxX - minX);
        const polyH = Math.max(1, maxY - minY);

        const xyDist = Math.hypot(rc[0], rc[1]);
        const sphereFactor = xyDist > 0 ? Math.sin((Math.min(xyDist, 1) * Math.PI) / 2) / xyDist : 1;
        const centerX = CENTER_X + rc[0] * sphereFactor * BALL_RADIUS;
        const centerY = CENTER_Y - rc[1] * sphereFactor * BALL_RADIUS;

        return {
          id: face.id,
          type: face.type,
          z: rc[2],
          cx: centerX,
          cy: centerY,
          minX,
          minY,
          polyW,
          polyH,
          points: pointsString,
          service,
        };
      })
      .filter((f) => f.z > 0.05) // Strict front visible hemisphere so no background bleeding occurs
      .sort((a, b) => a.z - b.z); // Depth ordering
  }, [faces, rotatedVerts, rotX, rotY]);

  // Identify the front-most face (closest to the viewer center)
  const frontmostFace = useMemo(() => {
    if (!visibleFaces.length) return null;
    let best = visibleFaces[0];
    let maxZ = -Infinity;
    for (const f of visibleFaces) {
      if (f.z > maxZ) {
        maxZ = f.z;
        best = f;
      }
    }
    return best;
  }, [visibleFaces]);

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setHoveredFaceId(null);
      }}
      className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'none' }}
    >
      {/* ── Ambient Glow Layers (Exactly like Honeycomb) ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] bg-[#2DC55F]/15 rounded-full blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] bg-[#2DC55F]/25 rounded-full blur-[80px] pointer-events-none" />

      {/* ── Seamless Rolling Football SVG ── */}
      <div className="relative w-full max-w-[760px] h-full flex items-center justify-center z-10 pointer-events-none">
        <svg
          viewBox="40 40 680 680"
          className="w-full h-full max-h-[640px] drop-shadow-2xl overflow-visible pointer-events-auto"
        >
          <defs>
            {/* Exact Honeycomb Glow Filters */}
            <filter id="rollGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="rollIntenseGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur1" />
              <feGaussianBlur stdDeviation="10" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Exact Honeycomb Dark Gradient Fill (#0c1d33 -> #071322) */}
            <linearGradient id="rollTileBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0c1d33" />
              <stop offset="100%" stopColor="#071322" />
            </linearGradient>

            <linearGradient id="rollPentagonBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f2b4c" />
              <stop offset="100%" stopColor="#091b30" />
            </linearGradient>

            {/* Circular Clip for Ball Silhouette */}
            <clipPath id="ballCircleClip">
              <circle cx={CENTER_X} cy={CENTER_Y} r={BALL_RADIUS - 1} />
            </clipPath>

            {/* Per-face Image Patterns (Exact polygon fill, impossible to overflow polygon) */}
            {visibleFaces.map((f) => (
              <pattern
                key={`img-pat-${f.id}`}
                id={`img-pat-${f.id}`}
                patternUnits="userSpaceOnUse"
                x={f.minX}
                y={f.minY}
                width={f.polyW}
                height={f.polyH}
              >
                <image
                  href={f.service.image}
                  x={0}
                  y={0}
                  width={f.polyW}
                  height={f.polyH}
                  preserveAspectRatio="xMidYMid slice"
                />
                {/* Dark contrast scrim so text & icons are always clear */}
                <rect x={0} y={0} width={f.polyW} height={f.polyH} fill="#071324" fillOpacity="0.72" />
              </pattern>
            ))}
          </defs>

          {/* ── Football Deep Background Sphere ── */}
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={BALL_RADIUS}
            fill="#061220"
          />

          {/* ── Ball Faces Group (Clipped to clean round sphere boundary) ── */}
          <g clipPath="url(#ballCircleClip)">
            {/* Background Wireframe Mesh Lines */}
            <g stroke="#1e486b" strokeWidth="2" strokeOpacity="0.6" fill="none">
              {visibleFaces.map((f) => (
                <polygon key={`wire-${f.id}`} points={f.points} />
              ))}
            </g>

            {/* ── All Visible Faces (Interlocking, rolling in 3D direction) ── */}
            {visibleFaces.map((f) => {
              const Icon = f.service.icon;
              // User mouse hover takes priority; otherwise the frontmost face facing user has hover effect
              const isFrontFace = frontmostFace?.id === f.id;
              const isHovered = hoveredFaceId !== null ? hoveredFaceId === f.id : isFrontFace;
              const isPentagon = f.type === 'pentagon';

              // Perspective scale factor based on z-depth
              const scaleFactor = Math.max(0.4, (f.z + 1.2) / 2.2);
              const isFront = f.z > 0.35; // readable threshold

              return (
                <Link
                  key={f.id}
                  href={`/services/${f.service.slug}`}
                  passHref
                  legacyBehavior
                >
                  <g
                    onMouseEnter={() => setHoveredFaceId(f.id)}
                    onMouseLeave={() => setHoveredFaceId(null)}
                    className="cursor-pointer group"
                  >
                    {/* Base Solid Face Polygon */}
                    <polygon
                      points={f.points}
                      fill={isPentagon ? 'url(#rollPentagonBg)' : 'url(#rollTileBg)'}
                    />

                    {/* Image Hover Layer: fills EXACT polygon shape via SVG pattern! */}
                    <polygon
                      points={f.points}
                      fill={`url(#img-pat-${f.id})`}
                      className="transition-opacity duration-500 ease-in-out pointer-events-none"
                      style={{
                        opacity: isHovered ? 0.95 : 0,
                      }}
                    />

                    {/* Face Seam / Border Outline */}
                    <polygon
                      points={f.points}
                      fill="none"
                      stroke={isHovered ? '#2DC55F' : isPentagon ? '#2DC55F' : '#1e486b'}
                      strokeWidth={isHovered ? 3.5 : isPentagon ? 2.2 : 1.6}
                      filter={isHovered ? 'url(#rollIntenseGlow)' : undefined}
                      className="transition-colors duration-300"
                    />

                    {/* Content (Rendered clearly on front-facing tiles) */}
                    {isFront && (
                      <foreignObject
                        x={f.cx - 65 * scaleFactor}
                        y={f.cy - 65 * scaleFactor}
                        width={130 * scaleFactor}
                        height={130 * scaleFactor}
                        className="pointer-events-none"
                        style={{
                          opacity: Math.max(0.2, (f.z - 0.2) / 0.8),
                        }}
                      >
                        <div className="w-full h-full flex flex-col items-center justify-center p-0.5 text-center select-none">
                          {/* Circular Icon Badge */}
                          <div
                            className={`rounded-full flex items-center justify-center mb-0.5 transition-all duration-300 ${isHovered
                                ? 'bg-[#2DC55F] text-slate-950 shadow-md shadow-[#2DC55F]/60 scale-110'
                                : isPentagon
                                  ? 'bg-[#2DC55F]/20 text-[#2DC55F] border border-[#2DC55F]/40'
                                  : 'bg-[#2DC55F]/15 text-[#2DC55F] border border-[#2DC55F]/35'
                              }`}
                            style={{
                              width: `${34 * scaleFactor}px`,
                              height: `${34 * scaleFactor}px`,
                            }}
                          >
                            <Icon style={{ width: `${18 * scaleFactor}px`, height: `${18 * scaleFactor}px` }} />
                          </div>

                          {/* Title */}
                          <span
                            className={`font-black uppercase tracking-tight leading-tight transition-colors duration-200 ${isHovered ? 'text-[#2DC55F]' : 'text-white'
                              }`}
                            style={{ fontSize: `${Math.max(8.5, 12 * scaleFactor)}px` }}
                          >
                            {f.service.title}
                          </span>

                          {/* Subtitle */}
                          <span
                            className="text-slate-300 font-semibold tracking-tight line-clamp-1 mt-0.5"
                            style={{ fontSize: `${Math.max(7, 9.5 * scaleFactor)}px` }}
                          >
                            {f.service.subtitle}
                          </span>

                          {/* Explore prompt on hover */}
                          <div
                            className={`mt-0.5 flex items-center gap-0.5 font-extrabold text-[#2DC55F] transition-all duration-200 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                              }`}
                            style={{ fontSize: `${Math.max(7, 9 * scaleFactor)}px` }}
                          >
                            <span>EXPLORE</span>
                            <ExternalLink style={{ width: `${10 * scaleFactor}px`, height: `${10 * scaleFactor}px` }} />
                          </div>
                        </div>
                      </foreignObject>
                    )}
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
