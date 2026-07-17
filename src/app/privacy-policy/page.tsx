import type { Metadata } from 'next';
import Client from './privacy-client';
import JsonLd from '@/components/JsonLd';
import { webPageSchema, breadcrumbSchema } from '@/lib/seo';

const title = 'Privacy Policy';
const description = 'How QOARC collects, uses, and protects your personal data.';
const path = '/privacy-policy';

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
