import type { Metadata } from 'next';
import AboutPageClient from './about-client';

export const metadata: Metadata = {
  title: "About Us | QOARC Studio",
  description: "A full-service AI product studio. Discover our team, philosophy, core pillars of security and sovereignty, and how we build the future of software systems.",
};

export default function Page() {
  return <AboutPageClient />;
}
