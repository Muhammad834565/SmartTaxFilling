'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { X, Search, ArrowRight, FileText, Briefcase, BookOpen, Info, DollarSign, Phone, FileQuestion } from 'lucide-react';
import { SERVICES, POSTS } from '@/lib/data';

interface SearchResult {
  type: 'service' | 'blog' | 'page';
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

// Static pages to include in search
const STATIC_PAGES = [
  { title: 'Home', description: 'SMARTax Global — Trusted financial, bookkeeping & tax advisory worldwide.', href: '/', icon: <Briefcase className="w-4 h-4" />, badge: 'Page' },
  { title: 'About Us', description: 'Meet the SMARTax Global advisory team — licensed CPAs, HMRC specialists & FBR practitioners.', href: '/about-us', icon: <Info className="w-4 h-4" />, badge: 'Page' },
  { title: 'All Services', description: 'Browse our complete list of USA, UK and Pakistan accounting & tax services.', href: '/services', icon: <Briefcase className="w-4 h-4" />, badge: 'Page' },
  { title: 'Pricing Plans', description: 'View our transparent flat-rate Starter, Growth and Enterprise pricing packages.', href: '/pricing', icon: <DollarSign className="w-4 h-4" />, badge: 'Page' },
  { title: 'Blog', description: 'Expert articles on bookkeeping, tax compliance, and business advisory.', href: '/blog', icon: <BookOpen className="w-4 h-4" />, badge: 'Page' },
  { title: 'Contact Us', description: 'Book a free consultation or send us a message. We respond within 24 hours.', href: '/contact', icon: <Phone className="w-4 h-4" />, badge: 'Page' },
  { title: 'Privacy Policy', description: 'Read our privacy and data handling policy.', href: '/privacy-policy', icon: <FileQuestion className="w-4 h-4" />, badge: 'Page' },
  { title: 'Terms & Conditions', description: 'Read our terms of service and usage conditions.', href: '/terms-and-conditions', icon: <FileQuestion className="w-4 h-4" />, badge: 'Page' },
];

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  // Services
  SERVICES.forEach((s) => {
    results.push({
      type: 'service',
      title: s.title,
      description: s.shortDescription,
      href: `/services/${s.slug}`,
      icon: <Briefcase className="w-4 h-4" />,
      badge: s.category,
    });
  });

  // Blog posts
  POSTS.forEach((p) => {
    results.push({
      type: 'blog',
      title: p.title,
      description: p.excerpt,
      href: `/blog/${p.slug}`,
      icon: <FileText className="w-4 h-4" />,
      badge: p.category,
    });
  });

  // Static pages
  STATIC_PAGES.forEach((pg) => {
    results.push({
      type: 'page',
      title: pg.title,
      description: pg.description,
      href: pg.href,
      icon: pg.icon,
      badge: pg.badge,
    });
  });

  return results;
}

const ALL_RESULTS = buildIndex();

function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-[#2DC55F]/25 text-[#0c1e36] rounded px-0.5 font-bold not-italic">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function search(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return ALL_RESULTS.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      (r.badge && r.badge.toLowerCase().includes(q))
  ).slice(0, 12);
}

const BADGE_COLORS: Record<string, string> = {
  USA: 'bg-blue-100 text-blue-700 border-blue-200',
  UK: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  Pakistan: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Page: 'bg-slate-100 text-slate-600 border-slate-200',
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setActiveIdx(-1);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    setResults(search(query));
    setActiveIdx(-1);
  }, [query]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, -1));
      } else if (e.key === 'Enter' && activeIdx >= 0 && results[activeIdx]) {
        window.location.href = results[activeIdx].href;
        onClose();
      }
    },
    [results, activeIdx, onClose]
  );

  if (!isOpen) return null;

  const popular = ALL_RESULTS.filter((r) => r.type === 'service').slice(0, 4);

  return (
    <div
      className="fixed inset-0 z-[999] bg-[#07101e]/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Top Banner Search Bar (Full-width Inzofin Slanted Style) */}
      <div className="w-full bg-white shadow-2xl border-b border-slate-200">
        <div className="flex items-stretch h-20 w-full">
          {/* Slanted Green Brand Icon Block */}
          <div className="bg-[#2DC55F] text-white flex items-center justify-center px-6 sm:px-10 shrink-0 [clip-path:polygon(0_0,100%_0,72%_100%,0_100%)] pr-10 sm:pr-14">
            <Search className="w-6 h-6 stroke-[2.5]" />
          </div>

          {/* Search Input Field */}
          <div className="flex-1 flex items-center px-4 sm:px-6">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search and hit enter.."
              className="w-full text-base sm:text-lg font-bold text-slate-800 placeholder:text-slate-900 placeholder:font-black outline-none bg-transparent"
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          {/* Close Button on Right */}
          <div className="flex items-center px-6 sm:px-10 shrink-0">
            <button
              onClick={onClose}
              className="text-[#2DC55F] hover:text-emerald-700 transition-colors p-2 cursor-pointer active:scale-95"
              aria-label="Close search"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Results Panel directly below the top search bar */}
      <div className="max-w-4xl mx-auto px-4 mt-3">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[70vh] overflow-y-auto">
          {/* No query — show popular suggestions */}
          {!query.trim() && (
            <div className="p-5">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">
                Popular Quick Links
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {popular.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group border border-slate-100"
                  >
                    <span className="w-9 h-9 rounded-lg bg-emerald-50 text-[#2DC55F] flex items-center justify-center shrink-0">
                      {r.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-slate-800 group-hover:text-[#2DC55F] transition-colors truncate block">
                        {r.title}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#2DC55F] transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
              <div className="border-t border-slate-100 mt-4 pt-3 flex gap-2 flex-wrap items-center">
                <span className="text-[11px] font-bold text-slate-400 mr-1">Suggested:</span>
                {['USA', 'UK', 'Pakistan', 'Bookkeeping', 'Tax Compliance', 'Pricing'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-[#2DC55F] hover:text-white transition-all cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search results */}
          {query.trim() && results.length > 0 && (
            <div className="p-3">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 px-3 py-2">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </p>
              <div className="divide-y divide-slate-100">
                {results.map((r, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <Link
                      key={r.href + idx}
                      href={r.href}
                      onClick={onClose}
                      className={`flex items-start gap-3.5 px-3.5 py-3 rounded-xl transition-colors group ${
                        isActive ? 'bg-[#2DC55F]/10 ring-1 ring-[#2DC55F]/30' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span
                        className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive ? 'bg-[#2DC55F] text-white' : 'bg-emerald-50 text-[#2DC55F]'
                        }`}
                      >
                        {r.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-slate-800 group-hover:text-[#2DC55F] transition-colors">
                            {highlight(r.title, query)}
                          </span>
                          {r.badge && (
                            <span
                              className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                                BADGE_COLORS[r.badge] || 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              {r.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                          {highlight(r.description, query)}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#2DC55F] mt-1 shrink-0 transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* No results */}
          {query.trim() && results.length === 0 && (
            <div className="p-8 text-center">
              <Search className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-600">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-400 mt-1">Try another keyword or view all services</p>
              <Link
                href="/services"
                onClick={onClose}
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-[#2DC55F] text-white text-xs font-bold rounded-lg hover:bg-emerald-600 transition-colors"
              >
                <span>Browse All Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Keyboard hint */}
        <p className="text-center text-[11px] text-white/70 mt-3 font-semibold drop-shadow-sm">
          Press <kbd className="px-1.5 py-0.5 rounded bg-white/20 text-white font-mono">Enter</kbd> to open &nbsp;·&nbsp; <kbd className="px-1.5 py-0.5 rounded bg-white/20 text-white font-mono">Esc</kbd> to close
        </p>
      </div>
    </div>
  );
}

