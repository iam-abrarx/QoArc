"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import { motion } from 'framer-motion';
import { useLeadCapture } from '@/context/LeadCaptureContext';
import { usePortfolio } from '@/context/PortfolioContext';
import EngineeringModalities from '@/components/EngineeringModalities';
import EngineeringLifecycle from '@/components/EngineeringLifecycle';
import CaseStudyCarousel from '@/components/CaseStudyCarousel';
import PharmaAIAnimation from '@/components/PharmaAIAnimation';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  BarChart3, 
  Cpu, 
  Zap, 
  Layout, 
  Globe,
  Quote,
  Linkedin,
  Rocket,
  ArrowUpRight,
  Layers,
  Terminal,
  Workflow
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

export default function HomePage() {
  const { openModal } = useLeadCapture();
  const { labItems } = usePortfolio();
  return (
    <div className="bg-surface relative selection:bg-primary selection:text-white">
      {/* 1. Hero Section - Redesigned to Blue Dark */}
      <Hero />

      {/* 2. Agency KPI Stats - Elite v2 (Compact & High-Contrast on Dark) */}
      <section className="bg-bg-dark py-12 border-b border-white/5 relative overflow-hidden">
        {/* Subtle CAD grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none"></div>
        <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-0 md:divide-x divide-white/5">
            {[
              { value: '6', label: 'YEARS IN MARKET', node: '0x01 // HIST' },
              { value: '15+', label: 'SYSTEMS BUILT', node: '0x02 // DEPL' },
              { value: '5+', label: 'INDUSTRIES TRANSFORMED', node: '0x03 // SECT' },
              { value: '15+', label: 'ELITE ARCHITECTS', node: '00 // TEAM' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative px-12 py-8"
              >
                {/* Node Identifier */}
                <div className="absolute top-0 left-12 flex items-center gap-2">
                  <span className="text-[8px] font-black tracking-[0.4em] text-white/20 uppercase">{stat.node}</span>
                </div>

                <div className="relative pt-6">
                  {/* Two-Tone Typographic Depth */}
                  <div className="relative">
                    <div className="text-6xl md:text-7xl font-display font-medium text-white tracking-tighter italic leading-none relative z-10">
                      {stat.value}
                    </div>
                    <div className="absolute -top-1 -left-1 text-6xl md:text-7xl font-display font-medium text-transparent tracking-tighter italic leading-none z-0 opacity-15" 
                         style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>
                      {stat.value}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-[1px] w-6 bg-white/15 group-hover:w-12 transition-all duration-500"></div>
                    <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 leading-relaxed whitespace-nowrap group-hover:text-white/70 transition-colors">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Engineering Modalities - Redesigned to Accordion */}
      <EngineeringModalities />

      {/* 4. Selected Work - Carousel Redesign */}
      <CaseStudyCarousel />



      {/* 5a. Lab Spotlight - SOVEREIGN INTELLIGENCE (Light) */}
      <section className="py-40 px-8 bg-gradient-to-br from-[#eff6ff] via-[#f8fbff] to-white text-primary relative overflow-hidden border-t border-primary/5">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #002046 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="max-w-screen-2xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            {/* Left Side: Narrative */}
            <div className="space-y-16">
              <div className="space-y-4">
                <h2 className="text-[120px] font-display font-black leading-none tracking-tighter uppercase block">
                  SOVEREIGN
                </h2>
                <h2 className="text-[120px] font-display font-black leading-none tracking-tighter uppercase block text-transparent" 
                    style={{ WebkitTextStroke: '2px rgba(0,32,70,0.8)' }}>
                  INTELLIGENCE.
                </h2>
              </div>

              <div className="space-y-10 max-w-xl">
                <p className="text-xl text-primary/60 leading-relaxed font-sans font-light italic border-l-[0.5px] border-primary/20 pl-8">
                  Incubating edge-case technologies that redefine the boundaries of automated systems. High-fidelity research for sovereign deployment.
                </p>
                <p className="text-xl text-primary/60 leading-relaxed font-sans font-light italic">
                  By focusing on &quot;Intellectual Architecture&quot;, we develop secure, future-proof autonomous layers that deliver value.
                </p>
              </div>
            </div>
            {/* Right Side: Pharma AI Animation */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-md lg:max-w-xl">
                 <PharmaAIAnimation />
              </div>
            </div>
            </div>
          </div>
      </section>

      {/* 5b. Lab Projects - Dark Node Row */}
      <section className="py-20 px-8 bg-[#001026] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {labItems.slice(0, 2).map((p, i) => (
              <Link key={p.id} href="/lab" className="group relative px-12 py-10 first:pl-0 border-l border-white/5 first:border-l-0 hover:bg-white/[0.03] transition-all">
                {/* Vertical Divider */}
                {i > 0 && (
                  <div className="absolute left-0 top-12 bottom-12 w-[1px] bg-[#4A90D9] opacity-10 group-hover:opacity-100 transition-opacity"></div>
                )}
                
                <div className="space-y-6 flex flex-col items-center text-center">
                  <div className="flex items-center justify-center relative w-full">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#4A90D9]">{p.node}</span>
                    <ArrowUpRight size={16} className="absolute right-0 text-white/20 group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <div className="space-y-2 flex flex-col items-center">
                    <h4 className="text-4xl font-display font-medium text-white group-hover:text-[#4A90D9] transition-colors italic leading-none max-w-lg">{p.name}</h4>
                    <p className="text-sm text-white/40 max-w-md group-hover:text-white/60 transition-colors leading-relaxed italic">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>




      {/* 4.5 Development Phases - Restored - Sharpened */}
      <EngineeringLifecycle />

      {/* 4.7 Testimonials - Our Clients Say */}
      <Testimonials />
      {/* 4.8 Contact Section - Minimalist Integration */}
      <ContactSection />

      {/* 6. Footer CTA */}
      <section className="py-40 px-8 bg-white cad-line">
        <div className="max-w-screen-xl mx-auto text-center space-y-16">
           <h2 className="text-8xl md:text-[120px] font-display font-medium text-primary tracking-tighter leading-[0.8] italic grayscale opacity-20">
              Innovate <br /> or Stagnate.
           </h2>
           <div className="space-y-8">
              <p className="text-xl text-primary/60 max-w-xl mx-auto italic">
                 Architect your vision with global precision. Initiation takes less than 24 hours.
              </p>
              <button 
                onClick={openModal}
                className="inline-block bg-primary text-white px-12 py-6 rounded-none font-bold uppercase tracking-widest text-xs shadow-premium hover:scale-[1.02] transition-all cursor-pointer"
              >
                Initiate Sequence →
              </button>
           </div>
        </div>
      </section>
    </div>
  );
}
