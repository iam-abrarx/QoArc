"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLeadCapture } from '@/context/LeadCaptureContext';
import { 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Zap, 
  Layout, 
  BarChart3, 
  MessageSquare,
  History,
  ShieldCheck,
  TrendingUp,
  Database,
  Cloud,
  Code2,
  ChevronRight,
  Sparkles,
  Globe
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

interface IndustryData {
  name: string;
  desc: string;
  cta: string;
  metrics: { label: string; val: string }[];
  included: string[];
  process: { step: string; desc: string }[];
  tech: string[];
  solutions: string[];
  pricing: string;
  faq: { q: string; a: string }[];
}

const defaultIndustryData: IndustryData = {
  name: 'Industry Transformation',
  desc: 'Accelerating digital infrastructure and operational intelligence for mission-critical sectors.',
  cta: 'Explore Solutions →',
  metrics: [
    { label: 'Impact', val: '10x Scalability' },
    { label: 'Security', val: 'Enterprise Grade' },
    { label: 'Compliance', val: 'Industry Standard' }
  ],
  included: [
    'Digital Transformation Strategy',
    'Custom Operational Architecture',
    'Legacy System Modernization',
    'Cloud-Native Infrastructure',
    'Automated Compliance Workflows'
  ],
  process: [
    { step: 'Analysis', desc: 'Evaluating current technical debt and operational bottlenecks.' },
    { step: 'Architecture', desc: 'Designing a bespoke system optimized for your specific sector.' },
    { step: 'Deployment', desc: 'Phased rollout with zero downtime and comprehensive training.' }
  ],
  tech: ['Cloud Architecture', 'Machine Learning', 'Data Security', 'Real-time Analytics'],
  solutions: ['Custom Platforms', 'Workflow Automation', 'Scalable APIs', 'Predictive Models'],
  pricing: 'Bespoke engagements starting from $15,000',
  faq: [
    { q: 'How do you handle industry-specific compliance?', a: 'We build systems with security and compliance by design, adhering to standards like HIPAA, SOC2, or PCI-DSS where applicable.' },
    { q: 'Can you integrate with our existing legacy systems?', a: 'Yes, we specialize in building modern API layers that safely bridge old and new infrastructure.' },
    { q: 'How long does a transformation project typically take?', a: 'Initial core deployments typically range from 8 to 16 weeks depending on scale.' },
    { q: 'Do you provide ongoing support?', a: 'We offer SLA-driven maintenance and continuous improvement retainers.' }
  ]
};

const industryData: Record<string, Partial<IndustryData>> = {
  'fintech': {
    name: 'FinTech',
    desc: 'Engineering sovereign financial infrastructure, trading systems, and secure core banking engines.',
    metrics: [
      { label: 'Security', val: 'SOC2 & PCI-DSS' },
      { label: 'Latency', val: 'Ultra-low' },
      { label: 'Scale', val: 'Global' }
    ],
    included: [
      'Core Banking System Integration',
      'High-Frequency Trading Architectures',
      'Decentralized Finance (DeFi) Protocols',
      'Fraud Detection & AI Risk Modeling'
    ]
  },
  'healthcare': {
    name: 'Healthcare (HealthTech)',
    desc: 'Building HIPAA-compliant platforms, telemedicine architectures, and AI diagnostics.',
    metrics: [
      { label: 'Compliance', val: 'HIPAA & GDPR' },
      { label: 'Data', val: 'Interoperable' },
      { label: 'UX', val: 'Patient-first' }
    ],
    included: [
      'Electronic Health Records (EHR) Systems',
      'Telehealth & Remote Monitoring',
      'AI Diagnostics & Imaging Analysis',
      'Medical Practice Management'
    ]
  },
  'retail-ecommerce': {
    name: 'Retail & eCommerce',
    desc: 'Scalable commerce engines, intelligent logistics, and hyper-personalized consumer experiences.',
    metrics: [
      { label: 'Availability', val: '99.99%' },
      { label: 'Conversions', val: 'Optimized' },
      { label: 'Logistics', val: 'Automated' }
    ]
  },
  'manufacturing': {
    name: 'Manufacturing (Industry 4.0)',
    desc: 'Predictive maintenance, IIoT networks, and supply chain automation for the modern factory.',
    metrics: [
      { label: 'Efficiency', val: '+40% OEE' },
      { label: 'Downtime', val: 'Minimized' },
      { label: 'IoT', val: 'Integrated' }
    ]
  }
};

export default function IndustryPage() {
  const { openModal } = useLeadCapture();
  const { slug } = useParams();
  
  // Merge default data with specific industry data
  const data: IndustryData = {
    ...defaultIndustryData,
    ...(industryData[slug as string] || {})
  };

  // If we match exactly, override the name properly, otherwise use slug as fallback
  if (!industryData[slug as string] && slug) {
    data.name = (slug as string).split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  return (
    <div className="bg-surface pt-40">
      {/* Hero */}
      <section className="px-8 pb-32">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-20 items-end">
          <motion.div {...fadeInUp} className="space-y-12">
            <h1 className="text-7xl md:text-8xl font-display font-medium text-primary tracking-tighter italic">
              {data.name}
            </h1>
            <p className="text-2xl text-primary/60 max-w-xl font-sans leading-tight italic border-l-[0.5px] border-primary/20 pl-8">
              {data.desc}
            </p>
            <button 
              onClick={openModal}
              className="bg-primary text-white px-10 py-5 rounded-none font-bold text-sm uppercase tracking-[0.2em] flex items-center gap-3 group shadow-sharp hover:shadow-premium transition-all cursor-pointer"
            >
              {data.cta}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          
          <motion.div {...fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.metrics.map((m) => (
              <div key={m.label} className="p-8 rounded-none bg-surface-container-low border border-outline-variant/10 text-center space-y-2 shadow-sharp">
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-primary/40">{m.label}</div>
                <div className="text-xl font-display italic text-primary">{m.val}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What's Included & Process */}
      <section className="py-40 px-8 bg-surface-container-low rounded-none lg:mx-8 cad-line mb-8">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-32">
          {/* Included */}
          <motion.div {...fadeInUp} className="space-y-16">
            <h2 className="text-5xl font-display font-medium text-primary tracking-tight italic">Industry <span className="opacity-40">Solutions.</span></h2>
            <div className="space-y-6">
              {data.included.map((item) => (
                <div key={item} className="flex items-center gap-6 group">
                  <div className="w-6 h-6 rounded-none bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-lg font-bold text-primary/70 group-hover:text-primary transition-colors italic">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Process */}
          <motion.div {...fadeInUp} className="space-y-16 border-l-[0.5px] border-primary/10 pl-32">
            <h2 className="text-5xl font-display font-medium text-primary tracking-tight italic">The Approach.</h2>
            <div className="space-y-12">
              {data.process.map((p, i) => (
                <div key={p.step} className="flex gap-8 group">
                  <div className="text-4xl font-display font-medium text-primary/10 group-hover:text-primary/30 transition-colors">0{i+1}</div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-primary italic uppercase tracking-widest">{p.step}</h4>
                    <p className="text-primary/60 font-sans leading-relaxed italic">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech & Solutions */}
      <section className="py-40 px-8">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-20">
          <motion.div {...fadeInUp} className="space-y-8">
            <h3 className="text-precision uppercase opacity-40">Core Technologies</h3>
            <div className="flex flex-wrap gap-4">
              {data.tech.map((t) => (
                <span key={t} className="px-6 py-2 rounded-none bg-surface-container-low border border-outline-variant/10 text-[10px] font-bold text-primary uppercase tracking-widest italic">{t}</span>
              ))}
            </div>
          </motion.div>
          <motion.div {...fadeInUp} className="space-y-8">
             <h3 className="text-precision uppercase opacity-40">Key Offerings</h3>
             <div className="flex flex-wrap gap-12 items-center opacity-40">
                {data.solutions.map((sol) => (
                  <div key={sol} className="flex items-center gap-2">
                    <Globe size={14} className="text-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest">{sol}</span>
                  </div>
                ))}
             </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Signal */}
      <section className="pb-40 px-8">
        <div className="max-w-screen-xl mx-auto bg-primary py-24 px-12 rounded-none text-center space-y-8 relative overflow-hidden shadow-premium">
          <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Investment</div>
          <h2 className="text-5xl font-display font-medium text-white tracking-tight italic opacity-90">{data.pricing}</h2>
          <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
            <Globe size={300} className="text-white" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-40 px-8 bg-surface-container-low/30 rounded-none mx-8 mb-40">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-1 gap-12">
          <div className="mb-20 text-center space-y-4">
             <h2 className="text-6xl font-display font-medium text-primary tracking-tight italic">Industry FAQ.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {data.faq.map((item) => (
              <div key={item.q} className="p-10 rounded-none bg-white border border-outline-variant/10 shadow-sharp space-y-4 hover:shadow-premium transition-all">
                <h4 className="text-lg font-bold text-primary italic">{item.q}</h4>
                <p className="text-sm text-primary/60 leading-relaxed font-sans italic opacity-80">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-40 px-8 text-center bg-white border-t border-outline-variant/10">
         <div className="max-w-screen-md mx-auto space-y-12">
            <h2 className="text-7xl font-display font-medium text-primary tracking-tighter leading-none italic">
               Let&apos;s build infrastructure for <span className="text-secondary opacity-60">{data.name}</span>.
            </h2>
            <button 
              onClick={openModal}
              className="inline-flex bg-primary text-white px-12 py-6 rounded-none font-bold uppercase tracking-[0.3em] text-sm hover:shadow-2xl transition-all hover:scale-105 active:scale-95 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
            >
               Architect Your Future →
            </button>
         </div>
      </section>
    </div>
  );
}
