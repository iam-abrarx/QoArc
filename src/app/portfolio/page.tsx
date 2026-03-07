"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle, ExternalLink, ArrowRight, Edit3, Network, AlertCircle, CheckCircle2, Rocket } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { PortfolioItem } from '@/lib/portfolio';
import Link from 'next/link';

const fadeInUp: any = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }
};

export default function PortfolioPage() {
  const { portfolioItems } = usePortfolio();
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isAdmin] = useState(() => typeof window !== 'undefined' && localStorage.getItem('isAdmin') === 'true');

  const getSafeVideoUrl = (url: string | undefined) => {
    if (!url) return "";
    let embedUrl = url;
    if (url.includes('youtube.com/watch?v=')) {
      embedUrl = url.replace('watch?v=', 'embed/');
    } else if (url.includes('youtu.be/')) {
      embedUrl = url.replace('youtu.be/', 'youtube.com/embed/');
    } else if (url.includes('vimeo.com/')) {
      const vimeoId = url.split('/').pop();
      embedUrl = `https://player.vimeo.com/video/${vimeoId}`;
    }
    return embedUrl;
  };

  return (
    <div className="bg-grid min-h-screen">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="mb-16">
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-pink-500">Portfolio</span>
            </h1>
            <p className="text-xl text-text-muted max-w-2xl leading-relaxed">
              Delivering high-impact digital solutions for visionary clients across the globe.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioItems.map((item) => (
              <motion.div 
                key={item.id}
                {...fadeInUp}
                onClick={() => {
                  setSelectedItem(item);
                  document.body.style.overflow = 'hidden';
                }}
                className="group relative bg-bg-card border border-white/5 rounded-3xl overflow-hidden hover:border-accent-blue/30 transition-all duration-500 cursor-pointer"
              >
                {/* Quick Edit (Admin Only) */}
                {isAdmin && (
                  <Link 
                    href={`/admin?edit=${item.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-accent-blue text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"
                  >
                    <Edit3 size={20} />
                  </Link>
                )}

                {/* Image Container */}
                <div className="aspect-video relative overflow-hidden">
                  <img src={item.imageUrl} alt={item.name} 
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                       onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2670')} />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent opacity-60"></div>
                  
                  {item.client && (
                    <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full">
                      <span className="text-xs font-bold text-white uppercase tracking-widest">{item.client}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-accent-blue transition-colors">{item.name}</h3>
                  <p className="text-text-muted mb-6 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-accent-blue group-hover:gap-4 transition-all">
                    Learn More <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-bg-dark/95 backdrop-blur-2xl" 
              onClick={() => {
                setSelectedItem(null);
                document.body.style.overflow = 'auto';
              }}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-bg-card border border-white/10 rounded-[32px] shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 p-8 flex items-center justify-between bg-bg-card/80 backdrop-blur-md border-b border-white/5">
                <div>
                  <h2 className="text-3xl font-display font-bold">{selectedItem.name}</h2>
                  <p className="text-accent-blue font-bold uppercase tracking-widest text-xs mt-1">{selectedItem.client}</p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedItem(null);
                    document.body.style.overflow = 'auto';
                  }}
                  className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X />
                </button>
              </div>

              <div className="p-8 md:p-12 space-y-16">
                <div className="aspect-video rounded-3xl overflow-hidden border border-white/10">
                  <img src={selectedItem.imageUrl} className="w-full h-full object-cover" alt={selectedItem.name} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-white flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center">
                        <AlertCircle size={18} />
                      </span>
                      The Problem
                    </h4>
                    <p className="text-text-muted leading-relaxed text-lg">
                      {selectedItem.problem || 'Coming soon...'}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-white flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-accent-blue/10 text-accent-blue flex items-center justify-center">
                        <CheckCircle2 size={18} />
                      </span>
                      Our Solution
                    </h4>
                    <p className="text-text-muted leading-relaxed text-lg">
                      {selectedItem.solution || 'Coming soon...'}
                    </p>
                  </div>
                </div>

                {selectedItem.videoUrl && (
                  <div className="space-y-6 pt-16 border-t border-white/5">
                    <h4 className="text-xl font-bold text-white flex items-center gap-3">
                      <PlayCircle className="text-accent-blue" />
                      Video Presentation
                    </h4>
                    <div className="aspect-video rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
                      <iframe 
                        src={getSafeVideoUrl(selectedItem.videoUrl)} 
                        className="w-full h-full" 
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                {selectedItem.fullStory && (
                  <div className="pt-16 border-t border-white/5">
                    <h4 className="text-xs uppercase tracking-[0.3em] text-accent-blue font-black mb-10 text-center">Project Analysis & Journey</h4>
                    <div className="max-w-3xl mx-auto">
                      <p className="text-xl text-text-muted leading-[1.8] whitespace-pre-wrap font-sans">
                        {selectedItem.fullStory}
                      </p>
                    </div>
                  </div>
                )}

                {selectedItem.extraImages && selectedItem.extraImages.length > 0 && (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                     {selectedItem.extraImages.map((img, idx) => (
                       <div key={idx} className="rounded-2xl overflow-hidden border border-white/5 hover:border-accent-blue/30 transition-all duration-500">
                         <img src={img} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" alt={`Extra ${idx}`} />
                       </div>
                     ))}
                   </div>
                )}

                {selectedItem.flowDiagramUrl && (
                  <div className="space-y-6">
                    <h4 className="text-xl font-bold text-white flex items-center gap-3">
                      <Network className="text-accent-purple" />
                      Flow Architecture
                    </h4>
                    <div className="bg-white/5 p-4 rounded-[32px] border border-white/10 overflow-hidden">
                      <img src={selectedItem.flowDiagramUrl} className="w-full rounded-2xl grayscale hover:grayscale-0 transition-all duration-700" alt="Flow Diagram" />
                    </div>
                  </div>
                )}

                <div className="pt-8 text-center border-t border-white/5">
                  <a href={selectedItem.url} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-black text-xl hover:bg-accent-blue hover:text-white transition-all shadow-xl shadow-accent-blue/10">
                    Launch Website <Rocket size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
