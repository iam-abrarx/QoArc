import type { Metadata } from 'next';
import ServicesPageClient from './services-client';

export const metadata: Metadata = {
  title: "Engineering Services Portfolio | QOARC",
  description: "Explore our software development, machine learning integration, MLOps, solution architecture, and strategic IT consulting services.",
};

export default function Page() {
  return <ServicesPageClient />;
}
