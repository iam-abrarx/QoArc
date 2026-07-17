"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Zap, 
  Cpu, 
  Workflow, 
  Database, 
  ShieldCheck, 
  Globe, 
  BarChart3, 
  Settings,
  Activity,
  Terminal,
  Trophy,
  Sparkles,
  Search,
  Users
} from 'lucide-react';
import { useLeadCapture } from '@/context/LeadCaptureContext';

const fadeInUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

export default function AutomationPage() {
  const { openModal } = useLeadCapture();
  return (
    <div className="bg-surface pt-40">
      {/* Hero - Sharpened */}
      <section className="px-8 pb-32 relative overflow-hidden bg-grid bg-[length:32px_32px] cad-line">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface pointer-events-none"></div>
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            <div className="text-precision">
               Process Protocol // Optimization
            </div>
            <h1 className="text-8xl md:text-9xl font-display font-medium text-primary tracking-tighter leading-none italic">
               Hyper <br/> <span className="text-secondary">Automation.</span>
            </h1>
            <p className="text-2xl text-primary/60 max-w-xl font-sans leading-tight italic border-l-[0.5px] border-primary/20 pl-8">
               We eliminate manual overhead by architecting deterministic business process nodes. Automate your operations with 0% error tolerance and 100% visibility.
            </p>
            <div className="flex flex-wrap gap-6 pt-8">
               <button 
                  onClick={openModal}
                  className="bg-primary text-white px-10 py-5 rounded-lg font-bold uppercase tracking-widest text-[11px] shadow-sharp hover:shadow-premium transition-all hover:scale-105 cursor-pointer"
               >
                  Initiate Automation Audit →
               </button>
               <div className="px-10 py-5 rounded-lg border-[0.5px] border-primary/10 text-primary font-bold text-[11px] uppercase tracking-widest bg-white shadow-sharp">
                  40–70% Overhead Reduction
               </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative lg:block hidden"
          >
             <div className="relative bg-white border-[0.5px] border-primary/10 p-12 rounded-[32px] shadow-sharp shape-notched overflow-hidden min-h-[500px] flex flex-col justify-end">
                <div className="absolute inset-0 bg-grid opacity-10"></div>
                <div className="relative z-10 p-10 bg-surface-container-low rounded-xl border-[0.5px] border-primary/10 space-y-8 shadow-sharp">
                   <div className="flex items-center justify-between">
                      <Workflow size={24} className="text-primary/40" />
                      <div className="text-precision">Active Workflow Node</div>
                   </div>
                   <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-8">
                         <div className="space-y-1">
                            <div className="text-4xl font-display italic tracking-tighter text-primary">0.0ms</div>
                            <div className="text-precision">Logic Deadzone</div>
                         </div>
                         <div className="space-y-1">
                            <div className="text-4xl font-display italic tracking-tighter text-primary">100%</div>
                            <div className="text-precision">Task Accuracy</div>
                         </div>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                         <div className="h-full w-full bg-primary rounded-full animate-pulse"></div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Logic Modalities - Sharpened */}
      <section className="py-40 px-8 bg-surface-container-low rounded-[40px] lg:mx-8 mb-8 cad-line">
        <div className="max-w-screen-2xl mx-auto space-y-32">
           <div className="max-w-2xl space-y-8">
              <h2 className="text-precision">Automation Protocols</h2>
              <h3 className="text-7xl font-display font-medium text-primary tracking-tight leading-none italic">
                Deterministic <br/> <span className="opacity-40">Efficiency.</span>
              </h3>
              <p className="text-xl text-primary/60 font-sans italic border-l-[0.5px] border-primary/20 pl-8 font-medium">
                 Automation is not just scripts—it&apos;s the systematic removal of human cognitive drag from your business operations.
              </p>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Process Mining', desc: 'Analyzing your current digital workflows to identify deep-seated structural inefficiencies.', icon: Search },
                { title: 'RPA Protocol', desc: 'Robotic Process Automation nodes that handle repetitive browser and desktop tasks with precision.', icon: Settings },
                { title: 'LLM Orchestration', desc: 'Integrating intelligent agents into your backend to handle natural language decision cycles.', icon: Cpu },
                { title: 'API Integration', desc: 'Connecting fragmented software stacks into a single, cohesive automated pipeline.', icon: Database },
                { title: 'CRM Automations', desc: 'Optimizing lead flows, client communications, and sales funnels without human touch.', icon: Users },
                { title: 'Financial Workflows', desc: 'Automating invoicing, reconciliation, and audit trails with zero manual entry.', icon: BarChart3 }
              ].map((s, i) => (
                <motion.div 
                  key={s.title} 
                  initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="tonal-card p-12 flex flex-col justify-between min-h-[320px] group cad-crosshair rounded-xl shadow-sharp hover:shadow-premium transition-all"
                >
                   <div className="space-y-8">
                      <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sharp">
                         <s.icon size={20} />
                      </div>
                      <div className="space-y-4">
                         <h4 className="text-3xl font-display font-medium italic text-primary leading-tight group-hover:text-primary transition-colors">{s.title}</h4>
                         <p className="text-sm text-primary/50 font-sans leading-relaxed italic opacity-80">{s.desc}</p>
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Trust & Results - Sharpened */}
      <section className="py-40 px-8 bg-primary rounded-[40px] lg:mx-8 text-white relative overflow-hidden mb-40 cad-line shadow-premium">
         <div className="absolute inset-0 bg-grid opacity-10"></div>
         <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-32 items-center relative z-10">
            <div className="space-y-12">
               <h2 className="text-precision text-white/40">Global Implementation Results</h2>
               <h2 className="text-7xl font-display font-medium text-white tracking-tighter italic leading-none">
                  Quantified <br/> <span className="opacity-50">Impact.</span>
               </h2>
               <div className="space-y-8">
                  <div className="flex gap-6 items-start border-l-[0.5px] border-white/20 pl-8">
                     <p className="text-2xl font-display font-medium italic opacity-80">Reduced administrative overhead for EU logistics by 68%.</p>
                  </div>
                  <div className="flex gap-6 items-start border-l-[0.5px] border-white/20 pl-8">
                     <p className="text-2xl font-display font-medium italic opacity-80">Zero logic errors across 2M+ automated financial transactions.</p>
                  </div>
               </div>
            </div>
            <div className="bg-white p-16 rounded-[32px] text-primary space-y-10 group shadow-sharp border-[0.5px] border-primary/10 shape-notched">
               <h3 className="text-precision">Strategic Node</h3>
               <p className="text-2xl font-display font-medium italic">
                  We architect specialized automation nodes for logistics, finance, and legal operations. Managed or on-prem.
               </p>
               <div className="pt-8 flex flex-col gap-6">
                   <button 
                      onClick={openModal}
                      className="w-full py-6 rounded-lg bg-primary text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-4 hover:shadow-premium transition-all hover:scale-[1.02] cursor-pointer"
                   >
                      Start Discovery Audit <ArrowRight size={14} />
                   </button>
                   <div className="flex justify-center items-center gap-3 text-precision">
                      <ShieldCheck size={14} /> Hardened Security Architecture Standards
                   </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
