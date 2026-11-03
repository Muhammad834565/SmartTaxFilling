'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { FaqItem } from '@/lib/data';

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  // Default open 2nd question (company formation) or 0
  const [openIndex, setOpenIndex] = useState<number | null>(2);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      {/* Left Column: Popular Question & Accordion List */}
      <div className="lg:col-span-7 space-y-6">
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
            FAQ
          </div>
          <div className="w-8 h-1 bg-[#2DC55F] mb-4 rounded-full" />
          <h2 className="text-3xl sm:text-4xl font-black text-[#0c1e36] tracking-tight">
            Popular Question
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed max-w-xl">
            Find clear answers to common questions about bookkeeping, accounting, tax compliance, and our services for confident financial management.
          </p>
        </div>

        {/* Accordion Questions */}
        <div className="space-y-4 pt-2">
          {faqs.slice(0, 5).map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-xl overflow-hidden border border-slate-200/90 shadow-sm transition-all duration-300 bg-white"
              >
                <button
                  onClick={() => toggle(idx)}
                  className={`w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-[15px] transition-colors ${
                    isOpen 
                      ? 'bg-[#2DC55F] text-slate-950 shadow-sm' 
                      : 'bg-white text-[#0c1e36] hover:bg-slate-50'
                  }`}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-slate-950' : 'text-[#2DC55F]'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 py-5 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Visual Image with Floating Quote Card matching reference */}
      <div className="lg:col-span-5 relative">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 h-[440px] sm:h-[480px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/uploads/2025/12/managers-working-with-financial-chart-e1638180766443.jpg"
            alt="SMARTax Advisors Consulting"
            className="w-full h-full object-cover object-center"
          />

          {/* Floating Testimonial Quote Box matching reference */}
          <div className="absolute bottom-6 left-6 right-6 z-20 bg-white rounded-2xl p-6 shadow-2xl border border-slate-100">
            <div className="border-l-2 border-[#2DC55F] pl-4 space-y-3">
              <p className="text-xs sm:text-[13px] text-slate-600 italic leading-relaxed">
                &ldquo;SMARTax made my bookkeeping and tax filing incredibly easy. Their team is professional, responsive, and truly understands small business needs. Highly recommend!&rdquo;
              </p>
              <div className="font-extrabold text-xs sm:text-sm text-[#0c1e36]">
                Abdul Malik
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
