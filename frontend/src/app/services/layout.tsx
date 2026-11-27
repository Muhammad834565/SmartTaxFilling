import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certified Tax, Bookkeeping & Corporate Services | SMARTax Global',
  description:
    'Comprehensive corporate accounting, US LLC formation, UK Ltd filings, Pakistan SECP/FBR, payroll tax management, and payment gateway solutions.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Certified Tax, Bookkeeping & Corporate Services | SMARTax Global',
    description:
      'Explore full-service corporate bookkeeping, international tax compliance, and business formation services in the US, UK, and Pakistan.',
    url: '/services',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
