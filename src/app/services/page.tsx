import type { Metadata } from 'next';
import ServicesPageClient from './services-client';
import JsonLd from '@/components/JsonLd';
import { collectionPageSchema, breadcrumbSchema } from '@/lib/seo';

const title = 'Engineering Services Portfolio | QOARC';
const description = 'Explore our software development, machine learning integration, MLOps, solution architecture, and strategic IT consulting services.';
const path = '/services';

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
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path }]),
        ]}
      />
      <ServicesPageClient />
    </>
  );
}
