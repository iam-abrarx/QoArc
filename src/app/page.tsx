"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Rocket, ArrowRight, Zap, Globe, Beaker, Brain, Bolt, ChevronRight, 
  CheckCircle, Brush, Cloud, Layers, Users, Eye, Sparkles, ShieldCheck,
  X, PlayCircle, Edit3, AlertCircle, CheckCircle2, Cpu, LayoutGrid, Image, Quote, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';
import { PortfolioItem } from '@/lib/portfolio';

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

function PsychologyIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 8.105 4 4 0 0 0 8 0 4 4 0 0 0 .52-8.105 4 4 0 0 0-2.526-5.77A3 3 0 1 0 12 5z" />
      <path d="M9 13a4.5 4.5 0 0 0 3-4" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4" />
      <path d="M12 9v10" />
    </svg>
  );
}

export default function Home() {
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

  // 5 items make up 2 rows (lg:col-span-2 combined with lg:col-span-1)
  const [visibleRows, setVisibleRows] = useState(2);
  const visibleItemsCount = Math.floor(visibleRows / 2) * 5 + (visibleRows % 2 === 1 ? 2 : 0);
  const displayItems = filteredItems.slice(0, visibleItemsCount);
  const hasMore = visibleItemsCount < filteredItems.length;

  // Reset to 2 rows when filter changes
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

  const services = [
    {
      title: 'Web Design & Development',
      description: 'Bespoke digital experiences engineered for maximum performance and conversion.',
      icon: <Brush className="text-accent-blue" size={28} />,
      accent: 'blue',
      features: ['UI/UX Strategy', 'Responsive Systems', 'Brand Identity', 'Performance Audit']
    },
    {
      title: 'AI Automation Solutions',
      description: 'Leverage Generative AI to automate tasks, gain insights, and provide intelligent support.',
      icon: <PsychologyIcon className="text-accent-purple" size={28} />,
      accent: 'purple',
      features: ['Custom AI Agents', 'Workflow Automation', 'Data Intelligence', 'Smart Chatbots']
    },
    {
      title: 'SaaS Development',
      description: 'End-to-end scalable Software-as-a-Service platforms, from architecture to deployment.',
      icon: <Cloud className="text-accent-blue" size={28} />,
      accent: 'blue',
      features: ['Multi-tenant Arch', 'Cloud Infrastructure', 'API Ecosystems', 'Subscription Logic']
    },
    {
      title: 'Custom Tech Solutions',
      description: 'Unique business challenges require unique software tailored to your operational needs.',
      icon: <Layers className="text-accent-purple" size={28} />,
      accent: 'purple',
      features: ['Legacy Migration', 'System Integration', 'Data Pipelines', 'Security Audits']
    }
  ];

  return (
    <div className="bg-grid min-h-screen">
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent-blue text-xs font-bold uppercase tracking-widest mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse"></span>
            The Future of Digital Systems
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-7xl md:text-9xl font-display font-extrabold tracking-tighter leading-[0.85] mb-8"
          >
            Building <span className="text-gradient-blue">Intelligent</span><br/>Digital Systems
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-text-muted mb-12 leading-relaxed"
          >
            Web. AI. Automation. Research. We craft high-performance solutions that scale with your vision.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/contact" className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl shadow-white/10 flex items-center justify-center gap-2">
              Start Your Project <Rocket size={20} />
            </Link>
            <a href="#portfolio" className="w-full sm:w-auto glass px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center">
              Explore Portfolio
            </a>
          </motion.div>
        </div>

        {/* Background Blobs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
      </section>

      {/* ─── Services Section ─── */}
      <section id="services" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <motion.div {...fadeInUp}>
              <h2 className="text-sm font-bold uppercase tracking-widest text-accent-blue mb-4">Our Expertise</h2>
              <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Premium <span className="text-gradient-blue">Services</span></h3>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                {...fadeInUp}
                className="group p-10 rounded-2xl bg-bg-card border border-white/5 hover:border-accent-blue/30 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="w-12 h-12 bg-white/[0.04] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h4 className="text-xl font-display font-bold mb-3">{service.title}</h4>
                <p className="text-text-muted text-sm leading-relaxed mb-6">{service.description}</p>
                <ul className="grid grid-cols-2 gap-3 text-xs font-medium text-white/60">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-1.5">
                      <CheckCircle className="text-accent-blue" size={12} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Portfolio / Showcase Section ─── */}
      <section id="portfolio" className="py-24 px-6 border-t border-white/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="mb-10">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-blue mb-4">Our Work</h2>
            <h3 className="text-4xl md:text-6xl font-display font-black mb-5 tracking-tighter leading-[1.1]">
              Selected <span className="text-gradient-blue text-transparent bg-clip-text">Projects</span>
            </h3>
            <p className="text-base text-text-muted max-w-xl leading-relaxed opacity-70">
              Crafting high-performance digital systems for global organizations.
            </p>
          </motion.div>

          {/* Filter Tabs */}
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

      {/* ─── About Section ─── */}
      <section id="about" className="py-24 px-6 bg-white/[0.01] border-t border-white/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div {...fadeInUp}>
              <h2 className="text-sm font-bold uppercase tracking-widest text-accent-blue mb-4">Our Story</h2>
              <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">Visionary <span className="text-gradient-blue">Team</span></h3>
              <p className="text-lg text-text-muted leading-relaxed mb-8">
                QoArc Studio was founded on the belief that technology should be as intuitive as it is powerful. We are a collective of designers, engineers, and researchers dedicated to building the future of digital systems.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-3xl font-bold mb-1">3+</h4>
                  <p className="text-xs text-text-muted uppercase tracking-widest font-bold">Projects Delivered</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold mb-1">6</h4>
                  <p className="text-xs text-text-muted uppercase tracking-widest font-bold">Core Researchers</p>
                </div>
              </div>
            </motion.div>
            <motion.div {...fadeInUp} className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 border border-white/10 p-12 flex items-center justify-center">
                <div className="text-center">
                  <Users size={64} className="text-white mb-4 mx-auto" strokeWidth={1.5} />
                  <div className="text-xl font-display font-bold">Driven by Innovation</div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-blue/20 rounded-full blur-3xl animate-pulse"></div>
            </motion.div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Our Mission', desc: 'To empower businesses with intelligent digital systems that provide practical problem solutions and drive sustainable growth.', icon: <Eye className="text-accent-blue" /> },
              { title: 'Our Vision', desc: 'To be the global leader in research-driven AI and automation solutions, shaping the future of technology.', icon: <Sparkles className="text-accent-purple" /> },
              { title: 'Core Values', desc: 'Excellence, Integrity, Innovation, and a relentless focus on delivering measurable value to our partners.', icon: <ShieldCheck className="text-accent-blue" /> }
            ].map((value, i) => (
              <motion.div key={i} {...fadeInUp} className="p-6 rounded-2xl bg-bg-card border border-white/5">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h4 className="text-lg font-bold mb-2">{value.title}</h4>
                <p className="text-text-muted text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact CTA ─── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-accent-blue to-accent-purple rounded-2xl p-12 md:p-20 text-center relative overflow-hidden">
          <motion.div {...fadeInUp} className="relative z-10">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">Ready to Build Your <br/>Next Vision?</h2>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
              Let's turn your idea into a high-performance digital product. From concept to launch, we've got you covered.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-black px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl">
              Start a Conversation <Rocket size={20} />
            </Link>
          </motion.div>
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-grid"></div>
        </div>
      </section>

      {/* ─── Case Study Modal (Shared from Portfolio) ─── */}
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
                  {selectedItem.challenge && (
                    <div id="chapter-challenge" className="space-y-4 scroll-mt-20">
                      <h3 className="text-lg font-display font-bold flex items-center gap-2">
                        <AlertCircle size={16} className="text-red-400" /> The Challenge
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed opacity-80">{selectedItem.challenge}</p>
                    </div>
                  )}

                  {/* Solution */}
                  {selectedItem.solution && (
                    <div id="chapter-solution" className="space-y-4 scroll-mt-20">
                      <h3 className="text-lg font-display font-bold flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-accent-blue" /> The Solution
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed opacity-80">{selectedItem.solution}</p>
                    </div>
                  )}

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
                    {selectedItem.techStack && selectedItem.techStack.length > 0 && (
                      <div className="bg-white/[0.02] p-6 rounded-xl border border-white/[0.04] space-y-4">
                        <h4 className="text-[10px] uppercase font-black text-accent-purple tracking-[0.2em]">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.techStack.map((tech, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[10px] font-bold">{tech}</span>
                          ))}
                        </div>
                      </div>
                    )}
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
