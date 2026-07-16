import type { Metadata } from 'next';
import WorkDetailPageClient from './detail-client';
import { initialProjects } from '@/lib/portfolio';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = initialProjects.find(p => p.slug === slug) || initialProjects[0];
  return {
    title: `${project.name} | QOARC Case Study`,
    description: project.description || `Read the full case study on ${project.name} developed by QOARC.`,
  };
}

export default function Page() {
  return <WorkDetailPageClient />;
}
