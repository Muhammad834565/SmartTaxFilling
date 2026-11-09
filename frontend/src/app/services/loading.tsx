import React from 'react';
import { Skeleton, ServiceCardSkeleton } from '@/components/ui/Skeleton';

export default function ServicesLoading() {
  return (
    <div className="space-y-16 pb-20 bg-white">
      {/* Banner Skeleton */}
      <section className="bg-[#0c1a2e] text-white py-16 sm:py-20 border-b border-[#152c4e] text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4 flex flex-col items-center">
          <Skeleton theme="dark" className="w-40 h-5" />
          <Skeleton theme="dark" className="w-full max-w-xl h-12" />
          <Skeleton theme="dark" className="w-3/4 max-w-md h-4" />
        </div>
      </section>

      {/* Region Filter Bar Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-wrap gap-3 items-center">
          <Skeleton className="w-36 h-10 rounded-xl" />
          <Skeleton className="w-36 h-10 rounded-xl" />
          <Skeleton className="w-36 h-10 rounded-xl" />
          <Skeleton className="w-36 h-10 rounded-xl" />
        </div>
      </section>

      {/* Services Grid Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="space-y-2">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-64 h-8" />
          </div>
          <Skeleton className="w-32 h-8 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCardSkeleton />
          <ServiceCardSkeleton />
          <ServiceCardSkeleton />
          <ServiceCardSkeleton />
          <ServiceCardSkeleton />
          <ServiceCardSkeleton />
        </div>
      </section>
    </div>
  );
}

