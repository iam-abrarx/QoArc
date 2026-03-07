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
          <motion.div {...fadeInUp} className="mb-20">
            <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-accent-blue mb-6">Our Work</h1>
            <h2 className="text-5xl md:text-8xl font-display font-black mb-8 tracking-tighter leading-tight">
              Selected <span className="text-gradient-blue text-transparent bg-clip-text">Projects</span>
            </h2>
            <p className="text-xl text-text-muted max-w-2xl leading-relaxed opacity-80">
              Crafting high-performance digital systems for global organizations and visionaries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {portfolioItems.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => {
                  setSelectedItem(item);
                  document.body.style.overflow = 'hidden';
                }}
                className={`group relative bg-bg-card/40 backdrop-blur-xl border border-white/5 rounded-[40px] overflow-hidden hover:border-accent-blue/30 transition-all duration-700 cursor-pointer ${idx % 3 === 0 ? 'lg:col-span-2' : ''}`}
              >
                {/* Image Container */}
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img src={item.imageUrl} alt={item.name} 
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                       onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2670')} />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/20 to-transparent opacity-80"></div>
                  
                  {item.client && (
                    <div className="absolute top-6 left-6 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full">
                      <span className="text-[10px] font-bold text-white/80 uppercase tracking-[0.2em]">{item.client}</span>
                    </div>
                  )}

                  {/* Absolute Edit Trigger for Admins (Positioned relative to image) */}
                  {isAdmin && (
                    <Link 
                      href={`/admin?edit=${item.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-accent-blue/20 backdrop-blur-md border border-accent-blue/30 text-accent-blue flex items-center justify-center hover:bg-accent-blue hover:text-white transition-all shadow-xl"
                    >
                      <Edit3 size={16} />
                    </Link>
                  )}
                </div>

                {/* Content Overlay */}
                <div className="p-10 relative">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.techStack?.map((tech, i) => (
                      <span key={i} className="text-[9px] font-bold uppercase tracking-widest text-accent-blue px-3 py-1 rounded-full bg-accent-blue/5 border border-accent-blue/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent-blue transition-all duration-500">{item.name}</h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-8 opacity-70 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-3 text-xs font-bold text-accent-blue uppercase tracking-widest group-hover:gap-5 transition-all">
                      Case Study <ArrowRight size={14} />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Rocket size={14} className="text-white" />
                    </div>
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
                <div className="aspect-video rounded-[32px] overflow-hidden border border-white/5 shadow-2xl group/image relative">
                  <img src={selectedItem.imageUrl} className="w-full h-full object-cover shadow-inner" alt={selectedItem.name} />
                  <div className="absolute inset-0 bg-accent-blue/5 opacity-0 group-hover/image:opacity-100 transition-opacity"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-6">
                    <h4 className="text-sm font-bold text-accent-blue uppercase tracking-[0.2em] flex items-center gap-4">
                      <span className="w-8 h-[1px] bg-accent-blue opacity-50"></span>
                      The Challenge
                    </h4>
                    <p className="text-text-muted leading-relaxed text-xl font-light opacity-90">
                      {selectedItem.problem || 'Coming soon...'}
                    </p>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-sm font-bold text-accent-purple uppercase tracking-[0.2em] flex items-center gap-4">
                      <span className="w-8 h-[1px] bg-accent-purple opacity-50"></span>
                      The Intelligence
                    </h4>
                    <p className="text-text-muted leading-relaxed text-xl font-light opacity-90">
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

                <div className="pt-12 text-center">
                  <a href={selectedItem.url} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-4 bg-white text-black px-12 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-[0_20px_50px_rgba(255,255,255,0.1)] active:scale-95 group">
                    Launch Experience <Rocket size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                  <p className="text-[10px] text-text-muted mt-6 uppercase tracking-widest opacity-50">Secure External Link to Case Study Site</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
