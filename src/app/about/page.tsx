import type { Metadata } from 'next';
import AboutPageClient from './about-client';
import JsonLd from '@/components/JsonLd';
import { SITE, breadcrumbSchema } from '@/lib/seo';

const title = "About Us | QOARC Studio";
const description = "A full-service AI product studio. Discover our team, philosophy, core pillars of security and sovereignty, and how we build the future of software systems.";
const path = "/about";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: 'website' },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          { '@context': 'https://schema.org', '@type': 'AboutPage', name: title, description, url: `${SITE.url}${path}`, about: { '@id': `${SITE.url}/#organization` } },
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path }]),
        ]}
      />
      <AboutPageClient />
    </>
  );
}
