import type { Metadata } from 'next';
import TeamPageClient from './team-client';

export const metadata: Metadata = {
  title: "Meet the Team | QOARC",
  description: "Get to know the architects, engineers, and product strategists building sovereign AI systems and high-end software solutions at QOARC.",
};

export default function Page() {
  return <TeamPageClient />;
}
