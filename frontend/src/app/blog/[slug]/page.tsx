import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User, Share2, ArrowRight } from 'lucide-react';
import { POSTS } from '@/lib/data';

export function generateStaticParams() {
  return POSTS.map((p) => ({
    slug: p.slug,
  }));
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
    return null;
  }

  const relatedPosts = POSTS.filter((p) => p.slug !== post.slug);

  return (
    <article className="py-12 space-y-12">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 space-y-5 text-center">
        <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">
          {post.category}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-2">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-slate-400" />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {post.readTime}
          </span>
        </div>
      </header>

      {/* Hero Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative h-80 sm:h-[420px] w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
        <div className="bg-emerald-50/70 border-l-4 border-emerald-500 p-4 rounded-r-xl text-emerald-950 font-medium italic">
          {post.excerpt}
        </div>

        {post.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}

        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Written by <span className="font-bold text-slate-900">{post.author}</span> • Smartax Books Advisory Council
          </div>
          <Link
            href="/contact"
            className="text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg transition-colors"
          >
            Schedule a Free Review Call
          </Link>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.slice(0, 2).map((rp) => (
              <div
                key={rp.slug}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between card-hover"
              >
                <div>
                  <div className="text-[11px] text-emerald-600 font-bold mb-2 uppercase">{rp.category}</div>
                  <h3 className="font-bold text-slate-900 text-base mb-2 hover:text-emerald-600 transition-colors">
                    <Link href={`/blog/${rp.slug}`}>{rp.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{rp.excerpt}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <Link
                    href={`/blog/${rp.slug}`}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
