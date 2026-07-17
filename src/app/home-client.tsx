"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import { motion, AnimatePresence } from 'framer-motion';
import { useLeadCapture } from '@/context/LeadCaptureContext';
import EngineeringModalities from '@/components/EngineeringModalities';
import CaseStudyCarousel from '@/components/CaseStudyCarousel';
import ContactSection from '@/components/ContactSection';
import { Beaker, X, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const fadeInUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

export default function HomePage() {
  const [showLabPopup, setShowLabPopup] = useState(false);

  const handleDismiss = () => {
    setShowLabPopup(false);
    sessionStorage.setItem('lab-popup-dismissed', 'true');
  };

  useEffect(() => {
    const handleScroll = () => {
      const isDismissed = sessionStorage.getItem('lab-popup-dismissed') === 'true';
      if (isDismissed) {
        window.removeEventListener('scroll', handleScroll);
        return;
      }

      const contactEl = document.getElementById('contact');
      if (!contactEl) return;

      const scrollPosition = window.scrollY + window.innerHeight;
      const threshold = contactEl.offsetTop + (contactEl.offsetHeight * 0.8);
      
      if (scrollPosition >= threshold) {
        setShowLabPopup(true);
      } else {
        if (showLabPopup) {
          handleDismiss();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showLabPopup]);

  useEffect(() => {
    if (!showLabPopup) return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        handleDismiss();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      const diffY = touchStartY - touchEndY;
      if (diffY > 10) { // Swipe up (scroll down)
        handleDismiss();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [showLabPopup]);

  const dismissPopup = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleDismiss();
    
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
      <ScrollReveal>
        <section className="bg-bg-dark py-12 border-b border-white/5 relative overflow-hidden">
          {/* Subtle CAD grid overlay */}
          <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none"></div>
          <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-0 md:divide-x divide-white/5">
              {[
                { value: '6', label: 'YEARS IN MARKET' },
                { value: '15+', label: 'SYSTEMS BUILT' },
                { value: '5+', label: 'INDUSTRIES TRANSFORMED' },
                { value: '15+', label: 'ELITE ARCHITECTS' }
              ].map((stat, i) => (
                <div 
                  key={i}
                  className="group relative px-12 py-8"
                >
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
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 3. Engineering Modalities - Redesigned to Accordion */}
      <ScrollReveal>
        <EngineeringModalities />
      </ScrollReveal>

      {/* 4. Selected Work - Carousel Redesign */}
      <ScrollReveal>
        <CaseStudyCarousel />
      </ScrollReveal>

      {/* 4.8 Contact Section - Minimalist Integration */}
      <ScrollReveal>
        <ContactSection />
      </ScrollReveal>

      {/* Cinematic Reveal Lab Popup */}
      <AnimatePresence>
        {showLabPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-primary z-[99999] overflow-hidden flex items-center justify-center"
          >
            {/* Subtle grid overlay */}
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

            {/* Dismiss button */}
            <button 
              onClick={dismissPopup}
              className="absolute top-8 right-8 md:top-12 md:right-12 text-white/40 hover:text-white transition-colors p-4 z-20"
              aria-label="Dismiss"
            >
              <X size={24} />
            </button>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-screen-xl w-full text-center space-y-12 relative z-10 px-8"
            >
              <h2 className="text-6xl md:text-8xl font-display italic text-white leading-none">
                We Share Our Findings <br /> <span className="opacity-40">with Everyone.</span>
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto italic">
                No gatekeeping. We publish our neural network blueprints, Graph Convolutional models, and real-world system architectures openly.
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
                <Link 
                  href="/lab"
                  onClick={() => {
                    sessionStorage.setItem('lab-popup-dismissed', 'true');
                  }}
                  className="bg-white text-primary px-12 py-5 rounded-none font-bold uppercase tracking-widest text-[11px] hover:shadow-2xl transition-all hover:scale-105 inline-flex items-center justify-center gap-3"
                >
                  Enter the QOARC Lab <ArrowRight size={14} />
                </Link>
                <button
                  onClick={dismissPopup}
                  className="bg-white/10 text-white border border-white/20 backdrop-blur-md px-12 py-5 rounded-none font-bold uppercase tracking-widest text-[11px] hover:bg-white/20 transition-all"
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
