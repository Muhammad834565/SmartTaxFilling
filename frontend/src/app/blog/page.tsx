import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { POSTS } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Tax & Accounting Insights & Compliance Guides | SMARTax Global',
  description:
    'Read expert analysis on US sales tax, IRS corporate filings, UK HMRC compliance, bookkeeping automation, and international business growth.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Tax & Accounting Insights & Compliance Guides | SMARTax Global',
    description: 'Expert financial analysis and advisory from certified tax consultants.',
    url: '/blog',
  },
};

export default function BlogListingPage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Inzofin Breadcrumb Header Banner */}
      <section className="bg-[#0c1a2e] text-white py-16 sm:py-20 border-b border-[#152c4e] relative overflow-hidden">
        <div className="absolute inset-0 inzofin-pattern-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 relative z-10">
          <div className="inzofin-section-subtitle justify-center text-[#2DC55F]">
            <span>// ARTICLES & ADVISORY //</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Financial News & Corporate Tax Insights
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 pt-2">
            <Link href="/" className="hover:text-[#2DC55F] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#2DC55F]">Blog</span>
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between card-hover group shadow-sm"
            >
              <div>
                <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-[#0c1a2e] text-[#2DC55F] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded">
                    {post.category}
                  </div>
                </div>

                <div className="p-7 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#2DC55F]" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#2DC55F]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-[#0c1e36] group-hover:text-[#2DC55F] transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-7 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                <span className="text-xs font-semibold text-slate-400">By {post.author}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-[#2DC55F] group-hover:text-emerald-700 flex items-center gap-1 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
