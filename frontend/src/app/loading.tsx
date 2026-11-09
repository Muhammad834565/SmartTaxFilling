import React from 'react';
import { Skeleton, ServiceCardSkeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <section className="bg-[#0c1a2e] text-white py-16 sm:py-20 border-b border-[#152c4e] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column Skeleton */}
            <div className="lg:col-span-6 space-y-6">
              {/* Badge skeleton */}
              <Skeleton theme="dark" className="w-56 h-8 rounded-full" />

              {/* Title skeleton */}
              <div className="space-y-3">
                <Skeleton theme="dark" className="w-full h-12" />
                <Skeleton theme="dark" className="w-4/5 h-12" />
              </div>

              {/* Description skeleton */}
              <div className="space-y-2">
                <Skeleton theme="dark" className="w-full h-4" />
                <Skeleton theme="dark" className="w-11/12 h-4" />
                <Skeleton theme="dark" className="w-3/4 h-4" />
              </div>

              {/* CTA Buttons skeleton */}
              <div className="flex gap-4 pt-2">
                <Skeleton theme="dark" className="w-40 h-12 rounded-lg" />
                <Skeleton theme="dark" className="w-44 h-12 rounded-lg" />
              </div>

              {/* Trust strip skeleton */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Skeleton theme="dark" className="h-10 rounded-lg" />
                <Skeleton theme="dark" className="h-10 rounded-lg" />
                <Skeleton theme="dark" className="h-10 rounded-lg" />
                <Skeleton theme="dark" className="h-10 rounded-lg" />
              </div>
            </div>

            {/* Right Visual Skeleton */}
            <div className="lg:col-span-6 flex justify-center">
              <Skeleton theme="dark" className="w-[380px] h-[380px] sm:w-[460px] sm:h-[460px] rounded-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-64 h-8" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="w-24 h-10 rounded-xl" />
            <Skeleton className="w-24 h-10 rounded-xl" />
            <Skeleton className="w-24 h-10 rounded-xl" />
          </div>
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

