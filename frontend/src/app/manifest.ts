import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SMARTax Global | Financial & Tax Advisory',
    short_name: 'SMARTax Global',
    description: 'Expert bookkeeping, US & UK tax compliance, company incorporation, and payment gateway setup.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07101e',
    theme_color: '#2DC55F',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/logo-icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
