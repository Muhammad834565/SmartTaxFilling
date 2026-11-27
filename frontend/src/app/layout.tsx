import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/AppShell';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://smartaxglobal.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SMARTax Global | US, UK & Pakistan Tax & Bookkeeping Consultancy',
    template: '%s | SMARTax Global',
  },
  description:
    'Specialized corporate bookkeeping, IRS US tax filing, HMRC UK corporation tax & VAT compliance, Pakistan FBR advisory, LLC/Ltd company formation, and payment gateway integration.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo-icon.png',
  },
  keywords: [
    'Bookkeeping services',
    'US tax filing services',
    'UK corporation tax return',
    'Pakistan FBR tax compliance',
    'US LLC formation for non-residents',
    'UK Ltd company registration',
    'QuickBooks ProAdvisor bookkeeping',
    'Platinum Xero accounting',
    'E-commerce sales tax nexus consulting',
    'Multi-state sales tax compliance',
    'Online payment gateway setup Wise Stripe Airwallex',
    'Corporate tax advisory',
    'Payroll tax management PAYE IRS',
    'HMRC Companies House filing',
    'IRS Form 1120 1065 1040 NR',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'SMARTax Global',
    title: 'SMARTax Global | US, UK & Pakistan Tax & Bookkeeping Consultancy',
    description:
      'Professional bookkeeping, corporate tax preparation, business entity formation, and financial advisory for growing companies worldwide.',
    images: [
      {
        url: '/HeroSection.png',
        width: 1200,
        height: 630,
        alt: 'SMARTax Global Financial & Tax Consultants',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SMARTax Global | Financial & Tax Advisory',
    description:
      'Specialized bookkeeping, tax compliance, and global entity formation in the US, UK, and Pakistan.',
    images: ['/HeroSection.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'SMARTax Global',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        '@id': `${SITE_URL}/#logo`,
        url: `${SITE_URL}/logo-icon.png`,
        caption: 'SMARTax Global Logo',
      },
      image: `${SITE_URL}/HeroSection.png`,
      email: 'smartaxbooks@gmail.com',
      telephone: '+1 936 220 6795',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '401 Timbered dr.',
        addressLocality: 'Lufkin',
        addressRegion: 'TX',
        postalCode: '75901',
        addressCountry: 'US',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+1 936 220 6795',
          contactType: 'customer support',
          areaServed: ['US', 'GB', 'PK'],
          availableLanguage: ['English', 'Urdu'],
        },
      ],
    },
    {
      '@type': 'AccountingService',
      '@id': `${SITE_URL}/#service`,
      name: 'SMARTax Global Financial & Tax Advisory',
      url: SITE_URL,
      parentOrganization: {
        '@id': `${SITE_URL}/#organization`,
      },
      telephone: '+1 936 220 6795',
      priceRange: '$$',
      paymentAccepted: 'Credit Card, Bank Transfer, PayPal, Wise, Payoneer',
      currenciesAccepted: 'USD, GBP, PKR',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      areaServed: [
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'Pakistan' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Tax & Financial Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'US Tax Compliance & Filing Services',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'UK Tax Compliance & Filing Services',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'FBR Income Tax & NTN Registration (Pakistan)',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Global Bookkeeping & Accounting',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Online Payment Gateway Setup',
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-800">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
