import type { Metadata } from 'next';
import WorkDetailPageClient from './detail-client';
import { initialProjects } from '@/lib/portfolio';
import JsonLd from '@/components/JsonLd';
import { absoluteUrl, creativeWorkSchema, breadcrumbSchema } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

function getProject(slug: string) {
  return initialProjects.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug) || initialProjects[0];
  const name = project.name;
  const description = project.description || `Read the full case study on ${project.name}, engineered by QOARC.`;
  const image = project.imageUrl || project.heroImage;
  const path = `/work/${slug}`;
  return {
    title: { absolute: `${name} | QOARC Case Study` },
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
  const project = getProject(slug);
  const path = `/work/${slug}`;
  return (
    <>
      {project && (
        <JsonLd
          data={[
            creativeWorkSchema({
              name: project.name,
              description: project.description || '',
              path,
              image: project.imageUrl || project.heroImage,
              keywords: project.techStack,
            }),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Work', path: '/work' },
              { name: project.name, path },
            ]),
          ]}
        />
      )}
      <WorkDetailPageClient />
    </>
  );
}
