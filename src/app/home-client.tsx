"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import { motion } from 'framer-motion';
import { useLeadCapture } from '@/context/LeadCaptureContext';
import { usePortfolio } from '@/context/PortfolioContext';
import EngineeringModalities from '@/components/EngineeringModalities';
import CaseStudyCarousel from '@/components/CaseStudyCarousel';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';
import { ArrowUpRight } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

export default function HomePage() {
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

      {/* 4.7 Testimonials - Our Clients Say */}
      <Testimonials />
      {/* 4.8 Contact Section - Minimalist Integration */}
      <ContactSection />
    </div>
  );
}
