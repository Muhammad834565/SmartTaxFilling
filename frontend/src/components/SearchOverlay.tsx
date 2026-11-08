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
      className="fixed inset-0 z-[999] flex flex-col items-center pt-[80px] sm:pt-[90px] px-4 bg-[#07101e]/75 backdrop-blur-md animate-in fade-in duration-150"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Search Box */}
      <div className="w-full max-w-2xl">
        {/* Input Row */}
        <div className="flex items-center bg-white rounded-2xl shadow-2xl border border-slate-200 px-4 py-3 gap-3">
          <Search className="w-5 h-5 text-[#2DC55F] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search services, blog, pricing, contact…"
            className="flex-1 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors ml-1 border-l border-slate-200 pl-3"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[60vh] overflow-y-auto">
          {/* No query — show popular suggestions */}
          {!query.trim() && (
            <div className="p-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 px-1">
                Popular Services
              </p>
              <div className="space-y-1">
                {popular.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#2DC55F] flex items-center justify-center shrink-0">
                      {r.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-[#2DC55F] transition-colors truncate block">
                        {r.title}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#2DC55F] transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
              <div className="border-t border-slate-100 mt-3 pt-3 flex gap-2 flex-wrap">
                {['Services', 'Pricing', 'Blog', 'Contact'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-[#2DC55F] hover:text-white transition-all cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search results */}
          {query.trim() && results.length > 0 && (
            <div className="p-2">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 px-3 py-2">
                {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
              </p>
              {results.map((r, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <Link
                    key={r.href + idx}
                    href={r.href}
                    onClick={onClose}
                    className={`flex items-start gap-3 px-3 py-3 rounded-xl transition-colors group ${
                      isActive ? 'bg-[#2DC55F]/10 ring-1 ring-[#2DC55F]/30' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span
                      className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
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
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {highlight(r.description, query)}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#2DC55F] mt-1 shrink-0 transition-colors" />
                  </Link>
                );
              })}
            </div>
          )}

          {/* No results */}
          {query.trim() && results.length === 0 && (
            <div className="p-8 text-center">
              <Search className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-600">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for a service, country, or topic</p>
              <Link
                href="/contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#2DC55F] text-white text-xs font-bold rounded-lg hover:bg-emerald-600 transition-colors"
              >
                <span>Contact Us Instead</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Keyboard hint */}
        {query.trim() && results.length > 0 && (
          <p className="text-center text-[11px] text-white/50 mt-2 font-medium">
            ↑ ↓ to navigate &nbsp;·&nbsp; Enter to open &nbsp;·&nbsp; Esc to close
          </p>
        )}
      </div>
    </div>
  );
}

