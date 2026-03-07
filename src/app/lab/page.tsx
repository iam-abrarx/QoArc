"use client";

import React from 'react';
import { Beaker, Filter, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp: any = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }
};

export default function LabPage() {
  return (
    <div className="bg-grid min-h-screen pt-40 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-bold uppercase tracking-widest mb-6">
            <Beaker size={14} /> Experimental Division
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tighter mb-8">QoArc <span className="text-gradient-purple">Lab</span></h1>
          <p className="max-w-2xl mx-auto text-xl text-text-muted">
            Pushing the boundaries of what's possible with AI, automation, and computer science research.
          </p>
        </motion.div>

        {/* Research Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {[
            { 
              title: '"Dual Brain" GNN', 
              desc: 'A hybrid architecture fusing Graph Convolutional Networks (Topology) with RDKit physics descriptors (Cheminformatics).',
              stats: '192-dim Latent Space',
              accent: 'blue',
              icon: <PsychologyIcon />,
              bgClass: 'bg-dots'
            },
            { 
              title: 'Rigidity Hypothesis', 
              desc: 'Identifying why legacy PFAS are toxic: "Rigid Crowbars" that physically jam nuclear receptors and trigger toxicity.',
              stats: 'Chemical Physics',
              accent: 'purple',
              icon: <ScienceIcon />,
              bgClass: 'bg-network'
            },
            { 
              title: 'Discovery Funnel', 
              desc: 'Scaling molecular screening to 5 Million unique candidates via LSTM-based generation and Reinforcement Learning (PPO).',
              stats: '5M Candidates',
              accent: 'blue',
              icon: <Filter size={16} />,
              bgClass: 'bg-dots'
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              {...fadeInUp}
              className="p-10 rounded-[40px] bg-bg-card border border-white/5 relative overflow-hidden group"
            >
              <div className={`absolute inset-0 ${item.bgClass} opacity-20 group-hover:opacity-40 transition-opacity`}></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-text-muted mb-8">{item.desc}</p>
                <div className={`flex items-center gap-2 text-accent-${item.accent} font-bold text-sm`}>
                  <span>{item.stats}</span> {item.icon}
                </div>
              </div>
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-accent-${item.accent}/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
            </motion.div>
          ))}
        </div>

        {/* Case Study Highlight */}
        <motion.div {...fadeInUp} className="bg-bg-card rounded-[48px] border border-white/5 p-12 md:p-20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-8">Breakthrough: The Unicorn Discovery</h2>
              <p className="text-lg text-text-muted mb-10 leading-relaxed">
                By incorporating flexible "ether hinges" (-O-), we identified molecules that achieve perfect safety scores (10/10) while maintaining vital industrial properties.
              </p>
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-accent-blue hover:text-white transition-all">
                Read Research Paper
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
                <div className="text-4xl font-black text-accent-blue mb-2">10/10</div>
                <div className="text-xs text-text-muted uppercase tracking-widest font-bold">Safety Score</div>
              </div>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
                <div className="text-4xl font-black text-accent-purple mb-2">50K</div>
                <div className="text-xs text-text-muted uppercase tracking-widest font-bold">Safe Variants</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Custom icons to match MatIcon style but in SVG/React
function PsychologyIcon(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
      <path d="M12 6a6 6 0 0 0-6 6c0 1.5.5 2.5 1.5 3.5s2.5 1.5 3.5 1.5 2.5-.5 3.5-1.5 1.5-2s1.5-3.5 1.5-3.5a6 6 0 0 0-4-6z" />
    </svg>
  );
}

function ScienceIcon(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M7 2v20M17 2v20M2 12h20M2 7h20M2 17h20" />
    </svg>
  );
}
