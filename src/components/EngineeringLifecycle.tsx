"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Globe,
  ArrowRight
} from 'lucide-react';
import { useLeadCapture } from '@/context/LeadCaptureContext';

const phases = [
  { 
    number: '01',
    title: 'Discovery', 
    desc: 'Technical audit and requirement mapping to identify high-leverage bottlenecks.', 
    icon: Rocket
  },
  { 
    number: '02',
    title: 'Architecture', 
    desc: 'Defining structural logic and deterministic node maps for zero-latency systems.', 
    icon: Layers
  },
  { 
    number: '03',
    title: 'Engineering', 
    desc: 'High-concurrency build cycle using hardened internal toolchains and protocol.', 
    icon: Zap
  },
  { 
    number: '04',
    title: 'Verification', 
    desc: 'Rigorous stress-testing and quality assurance protocols for code-level security.', 
    icon: ShieldCheck
  },
  { 
    number: '05',
    title: 'Evolution', 
    desc: 'Continuous optimization and sovereign support for long-term technical growth.', 
    icon: Globe
  }
];

export default function EngineeringLifecycle() {
  const { openModal } = useLeadCapture();

  return (
    <section className="py-32 px-8 bg-surface-container-low cad-line overflow-hidden border-t-[0.5px] border-primary/10">
      <div className="max-w-screen-2xl mx-auto space-y-24">
        {/* Header */}
        <div className="max-w-3xl space-y-8">
          <div className="text-precision text-primary/40 uppercase tracking-widest">Operational Protocol // Five Phases</div>
          <h2 className="text-6xl md:text-7xl font-display font-medium text-primary tracking-tight leading-none">
            The Engineering <br/> <span className="opacity-40 font-light">Lifecycle.</span>
          </h2>
          <p className="text-xl text-primary/60 font-sans leading-relaxed max-w-2xl border-l-[0.5px] border-primary/20 pl-8">
            A comprehensive technical road map from first signal to production-grade deployment and sovereign evolution.
          </p>
        </div>

        {/* Process Grid */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[1.25rem] left-0 w-full h-[1px] bg-primary/10">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 relative z-10">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative flex flex-col items-center text-center space-y-8"
              >
                {/* Indicator Node */}
                <div className="relative flex flex-col items-center">
                   <div className="w-10 h-10 rounded-none bg-white border border-primary/10 flex items-center justify-center text-[10px] font-bold text-primary/40 z-20 group-hover:border-[#cc0000] group-hover:text-[#cc0000] transition-colors duration-500 shadow-sm">
                      {phase.number}
                   </div>
                </div>

                {/* Card Content */}
                <div className="space-y-6 pt-4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-none bg-[#cc0000]/5 text-primary flex items-center justify-center mb-6 border border-[#cc0000]/10 group-hover:bg-[#cc0000] group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sharp">
                     <phase.icon size={26} strokeWidth={1.5} />
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-2xl font-display font-bold text-primary tracking-tight">
                       {phase.title}
                    </h4>
                    <p className="text-md text-primary/60 font-sans leading-snug max-w-[280px]">
                       {phase.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final Logic Node CTA */}
        <div className="pt-12 flex justify-center">
           <button 
             onClick={openModal}
             className="group relative px-12 py-6 bg-primary text-white rounded-none font-bold uppercase tracking-widest text-[11px] shadow-sharp hover:scale-[1.03] transition-all"
           >
              Initialize Full Lifecycle Sequence
              <div className="absolute inset-0 rounded-none border border-white/20 scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all"></div>
           </button>
        </div>
      </div>
    </section>
  );
}
