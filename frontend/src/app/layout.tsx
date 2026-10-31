import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Smartax Books | Expert Bookkeeping, Accounting & Tax Compliance (US & UK)',
  description: 'Specialized bookkeeping, accounting, company formations (LLC/Ltd/EIN), payroll tax management, and corporate tax filings in the United States and United Kingdom.',
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/uploads/2025/11/logo-2.png', type: 'image/png' },
    ],
    shortcut: ['/uploads/2025/11/logo-2.png'],
    apple: [
      { url: '/uploads/2025/11/logo-2.png' },
    ],
  },
  keywords: [
    'Bookkeeping services',
    'US tax filing',
    'UK corporation tax',
    'Startup LLC formation',
    'E-commerce accounting',
    'QuickBooks ProAdvisor',
    'HMRC VAT compliance',
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
