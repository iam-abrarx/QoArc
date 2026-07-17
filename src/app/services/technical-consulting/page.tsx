import type { Metadata } from 'next';
import Client from './technical-consulting-client';
import JsonLd from '@/components/JsonLd';
import { serviceSchema, breadcrumbSchema } from '@/lib/seo';

const title = 'Technical Consulting';
const description = 'Senior engineering guidance on architecture, AI strategy, and digital transformation — from solution design to scaling production systems.';
const path = '/services/technical-consulting';

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
          serviceSchema({ name: title, description, path, serviceType: 'Technical Consulting' }),
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
