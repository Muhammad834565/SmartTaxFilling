'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ExternalLink } from 'lucide-react';

export interface FootballService {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  image: string;
  icon?: any;
}

interface Football3DProps {
  services: FootballService[];
}

export default function Football3D({ services }: Football3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredService, setHoveredService] = useState<FootballService | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const stage = containerRef.current;
    if (!stage) return;

    // ─── SCENE SETUP ───
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, stage.clientWidth / stage.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 4.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(stage.clientWidth, stage.clientHeight);
    stage.appendChild(renderer.domElement);

    // ─── LIGHTING (Glossy specular highlights matching the user's reference) ───
    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const sun = new THREE.DirectionalLight(0xffffff, 1.2);
    sun.position.set(3, 4, 5);
    scene.add(sun);

    const rim = new THREE.DirectionalLight(0x2DC55F, 0.85);
    rim.position.set(-4, -1, -3);
    scene.add(rim);

    // ─── TRUNCATED ICOSAHEDRON (Football Geometry) ───
    const phi = (1 + Math.sqrt(5)) / 2;
    const bases = [
      [0, 1, 3 * phi],
      [1, 2 + phi, 2 * phi],
      [phi, 2, 2 * phi + 1]
    ];
    const raw: number[][] = [];
    const seen: Record<string, number> = {};

    bases.forEach((b) => {
      for (let k = 0; k < 3; k++) {
        const p = [b[k % 3], b[(k + 1) % 3], b[(k + 2) % 3]];
        [1, -1].forEach((sx) => {
          [1, -1].forEach((sy) => {
            [1, -1].forEach((sz) => {
              const v = [p[0] * sx, p[1] * sy, p[2] * sz];
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

    const verts = raw.map((v) => new THREE.Vector3(v[0], v[1], v[2]).normalize());

    const ball = new THREE.Group();
    const tilt = new THREE.Group();
    tilt.rotation.x = 0.35;
    tilt.rotation.z = -0.12;
    tilt.add(ball);
    scene.add(tilt);

    // Base Sphere with deep navy blue (#0c213d)
    ball.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(1, 64, 48),
        new THREE.MeshStandardMaterial({
          color: 0x0c213d,
          roughness: 0.35,
          metalness: 0.15
        })
      )
    );

    // ─── NEON GLOWING SEAMS (#2DC55F) ───
    const seamMaterial = new THREE.MeshStandardMaterial({
      color: 0x2DC55F,
      emissive: 0x2DC55F,
      emissiveIntensity: 0.55,
      roughness: 0.2,
      metalness: 0.3,
      side: THREE.DoubleSide
    });

    let minD = Infinity;
    for (let j = 1; j < verts.length; j++) {
      minD = Math.min(minD, verts[0].distanceTo(verts[j]));
    }
    const tubeR = 0.014;
    for (let i = 0; i < verts.length; i++) {
      for (let j = i + 1; j < verts.length; j++) {
        if (Math.abs(verts[i].distanceTo(verts[j]) - minD) < 0.01) {
          const pts: THREE.Vector3[] = [];
          for (let s = 0; s <= 10; s++) {
            pts.push(
              new THREE.Vector3()
                .lerpVectors(verts[i], verts[j], s / 10)
                .normalize()
                .multiplyScalar(1.002)
            );
          }
          ball.add(
            new THREE.Mesh(
              new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 10, tubeR, 8, false),
              seamMaterial
            )
          );
        }
      }
    }

    const joint = new THREE.SphereGeometry(tubeR * 1.05, 10, 8);
    verts.forEach((v) => {
      const m = new THREE.Mesh(joint, seamMaterial);
      m.position.copy(v).multiplyScalar(1.002);
      ball.add(m);
    });

    // ─── 12 PENTAGON CENTERS ───
    const cs: THREE.Vector3[] = [];
    [[0, 1, phi], [1, phi, 0], [phi, 0, 1]].forEach((b) => {
      [1, -1].forEach((sa) => {
        [1, -1].forEach((sb) => {
          let c = new THREE.Vector3();
          if (b[0] === 0) c.set(0, b[1] * sa, b[2] * sb);
          else if (b[1] === 0) c.set(b[0] * sa, 0, b[2] * sb);
          else c.set(b[0] * sa, b[1] * sb, 0);
          c.normalize();
          if (!cs.some((o) => o.distanceTo(c) < 0.01)) cs.push(c);
        });
      });
    });

    // ─── 20 HEXAGON CENTERS ───
    const hexCenters: THREE.Vector3[] = [];
    for (let i = 0; i < cs.length; i++) {
      for (let j = i + 1; j < cs.length; j++) {
        if (cs[i].distanceTo(cs[j]) < 1.1) {
          for (let k = j + 1; k < cs.length; k++) {
            if (cs[i].distanceTo(cs[k]) < 1.1 && cs[j].distanceTo(cs[k]) < 1.1) {
              const hc = new THREE.Vector3().add(cs[i]).add(cs[j]).add(cs[k]).normalize();
              if (!hexCenters.some((o) => o.distanceTo(hc) < 0.05)) {
                hexCenters.push(hc);
              }
            }
          }
        }
      }
    }

    // Preload service images
    const loadedImages: Record<string, HTMLImageElement> = {};
    services.forEach((s) => {
      if (s.image) {
        const img = new Image();
        img.src = s.image;
        loadedImages[s.id] = img;
      }
    });

    // Canvas texture generator for a panel (Solid clean finish matching image, with image on hover)
    const createPanelTexture = (
      service: FootballService,
      isPentagon: boolean,
      isHovered: boolean
    ): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      // Background color:
      // Exact color from user image: Pentagon = vibrant glossy emerald (#2DC55F), Hexagon = solid deep navy (#11294a)
      const baseColor = isPentagon ? '#2DC55F' : '#11294a';
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, 512, 512);

      // If hovered and image is available, reveal the service image inside the panel
      if (isHovered) {
        const img = loadedImages[service.id];
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.globalAlpha = 0.88;
          ctx.drawImage(img, 0, 0, 512, 512);
          ctx.globalAlpha = 1.0;
          ctx.fillStyle = 'rgba(7, 19, 36, 0.65)';
          ctx.fillRect(0, 0, 512, 512);
        }

        // Glowing border on hover
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 16;
        ctx.strokeRect(0, 0, 512, 512);
      }

      // Subtle center radial highlight giving the 3D spherical curved pop
      const radGrad = ctx.createRadialGradient(256, 256, 20, 256, 256, 250);
      if (isPentagon) {
        radGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
        radGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
        radGrad.addColorStop(1, 'rgba(0, 0, 0, 0.15)');
      } else {
        radGrad.addColorStop(0, 'rgba(45, 197, 95, 0.12)');
        radGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.05)');
        radGrad.addColorStop(1, 'rgba(0, 0, 0, 0.25)');
      }
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, 512, 512);

      // On hover: show service title & explore prompt
      if (isHovered) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 38px "Plus Jakarta Sans", sans-serif';
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 12;

        const words = service.title.split(' ');
        if (words.length <= 2) {
          ctx.fillText(words[0] || '', 256, 220);
          ctx.fillText(words[1] || '', 256, 270);
        } else {
          ctx.fillText(words.slice(0, 2).join(' '), 256, 215);
          ctx.fillText(words.slice(2).join(' '), 256, 265);
        }

        ctx.fillStyle = '#2DC55F';
        ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('CLICK TO EXPLORE →', 256, 335);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    // Store panels for hover & raycasting
    const panelMeshes: {
      mesh: THREE.Mesh;
      service: FootballService;
      isPentagon: boolean;
      normalTexture: THREE.CanvasTexture;
      hoverTexture: THREE.CanvasTexture;
      normalMat: THREE.MeshStandardMaterial;
      hoverMat: THREE.MeshStandardMaterial;
    }[] = [];

    // ─── BUILD 12 PENTAGON PANELS (EMERALD) ───
    cs.forEach((c, idx) => {
      const service = services[idx % services.length];
      const ring = verts.slice().sort((a, b) => b.dot(c) - a.dot(c)).slice(0, 5);
      const u = new THREE.Vector3().crossVectors(c, Math.abs(c.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0)).normalize();
      const w = new THREE.Vector3().crossVectors(c, u);
      ring.sort((a, b) => Math.atan2(a.dot(w), a.dot(u)) - Math.atan2(b.dot(w), b.dot(u)));

      const S = 8, RN = 4, pos: number[] = [], uvs: number[] = [];
      function pt(r: number, jj: number, side: number) {
        const e = new THREE.Vector3().lerpVectors(ring[side], ring[(side + 1) % 5], jj / S).normalize();
        return new THREE.Vector3().lerpVectors(c, e, r / RN).normalize().multiplyScalar(1.003);
      }

      for (let side = 0; side < 5; side++) {
        for (let r = 0; r < RN; r++) {
          for (let jj = 0; jj < S; jj++) {
            const a = pt(r, jj, side), b = pt(r, jj + 1, side), c2 = pt(r + 1, jj, side), d = pt(r + 1, jj + 1, side);
            pos.push(a.x, a.y, a.z, c2.x, c2.y, c2.z, d.x, d.y, d.z);
            pos.push(a.x, a.y, a.z, d.x, d.y, d.z, b.x, b.y, b.z);

            const getUV = (v: THREE.Vector3) => {
              const dx = v.dot(u);
              const dy = v.dot(w);
              return [0.5 + dx * 1.5, 0.5 + dy * 1.5];
            };
            const [uA, vA] = getUV(a);
            const [uB, vB] = getUV(b);
            const [uC, vC] = getUV(c2);
            const [uD, vD] = getUV(d);
            uvs.push(uA, vA, uC, vC, uD, vD);
            uvs.push(uA, vA, uD, vD, uB, vB);
          }
        }
      }

      const g = new THREE.BufferGeometry();
      const arr = new Float32Array(pos);
      const nor = new Float32Array(arr.length);
      for (let n = 0; n < arr.length; n += 3) {
        const l = Math.sqrt(arr[n] * arr[n] + arr[n + 1] * arr[n + 1] + arr[n + 2] * arr[n + 2]);
        nor[n] = arr[n] / l; nor[n + 1] = arr[n + 1] / l; nor[n + 2] = arr[n + 2] / l;
      }
      g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
      g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
      g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));

      const normalTexture = createPanelTexture(service, true, false);
      const hoverTexture = createPanelTexture(service, true, true);

      // Glossy finish matching user's image with specular sheen
      const normalMat = new THREE.MeshStandardMaterial({
        map: normalTexture,
        roughness: 0.28,
        metalness: 0.15
      });
      const hoverMat = new THREE.MeshStandardMaterial({
        map: hoverTexture,
        roughness: 0.2,
        metalness: 0.1
      });

      const mesh = new THREE.Mesh(g, normalMat);
      mesh.userData = { service };
      ball.add(mesh);

      panelMeshes.push({ mesh, service, isPentagon: true, normalTexture, hoverTexture, normalMat, hoverMat });
    });

    // ─── BUILD 20 HEXAGON PANELS (NAVY BLUE) ───
    hexCenters.forEach((hc, idx) => {
      const serviceIdx = (idx + 12) % services.length;
      const service = services[serviceIdx];

      const ring = verts.slice().sort((a, b) => b.dot(hc) - a.dot(hc)).slice(0, 6);
      const u = new THREE.Vector3().crossVectors(hc, Math.abs(hc.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0)).normalize();
      const w = new THREE.Vector3().crossVectors(hc, u);
      ring.sort((a, b) => Math.atan2(a.dot(w), a.dot(u)) - Math.atan2(b.dot(w), b.dot(u)));

      const S = 6, RN = 3, pos: number[] = [], uvs: number[] = [];
      function pt(r: number, jj: number, side: number) {
        const e = new THREE.Vector3().lerpVectors(ring[side], ring[(side + 1) % 6], jj / S).normalize();
        return new THREE.Vector3().lerpVectors(hc, e, r / RN).normalize().multiplyScalar(1.003);
      }

      for (let side = 0; side < 6; side++) {
        for (let r = 0; r < RN; r++) {
          for (let jj = 0; jj < S; jj++) {
            const a = pt(r, jj, side), b = pt(r, jj + 1, side), c2 = pt(r + 1, jj, side), d = pt(r + 1, jj + 1, side);
            pos.push(a.x, a.y, a.z, c2.x, c2.y, c2.z, d.x, d.y, d.z);
            pos.push(a.x, a.y, a.z, d.x, d.y, d.z, b.x, b.y, b.z);

            const getUV = (v: THREE.Vector3) => {
              const dx = v.dot(u);
              const dy = v.dot(w);
              return [0.5 + dx * 1.6, 0.5 + dy * 1.6];
            };
            const [uA, vA] = getUV(a);
            const [uB, vB] = getUV(b);
            const [uC, vC] = getUV(c2);
            const [uD, vD] = getUV(d);
            uvs.push(uA, vA, uC, vC, uD, vD);
            uvs.push(uA, vA, uD, vD, uB, vB);
          }
        }
      }

      const g = new THREE.BufferGeometry();
      const arr = new Float32Array(pos);
      const nor = new Float32Array(arr.length);
      for (let n = 0; n < arr.length; n += 3) {
        const l = Math.sqrt(arr[n] * arr[n] + arr[n + 1] * arr[n + 1] + arr[n + 2] * arr[n + 2]);
        nor[n] = arr[n] / l; nor[n + 1] = arr[n + 1] / l; nor[n + 2] = arr[n + 2] / l;
      }
      g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
      g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
      g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));

      const normalTexture = createPanelTexture(service, false, false);
      const hoverTexture = createPanelTexture(service, false, true);

      // Deep solid navy blue matching user's image
      const normalMat = new THREE.MeshStandardMaterial({
        map: normalTexture,
        roughness: 0.32,
        metalness: 0.15
      });
      const hoverMat = new THREE.MeshStandardMaterial({
        map: hoverTexture,
        roughness: 0.2,
        metalness: 0.1
      });

      const mesh = new THREE.Mesh(g, normalMat);
      mesh.userData = { service };
      ball.add(mesh);

      panelMeshes.push({ mesh, service, isPentagon: false, normalTexture, hoverTexture, normalMat, hoverMat });
    });

    // ─── RESIZE ───
    function resize() {
      if (!stage) return;
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.z = 4.6 / Math.max(0.55, Math.min(1, camera.aspect));
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);
    resize();

    // ─── RAYCASTING FOR HOVER & INTERACTIVE DRAG ───
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let dragging = false, lastX = 0, lastY = 0, vy = 0.006, vx = 0;
    let hoveredMeshItem: typeof panelMeshes[0] | null = null;

    const handlePointerDown = (e: PointerEvent) => {
      dragging = true;
      setIsDragging(true);
      lastX = e.clientX;
      lastY = e.clientY;
      stage.style.cursor = 'grabbing';
      try { stage.setPointerCapture(e.pointerId); } catch (_) {}
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (dragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        ball.rotation.y += dx * 0.01;
        ball.rotation.x += dy * 0.01;
        vy = dx * 0.002;
        vx = dy * 0.002;
        lastX = e.clientX;
        lastY = e.clientY;
        setHoveredService(null);
        return;
      }

      // Raycast to hover over panel
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(panelMeshes.map((p) => p.mesh));

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const found = panelMeshes.find((p) => p.mesh === hit);

        if (found) {
          if (hoveredMeshItem !== found) {
            // Restore previous panel
            if (hoveredMeshItem) {
              hoveredMeshItem.mesh.material = hoveredMeshItem.normalMat;
            }
            hoveredMeshItem = found;

            // Re-render hover canvas with image if loaded
            const freshHoverTexture = createPanelTexture(found.service, found.isPentagon, true);
            found.hoverMat.map = freshHoverTexture;
            found.hoverMat.needsUpdate = true;
            found.mesh.material = found.hoverMat;

            setHoveredService(found.service);
          }
          setHoverPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          stage.style.cursor = 'pointer';
        }
      } else {
        if (hoveredMeshItem) {
          hoveredMeshItem.mesh.material = hoveredMeshItem.normalMat;
          hoveredMeshItem = null;
        }
        setHoveredService(null);
        stage.style.cursor = 'grab';
      }
    };

    const handlePointerUp = () => {
      dragging = false;
      setIsDragging(false);
      stage.style.cursor = 'grab';
      if (Math.abs(vy) < 0.003) vy = vy < 0 ? -0.006 : 0.006;
    };

    stage.addEventListener('pointerdown', handlePointerDown);
    stage.addEventListener('pointermove', handlePointerMove);
    stage.addEventListener('pointerup', handlePointerUp);
    stage.addEventListener('pointercancel', handlePointerUp);

    // CLICK TO GO TO SERVICE
    const handleClick = (e: MouseEvent) => {
      if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.008) return;
      const rect = stage.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(panelMeshes.map((p) => p.mesh));
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const found = panelMeshes.find((p) => p.mesh === hit);
        if (found) {
          window.location.href = `/services/${found.service.slug}`;
        }
      }
    };
    stage.addEventListener('click', handleClick);

    // ANIMATION LOOP
    let animId: number;
    function frame() {
      if (!dragging && !hoveredMeshItem) {
        ball.rotation.y += vy;
        vy += ((vy < 0 ? -1 : 1) * 0.006 - vy) * 0.03;
      }
      renderer.render(scene, camera);
      animId = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      stage.removeEventListener('pointerdown', handlePointerDown);
      stage.removeEventListener('pointermove', handlePointerMove);
      stage.removeEventListener('pointerup', handlePointerUp);
      stage.removeEventListener('pointercancel', handlePointerUp);
      stage.removeEventListener('click', handleClick);
      if (stage.contains(renderer.domElement)) {
        stage.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [services]);

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] flex items-center justify-center select-none overflow-hidden">
      {/* ─── Ambient Glow ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] bg-[#2DC55F]/15 rounded-full blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] bg-[#2DC55F]/25 rounded-full blur-[80px] pointer-events-none" />

      {/* ─── 3D Football Canvas Stage ─── */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
        style={{ touchAction: 'none' }}
      />

      {/* ─── Floating Card on Hover with Service Image ─── */}
      {hoveredService && !isDragging && (
        <div
          className="absolute z-30 pointer-events-none transition-all duration-300 transform -translate-x-1/2"
          style={{
            left: hoverPos ? `${Math.min(Math.max(hoverPos.x, 160), 540)}px` : '50%',
            top: hoverPos ? `${Math.max(hoverPos.y - 140, 20)}px` : '15%',
          }}
        >
          <div className="bg-[#071324]/95 border-2 border-[#2DC55F] rounded-2xl p-4 shadow-2xl backdrop-blur-md flex items-center gap-4 max-w-sm animate-in fade-in zoom-in-95 duration-200">
            {hoveredService.image && (
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#2DC55F]/40 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={hoveredService.image}
                  alt={hoveredService.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-[#2DC55F] font-black text-sm uppercase tracking-wide">
                {hoveredService.title}
              </span>
              <span className="text-slate-300 text-xs font-semibold mt-0.5 line-clamp-1">
                {hoveredService.subtitle}
              </span>
              <div className="mt-1 flex items-center gap-1 text-[11px] font-extrabold text-[#2DC55F]">
                <span>CLICK TO EXPLORE</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Drag & Rotate Hint ─── */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <span className="text-[11px] font-bold text-slate-400/80 bg-[#071322]/70 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-xs flex items-center gap-2 tracking-wide">
          <span className="w-2 h-2 rounded-full bg-[#2DC55F] animate-ping" />
          Drag to spin 3D football • Hover panel to view image
        </span>
      </div>
    </div>
  );
}
