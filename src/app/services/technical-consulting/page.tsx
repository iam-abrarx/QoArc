"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Search, 
  Zap, 
  Layers, 
  ShieldCheck, 
  Globe, 
  Cpu, 
  Rocket, 
  Briefcase,
  History,
  Scale,
  Sparkles,
  BarChart3,
  Database
} from 'lucide-react';
import { useLeadCapture } from '@/context/LeadCaptureContext';

const fadeInUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

export default function TechnicalConsultingPage() {
  const { openModal } = useLeadCapture();
  return (
    <div className="bg-surface pt-40">
      {/* Hero */}
      <section className="px-8 pb-32 relative overflow-hidden bg-grid bg-[length:32px_32px] cad-line">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface pointer-events-none"></div>
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div {...fadeInUp} className="space-y-12">
            <div className="flex items-center gap-3 text-precision">
               <Briefcase size={14} className="text-primary" /> Strategy // Advisory
            </div>
            <h1 className="text-8xl md:text-9xl font-display font-medium text-primary tracking-tighter leading-none italic">
               Technical <br/> <span className="text-secondary">Consulting.</span>
            </h1>
            <p className="text-2xl text-primary/60 max-w-xl font-sans leading-tight italic border-l-[0.5px] border-primary/20 pl-8">
               Fractional CTO advisory and architectural due diligence for enterprises navigating the AI transition. High-stakes strategy for high-performance systems.
            </p>
            <div className="flex flex-wrap gap-6 pt-8">
               <button 
                  onClick={openModal}
                  className="bg-primary text-white px-10 py-5 rounded-lg font-bold uppercase tracking-widest text-xs shadow-sharp hover:shadow-premium transition-all hover:scale-105 cursor-pointer"
               >
                  Book Advisory Node →
               </button>
               <div className="px-10 py-5 rounded-lg border-[0.5px] border-primary/10 text-primary font-bold text-xs uppercase tracking-widest bg-white shadow-sharp">
                  $250 / Hour Advisory
               </div>
            </div>
          </motion.div>
          
          <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="p-16 rounded-[32px] bg-primary text-white shadow-premium relative overflow-hidden shape-notched">
             <div className="absolute inset-0 bg-grid opacity-10"></div>
             <div className="relative z-10 space-y-12">
                <div className="text-xs font-bold uppercase tracking-[0.4em] text-white/40 italic">Strategic Diligence Node</div>
                <div className="space-y-8">
                   <div className="p-8 rounded-xl bg-white/5 border border-white/10 space-y-2">
                       <h3 className="text-xl font-display italic">M&A Tech Audit</h3>
                       <p className="text-xs opacity-60">Deep architectural due diligence for acquisitions.</p>
                   </div>
                   <div className="p-8 rounded-xl bg-white/5 border border-white/10 space-y-2">
                       <h3 className="text-xl font-display italic">AI Roadmap</h3>
                       <p className="text-xs opacity-60">Defining the sovereign intelligence path.</p>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Advisory Areas */}
      <section className="py-40 px-8 bg-surface-container-low rounded-[40px] lg:mx-8 mb-8 cad-line">
        <div className="max-w-screen-2xl mx-auto space-y-32">
           <div className="max-w-2xl space-y-8">
              <h2 className="text-precision">Advisory Domains</h2>
              <h2 className="text-6xl font-display font-medium text-primary tracking-tight italic">Strategic <br/> <span className="opacity-40">Intelligence.</span></h2>
              <p className="text-xl text-primary/60 font-sans leading-relaxed italic border-l-[0.5px] border-primary/20 pl-8">
                 We provide the architectural foresight needed to navigate the complexity of modern software ecosystems.
              </p>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Fractional CTO', desc: 'Long-term strategic partnership to lead your engineering core without the overhead of a full-time hire.', icon: Cpu },
                { title: 'AI Due Diligence', desc: 'Evaluating the feasibility and technical debt of AI implementations for investors and founders.', icon: Search },
                { title: 'Cloud Optimization', desc: 'Hardened strategy to reduce burn on AWS/Azure by migrating to sovereign edge nodes.', icon: Globe },
                { title: 'Compliance Audit', desc: 'Preparing your system architecture for GDPR, HIPAA, and ISO certifications.', icon: ShieldCheck },
                { title: 'Talent Evaluation', desc: 'Technical interviewing and team-building strategy for high-performance units.', icon: Scale },
                { title: 'Data Strategy', desc: 'Architecting your proprietary data pipelines for future-proof AI fine-tuning.', icon: Database }
              ].map((s, i) => (
                <motion.div key={s.title} {...fadeInUp} transition={{ delay: i * 0.1 }} className="p-12 rounded-xl bg-white border border-outline-variant/10 shadow-sharp group hover:-translate-y-2 hover:shadow-premium transition-all">
                   <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mb-8 shadow-sharp">
                      <s.icon size={20} />
                   </div>
                   <h3 className="text-2xl font-display font-medium italic text-primary mb-4 tracking-tighter uppercase tracking-widest">{s.title}</h3>
                   <p className="text-sm text-primary/50 leading-relaxed font-sans italic opacity-80">{s.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-40 px-8 text-center bg-white border-t border-outline-variant/10">
         <div className="max-w-screen-md mx-auto space-y-12">
            <Sparkles className="mx-auto text-primary/20" size={40} />
            <h2 className="text-7xl font-display font-medium text-primary tracking-tighter leading-none italic">
               Secure your <br/> architectural edge.
            </h2>
            <div className="pt-8">
               <button 
                  onClick={openModal}
                  className="bg-primary text-white px-12 py-6 rounded-lg font-bold uppercase tracking-[0.2em] text-sm hover:shadow-2xl transition-all hover:scale-105 active:scale-95 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
               >
                  Book Strategic Session →
               </button>
            </div>
         </div>
      </section>
    </div>
  );
}
