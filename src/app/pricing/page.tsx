"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Clock,
  Terminal,
  Cpu
} from 'lucide-react';

const plans = [
  {
    name: "Discovery Node",
    price: "4.5k",
    period: "Per Sprint",
    desc: "1-week architecture & ROI audit. The foundational entry point for any QoArc system.",
    features: [
      "Technical Roadmapping",
      "Sovereign Security Audit",
      "Cost-Benefit Analysis",
      "Prototype Logic Gate"
    ],
    cta: "Initiate Discovery",
    accent: false
  },
  {
    name: "Product Build",
    price: "12k+",
    period: "Monthly",
    desc: "End-to-end engineering of custom AI/SaaS products. Full ownership, zero technical debt.",
    features: [
      "Dedicated Engineering Pod",
      "Weekly Strategic Sync",
      "End-to-end IP Transfer",
      "v1.0 Production Launch"
    ],
    cta: "Scale System",
    accent: true
  },
  {
    name: "Lab Partnership",
    price: "Custom",
    period: "Quarterly",
    desc: "Direct access to QoArc Lab R&D. High-frequency iteration on bleeding edge architectures.",
    features: [
      "Bespoke GNN Research",
      "Custom Model Training",
      "Priority Beta Access",
      "Strategic Alignment"
    ],
    cta: "Enter Lab Node",
    accent: false
  }
];

export default function PricingPage() {
  return (
    <div className="bg-surface pt-40 pb-20">
      {/* Hero - Sharpened */}
      <section className="px-8 pb-32 relative overflow-hidden bg-grid bg-[length:32px_32px] cad-line">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface pointer-events-none"></div>
        <div className="max-w-screen-2xl mx-auto space-y-12 relative z-10 text-center md:text-left">
          <div className="text-precision uppercase">
             Investment Matrix // Q1 2026
          </div>
          <h1 className="text-8xl md:text-9xl font-display font-medium text-primary tracking-tighter leading-none italic">
             Precision <br/> <span className="text-secondary">Value.</span>
          </h1>
          <p className="text-2xl text-primary/60 max-w-xl font-sans leading-tight italic border-l-[0.5px] border-primary/20 pl-8">
             Transparent, high-density pricing models designed for enterprise scale. No hidden nodes. Just execution.
          </p>
        </div>
      </section>

      {/* Pricing Matrix - Sharpened */}
      <section className="py-24 px-8 bg-white cad-line">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -10 }}
              className={`tonal-card p-12 flex flex-col justify-between min-h-[620px] border-[0.5px] relative group overflow-hidden ${plan.accent ? 'border-primary shadow-premium' : 'border-primary/10 shadow-sharp'}`}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              ></motion.div>
              {plan.accent && (
                <div className="absolute top-0 right-0 bg-primary text-white text-[8px] font-bold uppercase tracking-[0.3em] px-6 py-2 rounded-bl-xl shadow-sharp z-20">
                   Most High-Density System
                </div>
              )}
              <div className="space-y-10 relative z-10">
                <div className="space-y-4">
                   <div className="text-precision opacity-40 uppercase">{plan.name} // Node</div>
                   <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-display font-medium text-primary italic leading-none">${plan.price}</span>
                      <span className="text-precision opacity-40">{plan.period}</span>
                   </div>
                   <p className="text-sm text-primary/50 leading-relaxed font-sans mt-6 italic font-medium opacity-60">
                      {plan.desc}
                   </p>
                </div>
                
                <div className="space-y-6 pt-10 border-t-[0.5px] border-primary/10">
                   {plan.features.map(f => (
                     <div key={f} className="flex gap-4 items-center">
                        <Check size={14} className="text-secondary" />
                        <span className="text-precision italic">{f}</span>
                     </div>
                   ))}
                </div>
              </div>

              <div className="relative z-10 pt-12">
                 <button className={`w-full py-5 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 transition-all shadow-sharp ${plan.accent ? 'bg-primary text-white hover:shadow-premium' : 'bg-white border-[0.5px] border-primary/10 text-primary hover:bg-surface-container-low'}`}>
                    {plan.cta} <ArrowRight size={14} />
                 </button>
              </div>
              <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust & Guarantees - Sharpened */}
      <section className="py-24 px-8 bg-surface-container-low rounded-[40px] lg:mx-8 cad-line mb-20">
         <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "IP Transfer", desc: "100% Client Ownership on all sovereign code nodes.", icon: ShieldCheck },
              { title: "No Tech Debt", desc: "Rigorous architectual reviews at every sprint increment.", icon: Terminal },
              { title: "Scale Guard", desc: "Guaranteed system stability up to 10M+ events.", icon: Cpu }
            ].map((g, i) => (
              <div key={i} className="flex gap-6 items-start">
                 <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sharp text-primary">
                    <g.icon size={18} />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-xl font-display font-medium italic text-primary leading-none">{g.title}</h4>
                    <p className="text-sm text-primary/50 leading-relaxed font-sans italic font-medium opacity-60">{g.desc}</p>
                 </div>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}
