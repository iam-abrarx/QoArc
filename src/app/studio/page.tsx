import type { Metadata } from 'next';
import Client from './studio-client';
import JsonLd from '@/components/JsonLd';
import { collectionPageSchema, breadcrumbSchema } from '@/lib/seo';

const title = 'Studio';
const description = 'Inside the QOARC studio — a curated look at the products, case studies, and engineering craft behind our work.';
const path = '/studio';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title: `${title} | QOARC`, description, url: path, type: 'website' },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          collectionPageSchema({ name: `${title} | QOARC`, description, path }),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: title, path }]),
        ]}
      />
      <Client />
    </>
  );
}
