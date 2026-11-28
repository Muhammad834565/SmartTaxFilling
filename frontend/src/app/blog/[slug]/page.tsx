import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowLeft, Calendar, Clock, User, Share2, ArrowRight } from 'lucide-react';
import { POSTS } from '@/lib/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.smartaxglobal.com';

export function generateStaticParams() {
  return POSTS.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Article Not Found' };

  const title = `${post.title} | SMARTax Global Insights`;
  const description = post.excerpt;
  const canonicalUrl = `/blog/${post.slug}`;
  const ogImage = post.imageUrl || '/HeroSection.png';

  return {
    title,
    description,
    keywords: [
      post.category,
      'Tax Advisory',
      'Corporate Accounting',
      'Bookkeeping Strategy',
      'SMARTax Global Insights',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${canonicalUrl}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
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

  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/blog/${post.slug}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${SITE_URL}/blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `${SITE_URL}/blog/${post.slug}`,
          },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${SITE_URL}/blog/${post.slug}#article`,
        headline: post.title,
        description: post.excerpt,
        articleBody: post.content,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          '@type': 'Person',
          name: post.author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'SMARTax Global',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo-icon.png`,
          },
        },
        image: `${SITE_URL}${post.imageUrl}`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/blog/${post.slug}`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <article className="py-12 space-y-12 pb-20">
        {/* Back button */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2DC55F] hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 space-y-5 text-center">
          <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider border border-emerald-300">
            {post.category}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0c1e36] tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-2">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#2DC55F]" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#2DC55F]" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#2DC55F]" />
              {post.readTime}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative h-[340px] sm:h-[460px] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg">
          <p className="text-xl font-medium text-slate-800 leading-relaxed border-l-4 border-[#2DC55F] pl-4 italic bg-slate-50 py-3 rounded-r">
            {post.excerpt}
          </p>

          <div className="prose prose-slate max-w-none pt-4 whitespace-pre-line">
            {post.content}
          </div>
        </div>

        {/* Share & Author Card */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#2DC55F] text-slate-950 font-black flex items-center justify-center text-lg">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-900">{post.author}</p>
                <p className="text-xs text-slate-500">Author & Senior Financial Consultant</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-[#2DC55F] text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Consult With Our Experts
            </Link>
          </div>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-black text-[#0c1e36] mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
                >
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={related.imageUrl}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#2DC55F] uppercase tracking-wider">
                        {related.category}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2DC55F] transition-colors leading-snug pt-1">
                        {related.title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100">
                      <span>{related.readTime}</span>
                      <span className="inline-flex items-center gap-1 font-bold text-[#2DC55F]">
                        Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
