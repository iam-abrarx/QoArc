"use client";

import React from 'react';
import Link from 'next/link';
import { Rocket, ArrowRight, Zap, Globe, Beaker, Brain, Bolt, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';

const fadeInUp: any = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { 
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  },
  viewport: { once: true }
};

export default function Home() {
  const { portfolioItems } = usePortfolio();

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
            <Link href="/services" className="w-full sm:w-auto glass px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center">
              Explore Services
            </Link>
          </motion.div>
        </div>

        {/* Background Blobs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
      </section>

      {/* Services Preview */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <motion.div {...fadeInUp}>
              <h2 className="text-sm font-bold uppercase tracking-widest text-accent-blue mb-4">Core Capabilities</h2>
              <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Intelligent Solutions</h3>
            </motion.div>
            <Link href="/services" className="text-accent-blue font-bold flex items-center gap-2 hover:gap-4 transition-all">
              View All Services <ArrowRight size={20} />
            </Link>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
          >
            {[
              { title: 'AI Automation', icon: <Zap className="text-accent-blue" />, desc: 'Automate complex business processes with custom AI agents and intelligent workflows.' },
              { title: 'Web Apps', icon: <Globe className="text-accent-purple" />, desc: 'Scalable, high-performance web applications built with modern frameworks and robust backends.' },
              { title: 'QoArc Lab', icon: <Beaker className="text-accent-blue" />, desc: 'Research-driven innovation exploring the frontiers of AI and computer science.' }
            ].map((service, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="group p-8 rounded-[32px] bg-bg-card border border-white/5 hover:border-accent-blue/50 transition-all duration-500"
              >
                <div className="w-14 h-14 bg-accent-blue/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h4 className="text-2xl font-display font-bold mb-4">{service.title}</h4>
                <p className="text-text-muted leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Featured Projects */}
          <div className="border-t border-white/5 pt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <motion.div {...fadeInUp}>
                <h2 className="text-sm font-bold uppercase tracking-widest text-accent-blue mb-4">Showcase</h2>
                <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Featured Projects</h3>
              </motion.div>
              <Link href="/portfolio" className="text-accent-blue font-bold flex items-center gap-2 hover:gap-4 transition-all">
                Explore Portfolio <ArrowRight size={20} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolioItems.slice(0, 2).map((item) => (
                <motion.div 
                  key={item.id}
                  {...fadeInUp}
                  className="group relative bg-bg-card border border-white/5 rounded-3xl overflow-hidden hover:border-accent-blue/30 transition-all duration-500"
                >
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img src={item.imageUrl} alt={item.name} 
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent opacity-60"></div>
                  </div>
                  <div className="p-8">
                    <h4 className="text-2xl font-bold mb-3 group-hover:text-accent-blue transition-colors">{item.name}</h4>
                    <p className="text-text-muted mb-6 line-clamp-2">
                      {item.description}
                    </p>
                    <Link href={`/portfolio?id=${item.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-accent-blue group-hover:gap-4 transition-all">
                      Learn More <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lab Highlight */}
      <section className="py-24 px-6 bg-accent-blue/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight mb-8">Where Research Meets <span className="text-gradient-blue">Reality</span></h2>
              <p className="text-xl text-text-muted mb-10 leading-relaxed">
                QoArc Lab is our innovation engine. We don't just use technology; we advance it through rigorous research and experimental development.
              </p>
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-blue/20 flex items-center justify-center shrink-0">
                    <Beaker size={16} className="text-accent-blue" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">PFAS Discovery Engine</h5>
                    <p className="text-sm text-text-muted">High-throughput screening of molecules using GNN-driven safety models.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-purple/20 flex items-center justify-center shrink-0">
                    <Brain size={16} className="text-accent-purple" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">Dual Brain Architecture</h5>
                    <p className="text-sm text-text-muted">A hybrid AI model trained on Tox21/ChEMBL chemical physics data.</p>
                  </div>
                </div>
              </div>
              <Link href="/lab" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-accent-blue hover:text-white transition-all">
                Explore PFAS Research <Beaker size={20} />
              </Link>
            </motion.div>
            
            <motion.div {...fadeInUp} className="relative">
              <div className="aspect-video rounded-[40px] bg-bg-card border border-white/10 p-1 overflow-hidden glow-blue">
                <div className="w-full h-full rounded-[38px] bg-gradient-to-br from-zinc-900 to-black p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="font-mono text-[10px] text-accent-blue">LAB_SESSION_042</div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="font-mono text-sm text-text-muted space-y-2">
                    <p>&gt; Initializing GNN_Dual_Brain...</p>
                    <p>&gt; Loading dataset: Tox21_ChEMBL_PFAS</p>
                    <p>&gt; Screening epoch 42/100... [||||||||||] 94%</p>
                    <p className="text-accent-blue">&gt; Discovery complete. Unicorns found: 12</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <Bolt size={20} className="text-accent-blue" />
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest">Research Active</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-accent-blue to-accent-purple rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden glow-purple">
          <motion.div {...fadeInUp} className="relative z-10">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold mb-8 leading-tight">Case Study: PFAS Safety Discovery</h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              We developed a custom GNN-driven discovery engine to identify non-toxic "Unicorn" alternatives to persistent "Forever Chemicals".
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-5xl font-black mb-2">5M</div>
                <div className="text-xs uppercase tracking-widest font-bold opacity-70">Candidates Screened</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2">10/10</div>
                <div className="text-xs uppercase tracking-widest font-bold opacity-70">Safety Score</div>
              </div>
            </div>
            <Link href="/lab" className="inline-flex items-center gap-2 bg-white text-black px-12 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl">
              Read Full Case Study <Beaker size={24} />
            </Link>
          </motion.div>
          {/* Tech pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-grid"></div>
        </div>
      </section>
    </div>
  );
}
