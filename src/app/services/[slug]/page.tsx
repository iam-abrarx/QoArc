import type { Metadata } from 'next';
import Client from './service-slug-client';
import JsonLd from '@/components/JsonLd';
import { serviceSchema, breadcrumbSchema } from '@/lib/seo';

const KNOWN: Record<string, { name: string; description: string }> = {
  'ai-integration': {
    name: 'AI Integration',
    description: 'Embedding large-scale generative and predictive intelligence into your core software infrastructure.',
  },
  'saas-development': {
    name: 'SaaS Development',
    description: 'Multi-tenant recurring-revenue platforms with subscription logic and white-label capabilities.',
  },
};

function titleCase(slug: string) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = KNOWN[slug] || { name: titleCase(slug), description: `${titleCase(slug)} — engineering and consulting services by QOARC.` };
  const path = `/services/${slug}`;
  return {
    title: { absolute: `${d.name} | QOARC Services` },
    description: d.description,
    alternates: { canonical: path },
    openGraph: { title: `${d.name} | QOARC`, description: d.description, url: path, type: 'website' },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const d = KNOWN[slug] || { name: titleCase(slug), description: `${titleCase(slug)} — engineering and consulting services by QOARC.` };
  const path = `/services/${slug}`;
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: d.name, description: d.description, path, serviceType: d.name }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: d.name, path },
          ]),
        ]}
      />
      <Client />
    </>
  );
}
