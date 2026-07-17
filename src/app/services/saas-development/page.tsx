import type { Metadata } from 'next';
import Client from './saas-client';
import JsonLd from '@/components/JsonLd';
import { serviceSchema, breadcrumbSchema } from '@/lib/seo';

const title = 'SaaS Development';
const description = 'Build multi-tenant, recurring-revenue SaaS platforms with subscription billing, tenant isolation, and an API-first architecture — engineered to scale.';
const path = '/services/saas-development';

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
          serviceSchema({ name: title, description, path, serviceType: 'SaaS Development' }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: title, path },
          ]),
        ]}
      />
      <Client />
    </>
  );
}
