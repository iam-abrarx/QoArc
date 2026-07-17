import type { Metadata } from 'next';
import Client from './terms-client';
import JsonLd from '@/components/JsonLd';
import { webPageSchema, breadcrumbSchema } from '@/lib/seo';

const title = 'Terms of Service';
const description = 'The terms and conditions governing use of the QOARC website and services.';
const path = '/terms';

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
          webPageSchema({ name: `${title} | QOARC`, description, path }),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: title, path }]),
        ]}
      />
      <Client />
    </>
  );
}
