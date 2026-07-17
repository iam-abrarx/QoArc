import type { Metadata } from 'next';
import Client from './ai-integration-client';
import JsonLd from '@/components/JsonLd';
import { serviceSchema, breadcrumbSchema } from '@/lib/seo';

const title = 'AI Integration';
const description = 'Embed large-scale generative and predictive intelligence into your core software — custom LLM fine-tuning, RAG architecture, and cognitive workflow design.';
const path = '/services/ai-integration';

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
          serviceSchema({ name: title, description, path, serviceType: 'AI Integration' }),
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
