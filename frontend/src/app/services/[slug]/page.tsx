import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SERVICES } from '@/lib/data';
import ServiceDetailView from '@/components/ServiceDetailView';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://smartaxglobal.com';

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return { title: 'Service Not Found' };

  const title = `${service.title} | SMARTax Global`;
  const description =
    service.shortDescription ||
    `${service.title} - Professional accounting, tax compliance, and business advisory services by SMARTax Global.`;
  const canonicalUrl = `/services/${service.slug}`;
  const ogImage = service.imageUrl || '/HeroSection.png';

  return {
    title,
    description,
    keywords: [
      service.title,
      `${service.category} tax compliance`,
      `${service.category} accounting`,
      'SMARTax Global services',
      ...(service.softwareTools || []),
      ...(service.features || []).slice(0, 5),
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${canonicalUrl}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = SERVICES.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
    return null;
  }

  const jsonLdService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/services/${service.slug}#service`,
    name: service.title,
    description: service.shortDescription || service.fullDescription,
    serviceType: service.category,
    provider: {
      '@type': 'AccountingService',
      name: 'SMARTax Global',
      url: SITE_URL,
      telephone: '+1 936 220 6795',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '401 Timbered dr.',
        addressLocality: 'Lufkin',
        addressRegion: 'TX',
        postalCode: '75901',
        addressCountry: 'US',
      },
    },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Pakistan' },
    ],
    ...(service.imageUrl
      ? {
          image: `${SITE_URL}${service.imageUrl}`,
        }
      : {}),
    offers: service.subServices?.map((sub) => ({
      '@type': 'Offer',
      name: sub.name,
      price: sub.price,
      priceCurrency: sub.currency || 'USD',
      description: sub.description,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      <ServiceDetailView service={service} />
    </>
  );
}
