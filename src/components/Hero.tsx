"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLeadCapture } from '@/context/LeadCaptureContext';

const locations = [
  { name: "Fairfax, US", top: "37%", left: "21%" },
  { name: "London, UK", top: "24%", left: "47.2%" },
  { name: "Paris, France", top: "28%", left: "48.2%" },
  { name: "Dubai, UAE", top: "45%", left: "62.5%" },
  { name: "Dhaka, BD", top: "48%", left: "75.2%" }
];

export default function Hero() {
  const { openModal } = useLeadCapture();

  return (
    <section className="relative pt-44 pb-40 px-8 overflow-hidden bg-[#001026] text-white">
      {/* Shared Map & Pins Container - Fixed Aspect Ratio (2:1 typical for this SVG) */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none z-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full aspect-[2/1] max-w-none">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" 
            alt="World Map"
            className="w-full h-full object-contain opacity-30 grayscale invert scale-110" 
          />
          
          {/* Pins synchronized to map coordinate system */}
          {locations.map((loc, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1 + (i * 0.1), duration: 0.5 }}
              className="absolute"
              style={{ top: loc.top, left: loc.left }}
            >
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-[#cc0000] rounded-none relative z-10 shadow-[0_0_15px_rgba(204,0,0,0.8)]"></div>
                <div className="absolute inset-0 w-2.5 h-2.5 bg-[#cc0000] rounded-none animate-ping opacity-75"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="max-w-4xl space-y-12">
          
          {/* Main Headline */}
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 40, filter: 'blur(15px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-8xl md:text-[140px] font-display font-black leading-[0.85] tracking-tighter uppercase"
            >
              BUILD <br/> SMARTER
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 40, filter: 'blur(15px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-8xl md:text-[140px] font-display font-black leading-[0.85] tracking-tighter uppercase text-transparent"
              style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}
            >
              SHIP FASTER.
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl text-white/60 max-w-xl font-sans leading-tight italic border-l-[0.5px] border-[#cc0000]/40 pl-8"
          >
            QOARC architects sovereign AI systems and high-concurrency SaaS platforms for global enterprises. Precision engineering at the edge.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-8"
          >
            <button 
               onClick={openModal}
               className="bg-white text-[#001026] px-12 py-6 rounded-none font-bold uppercase tracking-widest text-[11px] shadow-sharp hover:shadow-premium transition-all hover:scale-105 active:scale-95 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
            >
               Initiate Project Sequence
            </button>
            <Link 
              href="/work" 
              className="inline-flex items-center gap-4 px-12 py-6 rounded-none border border-white/10 text-white font-bold text-[11px] uppercase tracking-widest hover:bg-white/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
            >
              View Work Hub <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          });
        }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hover:opacity-100 transition-opacity cursor-pointer group"
      >
        <div className="text-[10px] font-black tracking-[0.4em] uppercase vertical-text group-hover:text-white transition-colors">Explore</div>
        <div className="w-[1px] h-20 bg-gradient-to-b from-white via-white/50 to-transparent group-hover:h-32 transition-all duration-700"></div>
      </motion.button>
    </section>
  );
}
