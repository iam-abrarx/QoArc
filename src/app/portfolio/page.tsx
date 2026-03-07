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
  const [filter, setFilter] = useState('All');
  const [isAdmin] = useState(() => typeof window !== 'undefined' && localStorage.getItem('isAdmin') === 'true');

  const categories = ['All', 'Web', 'App', 'AI & IoT', 'Branding'];
  const filteredItems = filter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

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
          <motion.div {...fadeInUp} className="mb-12">
            <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-accent-blue mb-6">Our Work</h1>
            <h2 className="text-5xl md:text-8xl font-display font-black mb-8 tracking-tighter leading-tight">
              Selected <span className="text-gradient-blue text-transparent bg-clip-text">Projects</span>
            </h2>
            <p className="text-xl text-text-muted max-w-2xl leading-relaxed opacity-80">
              Crafting high-performance digital systems for global organizations and visionaries.
            </p>
          </motion.div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-4 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${
                  filter === cat 
                    ? 'bg-accent-blue border-accent-blue text-white shadow-xl shadow-accent-blue/20' 
                    : 'bg-white/5 border-white/5 text-text-muted hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredItems.map((item, idx) => (
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
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/20 to-transparent opacity-80"></div>
                  
                  {item.isFeatured && (
                    <div className="absolute top-6 left-6 bg-accent-blue text-white px-4 py-1.5 rounded-full z-10 shadow-xl">
                      <span className="text-[9px] font-black uppercase tracking-widest">Featured</span>
                    </div>
                  )}

                  {item.client && (
                    <div className="absolute bottom-6 left-6 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full">
                      <span className="text-[10px] font-bold text-white/80 uppercase tracking-[0.2em]">{item.client}</span>
                    </div>
                  )}

                  {/* Absolute Edit Trigger for Admins */}
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
                    <span className="text-[9px] font-black uppercase tracking-widest text-accent-purple px-3 py-1 rounded-full bg-accent-purple/5 border border-accent-purple/10">
                      {item.category}
                    </span>
                    {item.techStack?.slice(0, 3).map((tech, i) => (
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

      {/* Case Study Modal (Rich Detail View) */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-bg-dark/98 backdrop-blur-3xl" 
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
              className="relative w-full max-w-6xl h-full overflow-y-auto bg-bg-card border border-white/5 rounded-[48px] shadow-2xl custom-scrollbar"
            >
              {/* Hero Section */}
              <div className="relative aspect-[21/10] overflow-hidden">
                <img src={selectedItem.heroImage || selectedItem.imageUrl} className="w-full h-full object-cover" alt={selectedItem.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/40 to-transparent"></div>
                
                <button 
                  onClick={() => {
                    setSelectedItem(null);
                    document.body.style.overflow = 'auto';
                  }}
                  className="absolute top-8 left-8 w-14 h-14 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white text-black transition-all z-20"
                >
                  <X size={24} />
                </button>

                <div className="absolute bottom-16 left-12 right-12">
                   <div className="flex flex-wrap items-center gap-4 mb-6">
                      <span className="px-4 py-1.5 rounded-full bg-accent-blue text-white text-[10px] font-black uppercase tracking-widest">{selectedItem.category}</span>
                      <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{selectedItem.year}</span>
                   </div>
                   <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter mb-6">{selectedItem.name}</h2>
                   <p className="text-xl md:text-2xl text-text-muted max-w-3xl font-light italic opacity-90 leading-relaxed">
                     "{selectedItem.description}"
                   </p>
                </div>
              </div>

              {/* Overview Data Matrix */}
              <div className="p-12 md:p-16 space-y-24">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-12 border-y border-white/5">
                  {[
                    { label: 'Client', value: selectedItem.client },
                    { label: 'Industry', value: selectedItem.industry },
                    { label: 'Year', value: selectedItem.year },
                    { label: 'Duration', value: selectedItem.duration || selectedItem.timeline }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                       <p className="text-[10px] uppercase font-black text-accent-blue tracking-[0.3em] opacity-50">{stat.label}</p>
                       <p className="text-xl font-display font-bold">{stat.value || 'N/A'}</p>
                    </div>
                  ))}
                </div>

                {/* Structured Narrative Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
                  <div className="lg:col-span-8 space-y-16">
                    <div className="space-y-6">
                      <h3 className="text-3xl font-display font-bold flex items-center gap-4">
                        <AlertCircle className="text-red-500" /> The Challenge
                      </h3>
                      <p className="text-xl text-text-muted leading-relaxed font-light opacity-90">{selectedItem.challenge}</p>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-3xl font-display font-bold flex items-center gap-4">
                        <CheckCircle2 className="text-accent-blue" /> The Solution
                      </h3>
                      <p className="text-xl text-text-muted leading-relaxed font-light opacity-90">{selectedItem.solution}</p>
                    </div>

                    {selectedItem.outcome && (
                      <div className="space-y-6">
                        <h3 className="text-3xl font-display font-bold">The Impact</h3>
                        <p className="text-xl text-text-muted leading-relaxed font-light opacity-90">{selectedItem.outcome}</p>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-4 space-y-12">
                     <div className="bg-white/5 p-10 rounded-[32px] border border-white/5 space-y-8">
                        <h4 className="text-xs uppercase font-black text-accent-purple tracking-[0.3em]">Tech Stack</h4>
                        <div className="flex flex-wrap gap-3">
                          {selectedItem.techStack?.map((tech, i) => (
                            <span key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold">{tech}</span>
                          ))}
                        </div>
                     </div>

                     {selectedItem.keyFeatures && selectedItem.keyFeatures.length > 0 && (
                        <div className="bg-accent-blue/5 p-10 rounded-[32px] border border-accent-blue/10 space-y-6">
                           <h4 className="text-xs uppercase font-black text-accent-blue tracking-[0.3em]">Key Features</h4>
                           <ul className="space-y-4">
                             {selectedItem.keyFeatures.map((feat, i) => (
                               <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                                 <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 flex-shrink-0"></span>
                                 {feat}
                               </li>
                             ))}
                           </ul>
                        </div>
                     )}
                  </div>
                </div>

                {/* Visual Showcase Gallery */}
                {selectedItem.galleryImages && selectedItem.galleryImages.length > 0 && (
                  <div className="space-y-12">
                    <h3 className="text-4xl font-display font-bold text-center">Visual <span className="text-accent-blue">Experience</span></h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       {selectedItem.galleryImages.map((img, idx) => (
                         <motion.div 
                           key={idx}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           className="group rounded-[40px] overflow-hidden border border-white/5 shadow-2xl relative"
                         >
                           <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={`Showcase ${idx}`} />
                           <div className="absolute inset-0 bg-accent-blue/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         </motion.div>
                       ))}
                    </div>
                  </div>
                )}

                {/* Video Presentation */}
                {selectedItem.videoUrl && (
                  <div className="space-y-10 pt-16 border-t border-white/5">
                    <h3 className="text-3xl font-display font-bold flex items-center gap-4 justify-center">
                      <PlayCircle className="text-accent-purple" size={32} /> Video Walkthrough
                    </h3>
                    <div className="aspect-video rounded-[48px] overflow-hidden border border-white/10 shadow-3xl bg-black">
                      <iframe 
                        src={getSafeVideoUrl(selectedItem.videoUrl)} 
                        className="w-full h-full" 
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                {/* Master Call to Action */}
                <div className="py-20 text-center space-y-10 bg-gradient-to-t from-accent-blue/10 to-transparent rounded-[60px] border border-accent-blue/10">
                   <div className="max-w-2xl mx-auto space-y-6">
                      <h3 className="text-4xl font-display font-black tracking-tight tracking-tighter">Ready to build your <span className="text-accent-blue font-black">next vision?</span></h3>
                      <p className="text-text-muted opacity-70">Experience the live deployment of this system or initiate a consultation for your own project.</p>
                   </div>
                   <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                     <a href={selectedItem.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 bg-white text-black px-12 py-5 rounded-full font-black text-xl hover:scale-110 transition-all shadow-[0_20px_60px_rgba(255,255,255,0.15)] active:scale-95 group">
                       Launch Experience <Rocket size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </a>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
