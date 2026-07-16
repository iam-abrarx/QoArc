"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Search, 
  Zap, 
  Layers, 
  Settings, 
  Rocket, 
  ShieldCheck,
  Sparkles,
  Globe,
  Clock,
  Briefcase,
  History
} from 'lucide-react';
import { useLeadCapture } from '@/context/LeadCaptureContext';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

export default function HowWeWorkPage() {
  const { openModal } = useLeadCapture();
  return (
    <div className="bg-surface pt-40">
      {/* Header */}
      <section className="px-8 pb-32 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto space-y-12 relative z-10">
          <motion.div {...fadeInUp} className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary/30 italic">
            Operational Blueprint
          </motion.div>
          <motion.h1 {...fadeInUp} transition={{ delay: 0.1 }} className="text-8xl md:text-9xl font-display font-medium text-primary tracking-tighter leading-none italic">
            Engineering <br/> <span className="text-secondary">Execution.</span>
          </motion.h1>
          <motion.p {...fadeInUp} transition={{ delay: 0.2 }} className="text-2xl text-primary/60 max-w-2xl font-sans leading-relaxed italic border-l-2 border-primary/20 pl-8">
            We don&apos;t just build products. We architect end-to-end sovereign systems that evolve with your business. Precision is not optional—it&apos;s our baseline.
          </motion.p>
        </div>
        <div className="absolute top-0 right-0 p-32 opacity-[0.03] pointer-events-none">
           <Settings size={400} />
        </div>
      </section>

      {/* The 5 Phases */}
      <section className="py-40 px-8 bg-surface-container-low rounded-[80px] lg:mx-8">
         <div className="max-w-screen-2xl mx-auto space-y-32">
            <div className="max-w-2xl space-y-8">
               <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-primary/30">Process Modality</h2>
               <h2 className="text-6xl font-display font-medium text-primary tracking-tight italic">Five Phases of <br/> <span className="opacity-40">Development.</span></h2>
            </div>

             <div className="flex flex-col gap-10">
               {[
                 { title: 'Phase 01: Discovery', desc: 'Deep technical audit and requirement mapping to define the build node.', icon: Search, img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2000&auto=format&fit=crop" },
                 { title: 'Phase 02: Architecture', desc: 'Defining the structural logic, node maps, and sovereign data flows.', icon: Layers, img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=2000&auto=format&fit=crop" },
                 { title: 'Phase 03: Incubation', desc: 'Rapid prototyping and logic verification using internal toolchains.', icon: Zap, img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop" },
                 { title: 'Phase 04: Production', desc: 'Hardened engineering for global scale and zero-latency operations.', icon: ShieldCheck, img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop" },
                 { title: 'Phase 05: Evolution', desc: 'Continuous optimization, sovereign support, and technical growth.', icon: Rocket, img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" }
               ].map((p, i) => (
                 <motion.div 
                   key={p.title} 
                   initial={{ opacity: 0, y: 50 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                   viewport={{ once: true, margin: "-10%" }}
                   style={{ 
                     top: `calc(120px + ${i * 40}px)`,
                     zIndex: i + 1
                   }}
                   className="sticky group p-12 md:p-16 rounded-[48px] bg-white border border-outline-variant/10 shadow-sharp hover:shadow-premium transition-all flex flex-col md:flex-row gap-12 items-center min-h-[500px]"
                 >
                    <div className="w-full md:w-2/5 h-80 md:h-[400px] rounded-[32px] overflow-hidden relative shadow-sharp">
                       <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                       <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-40"></div>
                       <div className="absolute top-8 left-8 w-14 h-14 rounded-xl bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                          <p.icon size={24} />
                       </div>
                    </div>
                    <div className="flex-1 space-y-10">
                       <div className="space-y-4">
                          <div className="text-precision opacity-40 italic tracking-widest text-[10px] uppercase">Operational Protocol Phase 0{i+1}</div>
                          <h3 className="text-5xl md:text-7xl font-display font-medium italic text-primary leading-tight tracking-tighter">
                             {p.title}
                          </h3>
                       </div>
                       <p className="text-2xl text-primary/60 font-sans italic leading-snug max-w-xl border-l-[0.5px] border-primary/20 pl-8">
                          {p.desc}
                       </p>
                       <div className="pt-8">
                          <button 
                            onClick={openModal}
                            className="bg-primary text-white px-12 py-6 rounded-none font-bold uppercase tracking-[0.3em] text-[11px] hover:shadow-premium transition-all hover:scale-[1.03] active:scale-95 cursor-pointer flex items-center gap-4"
                          >
                             Initiate Sequence <ArrowRight size={16} />
                          </button>
                       </div>
                    </div>
                 </motion.div>
               ))}
             </div>
         </div>
      </section>

      {/* Dhaka HQ & Global Sync */}
      <section className="py-40 px-8 bg-white border-y border-outline-variant/10">
         <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
            <motion.div {...fadeInUp} className="space-y-12">
               <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary/30 italic">Global Sync Transmission</h2>
               <h2 className="text-6xl font-display font-medium text-primary tracking-tighter italic leading-tight">
                  Seamless <br/> Overlap.
               </h2>
               <p className="text-xl text-primary/60 font-sans leading-relaxed">
                  Headquartered in Dhaka (GMT+6), we strategically leverage our timezone to provide full-day coverage for our US & EU partners. Our architecture allows for continuous hand-offs and 24/7 visibility into the build node.
               </p>
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <div className="flex items-center gap-3 text-primary">
                        <Globe size={16} /> <span className="text-sm font-bold italic">GMT +6</span>
                     </div>
                     <div className="text-[10px] font-bold uppercase tracking-widest text-primary/30">Primary Base Node</div>
                  </div>
                  <div className="space-y-2">
                     <div className="flex items-center gap-3 text-primary">
                        <Clock size={16} /> <span className="text-sm font-bold italic">US & EU Sync</span>
                     </div>
                     <div className="text-[10px] font-bold uppercase tracking-widest text-primary/30">Daily Transmission Windows</div>
                  </div>
               </div>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-primary p-20 rounded-[80px] shape-notched text-white shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-grid opacity-10"></div>
               <div className="relative z-10 space-y-10">
                  <div className="text-xs font-bold uppercase tracking-[0.5em] text-white/40 italic">Cultural Intelligence</div>
                  <p className="text-2xl font-display font-medium italic leading-relaxed">
                     &quot;Our team is composed of elite engineers who have built systems for global enterprises. We speak the language of US startups and EU industrial hubs.&quot;
                  </p>
                  <div className="flex items-center gap-6">
                     <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-primary font-bold text-xl italic font-display">Q</div>
                     <div>
                        <div className="font-bold text-lg">Engineering Core</div>
                        <div className="text-xs font-bold uppercase tracking-widest text-white/40">Verified Recruitment Standard</div>
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* IP & IP Assets */}
      <section className="py-40 px-8">
         <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-3 gap-16">
            <div className="p-12 border border-outline-variant/10 rounded-[40px] space-y-6 bg-white shadow-premium">
               <Briefcase size={24} className="text-primary" />
               <h3 className="text-2xl font-display font-medium italic text-primary">Full IP Transfer</h3>
               <p className="text-sm text-primary/50 leading-relaxed font-sans">
                  Upon completion, all source code, models, and architectural assets are transferred 100% to our partners. No locked nodes.
               </p>
            </div>
            <div className="p-12 border border-outline-variant/10 rounded-[40px] space-y-6 bg-white shadow-premium">
               <History size={24} className="text-primary" />
               <h3 className="text-2xl font-display font-medium italic text-primary">Retainer Longevity</h3>
               <p className="text-sm text-primary/50 leading-relaxed font-sans">
                  We offer fractional product teams post-launch to ensure your sovereign architecture stays hardened and scales with traffic.
               </p>
            </div>
            <div className="p-12 border border-outline-variant/10 rounded-[40px] space-y-6 bg-white shadow-premium">
               <Briefcase size={24} className="text-primary" />
               <h3 className="text-2xl font-display font-medium italic text-primary">Sovereign Focus</h3>
               <p className="text-sm text-primary/50 leading-relaxed font-sans">
                  We build systems that you own and control. Our goal is to reduce your dependency on tier-1 cloud providers where possible.
               </p>
            </div>
         </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-40 px-8 text-center bg-surface-container-low rounded-t-[80px]">
         <div className="max-w-screen-md mx-auto space-y-12">
            <h2 className="text-7xl font-display font-medium text-primary tracking-tighter leading-none italic">
               Ready to architect <br/> your next node?
            </h2>
             <div className="pt-8">
               <button 
                 onClick={openModal}
                 className="bg-primary text-white px-12 py-6 rounded-2xl font-bold uppercase tracking-[0.2em] text-sm hover:shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
               >
                  Initiate Discovery Call
               </button>
             </div>
         </div>
      </section>
    </div>
  );
}
