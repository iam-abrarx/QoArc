"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Cpu, 
  Rocket, 
  Code2, 
  Database,
  BarChart3,
  Search,
  Users,
  Sparkles,
  Activity
} from 'lucide-react';
import { useLeadCapture } from '@/context/LeadCaptureContext';

const fadeInUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

export default function SaaSDevelopmentPage() {
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
               Engineering Protocol // Architecture
            </div>
            <h1 className="text-8xl md:text-9xl font-display font-medium text-primary tracking-tighter leading-none italic">
               SaaS <br/> <span className="text-secondary">Engineering.</span>
            </h1>
            <p className="text-2xl text-primary/60 max-w-xl font-sans leading-tight italic border-l-[0.5px] border-primary/20 pl-8">
               We build high-concurrency, multi-tenant software systems for global enterprises. From zero-to-one builds to scaling legacy architectural nodes.
            </p>
            <div className="flex flex-wrap gap-6 pt-8">
               <button
                  onClick={openModal}
                  className="bg-primary text-white px-10 py-5 rounded-lg font-bold uppercase tracking-widest text-[11px] shadow-sharp hover:shadow-premium transition-all hover:scale-105 cursor-pointer"
               >
                  Initiate SaaS Build →
               </button>
               <div className="px-10 py-5 rounded-lg border-[0.5px] border-primary/10 text-primary font-bold text-[11px] uppercase tracking-widest bg-white shadow-sharp">
                  $12k–40k+ Projects
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative lg:block hidden"
          >
             <div className="p-16 rounded-[32px] bg-white border-[0.5px] border-primary/10 shadow-sharp relative overflow-hidden group shape-notched">
                <div className="absolute inset-0 bg-grid opacity-10"></div>
                <div className="relative z-10 space-y-12">
                   <div className="text-precision animate-pulse">System Integrity Node // ACTIVE</div>
                   <div className="space-y-6">
                      <div className="flex items-center gap-4">
                         <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary"><ShieldCheck size={16} /></div>
                         <span className="text-precision opacity-60">Security-First Architecture</span>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary"><Zap size={16} /></div>
                         <span className="text-precision opacity-60">Edge-First Rendering</span>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary"><Database size={16} /></div>
                         <span className="text-precision opacity-60">Multi-Tenant Isolation</span>
                      </div>
                   </div>
                   <div className="pt-8 border-t-[0.5px] border-primary/10">
                      <div className="text-precision mb-4">Operational Metric</div>
                      <div className="text-5xl font-display font-medium text-primary tracking-tighter italic">99.99%</div>
                      <div className="text-precision">Target Uptime SLA</div>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Logic Layer Section - Sharpened */}
      <section className="py-40 px-8 bg-surface-container-low rounded-[40px] lg:mx-8 mb-8 cad-line">
        <div className="max-w-screen-2xl mx-auto space-y-32">
           <div className="max-w-2xl space-y-8">
              <h2 className="text-precision">Engineering Protocol</h2>
              <h3 className="text-7xl font-display font-medium text-primary tracking-tight leading-none italic">
                Structural <br/> <span className="opacity-40">Precision.</span>
              </h3>
              <p className="text-xl text-primary/60 font-sans italic border-l-[0.5px] border-primary/20 pl-8 font-medium">
                 SaaS isn&apos;t just code—it&apos;s an architectural promise to your users. We ensure that promise is kept with rigorous system design.
              </p>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Multi-Tenant Core', desc: 'Secure data isolation models for B2B platforms with complex permission trees.', icon: Users },
                { title: 'Edge Deployment', desc: 'Next-generation rendering using Vercel & Cloudflare Workers for global speed.', icon: Globe },
                { title: 'API-First Design', desc: 'Hardened REST and GraphQL endpoints built for external integration nodes.', icon: Code2 },
                { title: 'Serverless Logic', desc: 'Scalable backend functions that only cost when they are triggered.', icon: Zap },
                { title: 'Infrastructure as Code', desc: 'Terraform and Pulumi scripts to deploy your entire stack in minutes.', icon: Layers },
                { title: 'Real-time Sync', desc: 'WebSocket and WebRTC nodes for collaborative multi-user environments.', icon: Activity }
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

      {/* Tech Marquee - Sharpened */}
      <section className="py-24 px-8 overflow-hidden bg-white">
         <div className="max-w-screen-2xl mx-auto flex flex-col items-center gap-16 text-center">
            <h3 className="text-precision">Full-Stack Synthesis Stack</h3>
            <div className="flex flex-wrap justify-center gap-6">
               {['Next.js', 'React', 'TypeScript', 'Node.js', 'Prisma', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'Koyeb', 'Vercel'].map(t => (
                 <div key={t} className="px-8 py-4 rounded-lg bg-surface-container-low border-[0.5px] border-primary/10 text-precision text-primary shadow-sharp hover:shadow-premium transition-all">
                    {t}
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Bottom CTA - Sharpened */}
      <section className="py-40 px-8 text-center bg-white border-t-[0.5px] border-primary/10">
         <div className="max-w-screen-md mx-auto space-y-12">
            <Sparkles className="mx-auto text-primary/10" size={60} />
            <h2 className="text-7xl font-display font-medium text-primary tracking-tighter leading-none italic">
               Ready to ship your <br/> production node?
            </h2>
            <div className="pt-8">
               <button
                  onClick={openModal}
                  className="bg-primary text-white px-12 py-6 rounded-lg font-bold uppercase tracking-[0.2em] text-sm shadow-premium hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
               >
                  Build your SaaS →
               </button>
            </div>
         </div>
      </section>
    </div>
  );
}
