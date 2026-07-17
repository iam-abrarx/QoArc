import type { Metadata } from 'next';
import Client from './automation-client';
import JsonLd from '@/components/JsonLd';
import { serviceSchema, breadcrumbSchema } from '@/lib/seo';

const title = 'Business Automation';
const description = 'Automate repetitive operations and back-office workflows with intelligent process automation, RPA, and AI-driven decisioning built into your systems.';
const path = '/services/automation';

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
          serviceSchema({ name: title, description, path, serviceType: 'Business Process Automation' }),
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
