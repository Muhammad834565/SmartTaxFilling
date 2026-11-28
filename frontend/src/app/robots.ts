import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://smartaxglobal.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api/*'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api/*'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/favicon.ico',
          '/icon-48x48.png',
          '/icon-96x96.png',
          '/icon-192x192.png',
          '/apple-touch-icon.png',
          '/logo-icon.png',
          '/*.png',
          '/*.ico',
          '/*.jpg',
          '/*.jpeg',
          '/*.webp',
          '/software/*',
          '/uploads/*',
        ],
        disallow: ['/admin/*'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api/*'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
