import type { Metadata } from 'next';
import CareersPageClient from './careers-client';

export const metadata: Metadata = {
  title: "Careers & Open Roles | QOARC",
  description: "Join us in engineering the future of digital systems. Explore open roles in machine learning, full-stack product engineering, and systems design.",
};

export default function Page() {
  return <CareersPageClient />;
}
