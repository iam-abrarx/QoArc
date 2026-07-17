"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Terminal, 
  FlaskConical, 
  FileText, 
  Code2, 
  Dna,
  Share2,
  Download,
  BookOpen,
  ArrowLeft,
  ChevronRight,
  ShieldAlert,
  Server,
  Zap,
  ShoppingBag,
  Eye,
  Minimize2,
  Loader2
} from 'lucide-react';
import { useLeadCapture } from '@/context/LeadCaptureContext';
import { usePortfolio } from '@/context/PortfolioContext';
import LabBlocks from '@/components/lab/LabBlocks';
import { getToc, hasBlockContent, TocEntry } from '@/lib/labBlocks';

const LEGACY_TOC: TocEntry[] = [
  { id: 'abstract', text: '01. Abstract & Overview', level: 2 },
  { id: 'motivation', text: '02. Commercial Incentive', level: 2 },
  { id: 'methodology', text: '03. Research Methodology', level: 2 },
  { id: 'tech', text: '04. Technical Infrastructure', level: 2 },
  { id: 'results', text: '05. Derived Value & Results', level: 2 },
];

export default function LabDetailPage() {
  const { openModal } = useLeadCapture();
  const { labItems } = usePortfolio();
  const { slug } = useParams();

  const data = labItems?.find(p => p.slug === slug) || labItems?.find(p => p.id === slug) || labItems?.[0];

  const blocks = hasBlockContent(data?.content) ? data.content : null;
  const toc = useMemo(() => (blocks ? getToc(blocks) : LEGACY_TOC), [blocks]);

  const [activeSection, setActiveSection] = useState(toc[0]?.id || 'abstract');
  const [isFocusMode, setIsFocusMode] = useState(false);

  const hasExitedManually = useRef(false);

  // Trigger focus mode on scroll down, and restore on scroll up
  useEffect(() => {
    const handleScroll = () => {
      // If native fullscreen is currently active, bypass scroll toggling completely
      const isNativeFullscreen = !!document.fullscreenElement || 
                                 !!(document as any).webkitFullscreenElement || 
                                 !!(document as any).msFullscreenElement;
      if (isNativeFullscreen) return;

      const currentScrollY = window.scrollY;
      if (currentScrollY > 200) {
        if (!isFocusMode && !hasExitedManually.current) {
          setIsFocusMode(true);
        }
      } else {
        hasExitedManually.current = false; // Reset when scrolling back to top
        if (isFocusMode) {
          setIsFocusMode(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFocusMode]);

  // Synchronize layout when native fullscreen toggles
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement || 
                                    !!(document as any).webkitFullscreenElement || 
                                    !!(document as any).msFullscreenElement;
      
      if (!isCurrentlyFullscreen && isFocusMode) {
        hasExitedManually.current = true;
      }
      setIsFocusMode(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, [isFocusMode]);

  // Toggle global class on HTML to slide/fade navbar and footer seamlessly
  useEffect(() => {
    document.documentElement.classList.toggle('focus-mode-active', isFocusMode);
    return () => {
      document.documentElement.classList.remove('focus-mode-active');
    };
  }, [isFocusMode]);



  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [toc]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navbarOffset = isFocusMode ? 50 : 110;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleFocusMode = async (enable: boolean) => {
    if (enable) {
      hasExitedManually.current = false;
      try {
        const element = document.documentElement;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        } else if ((element as any).webkitRequestFullscreen) {
          await (element as any).webkitRequestFullscreen();
        } else if ((element as any).msRequestFullscreen) {
          await (element as any).msRequestFullscreen();
        } else {
          setIsFocusMode(true);
        }
      } catch (err) {
        console.error("Fullscreen request failed:", err);
        setIsFocusMode(true);
      }
    } else {
      hasExitedManually.current = true;
      try {
        if (document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).msFullscreenElement) {
          if (document.exitFullscreen) {
            await document.exitFullscreen();
          } else if ((document as any).webkitExitFullscreen) {
            await (document as any).webkitExitFullscreen();
          } else if ((document as any).msExitFullscreen) {
            await (document as any).msExitFullscreen();
          } else {
            setIsFocusMode(false);
          }
        } else {
          setIsFocusMode(false);
        }
      } catch (err) {
        console.error("Exit fullscreen failed:", err);
        setIsFocusMode(false);
      }
    }
  };

  // labItems load asynchronously; on a direct page load `data` is briefly
  // undefined. Guard the render (all hooks above already ran) to avoid a crash.
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="selection:bg-primary selection:text-white bg-[#f0f2f5] pt-32 pb-24 px-4 md:px-8 transition-all duration-700">
      
      {/* Self-contained CSS styles for seamless global transitions */}
      <style>{`
        /* Target ONLY the global fixed navbar, not the local TOC nav */
        nav.fixed {
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease !important;
        }
        footer {
          transition: opacity 0.8s ease, transform 0.8s ease !important;
        }
        .focus-mode-active nav.fixed {
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
        }
        .focus-mode-active footer {
          opacity: 0;
          pointer-events: none;
          transform: translateY(30px);
        }
        /* Hide Crisp/Chat Widget during focus mode */
        .focus-mode-active #crisp-chat-box,
        .focus-mode-active [class*="chat-widget"],
        .focus-mode-active [id*="chat-widget"] {
          opacity: 0 !important;
          pointer-events: none !important;
          transition: opacity 0.5s ease !important;
        }
      `}</style>



      <div className="max-w-screen-2xl mx-auto space-y-8">
        
        {/* Normal Mode Top Breadcrumb / Focus Entry Bar */}
        <div 
          className={`flex items-center justify-between text-xs font-sans text-primary/50 transition-all duration-700
            ${isFocusMode ? 'opacity-0 h-0 overflow-hidden pointer-events-none -translate-y-2' : 'opacity-100'}`}
        >
          <div className="flex items-center gap-4">
            <Link href="/lab" className="flex items-center gap-2 hover:text-primary transition-colors">
              <ArrowLeft size={14} /> Back to Lab
            </Link>
            <ChevronRight size={12} className="opacity-30" />
            <span className="font-bold text-primary">{data.name}</span>
          </div>
          <button 
            onClick={() => toggleFocusMode(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-primary/10 hover:border-[#cc0000] hover:text-[#cc0000] transition-all font-bold shadow-sm"
          >
            <BookOpen size={12} /> Focus Mode
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: Sticky Table of Contents */}
          <div 
            className={`lg:col-span-3 space-y-6 sticky hidden lg:block transition-all duration-700
              ${isFocusMode ? 'top-10' : 'top-28'}`}
          >
            
            {/* Table of Contents */}
            <div className="space-y-6 p-4">
              <h3 className="text-precision text-primary/40">Outline // Contents</h3>
              <nav className="space-y-4">
                {toc.length === 0 && (
                  <span className="text-xs text-primary/30 italic">No sections</span>
                )}
                {toc.map(section => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left font-sans text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-4 py-1.5 border-l-2
                        ${section.level === 3 ? 'pl-8 text-[11px]' : 'pl-4'}
                        ${isActive
                          ? 'border-[#cc0000] text-[#cc0000] font-bold translate-x-2'
                          : 'border-transparent text-primary/50 hover:text-primary'
                        }`}
                    >
                      {section.text}
                    </button>
                  );
                })}
              </nav>
            </div>

          </div>

          {/* RIGHT PANEL: Simulated Paper Sheet (Academic PDF style) */}
          <div className="lg:col-span-9 space-y-8">
            <div className="bg-white border border-primary/10 shadow-premium p-8 md:p-20 relative overflow-hidden transition-all duration-700">
              
              {/* Paper Layout Top Border CAD element */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary via-[#cc0000] to-primary"></div>
              
              <div className="space-y-12">
                
                {/* Paper Header */}
                <div className="border-b border-primary/10 pb-8 space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-[9px] font-bold tracking-widest text-primary/40 uppercase">
                    <span>QOARC Research Publications</span>
                    <span>No. {data.docId}</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-primary leading-tight">
                    {data.name}
                  </h1>
                  
                  <div className="pt-4 flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-bold text-primary/60 font-mono">
                    <span className="flex items-center gap-1.5"><Terminal size={12} className="text-[#cc0000]" /> AUTHOR: QOARC LABS</span>
                    <span className="flex items-center gap-1.5"><FlaskConical size={12} className="text-[#cc0000]" /> CLASSIFICATION: OPEN RESEARCH</span>
                  </div>
                </div>

                {blocks ? (
                  /* Block-based article body (Gutenberg-style content) */
                  <LabBlocks blocks={blocks} />
                ) : (
                  <>
                    {/* Section 1: Abstract */}
                    <section id="abstract" className="space-y-6 scroll-mt-28">
                      <h2 className="text-lg font-display font-bold text-primary flex items-center gap-3">
                        <span className="text-[#cc0000] font-mono text-xs">01 //</span> Abstract
                      </h2>
                      <div className="bg-primary/5 p-6 md:p-8 border-l-2 border-primary/20">
                        <p className="text-lg text-primary/80 font-fraunces font-light italic leading-relaxed">
                          {data.abstract}
                        </p>
                      </div>
                    </section>

                    {/* Research Parameters Table */}
                    {data.metrics?.length > 0 && (
                      <section className="space-y-6 pt-4 border-t border-primary/5">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-primary/40">Key Performance Metrics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {data.metrics.map((m: any) => (
                            <div key={m.label} className="bg-[#f8fafc] border border-primary/5 p-6 text-center shadow-sm">
                              <div className="text-[9px] font-bold uppercase tracking-widest text-primary/40 mb-2">{m.label}</div>
                              <div className="text-3xl font-display font-bold text-primary leading-none">{m.val}</div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Section 2: Motivation */}
                    <section id="motivation" className="space-y-6 pt-8 border-t border-primary/5 scroll-mt-28">
                      <h2 className="text-lg font-display font-bold text-primary flex items-center gap-3">
                        <span className="text-[#cc0000] font-mono text-xs">02 //</span> Commercial Incentive & Objective
                      </h2>
                      <p className="text-lg text-primary/70 leading-relaxed font-fraunces font-light italic">
                        {data.motivation}
                      </p>
                    </section>

                    {/* Section 3: Methodology */}
                    <section id="methodology" className="space-y-6 pt-8 border-t border-primary/5 scroll-mt-28">
                      <h2 className="text-lg font-display font-bold text-primary flex items-center gap-3">
                        <span className="text-[#cc0000] font-mono text-xs">03 //</span> Research Methodology & Design
                      </h2>
                      <p className="text-lg text-primary/70 leading-relaxed font-fraunces font-light italic">
                        {data.methodology}
                      </p>
                    </section>

                    {/* Section 4: Tech Stack */}
                    <section id="tech" className="space-y-6 pt-8 border-t border-primary/5 scroll-mt-28">
                      <h2 className="text-lg font-display font-bold text-primary flex items-center gap-3">
                        <span className="text-[#cc0000] font-mono text-xs">04 //</span> Technical Infrastructure Stack
                      </h2>
                      <div className="flex flex-wrap gap-3 pt-2">
                        {data.tech?.map((t: string) => (
                          <span key={t} className="px-6 py-2.5 bg-[#f8fafc] border border-primary/5 text-xs font-bold text-primary font-mono shadow-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                    </section>

                    {/* Section 5: Results */}
                    <section id="results" className="space-y-6 pt-8 border-t border-primary/5 scroll-mt-28">
                      <h2 className="text-lg font-display font-bold text-primary flex items-center gap-3">
                        <span className="text-[#cc0000] font-mono text-xs">05 //</span> Derived Value & Findings
                      </h2>
                      <div className="bg-[#cc0000]/5 border-l-2 border-[#cc0000] p-6 md:p-8">
                        <p className="text-lg text-primary/80 font-fraunces font-light italic leading-relaxed">
                          {data.results}
                        </p>
                      </div>
                    </section>
                  </>
                )}

                {/* Footer Disclaimer */}
                <div className="pt-12 border-t border-primary/10 text-center text-[10px] text-primary/30 space-y-2">
                  <p>© 2026 QOARC LABS. ALL RIGHTS RESERVED. FOR COMMERCIAL INTEGRATIONS, CONTACT OFFICE@QOARC.COM</p>
                  <p>DOCUMENT ID: {data.docId} // VERIFIED CRYPTOGRAPHIC SIGNATURE: SECURE</p>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
