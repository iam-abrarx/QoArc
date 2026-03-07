"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle, ArrowRight, Edit3, AlertCircle, CheckCircle2, Rocket, Cpu, LayoutGrid, Image, Quote, ExternalLink } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { PortfolioItem } from '@/lib/portfolio';
import Link from 'next/link';

const fadeInUp: any = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.17, 0.55, 0.55, 1] }
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
    <div className="bg-grid min-h-screen">
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="mb-10">
            <h1 className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-blue mb-4">Our Work</h1>
            <h2 className="text-4xl md:text-6xl font-display font-black mb-5 tracking-tighter leading-[1.1]">
              <span className="text-gradient-blue text-transparent bg-clip-text">Studio</span> Showcase
            </h2>
            <p className="text-base text-text-muted max-w-xl leading-relaxed opacity-70">
              Crafting high-performance digital systems for global organizations.
            </p>
          </motion.div>

          {/* Filter Tabs — Compact */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${
                  filter === cat 
                    ? 'bg-accent-blue border-accent-blue/50 text-white shadow-lg shadow-accent-blue/10' 
                    : 'bg-white/[0.03] border-white/[0.06] text-text-muted hover:border-white/15 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Grid — Tight Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayItems.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.06 }}
                onClick={() => { setSelectedItem(item); setActiveChapter('overview'); document.body.style.overflow = 'hidden'; }}
                className={`group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-accent-blue/20 transition-all duration-500 cursor-pointer ${idx % 5 === 0 ? 'lg:col-span-2' : ''}`}
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131618] via-[#131618]/30 to-transparent opacity-80"></div>
                  
                  {item.isFeatured && (
                    <div className="absolute top-4 left-4 bg-accent-blue text-white px-3 py-1 rounded-md z-10">
                      <span className="text-[8px] font-black uppercase tracking-widest">Featured</span>
                    </div>
                  )}

                  {item.client && (
                    <div className="absolute bottom-4 left-4 bg-white/[0.06] backdrop-blur-md border border-white/[0.08] px-3 py-1.5 rounded-md">
                      <span className="text-[9px] font-bold text-white/70 uppercase tracking-[0.15em]">{item.client}</span>
                    </div>
                  )}

                  {isAdmin && (
                    <Link href={`/admin?edit=${item.id}`} onClick={(e) => e.stopPropagation()}
                      className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg bg-accent-blue/15 backdrop-blur-md border border-accent-blue/20 text-accent-blue flex items-center justify-center hover:bg-accent-blue hover:text-white transition-all">
                      <Edit3 size={12} />
                    </Link>
                  )}
                </div>

                <div className="p-6 relative">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="text-[8px] font-black uppercase tracking-widest text-accent-purple px-2 py-0.5 rounded bg-accent-purple/[0.06] border border-accent-purple/[0.08]">
                      {item.category}
                    </span>
                    {item.techStack?.slice(0, 2).map((tech, i) => (
                      <span key={i} className="text-[8px] font-bold uppercase tracking-widest text-accent-blue/70 px-2 py-0.5 rounded bg-accent-blue/[0.04] border border-accent-blue/[0.06]">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2 group-hover:text-accent-blue transition-colors duration-300">{item.name}</h3>
                  <p className="text-text-muted text-xs leading-relaxed mb-4 opacity-60 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 text-[10px] font-bold text-accent-blue uppercase tracking-widest group-hover:gap-3 transition-all">
                      View Case Study <ArrowRight size={10} />
                    </div>
                    {item.year && <span className="text-[9px] text-text-muted/50 font-mono">{item.year}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {hasMore && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 text-center"
            >
              <button 
                onClick={() => setVisibleRows(prev => prev + 1)}
                className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] text-white/70 hover:text-white hover:bg-white/[0.06] hover:border-white/10 px-8 py-3.5 rounded-xl font-bold text-sm transition-all"
              >
                Load More Projects
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Case Study Modal — Full Screen with Chapter Nav */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[60]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#131618]/98 backdrop-blur-2xl" 
              onClick={() => { setSelectedItem(null); document.body.style.overflow = 'auto'; }}
            />
            
            <motion.div 
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              className="relative w-full h-full flex"
            >
              {/* Left Chapter Navigation */}
              <div className="hidden lg:flex flex-col w-52 border-r border-white/[0.04] bg-[#131618]/80 backdrop-blur-xl pt-28 px-4 flex-shrink-0">
                <button onClick={() => { setSelectedItem(null); document.body.style.overflow = 'auto'; }}
                  className="mb-8 w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center hover:bg-white/10 transition-colors text-white/50 hover:text-white">
                  <X size={14} />
                </button>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-accent-blue/50 mb-4 px-2">Chapters</p>
                <nav className="space-y-0.5">
                  {chapters.map((ch) => (
                    <button key={ch.id} onClick={() => scrollToChapter(ch.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                        activeChapter === ch.id
                          ? 'bg-accent-blue/10 text-accent-blue font-bold border border-accent-blue/15'
                          : 'text-text-muted/60 hover:text-white hover:bg-white/[0.03]'
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </nav>
                <div className="mt-auto pb-8">
                  <a href={selectedItem.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white text-black text-xs font-bold hover:scale-[1.02] transition-transform">
                    <ExternalLink size={12} /> Launch
                  </a>
                </div>
              </div>

              {/* Right Scrollable Content */}
              <div ref={contentRef} className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Mobile Close */}
                <div className="lg:hidden sticky top-0 z-20 p-4 flex justify-between items-center bg-[#131618]/90 backdrop-blur-xl border-b border-white/[0.04]">
                  <span className="text-sm font-bold truncate">{selectedItem.name}</span>
                  <button onClick={() => { setSelectedItem(null); document.body.style.overflow = 'auto'; }}
                    className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center"><X size={14} /></button>
                </div>

                {/* Hero */}
                <div className="relative aspect-[21/9] overflow-hidden" id="chapter-overview">
                  <img src={selectedItem.heroImage || selectedItem.imageUrl} className="w-full h-full object-cover" alt={selectedItem.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131618] via-[#131618]/50 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8 md:left-12 md:right-12">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-md bg-accent-blue text-white text-[9px] font-black uppercase tracking-widest">{selectedItem.category}</span>
                      <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{selectedItem.year}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter mb-3">{selectedItem.name}</h2>
                    <p className="text-sm md:text-base text-text-muted max-w-2xl font-light opacity-80 leading-relaxed">{selectedItem.description}</p>
                  </div>
                </div>

                <div className="p-6 md:p-12 space-y-16 max-w-5xl">
                  {/* Data Matrix */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-white/[0.04]">
                    {[
                      { label: 'Client', value: selectedItem.client },
                      { label: 'Industry', value: selectedItem.industry },
                      { label: 'Timeline', value: selectedItem.duration || selectedItem.timeline },
                      { label: 'Platform', value: selectedItem.platform }
                    ].map((stat, i) => (
                      <div key={i}>
                        <p className="text-[9px] uppercase font-black text-accent-blue/40 tracking-[0.2em] mb-1">{stat.label}</p>
                        <p className="text-sm font-bold">{stat.value || '—'}</p>
                      </div>
                    ))}
                  </div>

                  {/* Challenge */}
                  <div id="chapter-challenge" className="space-y-4 scroll-mt-20">
                    <h3 className="text-lg font-display font-bold flex items-center gap-2">
                      <AlertCircle size={16} className="text-red-400" /> The Challenge
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed opacity-80">{selectedItem.challenge}</p>
                  </div>

                  {/* Solution */}
                  <div id="chapter-solution" className="space-y-4 scroll-mt-20">
                    <h3 className="text-lg font-display font-bold flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-accent-blue" /> The Solution
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed opacity-80">{selectedItem.solution}</p>
                  </div>

                  {/* Key Features + Tech Stack */}
                  <div id="chapter-features" className="grid grid-cols-1 lg:grid-cols-2 gap-6 scroll-mt-20">
                    {selectedItem.keyFeatures && selectedItem.keyFeatures.length > 0 && (
                      <div className="bg-white/[0.02] p-6 rounded-xl border border-white/[0.04] space-y-4">
                        <h4 className="text-[10px] uppercase font-black text-accent-blue tracking-[0.2em]">Key Features</h4>
                        <ul className="space-y-2.5">
                          {selectedItem.keyFeatures.map((feat, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-text-muted/80">
                              <span className="w-1 h-1 rounded-full bg-accent-blue mt-1.5 flex-shrink-0"></span>{feat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="bg-white/[0.02] p-6 rounded-xl border border-white/[0.04] space-y-4">
                      <h4 className="text-[10px] uppercase font-black text-accent-purple tracking-[0.2em]">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.techStack?.map((tech, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[10px] font-bold">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* UI/UX Components Used */}
                  {selectedItem.uiComponents && selectedItem.uiComponents.length > 0 && (
                    <div id="chapter-design" className="space-y-4 scroll-mt-20">
                      <h3 className="text-lg font-display font-bold flex items-center gap-2">
                        <LayoutGrid size={16} className="text-accent-purple" /> Design System & Components
                      </h3>
                      {selectedItem.designDirection && (
                        <p className="text-xs text-text-muted/70 leading-relaxed italic border-l-2 border-accent-purple/20 pl-4">{selectedItem.designDirection}</p>
                      )}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                        {selectedItem.uiComponents.map((comp, i) => (
                          <div key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 flex items-center gap-2">
                            <Cpu size={12} className="text-accent-purple/60 flex-shrink-0" />
                            <span className="text-[10px] font-bold text-white/80">{comp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* System Architecture Diagram */}
                  {selectedItem.systemDiagram && (
                    <div id="chapter-architecture" className="space-y-4 scroll-mt-20">
                      <h3 className="text-lg font-display font-bold">System Architecture</h3>
                      <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02]">
                        <img src={selectedItem.systemDiagram} className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity" alt="System Architecture" />
                      </div>
                      {selectedItem.systemDiagramCaption && (
                        <p className="text-[10px] text-text-muted/50 font-mono text-center mt-2">{selectedItem.systemDiagramCaption}</p>
                      )}
                    </div>
                  )}

                  {/* Gallery */}
                  {selectedItem.galleryImages && selectedItem.galleryImages.length > 0 && (
                    <div id="chapter-gallery" className="space-y-4 scroll-mt-20">
                      <h3 className="text-lg font-display font-bold flex items-center gap-2">
                        <Image size={16} className="text-accent-blue" /> Visual Showcase
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedItem.galleryImages.map((img, idx) => (
                          <div key={idx} className="group rounded-xl overflow-hidden border border-white/[0.04] relative">
                            <img src={img} className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500" alt={`Showcase ${idx}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Video */}
                  {selectedItem.videoUrl && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-display font-bold flex items-center gap-2">
                        <PlayCircle size={16} className="text-accent-purple" /> Video Walkthrough
                      </h3>
                      <div className="aspect-video rounded-xl overflow-hidden border border-white/[0.06] bg-black">
                        <iframe src={getSafeVideoUrl(selectedItem.videoUrl)} className="w-full h-full" allowFullScreen />
                      </div>
                    </div>
                  )}

                  {/* Impact + Testimonial */}
                  <div id="chapter-impact" className="space-y-6 scroll-mt-20">
                    {selectedItem.outcome && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-display font-bold">The Impact</h3>
                        <p className="text-sm text-text-muted leading-relaxed opacity-80">{selectedItem.outcome}</p>
                        {selectedItem.impact && (
                          <div className="bg-accent-blue/[0.05] border border-accent-blue/10 rounded-xl p-4">
                            <p className="text-xs font-bold text-accent-blue">{selectedItem.impact}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedItem.testimonial && (
                      <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 space-y-3">
                        <Quote size={16} className="text-accent-purple/40" />
                        <p className="text-sm text-white/80 italic leading-relaxed">"{selectedItem.testimonial.quote}"</p>
                        <div>
                          <p className="text-xs font-bold">{selectedItem.testimonial.author}</p>
                          <p className="text-[10px] text-text-muted/50">{selectedItem.testimonial.role}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="py-12 text-center space-y-6 bg-gradient-to-t from-accent-blue/[0.06] to-transparent rounded-2xl border border-accent-blue/[0.06]">
                    <h3 className="text-2xl font-display font-black tracking-tighter">Ready to build your <span className="text-accent-blue">next vision?</span></h3>
                    <a href={selectedItem.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-white text-black px-8 py-3.5 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg group">
                      Launch Experience <Rocket size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
