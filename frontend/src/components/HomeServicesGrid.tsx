'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowLeft,
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
  Users,
  Receipt,
  FileSpreadsheet,
} from 'lucide-react';
import type { ServiceItem } from '@/lib/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  FileText,
  Users,
  Receipt,
  Rocket,
  ShoppingBag,
  Building,
  Truck,
  CreditCard,
  Landmark,
  FileSpreadsheet,
  Coins,
};

interface HomeServicesGridProps {
  services: ServiceItem[];
}

const CARDS_PER_PAGE = 6;

export default function HomeServicesGrid({ services }: HomeServicesGridProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(services.length / CARDS_PER_PAGE);

  const startIndex = currentPage * CARDS_PER_PAGE;
  const visibleServices = services.slice(startIndex, startIndex + CARDS_PER_PAGE);
  const startNum = startIndex + 1;
  const endNum = Math.min(startIndex + CARDS_PER_PAGE, services.length);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <div className="space-y-10">
      {/* Section Header with Navigation Arrows */}
      <div className="flex flex-col md:flex-row md:items-end justify-between items-center gap-6">
        {/* Title Block */}
        <div className="text-center md:text-left space-y-3">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="block w-8 h-0.5 bg-[#2DC55F]" />
            <span className="text-[#2DC55F] text-xs font-extrabold uppercase tracking-widest">
              OUR SERVICES
            </span>
            <span className="block w-8 h-0.5 bg-[#2DC55F] md:hidden" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0c1e36] tracking-tight">
            What We Provide
          </h2>
        </div>

        {/* Top Arrow Navigation Controls */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 px-3 hidden sm:inline-block">
            Showing <strong className="text-slate-800">{startNum}–{endNum}</strong> of {services.length}
          </span>

          <div className="flex items-center gap-2">
            {/* Previous Arrow Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous services"
              className="w-11 h-11 rounded-xl flex items-center justify-center border-2 border-slate-200 text-slate-700 hover:border-[#2DC55F] hover:bg-[#2DC55F] hover:text-white transition-all duration-200 shadow-sm active:scale-95 group cursor-pointer"
              title="Previous services"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Page indicator pills */}
            <div className="flex items-center gap-1.5 px-1">
              {Array.from({ length: totalPages }).map((_, pageIdx) => {
                const isActive = currentPage === pageIdx;
                return (
                  <button
                    key={pageIdx}
                    onClick={() => setCurrentPage(pageIdx)}
                    aria-label={`Go to page ${pageIdx + 1}`}
                    className={`h-9 px-3 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#2DC55F] text-white shadow-md shadow-[#2DC55F]/30'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {String(pageIdx + 1).padStart(2, '0')}
                  </button>
                );
              })}
            </div>

            {/* Next Arrow Button */}
            <button
              onClick={handleNext}
              aria-label="Next services"
              className="w-11 h-11 rounded-xl flex items-center justify-center border-2 border-[#2DC55F] bg-[#2DC55F] text-white hover:bg-emerald-600 hover:border-emerald-600 transition-all duration-200 shadow-md shadow-[#2DC55F]/20 active:scale-95 group cursor-pointer"
              title={currentPage < totalPages - 1 ? 'Next 6 services' : 'Back to first services'}
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Service Cards: Grid of 6 (or remaining) services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300">
        {visibleServices.map((service, index) => {
          const IconComponent = iconMap[service.icon] || BookOpen;
          const globalIndex = startIndex + index;
          const numberStr = String(globalIndex + 1).padStart(2, '0');

          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative bg-white rounded-md border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 p-8 flex flex-col justify-between overflow-hidden cursor-pointer block min-h-[320px]"
            >
              {/* Top-Right Badge: switches from number to organic green arrow circle on hover */}
              <div className="absolute top-6 right-0 z-20 transition-all duration-300">
                {/* Default: Angled Ribbon with larger size and bigger number */}
                <div
                  className="bg-[#2DC55F] text-white font-black text-lg sm:text-xl pl-9 pr-6 py-2 shadow-lg flex items-center justify-center tracking-widest transition-all duration-300 group-hover:opacity-0 group-hover:scale-75 group-hover:pointer-events-none"
                  style={{ clipPath: 'polygon(24px 0, 100% 0, 100% 100%, 0 100%)' }}
                >
                  {numberStr}
                </div>

                {/* Hover State: Organic shape badge with arrow right */}
                <div
                  className="absolute top-0 right-6 w-12 h-12 bg-[#2DC55F] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg shadow-[#2DC55F]/30"
                  style={{ borderRadius: '58% 42% 65% 35% / 46% 56% 44% 54%' }}
                >
                  <ArrowRight className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>

              {/* Hover background image with dark overlay */}
              {service.imageUrl && (
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                  <div className="absolute inset-0 bg-[#071324]/80 z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071324]/90 via-[#071324]/50 to-transparent z-10" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              )}

              {/* Card Content */}
              <div className="space-y-4 relative z-10">
                {/* Outline Icon */}
                <div className="w-14 h-14 rounded-lg flex items-center justify-start text-[#2DC55F] group-hover:text-white transition-colors duration-300">
                  <IconComponent className="w-12 h-12 stroke-[1.6]" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-[#0c1e36] group-hover:text-[#2DC55F] transition-colors duration-200">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-500 group-hover:text-slate-200 transition-colors duration-300 leading-relaxed line-clamp-3">
                  {service.shortDescription}
                </p>
              </div>

              {/* Bottom Hover Accent Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2DC55F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          );
        })}
      </div>

      {/* Bottom Pagination & Arrow Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <span className="text-xs font-semibold text-slate-500 order-2 sm:order-1">
          Showing <span className="font-bold text-[#0c1e36]">{startNum}–{endNum}</span> of{' '}
          <span className="font-bold text-[#0c1e36]">{services.length}</span> total services
        </span>

        {/* Bottom Arrow Buttons */}
        <div className="flex items-center gap-3 order-1 sm:order-2">
          <button
            onClick={handlePrev}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:border-[#2DC55F] hover:text-[#2DC55F] transition-colors shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2 px-2">
            {Array.from({ length: totalPages }).map((_, pageIdx) => {
              const isActive = currentPage === pageIdx;
              return (
                <button
                  key={pageIdx}
                  onClick={() => setCurrentPage(pageIdx)}
                  aria-label={`Page ${pageIdx + 1}`}
                  className={`transition-all rounded-full cursor-pointer ${
                    isActive ? 'w-6 h-2 bg-[#2DC55F]' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              );
            })}
          </div>

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2DC55F] hover:bg-emerald-600 text-xs font-black text-white shadow-md shadow-[#2DC55F]/20 transition-all cursor-pointer"
          >
            <span>{currentPage < totalPages - 1 ? 'Next 6 Services' : 'Back to Start'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

