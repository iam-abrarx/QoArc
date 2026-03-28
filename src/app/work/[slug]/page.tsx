"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Quote, 
  Trophy,
  Briefcase,
  Layers,
  Zap,
  Globe
} from 'lucide-react';
import { useLeadCapture } from '@/context/LeadCaptureContext';
import { usePortfolio } from '@/context/PortfolioContext';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

export default function WorkPage() {
  const { openModal } = useLeadCapture();
  const { slug } = useParams();
  const { portfolioItems } = usePortfolio();
  
  // Find project by slug
  const project = portfolioItems.find(p => p.slug === slug) || portfolioItems[0];

  if (!project) return null;

  return (
    <div className="bg-surface pt-40">
      {/* Header */}
      <section className="px-8 pb-32">
        <div className="max-w-screen-2xl mx-auto space-y-12">
          <motion.div {...fadeInUp} className="flex flex-wrap gap-8 items-center text-[10px] font-bold uppercase tracking-[0.4em] text-primary/30">
             <div className="flex items-center gap-2 font-black"><Briefcase size={12}/> {project.client}</div>
             <div className="flex items-center gap-2 font-black"><Globe size={12}/> {project.industry}</div>
             <div className="flex items-center gap-2 font-black"><Layers size={12}/> {project.category}</div>
             <div className="font-black">{project.year}</div>
          </motion.div>
          <h1 className="text-8xl md:text-9xl font-display font-medium text-primary tracking-tighter leading-none italic">
            {project.name}
          </h1>
        </div>
      </section>

      {/* Metrics Stat Cards */}
      <section className="px-8 pb-40">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {project.stats?.map((m: any, i: number) => (
             <motion.div 
               key={m.label} 
               {...fadeInUp} 
               transition={{ delay: i * 0.1 }}
               className="p-12 rounded-[40px] bg-primary text-white space-y-4 shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500"
             >
                <div className="text-6xl font-display font-medium italic tracking-tighter">{m.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">{m.label}</div>
                <Trophy size={40} className="absolute -bottom-2 -right-2 text-white/5 group-hover:text-white/10 transition-colors" />
             </motion.div>
           ))}
        </div>
      </section>

      {/* Challenge & Approach */}
      <section className="py-40 px-8 bg-surface-container-low rounded-[80px] lg:mx-8">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-32">
           <motion.div {...fadeInUp} className="space-y-10">
              <h2 className="text-xs font-black uppercase tracking-[0.5em] text-primary/30">The Challenge</h2>
              <p className="text-3xl font-display font-medium text-primary leading-tight italic">
                &quot;{project.challenge || project.challenges}&quot;
              </p>
           </motion.div>
           <motion.div {...fadeInUp} className="space-y-10">
              <h2 className="text-xs font-black uppercase tracking-[0.5em] text-primary/30">Strategic Approach</h2>
              <div className="text-lg text-primary/60 leading-relaxed font-sans space-y-6 italic">
                 {(project.solution || project.solutions || "").split('\n\n').map((p: string, i: number) => (
                   <div key={i}>{p}</div>
                 ))}
              </div>
           </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-32 px-8">
        <div className="max-w-screen-2xl mx-auto flex flex-col items-center gap-12 text-center">
           <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/30">Operational Tech Stack</h3>
           <div className="flex flex-wrap justify-center gap-6">
              {project.techStack?.map((t: string) => (
                <div key={t} className="px-10 py-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 text-xs font-black text-primary italic shadow-sm hover:shadow-md transition-all uppercase tracking-widest">
                  {t}
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-40 px-8 bg-white overflow-hidden relative">
         <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
            <motion.div {...fadeInUp} className="space-y-12">
               <h2 className="text-6xl font-display font-medium text-primary tracking-tight">Quantified <span className="text-secondary italic">Results.</span></h2>
               <div className="space-y-8">
                  {project.keyFeatures?.length ? project.keyFeatures.map((res: string) => (
                    <div key={res} className="flex gap-6 group">
                       <Zap size={20} className="text-secondary mt-1 group-hover:scale-125 transition-transform" />
                       <span className="text-lg font-bold text-primary/70 group-hover:text-primary transition-colors underline decoration-secondary/20 underline-offset-8 decoration-2">{res}</span>
                    </div>
                  )) : (
                    <div className="space-y-8 opacity-60">
                       <div className="flex gap-6 group">
                          <Zap size={20} className="text-secondary mt-1" />
                          <span className="text-lg font-bold text-primary/70">Sub-millisecond latency achieved via distributed node clustering.</span>
                       </div>
                       <div className="flex gap-6 group">
                          <Zap size={20} className="text-secondary mt-1" />
                          <span className="text-lg font-bold text-primary/70">Enterprise-grade security hurdles bypassed with zero downtime.</span>
                       </div>
                       <div className="flex gap-6 group">
                          <Zap size={20} className="text-secondary mt-1" />
                          <span className="text-lg font-bold text-primary/70">Seamless multi-tenant scaling implemented at global reach.</span>
                       </div>
                    </div>
                  )}
               </div>
            </motion.div>
            <motion.div {...fadeInUp} className="bg-surface-container-low p-20 rounded-[60px] relative shadow-premium border border-outline-variant/10">
               <Quote size={80} className="absolute -top-10 -right-10 text-primary/5" />
               <p className="text-3xl font-display font-medium text-primary leading-tight italic mb-12">
                 &quot;{project.testimonial?.quote || "The architectural precision delivered by QOARC has fundamentally reshaped our operational efficiency and scalability."}&quot;
               </p>
               <div className="flex items-center gap-6">
                 <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white italic font-bold text-lg font-display">{(project.testimonial?.author || "A")[0]}</div>
                 <div>
                   <div className="font-bold text-primary">{project.testimonial?.author || "Senior Architect"}</div>
                   <div className="text-xs font-bold uppercase tracking-widest text-primary/40">{project.testimonial?.role || "Infrastructure lead"}</div>
                 </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-40 px-8 text-center bg-surface-container-low rounded-t-[80px]">
         <div className="max-w-screen-md mx-auto space-y-12">
            <h2 className="text-7xl font-display font-medium text-primary tracking-tighter italic">
               Have a similar <br/> engineering challenge?
            </h2>
             <button 
                onClick={openModal}
                className="inline-flex bg-primary text-white px-12 py-6 rounded-2xl font-bold uppercase tracking-[0.3em] text-sm hover:shadow-2xl transition-all group hover:scale-105 active:scale-95 cursor-pointer shadow-xl shadow-primary/20"
             >
                Initiate Discovery Call <ArrowRight className="ml-4 group-hover:translate-x-1 transition-transform" />
             </button>
         </div>
      </section>
    </div>
  );
}
