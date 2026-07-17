import type { Metadata } from 'next';
import Client from './industry-slug-client';
import JsonLd from '@/components/JsonLd';
import { serviceSchema, breadcrumbSchema } from '@/lib/seo';

const INDUSTRIES: Record<string, { name: string; description: string }> = {
  fintech: {
    name: 'Fintech Solutions',
    description: 'AI-driven software, automation, and secure infrastructure for banks, payments, and financial services — engineered for compliance and scale.',
  },
  healthcare: {
    name: 'Healthcare Solutions',
    description: 'Intelligent software and data platforms for healthcare providers and health-tech — secure, compliant, and patient-centered.',
  },
  'retail-ecommerce': {
    name: 'Retail & E-Commerce Solutions',
    description: 'Conversion-focused commerce platforms and AI personalization for retail and e-commerce brands.',
  },
  manufacturing: {
    name: 'Manufacturing Solutions',
    description: 'Industrial software, IoT, and predictive intelligence for modern manufacturing operations.',
  },
};

const fallback = {
  name: 'Industry Solutions',
  description: 'AI-driven software and operational intelligence for mission-critical sectors.',
};

export function generateStaticParams() {
  return Object.keys(INDUSTRIES).map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = INDUSTRIES[slug] || fallback;
  const path = `/industries/${slug}`;
  return {
    title: d.name,
    description: d.description,
    alternates: { canonical: path },
    openGraph: { title: `${d.name} | QOARC`, description: d.description, url: path, type: 'website' },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const d = INDUSTRIES[slug] || fallback;
  const path = `/industries/${slug}`;
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: d.name, description: d.description, path, serviceType: d.name }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Industries', path: '/services' },
            { name: d.name, path },
          ]),
        ]}
      />
      <Client />
    </>
  );
}
