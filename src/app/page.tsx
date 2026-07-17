import type { Metadata } from 'next';
import HomePageClient from './home-client';

export const metadata: Metadata = {
  title: "QOARC | Architecting Autonomous Intelligence & Custom Software",
  description: "Bespoke software engineering and sovereign AI systems for enterprise. We build scalable SaaS, custom CRM/ERP solutions, and predictive machine learning models.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "QOARC | Architecting Autonomous Intelligence & Custom Software",
    description: "Bespoke software engineering and sovereign AI systems for enterprise.",
    url: "/",
    type: "website",
  },
};

export default function Page() {
  return <HomePageClient />;
}
