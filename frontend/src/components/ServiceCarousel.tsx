'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileText,
  Rocket,
  ShoppingBag,
  Building,
  Truck,
  CreditCard,
  Landmark,
  Coins,
} from 'lucide-react';
import type { ServiceItem } from '@/lib/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  FileText,
  Rocket,
  ShoppingBag,
  Building,
  Truck,
  CreditCard,
  Landmark,
  Coins,
};

const CARDS_PER_PAGE = 3;

interface Props {
  services: ServiceItem[];
}

export default function ServiceCarousel({ services }: Props) {
  const [startIndex, setStartIndex] = useState(0);
  const total = services.length;
  const totalPages = Math.ceil(total / CARDS_PER_PAGE);
  const currentPage = Math.floor(startIndex / CARDS_PER_PAGE);

  const prev = () => setStartIndex((i) => Math.max(0, i - CARDS_PER_PAGE));
  const next = () =>
    setStartIndex((i) => Math.min(total - CARDS_PER_PAGE, i + CARDS_PER_PAGE));

  const visible = services.slice(startIndex, startIndex + CARDS_PER_PAGE);
  const padded: (ServiceItem | null)[] = [
    ...visible,
    ...Array(CARDS_PER_PAGE - visible.length).fill(null),
  ];

  const canPrev = startIndex > 0;
  const canNext = startIndex + CARDS_PER_PAGE < total;

  return (
    /* Outer wrapper: arrows sit on left/right, cards fill the middle */
    <div className="-mt-20 pb-16 relative z-10">
      <div className="relative flex items-stretch">

        {/* LEFT ARROW */}
        <div className="hidden md:flex items-center px-3 shrink-0">
          <button
            onClick={prev}
            disabled={!canPrev}
            aria-label="Previous services"
            className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-200 shadow-lg bg-white
              ${canPrev
                ? 'border-[#2DC55F] text-[#2DC55F] hover:bg-[#2DC55F] hover:text-white'
                : 'border-slate-200 text-slate-300 cursor-not-allowed'}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* CARDS — full width, flush panels with dividers */}
        <div className="flex-1 grid grid-cols-3 shadow-xl">
          {padded.map((service, idx) => {
            if (!service) {
              return (
                <div
                  key={`empty-${idx}`}
                  className={`bg-white pt-8 ${idx < 2 ? 'border-r border-slate-200' : ''}`}
                />
              );
            }

            const IconComponent = iconMap[service.icon] || BookOpen;
            const numberStr = String(startIndex + idx + 1).padStart(2, '0');

            return (
              /* Outer wrapper: pt-8 reserves space for badge, overflow-visible so badge shows above */
              <div
                key={service.slug}
                className={`relative pt-8 ${idx < 2 ? 'border-r border-slate-200' : ''}`}
              >
                {/* Number badge — sits in the pt-8 space above the card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
                  <div
                    className="bg-[#2DC55F] text-white font-black text-sm px-5 py-1.5 inline-block"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)' }}
                  >
                    {numberStr}
                  </div>
                </div>

                {/* Card with overflow-hidden for the image hover effect */}
                <div className="group relative bg-white flex flex-col items-center text-center overflow-hidden h-full">
                  {/* Hover background image */}
                  {service.imageUrl && (
                    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                      <div className="absolute inset-0 bg-[#071324]/65 z-10" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071324]/85 via-[#071324]/40 to-[#071324]/60 z-10" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 px-8 pb-10 pt-8 flex flex-col items-center space-y-4 w-full">
                    <div className="w-16 h-16 flex items-center justify-center text-[#2DC55F]">
                      <IconComponent className="w-12 h-12 stroke-[1.5]" />
                    </div>
                    <h3 className="text-lg font-extrabold text-[#0c1e36] group-hover:text-[#2DC55F] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 group-hover:text-slate-200 transition-colors duration-300 leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <div className="pt-3 border-t border-slate-100 group-hover:border-slate-700/60 transition-colors duration-300 w-full flex justify-center">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-black tracking-wider uppercase text-[#0c1e36] group-hover:text-white transition-colors duration-300 relative pb-1"
                      >
                        <span>Learn More</span>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2DC55F] rounded-full" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT ARROW */}
        <div className="hidden md:flex items-center px-3 shrink-0">
          <button
            onClick={next}
            disabled={!canNext}
            aria-label="Next services"
            className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-200 shadow-lg bg-white
              ${canNext
                ? 'border-[#2DC55F] text-[#2DC55F] hover:bg-[#2DC55F] hover:text-white'
                : 'border-slate-200 text-slate-300 cursor-not-allowed'}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile arrows */}
      <div className="flex md:hidden justify-center gap-4 mt-6">
        <button onClick={prev} disabled={!canPrev} aria-label="Previous"
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all
            ${canPrev ? 'border-[#2DC55F] text-[#2DC55F] hover:bg-[#2DC55F] hover:text-white' : 'border-slate-200 text-slate-300 cursor-not-allowed'}`}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={next} disabled={!canNext} aria-label="Next"
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all
            ${canNext ? 'border-[#2DC55F] text-[#2DC55F] hover:bg-[#2DC55F] hover:text-white' : 'border-slate-200 text-slate-300 cursor-not-allowed'}`}>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }).map((_, pageIdx) => (
          <button
            key={pageIdx}
            onClick={() => setStartIndex(pageIdx * CARDS_PER_PAGE)}
            aria-label={`Page ${pageIdx + 1}`}
            className={`rounded-full transition-all duration-200 ${
              currentPage === pageIdx
                ? 'w-6 h-2 bg-[#2DC55F]'
                : 'w-2 h-2 bg-slate-400 hover:bg-[#2DC55F]/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
