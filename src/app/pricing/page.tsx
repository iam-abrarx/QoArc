import type { Metadata } from 'next';
import Client from './pricing-client';
import JsonLd from '@/components/JsonLd';
import { webPageSchema, breadcrumbSchema } from '@/lib/seo';

const title = 'Pricing';
const description = 'Transparent, project-based pricing for AI product development, SaaS engineering, and automation. Find the engagement model that fits your stage.';
const path = '/pricing';

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
