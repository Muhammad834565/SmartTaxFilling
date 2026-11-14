import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'SMARTax Global | Finance & Tax Consulting (US & UK) - Inzofin Theme',
  description: 'Specialized bookkeeping, accounting, company formations (LLC/Ltd/EIN), payroll tax management, and corporate tax filings in the United States and United Kingdom.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo-icon.jpg',
  },
  keywords: [
    'Bookkeeping services',
    'US tax filing',
    'UK corporation tax',
    'Startup LLC formation',
    'E-commerce accounting',
    'QuickBooks ProAdvisor',
    'HMRC VAT compliance',
    'Inzofin Finance Theme',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-slate-800">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
