"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import { motion, AnimatePresence } from 'framer-motion';
import { useLeadCapture } from '@/context/LeadCaptureContext';
import EngineeringModalities from '@/components/EngineeringModalities';
import CaseStudyCarousel from '@/components/CaseStudyCarousel';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';
import { Beaker, X, ArrowRight } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

export default function HomePage() {
  const [showLabPopup, setShowLabPopup] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem('lab-popup-dismissed') === 'true';
    if (isDismissed) return;

    const handleScroll = () => {
      const contactEl = document.getElementById('contact');
      if (!contactEl) return;

      const scrollPosition = window.scrollY + window.innerHeight;
      
      // Calculate threshold: triggers only after the Contact Us section is at least 80% scrolled
      const threshold = contactEl.offsetTop + (contactEl.offsetHeight * 0.8);
      
      if (scrollPosition >= threshold) {
        setShowLabPopup(true);
      } else {
        setShowLabPopup(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dismissPopup = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowLabPopup(false);
    sessionStorage.setItem('lab-popup-dismissed', 'true');
    
    // Automatically scroll to the absolute footer bottom
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

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


      {/* 4.7 Testimonials - Our Clients Say */}
      <Testimonials />
      {/* 4.8 Contact Section - Minimalist Integration */}
      <ContactSection />

      {/* Cinematic Reveal Lab Popup */}
      <AnimatePresence>
        {showLabPopup && (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(15px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(15px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#001026]/95 backdrop-blur-xl text-white flex flex-col justify-center items-center p-8 md:p-24 z-[99999] overflow-hidden"
          >
            {/* Ambient grid overlay */}
            <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none"></div>

            {/* Glowing orb background lights for high-end look */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#4A90D9]/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#8B5CF6]/5 rounded-full blur-[150px] pointer-events-none"></div>

            <button 
              onClick={dismissPopup}
              className="absolute top-8 right-8 md:top-12 md:right-12 text-white/50 hover:text-white transition-colors p-4 z-10 flex items-center gap-2 group/btn"
              aria-label="Dismiss transmission"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-0 group-hover/btn:opacity-100 transition-opacity">Dismiss Transmission</span>
              <X size={24} />
            </button>

            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl w-full space-y-12 text-center relative z-10"
            >
              <div className="space-y-6">
                <h3 className="text-3xl md:text-5xl lg:text-7xl font-display font-medium text-white tracking-tighter leading-none italic md:whitespace-nowrap">
                  We Share Our Findings with Everyone.
                </h3>
                <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-sans leading-relaxed border-l-2 border-[#4A90D9]/30 pl-6 md:pl-8 text-left md:text-center">
                  No gatekeeping. We publish our neural network blueprints, Graph Convolutional models, and real-world system architectures openly. Step inside the QOARC Lab registry.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
                <Link 
                  href="/lab"
                  onClick={(e) => {
                    // Also save dismissed so it doesn't open immediately on page change/back navigation
                    sessionStorage.setItem('lab-popup-dismissed', 'true');
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-5 bg-white text-primary hover:bg-[#4A90D9] hover:text-white transition-all duration-500 font-bold uppercase tracking-widest text-xs shadow-2xl hover:scale-105 active:scale-95"
                >
                  <span>Enter the QOARC Lab</span>
                  <ArrowRight size={16} />
                </Link>
                
                <button
                  onClick={dismissPopup}
                  className="w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 font-bold uppercase tracking-widest text-xs"
                >
                  Return to Site
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
