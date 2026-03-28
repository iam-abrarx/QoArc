"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Linkedin, 
  Globe, 
  Sparkles, 
  Cpu, 
  Code2, 
  Layers, 
  Zap, 
  Terminal,
  Trophy,
  History,
  Briefcase
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

const team = [
  {
    name: 'Abrar Z.',
    role: 'Principal Architect // Lead AI',
    bio: 'Specializing in sovereign AI nodes and GNN architectures. Formerly architected data systems for EU medical research hubs.',
    linkedIn: '#',
    initial: 'A'
  },
  {
    name: 'Nadim R.',
    role: 'Full-Stack Engineering Lead',
    bio: 'Expert in high-concurrency SaaS infrastructure and distributed Rust systems. Precision-focused product engineer.',
    linkedIn: '#',
    initial: 'N'
  },
  {
    name: 'Sarah K.',
    role: 'Product Strategy // UX',
    bio: 'Bridging the gap between complex AI logic and intuitive user experiences for US-based enterprise partners.',
    linkedIn: '#',
    initial: 'S'
  },
  {
    name: 'Tanvir H.',
    role: 'Automation // DevOps',
    bio: 'Architecting deterministic business process automation and zero-downtime cloud infrastructure deployment.',
    linkedIn: '#',
    initial: 'T'
  }
];

export default function TeamPage() {
  return (
    <div className="bg-surface pt-40">
      {/* Header */}
      <section className="px-8 pb-32">
        <div className="max-w-screen-2xl mx-auto space-y-12">
          <motion.div {...fadeInUp} className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary/30 italic">
            Cognitive Capital
          </motion.div>
          <motion.h1 {...fadeInUp} transition={{ delay: 0.1 }} className="text-8xl md:text-9xl font-display font-medium text-primary tracking-tighter leading-none italic">
            Architecting <br/> <span className="text-secondary">Intelligence.</span>
          </motion.h1>
          <motion.p {...fadeInUp} transition={{ delay: 0.2 }} className="text-2xl text-primary/60 max-w-2xl font-sans leading-relaxed italic border-l-2 border-primary/20 pl-8">
            Our team is composed of elite engineers and product strategists who have built systems for global enterprises. We are a sovereign core for our partners.
          </motion.p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 px-8">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {team.map((member, i) => (
             <motion.div 
               key={member.name} 
               {...fadeInUp} 
               transition={{ delay: i * 0.1 }}
               className="p-10 rounded-[40px] bg-white border border-outline-variant/10 shadow-premium group hover:bg-primary transition-all duration-700 hover:-translate-y-2 shape-notched"
             >
                <div className="w-20 h-20 rounded-3xl bg-surface-container-low flex items-center justify-center text-primary font-bold text-3xl font-display italic mb-10 group-hover:bg-white transition-all">
                   {member.initial}
                </div>
                <div className="space-y-6">
                   <div className="space-y-2">
                      <h3 className="text-2xl font-display font-medium text-primary group-hover:text-white transition-colors">{member.name}</h3>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-primary/40 group-hover:text-white/40">{member.role}</div>
                   </div>
                   <p className="text-sm text-primary/60 group-hover:text-white/60 leading-relaxed font-sans line-clamp-3">
                      {member.bio}
                   </p>
                   <Link href={member.linkedIn} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/30 group-hover:text-white transition-colors">
                      <Linkedin size={14} /> View Verified Profile
                   </Link>
                </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Recruitment Standard */}
      <section className="py-40 px-8 bg-surface-container-low rounded-[80px] lg:mx-8 mb-40">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
           <div className="space-y-12">
              <h2 className="text-6xl font-display font-medium text-primary tracking-tight italic">Verified <br/> <span className="opacity-40">Excellence.</span></h2>
              <div className="space-y-8">
                 {[
                   { t: 'Tier-1 Pedigree', d: 'Recruiting exclusively from the top 1% of computer science talent in the region.' },
                   { t: 'Scientific Rigor', d: 'Every architect must pass our internal "Logic Threshold" verification.' },
                   { t: 'US/EU Cultural Sync', d: 'Full fluency in international enterprise workflows and communication standards.' }
                 ].map(v => (
                   <div key={v.t} className="flex gap-6 items-start">
                      <Sparkles className="text-primary mt-1" size={18} />
                      <div className="space-y-2">
                         <h4 className="font-bold text-primary">{v.t}</h4>
                         <p className="text-sm text-primary/50 font-sans">{v.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           <div className="bg-primary p-20 rounded-[80px] shadow-2xl relative overflow-hidden text-white group">
              <div className="absolute inset-0 bg-grid opacity-10"></div>
              <div className="relative z-10 space-y-10">
                 <Trophy size={60} className="text-white/20 group-hover:scale-110 transition-transform" />
                 <h3 className="text-4xl font-display font-medium italic leading-tight">
                    We hire <span className="opacity-50">architects</span>, not just coders.
                 </h3>
                 <p className="text-lg font-sans leading-relaxed opacity-60 italic">
                    Our engineering culture is built on deterministic logic, structural integrity, and sovereign ownership of every line produced.
                 </p>
                 <Link href="/about/careers" className="inline-flex bg-white text-primary px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:shadow-2xl transition-all">
                    View Career Nodes
                 </Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
