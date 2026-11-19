import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SERVICES } from '@/lib/data';
import ServiceDetailView from '@/components/ServiceDetailView';

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return { title: 'Service Not Found | SMARTax Global' };
  return {
    title: `${service.title} | SMARTax Global`,
    description: service.shortDescription,
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

  return <ServiceDetailView service={service} />;
}
