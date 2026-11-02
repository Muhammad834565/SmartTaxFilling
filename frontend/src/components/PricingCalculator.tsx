'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { PRICING_PLANS } from '@/lib/data';

export default function PricingCalculator() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="space-y-10">
      {/* Toggle */}
      <div className="flex items-center justify-center gap-4">
        <span className={`text-sm font-bold ${!isAnnual ? 'text-[#0c1e36]' : 'text-slate-400'}`}>
          Monthly Billing
        </span>
        <button
          type="button"
          onClick={() => setIsAnnual(!isAnnual)}
          className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
            isAnnual ? 'bg-[#2DC55F]' : 'bg-slate-300'
          }`}
          aria-label="Toggle annual billing"
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
              isAnnual ? 'translate-x-8' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`text-sm font-bold flex items-center gap-1.5 ${isAnnual ? 'text-[#0c1e36]' : 'text-slate-400'}`}>
          Annual Billing
          <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
            Save ~15%
          </span>
        </span>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 card-hover ${
                plan.isPopular
                  ? 'bg-[#0c1a2e] text-white border-2 border-[#2DC55F] shadow-2xl scale-[1.02]'
                  : 'bg-white text-slate-800 border border-slate-200 shadow-sm'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2DC55F] text-slate-950 text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  Most Popular Choice
                </div>
              )}

              <div>
                <h3 className={`text-xl font-extrabold mb-2 ${plan.isPopular ? 'text-white' : 'text-[#0c1e36]'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mb-6 leading-relaxed ${plan.isPopular ? 'text-slate-300' : 'text-slate-500'}`}>
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-slate-200/20">
                  <span className={`text-4xl font-extrabold tracking-tight ${plan.isPopular ? 'text-[#2DC55F]' : 'text-[#0c1e36]'}`}>
                    ${price}
                  </span>
                  <span className={`text-xs ${plan.isPopular ? 'text-slate-300' : 'text-slate-500'}`}>
                    / month {isAnnual ? '(billed annually)' : ''}
                  </span>
                </div>

                <div className="space-y-3 mb-8">
                  <div className={`text-xs font-bold uppercase tracking-wider ${plan.isPopular ? 'text-[#2DC55F]' : 'text-[#0c1e36]'}`}>
                    What is included:
                  </div>
                  <ul className="space-y-2.5 text-xs">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2DC55F] shrink-0 mt-0.5" />
                        <span className={plan.isPopular ? 'text-slate-200' : 'text-slate-600'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <Link
                  href={`/contact?plan=${encodeURIComponent(plan.name)}`}
                  className={`w-full py-3.5 px-5 rounded-lg text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md ${
                    plan.isPopular
                      ? 'bg-[#2DC55F] hover:bg-[#23a54e] text-slate-950'
                      : 'bg-[#0c1a2e] hover:bg-[#152c4e] text-white'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}