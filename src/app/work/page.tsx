import type { Metadata } from 'next';
import WorkPageClient from './work-client';
import JsonLd from '@/components/JsonLd';
import { collectionPageSchema, breadcrumbSchema } from '@/lib/seo';

const title = 'Selected Work & Case Studies | QOARC';
const description = 'View our portfolio of custom software systems, high-frequency transaction engines, and digital platforms built for leading startups and charity foundations.';
const path = '/work';

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
          collectionPageSchema({ name: title, description, path }),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Work', path }]),
        ]}
      />
      <WorkPageClient />
    </>
  );
}
