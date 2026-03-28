"use client";

import React from 'react';
import { Beaker, Filter, BookOpen, Sparkles, Binary, Microscope, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

export default function LabPage() {
  return (
    <div className="bg-surface pt-48 pb-24 px-6 relative overflow-hidden bg-grid bg-[length:32px_32px]">
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface pointer-events-none"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-primary/5 border-[0.5px] border-primary/10 text-precision mb-10 shadow-sharp">
            <Beaker size={14} className="text-secondary" /> Experimental Division // Q1 2026
          </div>
          <h1 className="text-7xl md:text-9xl font-display font-medium tracking-tighter mb-10 text-primary italic leading-[0.8]">
            QOARC <span className="opacity-40">Lab.</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-primary/60 font-sans italic border-l-[0.5px] border-primary/20 pl-8 leading-tight">
            Pushing the boundaries of what&apos;s possible with AI, automation, and computer science research. Our lab is where the future is architected.
          </p>
        </motion.div>

        {/* Research Areas - Sharpened */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-32">
           {[
            { 
              title: 'Animal weight estimation from images', 
              desc: 'Deep learning ML project using SAM2 and Depth Anything v2 for precision agriculture.',
              stats: '1,190 Fully Processed SKUs',
              icon: <Microscope size={18} />,
              bgClass: 'bg-grid opacity-10'
            },
            { 
              title: 'Large scale PFAS generation for safety and toxicity analysis', 
              desc: 'Deep learning screening of toxic PFAS using Graph Neural Networks and the Rigidity Hypothesis.',
              stats: '50K Safe Variants',
              icon: <Binary size={18} />,
              bgClass: 'bg-grid opacity-10'
            },
            { 
              title: 'Command Center', 
              desc: 'Distributed deep learning training dashboard with gradient compression and node coordination.',
              stats: '40+ Architectures',
              icon: <Globe size={18} />,
              bgClass: 'bg-grid opacity-10'
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -8 }}
              className="tonal-card p-12 flex flex-col justify-between min-h-[400px] group cad-crosshair relative overflow-hidden"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              ></motion.div>
              <div className="relative z-10 space-y-8 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-xl bg-surface-container-low border-[0.5px] border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sharp group-hover:scale-110">
                  {item.icon}
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-3xl font-display font-medium mb-6 text-primary italic leading-none group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-primary/50 leading-relaxed font-sans mb-10 italic font-medium opacity-60 max-w-sm">{item.desc}</p>
                  <div className="flex items-center justify-center gap-3 text-precision group-hover:text-primary transition-colors">
                    <span>{item.stats}</span> <Sparkles size={14} className="opacity-20 animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Breakthrough Highlight - Sharpened */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-[40px] border-[0.5px] border-primary/10 p-12 md:p-24 relative overflow-hidden shadow-sharp cad-line"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="space-y-10">
              <div className="text-precision">Research Breakthrough // Cluster Logic</div>
              <h2 className="text-6xl font-display font-medium text-primary tracking-tight leading-[0.9] italic">
                Distributed <br/> <span className="opacity-40">Training Node.</span>
              </h2>
              <p className="text-xl text-primary/60 italic border-l-[0.5px] border-primary/20 pl-8 leading-tight">
                Our DDP (Distributed Deep Learning Platform) achieves significant bandwidth reduction through Top-1% gradient compression, enabling efficient training across decentralized worker nodes.
              </p>
              <button className="bg-primary text-white px-10 py-5 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-sharp hover:shadow-premium transition-all">
                View Documentation →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="p-10 rounded-2xl bg-surface-container-low border-[0.5px] border-primary/10 text-center group hover:bg-white transition-all shadow-sharp">
                <div className="text-5xl font-display font-medium text-primary mb-4 italic">99%</div>
                <div className="text-precision">Compression</div>
              </div>
              <div className="p-10 rounded-2xl bg-surface-container-low border-[0.5px] border-primary/10 text-center group hover:bg-white transition-all shadow-sharp">
                <div className="text-5xl font-display font-medium text-secondary mb-4 italic">40+</div>
                <div className="text-precision text-secondary/40">Verified</div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Microscope size={300} strokeWidth={0.5} className="text-primary" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
