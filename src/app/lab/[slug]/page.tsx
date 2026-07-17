import type { Metadata } from 'next';
import LabDetailPageClient from './detail-client';
import JsonLd from '@/components/JsonLd';
import { absoluteUrl, articleSchema, breadcrumbSchema, toIsoDate } from '@/lib/seo';

const FALLBACK: Record<string, { name: string; desc: string }> = {
  'pfas-rigidity': {
    name: 'PFAS Rigidity Modeling',
    desc: 'Applying Hybrid GNN architectures to predict the structural rigidity and environmental persistence of PFAS chains.',
  },
  'cow-project': {
    name: 'Project COW (Cognitive Over-Write)',
    desc: 'Developing self-correcting neural nodes to eliminate hallucination in domain-specific Large Language Models.',
  },
  'animal-weight': {
    name: 'Animal Weight Estimation',
    desc: 'Applying advanced computer vision with SAM2 and Depth Anything v2 for precision livestock weight estimation.',
  },
};

async function getLabItem(slug: string): Promise<any | null> {
  try {
    const res = await fetch(absoluteUrl('/api/lab-items'), { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const items = await res.json();
    if (!Array.isArray(items)) return null;
    return items.find((i: any) => i.slug === slug) || items.find((i: any) => String(i.id) === slug) || null;
  } catch {
    return null;
  }
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getLabItem(slug);
  const name = item?.name || FALLBACK[slug]?.name || 'QOARC Research';
  const description = item?.desc || item?.abstract || FALLBACK[slug]?.desc || 'QOARC Labs — research and product insights.';
  const image = item?.imageUrl;
  const path = `/lab/${slug}`;
  return {
    title: { absolute: `${name} | QOARC Research` },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      title: name,
      description,
      url: absoluteUrl(path),
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { title: name, description, ...(image ? { images: [image] } : {}) },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const item = await getLabItem(slug);
  const name = item?.name || FALLBACK[slug]?.name || 'QOARC Research';
  const description = item?.desc || item?.abstract || FALLBACK[slug]?.desc || '';
  const path = `/lab/${slug}`;
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: name,
            description,
            path,
            image: item?.imageUrl,
            datePublished: toIsoDate(item?.date),
            section: item?.category,
            authorName: 'QOARC Labs',
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Lab', path: '/lab' },
            { name, path },
          ]),
        ]}
      />
      <LabDetailPageClient />
    </>
  );
}
