import type { Metadata } from 'next';
import Client from './pfas-client';
import JsonLd from '@/components/JsonLd';
import { articleSchema, breadcrumbSchema } from '@/lib/seo';

const title = 'PFAS Rigidity Modeling';
const description = 'Applying Hybrid GNN architectures and the molecular rigidity hypothesis to predict the structural resilience and environmental persistence of PFAS chains.';
const path = '/lab/pfas-rigidity';

export const metadata: Metadata = {
  title: { absolute: `${title} | QOARC Research` },
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: 'article' },
  twitter: { title, description },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({ title, description, path, section: 'Research', authorName: 'QOARC Labs' }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Lab', path: '/lab' },
            { name: title, path },
          ]),
        ]}
      />
      <Client />
    </>
  );
}
