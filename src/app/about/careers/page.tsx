import type { Metadata } from 'next';
import CareersPageClient from './careers-client';
import JsonLd from '@/components/JsonLd';
import { webPageSchema, breadcrumbSchema } from '@/lib/seo';

const title = 'Careers & Open Roles | QOARC';
const description = 'Join us in engineering the future of digital systems. Explore open roles in machine learning, full-stack product engineering, and systems design.';
const path = '/about/careers';

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
          webPageSchema({ name: title, description, path }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Careers', path },
          ]),
        ]}
      />
      <CareersPageClient />
    </>
  );
}
