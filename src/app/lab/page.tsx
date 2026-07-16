import type { Metadata } from 'next';
import LabPageClient from './lab-client';

export const metadata: Metadata = {
  title: "Research Lab & Blog | QOARC",
  description: "Technical insights, machine learning research, and software engineering papers from QOARC. Explore our work in GNN toxicity modeling and self-correcting LLMs.",
};

export default function Page() {
  return <LabPageClient />;
}
