import React from 'react';
import DynamicNodeTemplate from '@/components/DynamicNodeTemplate';
import { notFound } from 'next/navigation';

const contentMap: Record<string, any> = {
  'gtm-strategy-consulting': {
    title: 'GTM Strategy',
    category: 'IT Consulting // Growth',
    desc: 'Architecting scientific go-to-market frameworks that bridge technical product value with high-impact market entry.',
    techStack: ['Market Intelligence', 'Product Mapping', 'Growth Loops', 'Pricing Models'],
    visual: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1507679799987-c73774573b8a?q=80&w=2000&auto=format&fit=crop',
    stats: [
      { label: 'Intelligence', value: 'Market-Driven' },
      { label: 'Growth', value: '+35% Scalability' },
      { label: 'Funnels', value: 'Automated Loops' }
    ],
    features: [
      { title: 'Market Audits', desc: 'Deep-dive analysis of technical white space and competitors.', icon: 'Search' },
      { title: 'Pricing Architecture', desc: 'Optimizing product tiers for maximum LTV and ROI.', icon: 'Zap' },
      { title: 'Growth Channels', desc: 'Designing automated acquisition loops and funnels.', icon: 'TrendingUp' },
      { title: 'Launch Roadmap', desc: 'Deterministic 12-month schedule for first-market capture.', icon: 'Globe' }
    ]
  },
  'digital-transformation-consulting': {
    title: 'Digital Transformation',
    category: 'IT Consulting // Systems',
    desc: 'Modernizing legacy organizational logic through high-fidelity digital migration and process automation.',
    techStack: ['Cloud Migration', 'Process Audits', 'Stakeholder Mgmt', 'Legacy API'],
    visual: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop',
    stats: [
      { label: 'Migration', value: 'Cloud-Native' },
      { label: 'Efficiency', value: '+25% Delta' },
      { label: 'Architecture', value: 'API-First' }
    ],
    features: [
      { title: 'Process Mining', desc: 'Identifying operational bottlenecks for automation.', icon: 'Activity' },
      { title: 'Cloud Strategy', desc: 'Migration paths from on-prem to secure, scalable cloud.', icon: 'Globe' },
      { title: 'Culture Shield', desc: 'Managing human transition to new technical toolchains.', icon: 'ShieldCheck' },
      { title: 'Ops Intelligence', desc: 'Real-time dashboarding for organizational health.', icon: 'BarChart' }
    ]
  },
  'solution-architecture': {
    title: 'Solution Architecture',
    category: 'IT Consulting // Engineering',
    desc: 'Designing high-fidelity technical blueprints for complex, mission-critical systems and multi-platform ecosystems.',
    techStack: ['System Design', 'Scalability Audits', 'Integration Logic', 'IaC'],
    visual: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=2000&auto=format&fit=crop',
    stats: [
      { label: 'Systems', value: 'Kubernetes Ready' },
      { label: 'Security', value: 'Zero-Trust' },
      { label: 'Uptime', value: 'High-Availability' }
    ],
    features: [
      { title: 'Technical Blueprinting', desc: 'Deterministic node maps and data flow diagrams.', icon: 'Layers' },
      { title: 'Scaling Protocols', desc: 'Architecting for zero-latency at millions of users.', icon: 'Zap' },
      { title: 'Interoperability', desc: 'Ensuring seamless sync between disparate systems.', icon: 'Cpu' },
      { title: 'Security Perimeter', desc: 'Hardened infrastructure design from first byte.', icon: 'ShieldCheck' }
    ]
  }
};

export default async function ITConsultingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = contentMap[slug];
  
  if (!content) {
    notFound();
  }

  return <DynamicNodeTemplate content={content} />;
}

export async function generateStaticParams() {
  return Object.keys(contentMap).map((slug) => ({ slug }));
}
