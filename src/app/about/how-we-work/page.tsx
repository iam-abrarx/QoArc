import type { Metadata } from 'next';
import WorkPageClient from './work-client';

export const metadata: Metadata = {
  title: "How We Work | QOARC",
  description: "Learn about our development methodologies, high-fidelity sprints, NDA-backed security protocols, and sovereign project execution frameworks.",
  alternates: { canonical: "/about/how-we-work" },
  openGraph: {
    title: "How We Work | QOARC",
    description: "Our development methodology, sprints, and secure delivery frameworks.",
    url: "/about/how-we-work",
    type: "website",
  },
};

export default function Page() {
  return <WorkPageClient />;
}
