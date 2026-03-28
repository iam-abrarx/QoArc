"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  MapPin, 
  Target, 
  Users, 
  Zap,
  ShieldCheck,
  Globe,
  Sparkles
} from 'lucide-react';
import AboutQOARC from '@/components/AboutQOARC';

export default function AboutPage() {
  return (
    <div className="bg-surface">
      {/* Hero - Redesigned to Blue Dark */}
      <section className="relative pt-44 pb-40 px-8 overflow-hidden bg-[#001026] text-white">
        {/* Background World Map - Full Cover */}
        <div className="absolute inset-0 opacity-[0.2] pointer-events-none">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" 
            alt="World Map"
            className="w-full h-full object-cover opacity-30 grayscale invert scale-110" 
          />
        </div>

        <div className="max-w-screen-2xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h1 className="text-8xl md:text-9xl font-display font-black tracking-tighter leading-none uppercase">
                The QOARC <br/> <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>Studio.</span>
              </h1>
              <p className="text-2xl text-white/60 max-w-xl font-sans leading-tight italic border-l-[0.5px] border-[#cc0000]/40 pl-8">
                A full-service AI product studio that builds intelligent SaaS, automates business operations, and ships end-to-end software products — for clients and ourselves.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: 'Est. Release', value: '2023', color: 'text-white' },
                { label: 'Systems Built', value: '25+', color: 'text-[#cc0000]' },
                { label: 'Core Philosophy', value: 'Sovereign Architecture', full: true }
              ].map((item, i) => (
                <div key={i} className={`bg-white/5 border border-white/10 p-10 backdrop-blur-md rounded-2xl shadow-sharp transition-all hover:bg-white/10 ${item.full ? 'col-span-2' : ''}`}>
                  <div className={`text-4xl font-display font-black mb-2 ${item.color || 'text-white'}`}>{item.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillars - Sharpened */}
      <section className="py-24 px-8 bg-white cad-line">
        <div className="max-w-screen-2xl mx-auto space-y-24">
           <div className="max-w-2xl space-y-8">
              <div className="text-precision">Foundational Values // Execution Path</div>
              <h2 className="text-7xl font-display font-medium text-primary tracking-tight leading-[0.9] italic">
                 The Four <br/> <span className="opacity-40">Pillars.</span>
              </h2>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "AI Native", desc: "Embedding intelligence into every node of the development lifecycle.", icon: Sparkles },
                { title: "Product Driven", desc: "Dual model — client services funding in-house SaaS innovation.", icon: Target },
                { title: "Security First", desc: "Hardened infrastructure for deep-enterprise security nodes.", icon: ShieldCheck },
                { title: "Sovereign Built", desc: "You own the IP. We own the precision. Total transparency.", icon: Globe }
              ].map((p, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -8 }}
                  className="tonal-card p-10 group cad-crosshair relative overflow-hidden"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  ></motion.div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sharp mb-8 group-hover:scale-110">
                       <p.icon size={18} />
                    </div>
                    <h3 className="text-2xl font-display font-medium italic text-primary mb-4 group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-sm text-primary/50 leading-relaxed font-sans italic font-medium opacity-60">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Philosophy - Mind Studios Style Redesign */}
      <AboutQOARC />
    </div>
  );
}
