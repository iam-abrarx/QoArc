import type { Metadata } from 'next';
import Client from './insights-client';
import JsonLd from '@/components/JsonLd';
import { collectionPageSchema, breadcrumbSchema } from '@/lib/seo';

const title = 'Insights';
const description = 'Perspectives from QOARC on AI engineering, product strategy, and building autonomous software systems.';
const path = '/insights';

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
