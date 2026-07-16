import type { Metadata } from 'next';
import WorkPageClient from './work-client';

export const metadata: Metadata = {
  title: "Selected Work & Case Studies | QOARC",
  description: "View our portfolio of custom software systems, high-frequency transaction engines, and digital platforms built for leading startups and charity foundations.",
};

export default function Page() {
  return <WorkPageClient />;
}
