"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Cpu, 
  Terminal, 
  FlaskConical, 
  FileText, 
  Database, 
  Code2, 
  Layers, 
  BarChart3,
  Dna,
  Share2,
  Download,
  Globe
} from 'lucide-react';
import { useLeadCapture } from '@/context/LeadCaptureContext';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

const labData: Record<string, any> = {
  'pfas-rigidity': {
    name: 'PFAS Rigidity Modeling',
    abstract: 'Applying Hybrid GNN architectures to predict the structural rigidity and environmental persistence of Per- and Polyfluoroalkyl Substances (PFAS) in industrial water cycles.',
    metrics: [
      { val: '5.2M', label: 'Candidates Modeled' },
      { val: '98.5%', label: 'Prediction Precision' },
      { val: 'SAM2 + GNN', label: 'Neural Architecture' }
    ],
    motivation: 'Commercial filtration systems lack the ability to predict molecular degradation at scale. This research aims to identify "Unicorn" leads for biodegradable alternatives before synthesis.',
    methodology: 'The "Dual Brain" architecture combines Graph Convolutional Networks (GCN) with RDKit molecular descriptors. We utilized transfer learning from the ChEMBL database to specialize our toxicity prediction on fluorinated chains.',
    tech: ['Python', 'PyTorch', 'RDKit', 'ChEMBL', 'Neo4j', 'Ray Serve'],
    results: 'Our model identified 14 candidates for alternative surfactants that demonstrate a 60% higher degradation rate in standardized environmental simulations while maintaining industrial surfactant efficiency.',
    arxiv: 'https://arxiv.org/abs/example',
    license: 'Available for commercial licensing or custom development'
  },
  'cow-project': {
    name: 'Project COW',
    abstract: 'Cognitive Over-Write: Developing self-correcting neural nodes to eliminate hallucination in domain-specific Large Language Models.',
    metrics: [
      { val: '0.02%', label: 'Hallucination Rate' },
      { val: 'Multi-Agent', label: 'Logic Layer' },
      { val: 'Open-Weights', label: 'Incubation' }
    ],
    motivation: 'LLMs in mission-critical environments (Legislation, Medicine) require deterministic logic. COW introduces a sovereign verification layer that checks outputs against a symbolic knowledge graph before token emission.',
    methodology: 'Integrating symbolic AI with neural transformers. The system uses a "Referee" agent that performs real-time fact-checking against curated vector databases.',
    tech: ['Rust', 'Tantivy', 'Go', 'Llama-3', 'vLLM', 'Docker'],
    results: 'Successfully reduced hallucination in legal transcript analysis by 94% compared to base GPT-4o implementations.',
    arxiv: 'https://arxiv.org/abs/cow-example',
    license: 'Custom integration for enterprise environments only'
  }
};

export default function LabDetailPage() {
  const { openModal } = useLeadCapture();
  const { slug } = useParams();
  const data = labData[slug as string] || labData['pfas-rigidity'];

  return (
    <div className="bg-surface pt-40">
      {/* Abstract Header */}
      <section className="px-8 pb-32">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-20 items-end">
          <motion.div {...fadeInUp} className="space-y-12">
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.5em] text-primary/30">
               <FlaskConical size={14} className="text-primary" /> Active Research Node
            </div>
            <h1 className="text-7xl md:text-8xl font-display font-medium text-primary tracking-tighter italic">
              {data.name}
            </h1>
            <p className="text-2xl text-primary/60 max-w-xl font-sans leading-relaxed italic border-l-2 border-primary/20 pl-8">
              {data.abstract}
            </p>
          </motion.div>
          <motion.div {...fadeInUp} className="flex gap-4">
             <button className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/10 text-primary hover:bg-primary hover:text-white transition-all">
                <Share2 size={20} />
             </button>
             <Link href={data.arxiv} target="_blank" className="flex-1 bg-surface-container-high text-primary px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-surface-container-highest transition-all">
                <FileText size={18} /> Download Abstract (PDF)
             </Link>
          </motion.div>
        </div>
      </section>

      {/* Metrics Stat Cards */}
      <section className="px-8 pb-40">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
           {data.metrics.map((m: any, i: number) => (
             <motion.div 
               key={m.label} 
               {...fadeInUp} 
               transition={{ delay: i * 0.1 }}
               className="p-12 rounded-[40px] bg-white border border-outline-variant/10 space-y-4 shadow-premium relative overflow-hidden group hover:-translate-y-2 transition-transform h-full flex flex-col justify-center"
             >
                <div className="text-xs font-bold uppercase tracking-[0.4em] text-primary/30">{m.label}</div>
                <div className="text-5xl font-display font-medium text-primary italic tracking-tighter">{m.val}</div>
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity">
                   <Dna size={120} />
                </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Motivation & Methodology */}
      <section className="py-40 px-8 bg-surface-container-low rounded-[80px] lg:mx-8">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-32">
           <motion.div {...fadeInUp} className="space-y-12">
              <h2 className="text-5xl font-display font-medium text-primary tracking-tight">Commerical <br/> <span className="italic">Incentive.</span></h2>
              <p className="text-xl text-primary/60 font-sans leading-relaxed">
                 {data.motivation}
              </p>
              <div className="h-px bg-primary/10 w-24"></div>
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white"><Terminal size={20} /></div>
                 <div className="text-xs font-bold uppercase tracking-[0.3em] text-primary/40">Sovereign Data Extraction Node</div>
              </div>
           </motion.div>
           <motion.div {...fadeInUp} className="space-y-12">
              <h2 className="text-5xl font-display font-medium text-primary tracking-tight">Strategic <br/> <span className="italic">Execution.</span></h2>
              <div className="p-12 rounded-[40px] bg-surface relative overflow-hidden border border-outline-variant/10 shadow-premium">
                 <div className="absolute inset-0 bg-grid opacity-20"></div>
                 <p className="relative z-10 text-lg text-primary/70 leading-relaxed font-sans italic">
                    {data.methodology}
                 </p>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-32 px-8">
        <div className="max-w-screen-2xl mx-auto flex flex-col items-center gap-12 text-center">
           <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/30">Research Stack</h3>
           <div className="flex flex-wrap justify-center gap-6">
              {data.tech.map((t: string) => (
                <div key={t} className="px-10 py-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 text-xs font-bold text-primary italic shadow-premium hover:bg-primary hover:text-white transition-all cursor-crosshair">
                  {t}
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-40 px-8 bg-white border-t border-outline-variant/10">
         <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
            <motion.div {...fadeInUp} className="space-y-12">
               <h2 className="text-6xl font-display font-medium text-primary tracking-tight">Derived Value.</h2>
               <div className="p-12 border-l-4 border-primary bg-surface-container-low rounded-r-[40px] space-y-6">
                  <p className="text-2xl font-display font-medium text-primary/80 leading-relaxed italic">
                    {data.results}
                  </p>
               </div>
            </motion.div>
            <motion.div {...fadeInUp} className="space-y-12">
               <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-primary/30 italic">Scientific Provenance</h2>
               <div className="space-y-8">
                  <Link href={data.arxiv} className="flex items-center justify-between p-8 rounded-2xl border border-outline-variant/10 hover:border-primary transition-all group">
                     <span className="text-lg font-bold text-primary">Full Whitepaper</span>
                     <Download size={20} className="text-primary/40 group-hover:text-primary group-hover:translate-y-1 transition-all" />
                  </Link>
                  <div className="flex items-center justify-between p-8 rounded-2xl border border-outline-variant/10">
                     <span className="text-lg font-bold text-primary">Raw Logic Mapping</span>
                     <Code2 size={20} className="text-primary/40" />
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-40 px-8 text-center bg-surface-container-low rounded-t-[80px]">
         <div className="max-w-screen-md mx-auto space-y-12">
            <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-primary/30 mb-8 italic">Commercialization</h2>
            <h2 className="text-7xl font-display font-medium text-primary tracking-tighter leading-none italic">
               {data.license}.
            </h2>
            <div className="pt-8">
               <button 
                 onClick={openModal}
                 className="inline-flex bg-primary text-white px-12 py-6 rounded-2xl font-bold uppercase tracking-[0.3em] text-sm hover:shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
               >
                 Initiate Scoping Sequence
               </button>
             </div>
         </div>
      </section>
    </div>
  );
}
