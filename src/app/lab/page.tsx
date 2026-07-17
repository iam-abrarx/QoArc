import type { Metadata } from 'next';
import LabPageClient from './lab-client';
import JsonLd from '@/components/JsonLd';
import { SITE, collectionPageSchema, breadcrumbSchema } from '@/lib/seo';

const title = 'Research Lab & Blog | QOARC';
const description = 'Technical insights, machine learning research, and software engineering papers from QOARC. Explore our work in GNN toxicity modeling and self-correcting LLMs.';
const path = '/lab';

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
          { '@context': 'https://schema.org', '@type': 'Blog', name: 'QOARC Lab', url: `${SITE.url}${path}`, description, publisher: { '@id': `${SITE.url}/#organization` } },
          collectionPageSchema({ name: title, description, path }),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Lab', path }]),
        ]}
      />
      <LabPageClient />
    </>
  );
}
