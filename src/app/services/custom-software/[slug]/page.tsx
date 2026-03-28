import React from 'react';
import DynamicNodeTemplate from '@/components/DynamicNodeTemplate';
import { notFound } from 'next/navigation';

const contentMap: Record<string, any> = {
  'web-app-development': {
    title: 'Web App Development',
    category: 'Custom Software // Engineering',
    desc: 'Engineering high-concurrency, multi-tenant web systems optimized for longitudinal scale and sub-second latency.',
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'],
    visual: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop',
    stats: [
      { label: 'Latency', value: '< 200ms' },
      { label: 'Security', value: 'ISO 27001' },
      { label: 'Uptime', value: '99.99%' }
    ],
    features: [
      { title: 'Deterministic Performance', desc: 'Zero-lag interfaces built on edge-optimized frameworks.', icon: 'Zap' },
      { title: 'Sovereign Security', desc: 'End-to-end encrypted data layers and hardened auth protocols.', icon: 'ShieldCheck' },
      { title: 'Multi-Tenant Logic', desc: 'Securely isolated environment architectures for SaaS and Enterprise.', icon: 'Layers' },
      { title: 'Real-time Sync', desc: 'Live data streaming and state synchronization across nodes.', icon: 'Globe' }
    ]
  },
  'mobile-app-development': {
    title: 'Mobile App Development',
    category: 'Custom Software // Engineering',
    desc: 'High-fidelity mobile applications that bridge the gap between native performance and rapid multi-platform deployment.',
    techStack: ['React Native', 'Expo', 'Swift', 'Kotlin', 'Firebase'],
    visual: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2000&auto=format&fit=crop',
    stats: [
      { label: 'Performance', value: '60 FPS Native' },
      { label: 'Coverage', value: 'iOS & Android' },
      { label: 'Engagement', value: '+40% Avg.' }
    ],
    features: [
      { title: 'Native Fluidity', desc: '60fps interactions and smooth gesture-driven UI modules.', icon: 'Smartphone' },
      { title: 'Offline First', desc: 'Robust caching and local-first data persistence strategies.', icon: 'Database' },
      { title: 'Cloud Sync', desc: 'Seamless background data synchronization and push notifications.', icon: 'Globe' },
      { title: 'Biometric Security', desc: 'Integrate native face and touch ID verification layers.', icon: 'ShieldCheck' }
    ]
  },
  'mvp-development': {
    title: 'MVP Development',
    category: 'Custom Software // Strategy',
    desc: 'Rapidly transforming conceptual signals into high-fidelity functional prototypes designed for market validation and seed-stage scaling.',
    techStack: ['T3 Stack', 'Vercel', 'Supabase', 'Tailwind', 'AI-Assist'],
    visual: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=2000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop',
    stats: [
      { label: 'Velocity', value: '4-Week Launch' },
      { label: 'Reliability', value: 'Investor Grade' },
      { label: 'Scalability', value: 'Ready for Series A' }
    ],
    features: [
      { title: 'Rapid Delivery', desc: '4-6 week sprint cycles for first-to-market advantage.', icon: 'Zap' },
      { title: 'Scalable Core', desc: 'Codebase optimized for pivot or rapid expansion post-launch.', icon: 'Layers' },
      { title: 'Cost Precision', desc: 'Lean engineering focused on high-leverage product features.', icon: 'Zap' },
      { title: 'User Telemetry', desc: 'Integrated analytics nodes for real-time validation data.', icon: 'Search' }
    ]
  },
  'enterprise-software-development': {
    title: 'Enterprise Software',
    category: 'Custom Software // Systems',
    desc: 'Architecting hardened internal toolchains and large-scale industrial systems that harmonize fragmented operational logic.',
    techStack: ['Java Spring', '.NET Core', 'Docker', 'Kubernetes', 'AWS'],
    visual: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000&auto=format&fit=crop',
    stats: [
      { label: 'Compliance', value: 'SOC2 Ready' },
      { label: 'Compute', value: 'Clustered Hybrid' },
      { label: 'Integrity', value: 'ACID Compliant' }
    ],
    features: [
      { title: 'Legacy Bridging', desc: 'Securely integrating modern UI with existing legacy databases.', icon: 'Cpu' },
      { title: 'High Availability', desc: 'Clustered server nodes with 99.99% uptime deterministic logic.', icon: 'ShieldCheck' },
      { title: 'Role-Based Auth', desc: 'Granular access control systems for large organizations.', icon: 'Terminal' },
      { title: 'Audit Protocols', desc: 'Immutable logging and tracking for every system interaction.', icon: 'Database' }
    ]
  },
  'saas-development': {
    title: 'SaaS Development',
    category: 'Custom Software // Product',
    desc: 'Building multi-tenant recurring revenue platforms with integrated subscription logic and white-label capabilities.',
    techStack: ['Next.js', 'Stripe', 'Prisma', 'Amazon S3', 'Postmark'],
    visual: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
    stats: [
      { label: 'Revenue', value: 'Stripe Native' },
      { label: 'Multi-Tenant', value: 'Shared/Dedicated' },
      { label: 'Expansion', value: 'Auto-Scaling' }
    ],
    features: [
      { title: 'Subscription Engine', desc: 'Automated billing cycles and multi-tier pricing logic.', icon: 'Zap' },
      { title: 'Tenant Isolation', desc: 'Physically or logically separated data layers per user.', icon: 'ShieldCheck' },
      { title: 'API Ecosystem', desc: 'Developer-first endpoints for third-party integrations.', icon: 'Globe' },
      { title: 'Custom Onboarding', desc: 'High-conversion flows for rapid user acquisition.', icon: 'Sparkles' }
    ]
  },
  'custom-crm': {
    title: 'Custom CRM',
    category: 'Custom Software // Operations',
    desc: 'Deterministic relationship management systems that automate the sales funnel and unify customer telemetry.',
    techStack: ['Node.js', 'NoSQL', 'Twilio API', 'SendGrid', 'SalesForce Sync'],
    visual: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop',
    stats: [
      { label: 'Intelligence', value: 'Lead Scoring AI' },
      { label: 'Channels', value: 'Unified API' },
      { label: 'Real-time', value: 'WS Sync' }
    ],
    features: [
      { title: 'Lead Scoring', desc: 'Algorithmic prioritization of high-value opportunities.', icon: 'Sparkles' },
      { title: 'Omni-channel Sync', desc: 'Unify email, chat, and phone records in one node.', icon: 'Database' },
      { title: 'Workflow Triggers', desc: 'Automated follow-ups and action-based notifications.', icon: 'Zap' },
      { title: 'Visual Analytics', desc: 'Interactive dashboards for real-time pipeline visibility.', icon: 'BarChart' }
    ]
  },
  'erp-development': {
    title: 'ERP Development',
    category: 'Custom Software // Systems',
    desc: 'Unified resource planning systems that manage inventory, human capital, and logistics in a single architectural source of truth.',
    techStack: ['Python', 'SQL Server', 'Graph QL', 'Azure', 'SAP Connector'],
    visual: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2000&auto=format&fit=crop',
    stats: [
      { label: 'Inventory', value: 'Predictive Stock' },
      { label: 'Logistics', value: 'Fleet Tracking' },
      { label: 'Audit', value: 'Continuous Ledger' }
    ],
    features: [
      { title: 'Inventory Logic', desc: 'Real-time stock tracking with predictive reorder nodes.', icon: 'Database' },
      { title: 'Human Capital', desc: 'Payroll, tracking, and performance monitoring modules.', icon: 'ShieldCheck' },
      { title: 'Logistics Core', desc: 'Fleet tracking and supply chain optimization layers.', icon: 'Globe' },
      { title: 'Financial Bridge', desc: 'Continuous ledger synchronization and tax auditing.', icon: 'Terminal' }
    ]
  }
};

export default async function CustomSoftwarePage({ params }: { params: Promise<{ slug: string }> }) {
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
