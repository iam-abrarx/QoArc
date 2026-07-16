"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ExternalLink, 
  Layout, 
  Database, 
  Cpu, 
  Globe, 
  Zap,
  Sparkles,
  BarChart3,
  ShieldCheck
} from 'lucide-react';
import { useLeadCapture } from '@/context/LeadCaptureContext';
import { usePortfolio } from '@/context/PortfolioContext';

const fadeInUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

export default function WorkHubPage() {
  const { openModal } = useLeadCapture();
  const { portfolioItems } = usePortfolio();
  
  // Filter for published projects
  const displayProjects = portfolioItems.filter(p => p.status === 'published');

  return (
    <div className="bg-surface pt-40">
      {/* Header - Sharpened */}
      <section className="px-8 pb-32 relative overflow-hidden bg-grid bg-[length:32px_32px] cad-line">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface pointer-events-none"></div>
        <div className="max-w-screen-2xl mx-auto space-y-12 relative z-10 text-center md:text-left">
          <div className="text-precision uppercase tracking-[0.4em] text-primary/30 text-[10px] font-black">
            Portfolio Hierarchy // Repository Open
          </div>
          <h1 className="text-8xl md:text-9xl font-display font-medium text-primary tracking-tighter leading-none italic">
            Strategic <br/> <span className="text-secondary">Artifacts.</span>
          </h1>
          <p className="text-2xl text-primary/60 max-w-xl font-sans leading-tight italic border-l-[0.5px] border-primary/20 pl-8">
            A curated selection of the sovereign systems and research nodes we have architected for our global partners. Precision verified.
          </p>
        </div>
      </section>

      {/* Project Grid - Sharpened */}
      <section className="py-20 px-8 bg-white cad-line">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
           {displayProjects.map((p, i) => (
             <motion.div 
               key={p.slug} 
               initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
               whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
               transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
               viewport={{ once: true }}
               whileHover={{ scale: 1.015, y: -8 }}
               className="group relative overflow-hidden bg-white border-[0.5px] border-primary/10 rounded-xl shadow-sharp p-16 space-y-12 hover:shadow-premium transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shape-notched"
             >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                ></motion.div>
                 <div className="flex justify-between items-start relative z-10">
                    <div className="space-y-4 flex-1">
                       <div className="text-precision opacity-40 uppercase tracking-widest text-[10px] font-bold">{p.category} // Case Study</div>
                       <h3 className="text-5xl font-display font-medium text-primary italic leading-none group-hover:text-primary transition-colors">{p.name}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sharp group-hover:scale-110 flex-shrink-0 ml-6">
                       <ArrowRight size={20} />
                    </div>
                 </div>

                 <div className="h-64 rounded-xl overflow-hidden relative shadow-sharp border border-primary/5">
                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-40"></div>
                 </div>
                
                <p className="text-lg text-primary/50 font-sans leading-relaxed max-w-md italic font-medium opacity-60 relative z-10">
                   {p.description}
                </p>

                <div className="flex items-center gap-12 border-t-[0.5px] border-primary/10 pt-12 relative z-10">
                   {p.stats && p.stats[0] && (
                     <div className="space-y-2">
                        <div className="text-3xl font-display italic text-primary leading-none group-hover:text-primary transition-colors">{p.stats[0].value}</div>
                        <div className="text-precision text-[10px] uppercase tracking-widest font-bold opacity-40">{p.stats[0].label}</div>
                     </div>
                   )}
                   <div className="space-y-2 border-l-[0.5px] border-primary/10 pl-8">
                      <div className="text-3xl font-display italic text-primary leading-none group-hover:text-primary transition-colors">{p.client}</div>
                      <div className="text-precision text-[10px] uppercase tracking-widest font-bold opacity-40">Partner Entity</div>
                   </div>
                </div>

                <Link href={`/work/${p.slug}`} className="absolute inset-0 z-20 cursor-pointer">
                  <span className="sr-only">View Case Study {p.name}</span>
                </Link>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-40 px-8 text-center bg-surface-container-low rounded-t-3xl">
         <div className="max-w-screen-md mx-auto space-y-12">
            <h2 className="text-7xl font-display font-medium text-primary tracking-tighter leading-none italic">
               Want to see your <br/> node here?
            </h2>
             <div className="pt-8">
               <button 
                 onClick={openModal}
                 className="bg-primary text-white px-12 py-6 rounded-xl font-bold uppercase tracking-[0.2em] text-sm hover:shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
               >
                  Initiate Project Sequence
               </button>
             </div>
         </div>
      </section>
    </div>
  );
}
