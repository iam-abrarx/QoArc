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
  Sparkles
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

const serviceData: Record<string, any> = {
  'ai-integration': {
    name: 'AI Integration',
    desc: 'Embedding large-scale generative and predictive intelligence into your core software infrastructure.',
    cta: 'Start this service →',
    metrics: [
      { label: 'Delivery', val: '6–12 weeks' },
      { label: 'Origin', val: 'AI-native by default' },
      { label: 'Rights', val: 'Full IP transfer' }
    ],
    included: [
      'Custom LLM Fine-tuning (OpenAI, Anthropic, Llama)',
      'RAG (Retrieval-Augmented Generation) Architecture',
      'Cognitive Workflow Design',
      'AI Ethics & Safety Guardrails',
      'Automated Quality Assurance'
    ],
    process: [
      { step: 'Logic Mapping', desc: 'Identifying high-leverage cognitive bottlenecks in your current system.' },
      { step: 'Model Selection', desc: 'Benchmarking and selecting the optimal neural architecture for the task.' },
      { step: 'Deployment', desc: 'Seamless integration into production with zero-latency monitoring.' }
    ],
    tech: ['Python', 'PyTorch', 'OpenAI API', 'Pinecone', 'LangChain', 'Next.js'],
    industries: ['FinTech', 'HealthTech', 'Logistics', 'Retail'],
    pricing: 'Projects typically start at $12,000',
    faq: [
      { q: 'How long does a typical AI integration take?', a: 'Phase 1 MVP usually takes 6–8 weeks for initial deployment.' },
      { q: 'Do we keep the intellectual property?', a: 'Yes, all code and model configurations transfer to you on final payment.' },
      { q: 'Can you integrate with legacy systems?', a: 'Specifically, yes. We specialize in building bridging layers.' },
      { q: 'What about data privacy?', a: 'We implement local-first or VPC-contained models for sensitive data.' },
      { q: 'Is there an ongoing cost?', a: 'Aside from API tokens, we offer optional optimization retainers.' }
    ]
  },
  'saas-development': {
     name: 'SaaS Development',
     desc: 'Building mission-critical software products from zero to one with senior-led engineering.',
     cta: 'Build your product →',
     metrics: [
       { label: 'Stack', val: 'Full-Stack Excellence' },
       { label: 'Velocity', val: '2-Week Sprints' },
       { label: 'Quality', val: 'ISO 27001 Ready' }
     ],
     included: [
       'End-to-end Product Architecture',
       'Frontend & UX/UI Frameworks',
       'Scalable Backend Systems',
       'Auth & Security Logic',
       'Payment Integration (Stripe/Bank)'
     ],
     process: [
       { step: 'Strategy', desc: 'Mapping product-market fit to technical feasibility.' },
       { step: 'Agile Build', desc: 'Modular engineering with weekly demos and clear visibility.' },
       { step: 'Launch', desc: 'Production-grade deployment with full documentation.' }
     ],
     tech: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS', 'Vercel', 'Stripe'],
     industries: ['B2B SaaS', 'Financial Engine', 'HR Tech', 'Consumer'],
     pricing: 'Projects typically start at $25,000',
     faq: [
       { q: 'Do you handle the UX design?', a: 'Yes, we are a full-service studio. Design is integrated into the build.' },
       { q: 'Can we hire you for maintenance?', a: 'We offer flexible SLA-driven retainers post-launch.' },
       { q: 'What stack do you use?', a: 'Preferably Next.js/Node/Postgres (modern stability stack).' },
       { q: 'Do you work on mobile?', a: 'Yes, via React Native or PWA depending on requirements.' },
       { q: 'How do you handle project management?', a: 'Shared Notion boards, Slack channels, and Loom demo updates.' }
     ]
  }
};

export default function ServicePage() {
  const { openModal } = useLeadCapture();
  const { slug } = useParams();
  const data = serviceData[slug as string] || serviceData['ai-integration'];

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
            {data.metrics.map((m: any) => (
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
            <h2 className="text-5xl font-display font-medium text-primary tracking-tight italic">Technical <span className="opacity-40">Coverage.</span></h2>
            <div className="space-y-6">
              {data.included.map((item: string) => (
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
            <h2 className="text-5xl font-display font-medium text-primary tracking-tight italic">The Strategy.</h2>
            <div className="space-y-12">
              {data.process.map((p: any, i: number) => (
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

      {/* Tech & Industries */}
      <section className="py-40 px-8">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-20">
          <motion.div {...fadeInUp} className="space-y-8">
            <h3 className="text-precision uppercase opacity-40">Technologies</h3>
            <div className="flex flex-wrap gap-4">
              {data.tech.map((t: string) => (
                <span key={t} className="px-6 py-2 rounded-none bg-surface-container-low border border-outline-variant/10 text-[10px] font-bold text-primary uppercase tracking-widest italic">{t}</span>
              ))}
            </div>
          </motion.div>
          <motion.div {...fadeInUp} className="space-y-8">
             <h3 className="text-precision uppercase opacity-40">Industries Served</h3>
             <div className="flex flex-wrap gap-12 items-center opacity-40">
                {data.industries.map((ind: string) => (
                  <div key={ind} className="flex items-center gap-2">
                    <Sparkles size={14} className="text-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest">{ind}</span>
                  </div>
                ))}
             </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Signal */}
      <section className="pb-40 px-8">
        <div className="max-w-screen-xl mx-auto bg-primary py-24 px-12 rounded-none text-center space-y-8 relative overflow-hidden shadow-premium">
          <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Pricing Signal</div>
          <h2 className="text-5xl font-display font-medium text-white tracking-tight italic opacity-90">{data.pricing}</h2>
          <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
            <Cpu size={300} className="text-white" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-40 px-8 bg-surface-container-low/30 rounded-none mx-8 mb-40">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-1 gap-12">
          <div className="mb-20 text-center space-y-4">
             <h2 className="text-6xl font-display font-medium text-primary tracking-tight italic">Standard Inquiry.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {data.faq.map((item: any) => (
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
               Let&apos;s scope your <span className="text-secondary opacity-60">{data.name}</span> project.
            </h2>
            <button 
              onClick={openModal}
              className="inline-flex bg-primary text-white px-12 py-6 rounded-none font-bold uppercase tracking-[0.3em] text-sm hover:shadow-2xl transition-all hover:scale-105 active:scale-95 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
            >
               Initiate Engagement Sequence →
            </button>
         </div>
      </section>
    </div>
  );
}
