"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle, ArrowRight, Edit3, AlertCircle, CheckCircle2, Rocket, Cpu, LayoutGrid, Image, Quote, ExternalLink, Sparkles } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { PortfolioItem } from '@/lib/portfolio';
import Link from 'next/link';

const fadeInUp: any = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }
};

const chapters = [
  { id: 'overview', label: 'Overview' },
  { id: 'challenge', label: 'Challenge' },
  { id: 'solution', label: 'Solution' },
  { id: 'features', label: 'Features' },
  { id: 'design', label: 'Design System' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'impact', label: 'Impact' },
];

export default function StudioPage() {
  const { portfolioItems } = usePortfolio();
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [filter, setFilter] = useState('All');
  const [activeChapter, setActiveChapter] = useState('overview');
  const [isAdmin] = useState(() => typeof window !== 'undefined' && localStorage.getItem('isAdmin') === 'true');
  const contentRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Web', 'App', 'AI & IoT', 'Branding'];
  const filteredItems = filter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  // Load more logic
  const [visibleRows, setVisibleRows] = useState(2);
  const visibleItemsCount = Math.floor(visibleRows / 2) * 5 + (visibleRows % 2 === 1 ? 2 : 0);
  const displayItems = filteredItems.slice(0, visibleItemsCount);
  const hasMore = visibleItemsCount < filteredItems.length;

  useEffect(() => {
    setVisibleRows(2);
  }, [filter]);

  const getSafeVideoUrl = (url: string | undefined) => {
    if (!url) return "";
    let embedUrl = url;
    if (url.includes('youtube.com/watch?v=')) embedUrl = url.replace('watch?v=', 'embed/');
    else if (url.includes('youtu.be/')) embedUrl = url.replace('youtu.be/', 'youtube.com/embed/');
    else if (url.includes('vimeo.com/')) embedUrl = `https://player.vimeo.com/video/${url.split('/').pop()}`;
    return embedUrl;
  };

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(`chapter-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveChapter(id);
    }
  };

  useEffect(() => {
    if (!selectedItem || !contentRef.current) return;
    const container = contentRef.current;
    const handleScroll = () => {
      const sections = chapters.map(c => document.getElementById(`chapter-${c.id}`));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200) { setActiveChapter(chapters[i].id); break; }
        }
      }
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [selectedItem]);

  return (
    <div className="bg-grid min-h-screen bg-surface">
      <section className="pt-48 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="mb-20">
            <h1 className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-6">Our Work</h1>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium mb-8 tracking-tighter leading-[1.1] text-primary">
              Studio <span className="italic font-normal">Showcase</span>
            </h2>
            <p className="text-lg text-text-muted max-w-2xl leading-relaxed font-sans opacity-80">
              Architectural digital experiences engineered for institutional authority. We prioritize white space as a functional element.
            </p>
          </motion.div>

          {/* Filter Tabs — Editorial Style */}
          <div className="flex flex-wrap gap-4 mb-20 border-b border-outline-variant/10 pb-8">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${
                  filter === cat 
                    ? 'bg-primary text-white shadow-xl shadow-primary/20' 
                    : 'bg-surface-container-low text-text-muted hover:bg-surface-container-lowest border border-outline-variant/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Grid — Premium Tonal Shift */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayItems.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                onClick={() => { setSelectedItem(item); setActiveChapter('overview'); document.body.style.overflow = 'hidden'; }}
                className={`group relative bg-surface-container-lowest border border-outline-variant/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 ease-out cursor-pointer ${idx % 5 === 0 ? 'lg:col-span-2' : ''}`}
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-1000 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent opacity-60"></div>
                  
                  {item.isFeatured && (
                    <div className="absolute top-6 left-6 bg-primary text-white px-4 py-1.5 rounded-md z-10 shadow-lg">
                      <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Sparkles size={12} /> Featured</span>
                    </div>
                  )}

                  {item.client && (
                    <div className="absolute bottom-6 left-6 bg-surface/40 backdrop-blur-md border border-outline-variant/10 px-4 py-2 rounded-md">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{item.client}</span>
                    </div>
                  )}

                  {isAdmin && (
                    <Link href={`/admin?edit=${item.id}`} onClick={(e) => e.stopPropagation()}
                      className="absolute top-6 right-6 z-20 w-10 h-10 rounded-lg bg-surface-container-low border border-outline-variant/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-md">
                      <Edit3 size={14} />
                    </Link>
                  )}
                </div>

                <div className="p-10 relative">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-secondary px-3 py-1 rounded bg-secondary/5 border border-secondary/10">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-display font-medium mb-4 text-primary group-hover:text-primary transition-colors duration-500">{item.name}</h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-8 opacity-70 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-outline-variant/5">
                    <div className="inline-flex items-center gap-3 text-[10px] font-bold text-primary uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
                      View Case Study <ArrowRight size={12} />
                    </div>
                    {item.year && <span className="text-[10px] text-text-muted opacity-40 font-mono tracking-widest">{item.year}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {hasMore && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-24 text-center"
            >
              <button 
                onClick={() => setVisibleRows(prev => prev + 1)}
                className="inline-flex items-center gap-4 bg-surface-container-low text-primary px-12 py-5 rounded-lg font-bold text-sm uppercase tracking-[0.2em] hover:bg-surface-container-lowest transition-all border border-outline-variant/10 shadow-sm"
              >
                Load More Projects
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Case Study Modal — Premium Light Mode */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[60]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-surface/98 backdrop-blur-3xl" 
              onClick={() => { setSelectedItem(null); document.body.style.overflow = 'auto'; }}
            />
            
            <motion.div 
              initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 60 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="relative w-full h-full flex"
            >
              {/* Left Chapter Navigation */}
              <div className="hidden lg:flex flex-col w-64 border-r border-outline-variant/10 bg-surface/80 backdrop-blur-3xl pt-32 px-6 flex-shrink-0">
                <button onClick={() => { setSelectedItem(null); document.body.style.overflow = 'auto'; }}
                  className="mb-12 w-10 h-10 rounded-lg bg-surface-container-low border border-outline-variant/15 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-primary shadow-sm">
                  <X size={18} />
                </button>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 mb-6 px-3">Chapters</p>
                <nav className="space-y-1">
                  {chapters.map((ch) => (
                    <button key={ch.id} onClick={() => scrollToChapter(ch.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-xs tracking-wider transition-all ${
                        activeChapter === ch.id
                          ? 'bg-primary text-white font-bold shadow-lg shadow-primary/10'
                          : 'text-text-muted hover:text-primary hover:bg-surface-container-low'
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </nav>
                <div className="mt-auto pb-12">
                  <a href={selectedItem.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-primary text-white text-[10px] font-bold uppercase tracking-widest hover:scale-[1.03] transition-transform shadow-xl shadow-primary/20">
                    <ExternalLink size={14} /> Launch Site
                  </a>
                </div>
              </div>

              {/* Right Scrollable Content */}
              <div ref={contentRef} className="flex-1 overflow-y-auto custom-scrollbar bg-surface/50">
                {/* Mobile Close */}
                <div className="lg:hidden sticky top-0 z-20 p-6 flex justify-between items-center bg-surface/90 backdrop-blur-xl border-b border-outline-variant/10">
                  <span className="text-sm font-bold truncate text-primary uppercase tracking-widest">{selectedItem.name}</span>
                  <button onClick={() => { setSelectedItem(null); document.body.style.overflow = 'auto'; }}
                    className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary"><X size={18} /></button>
                </div>

                {/* Hero */}
                <div className="relative aspect-[21/9] overflow-hidden" id="chapter-overview">
                  <img src={selectedItem.heroImage || selectedItem.imageUrl} className="w-full h-full object-cover" alt={selectedItem.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent"></div>
                  <div className="absolute bottom-12 left-12 right-12 md:left-20 md:right-20">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="px-4 py-1.5 rounded-md bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em]">{selectedItem.category}</span>
                      <span className="text-primary/60 text-[10px] font-bold uppercase tracking-[0.2em] font-mono">{selectedItem.year}</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-display font-medium tracking-tighter mb-6 text-primary">{selectedItem.name}</h2>
                    <p className="text-lg md:text-xl text-text-muted max-w-3xl font-sans opacity-90 leading-relaxed">{selectedItem.description}</p>
                  </div>
                </div>

                <div className="p-12 md:p-20 space-y-24 max-w-6xl">
                  {/* Data Matrix */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-12 border-y border-outline-variant/10">
                    {[
                      { label: 'Client', value: selectedItem.client },
                      { label: 'Industry', value: selectedItem.industry },
                      { label: 'Timeline', value: selectedItem.duration || selectedItem.timeline },
                      { label: 'Platform', value: selectedItem.platform }
                    ].map((stat, i) => (
                      <div key={i}>
                        <p className="text-[10px] uppercase font-bold text-primary opacity-40 tracking-[0.3em] mb-2">{stat.label}</p>
                        <p className="text-lg font-display font-medium text-primary">{stat.value || '—'}</p>
                      </div>
                    ))}
                  </div>

                  {/* Challenge */}
                  <div id="chapter-challenge" className="space-y-6 scroll-mt-32">
                    <h3 className="text-xs uppercase font-bold tracking-[0.4em] text-primary flex items-center gap-3">
                      <AlertCircle size={14} className="text-secondary" /> The Challenge
                    </h3>
                    <p className="text-xl text-text-muted leading-relaxed font-sans opacity-80">{selectedItem.challenge}</p>
                  </div>

                  {/* Solution */}
                  <div id="chapter-solution" className="space-y-6 scroll-mt-32">
                    <h3 className="text-xs uppercase font-bold tracking-[0.4em] text-primary flex items-center gap-3">
                      <CheckCircle2 size={14} className="text-primary" /> The Solution
                    </h3>
                    <p className="text-xl text-text-muted leading-relaxed font-sans opacity-80">{selectedItem.solution}</p>
                  </div>

                  {/* Key Features + Tech Stack */}
                  <div id="chapter-features" className="grid grid-cols-1 lg:grid-cols-2 gap-12 scroll-mt-32">
                    {selectedItem.keyFeatures && selectedItem.keyFeatures.length > 0 && (
                      <div className="bg-surface-container-low p-10 rounded-2xl border border-outline-variant/10 space-y-6 shadow-sm">
                        <h4 className="text-[10px] uppercase font-bold text-primary tracking-[0.3em]">Key Features</h4>
                        <ul className="space-y-4">
                          {selectedItem.keyFeatures.map((feat, i) => (
                            <li key={i} className="flex items-start gap-4 text-sm font-sans text-text-muted/90">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>{feat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="bg-surface-container-low p-10 rounded-2xl border border-outline-variant/10 space-y-8 shadow-sm">
                      <h4 className="text-[10px] uppercase font-bold text-secondary tracking-[0.3em]">Tech Stack</h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedItem.techStack?.map((tech, i) => (
                          <span key={i} className="px-4 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/15 text-[11px] font-bold text-primary tracking-wider">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Design System & Components */}
                  {selectedItem.uiComponents && selectedItem.uiComponents.length > 0 && (
                    <div id="chapter-design" className="space-y-8 scroll-mt-32">
                      <h3 className="text-xs uppercase font-bold tracking-[0.4em] text-primary flex items-center gap-3">
                        <LayoutGrid size={16} className="text-secondary" /> Digital Architecture
                      </h3>
                      {selectedItem.designDirection && (
                        <p className="text-lg text-text-muted/70 leading-relaxed italic border-l-4 border-outline-variant/20 pl-6 font-sans">{selectedItem.designDirection}</p>
                      )}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                        {selectedItem.uiComponents.map((comp, i) => (
                          <div key={i} className="bg-surface-container-low border border-outline-variant/10 rounded-xl px-6 py-4 flex items-center justify-center gap-3 shadow-sm group hover:border-primary transition-colors">
                            <Cpu size={14} className="text-secondary/60 flex-shrink-0" />
                            <span className="text-[11px] font-bold text-primary uppercase tracking-widest">{comp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Gallery */}
                  {selectedItem.galleryImages && selectedItem.galleryImages.length > 0 && (
                    <div id="chapter-gallery" className="space-y-8 scroll-mt-32">
                      <h3 className="text-xs uppercase font-bold tracking-[0.4em] text-primary flex items-center gap-3">
                        <Image size={16} className="text-primary" /> Gallery
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {selectedItem.galleryImages.map((img, idx) => (
                          <div key={idx} className="group rounded-2xl overflow-hidden border border-outline-variant/10 relative shadow-md">
                            <img src={img} className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-1000" alt={`Showcase ${idx}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Video */}
                  {selectedItem.videoUrl && (
                    <div className="space-y-8">
                      <h3 className="text-xs uppercase font-bold tracking-[0.4em] text-primary flex items-center gap-3">
                        <PlayCircle size={16} className="text-secondary" /> Video Walkthrough
                      </h3>
                      <div className="aspect-video rounded-3xl overflow-hidden border border-outline-variant/10 bg-black shadow-2xl">
                        <iframe src={getSafeVideoUrl(selectedItem.videoUrl)} className="w-full h-full" allowFullScreen />
                      </div>
                    </div>
                  )}

                  {/* Impact + Testimonial */}
                  <div id="chapter-impact" className="space-y-12 scroll-mt-32">
                    {selectedItem.outcome && (
                      <div className="space-y-6">
                        <h3 className="text-3xl font-display font-medium text-primary tracking-tight">The Impact</h3>
                        <p className="text-xl text-text-muted leading-relaxed font-sans opacity-80">{selectedItem.outcome}</p>
                        {selectedItem.impact && (
                          <div className="bg-primary/[0.03] border border-primary/10 rounded-2xl p-8 shadow-sm">
                            <p className="text-lg font-bold text-primary tracking-tight italic">"{selectedItem.impact}"</p>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedItem.testimonial && (
                      <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-10 space-y-6 shadow-sm">
                        <Quote size={24} className="text-secondary/30" />
                        <p className="text-2xl font-display font-medium text-primary italic leading-relaxed">"{selectedItem.testimonial.quote}"</p>
                        <div className="pt-6 border-t border-outline-variant/10">
                          <p className="text-sm font-bold text-primary uppercase tracking-widest">{selectedItem.testimonial.author}</p>
                          <p className="text-xs text-text-muted mt-1 uppercase tracking-[0.2em]">{selectedItem.testimonial.role}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="py-20 text-center space-y-8 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl border border-primary/10 shadow-sm relative overflow-hidden">
                    <h3 className="text-4xl md:text-5xl font-display font-medium tracking-tighter text-primary">Ready to build your <span className="italic font-normal">next vision?</span></h3>
                    <a href={selectedItem.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-4 bg-primary text-white px-12 py-5 rounded-lg font-bold text-sm uppercase tracking-[0.2em] hover:scale-[1.03] transition-all shadow-2xl shadow-primary/20 group">
                      Launch Experience <Rocket size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <Sparkles size={120} className="text-primary" strokeWidth={1} />
                    </div>
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
