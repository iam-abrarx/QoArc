import type { Metadata } from 'next';
import LabDetailPageClient from './detail-client';

const labData: Record<string, { name: string, abstract: string }> = {
  'pfas-rigidity': {
    name: 'PFAS Rigidity Modeling',
    abstract: 'Applying Hybrid GNN architectures to predict the structural rigidity and environmental persistence of PFAS chains.'
  },
  'cow-project': {
    name: 'Project COW (Cognitive Over-Write)',
    abstract: 'Developing self-correcting neural nodes to eliminate hallucination in domain-specific Large Language Models.'
  },
  'animal-weight': {
    name: 'Animal Weight Estimation',
    abstract: 'Applying advanced computer vision with SAM2 and Depth Anything v2 for precision livestock weight estimation.'
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = labData[slug] || labData['pfas-rigidity'];
  return {
    title: `${data.name} | QOARC Research`,
    description: data.abstract,
  };
}

export default function Page() {
  return <LabDetailPageClient />;
}
