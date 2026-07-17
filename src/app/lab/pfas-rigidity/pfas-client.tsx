"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  FlaskConical, 
  Dna, 
  Database, 
  Zap, 
  Globe, 
  Terminal, 
  FileText, 
  Download,
  Code2,
  Cpu,
  GlassWater,
  Sparkles
} from 'lucide-react';
import { useLeadCapture } from '@/context/LeadCaptureContext';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

export default function PFASRigidityPage() {
  const { openModal } = useLeadCapture();
  return (
    <div className="bg-surface pt-40">
      {/* Abstract Header */}
      <section className="px-8 pb-32">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-20 items-end">
          <motion.div {...fadeInUp} className="space-y-12">
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.5em] text-primary/30">
               <FlaskConical size={14} className="text-primary" /> Active Research Node // Environmental
            </div>
            <h1 className="text-7xl md:text-8xl font-display font-medium text-primary tracking-tighter leading-none italic">
              PFAS Rigidity <br/> <span className="text-secondary">Modeling.</span>
            </h1>
            <p className="text-2xl text-primary/60 max-w-xl font-sans leading-relaxed italic border-l-2 border-primary/20 pl-8">
              Applying Hybrid GNN architectures to predict the structural rigidity and environmental persistence of Per- and Polyfluoroalkyl Substances in industrial water cycles.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={openModal}
                className="bg-primary text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Initiate Scoping →
              </button>
            </div>
          </motion.div>
          <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="p-12 rounded-[50px] bg-white border border-outline-variant/10 shadow-premium shape-notched relative overflow-hidden h-full flex flex-col justify-between">
             <div className="absolute inset-0 bg-grid opacity-10"></div>
             <div className="relative z-10 space-y-8">
                <div className="text-xs font-bold uppercase tracking-[0.4em] text-primary/30">Discovery Funnel Convergence</div>
                <div className="space-y-4">
                   <div className="flex justify-between items-end">
                      <div className="text-5xl font-display font-medium italic text-primary tracking-tighter">5.2M</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-primary/30">Candidates Analyzed</div>
                   </div>
                   <div className="h-4 bg-primary/5 rounded-full overflow-hidden">
                      <div className="h-full w-[98%] bg-primary rounded-full"></div>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <div className="text-2xl font-display font-medium text-primary italic">14</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-primary/30">Unicorn Leads</div>
                   </div>
                   <div className="space-y-2">
                      <div className="text-2xl font-display font-medium text-primary italic">98.5%</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-primary/30">Model Precision</div>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Motivation & Commercial Intent */}
      <section className="py-40 px-8 bg-surface-container-low rounded-[80px] lg:mx-8">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-32">
           <motion.div {...fadeInUp} className="space-y-12">
              <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-primary/30">The Incentive</h2>
              <h2 className="text-5xl font-display font-medium text-primary tracking-tight leading-tight italic">
                 Predicting degradation <br/> before synthesis.
              </h2>
              <p className="text-xl text-primary/60 font-sans leading-relaxed">
                 Industrial water treatment systems are reactive. Our model allows manufacturers to predict the 100-year environmental persistence of a chemical surfactant before it even leaves the simulation environment.
              </p>
              <div className="grid grid-cols-2 gap-8">
                 <div className="flex gap-4">
                    <GlassWater className="text-primary mt-1" size={20} />
                    <span className="text-sm font-bold text-primary/70">Industrial Water Cycles</span>
                 </div>
                 <div className="flex gap-4">
                    <Dna className="text-primary mt-1" size={20} />
                    <span className="text-sm font-bold text-primary/70">Molecular Rigidity</span>
                 </div>
              </div>
           </motion.div>
           <motion.div {...fadeInUp} className="space-y-12">
              <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-primary/30">The Methodology</h2>
              <div className="p-10 rounded-[40px] bg-white shadow-premium border border-outline-variant/10 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 text-primary/5 group-hover:text-primary/10 transition-colors">
                    <Database size={100} />
                 </div>
                 <div className="space-y-8 relative z-10">
                    <h3 className="text-2xl font-display font-medium italic text-primary">Hybrid GNN Architecture.</h3>
                    <p className="text-sm text-primary/50 leading-relaxed font-sans">
                       Combining Graph Convolutional Networks (GCN) with RDKit molecular descriptors to map toxicity across 1.2M known compounds. Transfer learning from ChEMBL ensures zero-shot prediction on fluorinated chains.
                    </p>
                    <div className="flex gap-4">
                       <span className="px-5 py-2 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest">PyTorch</span>
                       <span className="px-5 py-2 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest">Neo4j</span>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Technical Detail */}
      <section className="py-40 px-8">
         <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-3 gap-16">
            {[
               { icon: Terminal, title: 'Data Pipeline', desc: 'Automated ingestion of Tox21 & ToxCast datasets with structural validation via RDKit.' },
               { icon: Cpu, title: 'Edge Compute', desc: 'Model optimized for inference at the water filtration node using Nvidia Jetson.' },
               { icon: Globe, title: 'Environmental Impact', desc: 'Predicting half-life degradation across 4 major industrial effluent types.' }
            ].map((node, i) => (
              <motion.div key={node.title} {...fadeInUp} transition={{ delay: i * 0.1 }} className="space-y-6">
                 <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <node.icon size={20} />
                 </div>
                 <h3 className="text-2xl font-display font-medium italic text-primary">{node.title}</h3>
                 <p className="text-sm text-primary/50 leading-relaxed font-sans">{node.desc}</p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Results & Commercialization */}
      <section className="py-40 px-8 bg-primary rounded-[80px] lg:mx-8 text-white relative overflow-hidden mb-40">
         <div className="absolute inset-0 bg-grid opacity-10"></div>
         <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-32 items-center relative z-10">
            <div className="space-y-12">
               <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-white/40 italic">Research Outcomes</h2>
               <h2 className="text-7xl font-display font-medium text-white tracking-tighter italic leading-none">
                  Derived <br/> <span className="opacity-50">Discovery.</span>
               </h2>
               <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                     <Zap className="text-white mt-1" size={20} />
                     <p className="text-lg font-display font-medium italic">14 Bio-degradable Surfactant leads identified.</p>
                  </div>
                  <div className="flex gap-6 items-start">
                     <Zap className="text-white mt-1" size={20} />
                     <p className="text-lg font-display font-medium italic">60% faster environmental half-life predicted.</p>
                  </div>
               </div>
            </div>
            <div className="p-16 rounded-[40px] bg-white text-primary space-y-10 group shadow-2xl">
               <h3 className="text-xs font-bold uppercase tracking-[0.5em] text-primary/30">Acquisition Node</h3>
               <p className="text-2xl font-display font-medium italic">
                  This research module is available for exclusive commercial licensing or integration into proprietary R&D pipelines.
               </p>
                <div className="pt-8 flex flex-col gap-6">
                  <button 
                    onClick={openModal}
                    className="w-full py-6 rounded-2xl bg-primary text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-4 hover:shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                     Initiate Licensing Sequence <ArrowRight size={14} />
                  </button>
                  <Link href="#" className="flex justify-center items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-primary/30 hover:text-primary transition-colors">
                     <FileText size={14} /> Request Methodology Whitepaper
                  </Link>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
