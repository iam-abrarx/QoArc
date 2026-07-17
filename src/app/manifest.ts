import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'QOARC — Architecting Autonomous Intelligence',
    short_name: 'QOARC',
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#001028',
    theme_color: '#001028',
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
    ],
  };
}
