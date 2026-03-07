"use client";

import React from 'react';
import Link from 'next/link';
import { Rocket, ArrowRight, Zap, Globe, Beaker, Brain, Bolt, ChevronRight, CheckCircle, Brush, Cloud, Layers, Users, Eye, Sparkles, ShieldCheck } from 'lucide-react';
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
            <Link href="/portfolio" className="w-full sm:w-auto glass px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center">
              Explore Portfolio
            </Link>
          </motion.div>
        </div>

        {/* Background Blobs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
      </section>

      {/* ─── Services Section ─── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <motion.div {...fadeInUp}>
              <h2 className="text-sm font-bold uppercase tracking-widest text-accent-blue mb-4">Our Expertise</h2>
              <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Premium <span className="text-gradient-blue">Services</span></h3>
            </motion.div>
            <Link href="/services" className="text-accent-blue font-bold flex items-center gap-2 hover:gap-4 transition-all">
              View All Services <ArrowRight size={20} />
            </Link>
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

      {/* ─── Featured Projects ─── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
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
                className="group relative bg-bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-accent-blue/30 transition-all duration-500"
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img src={item.imageUrl} alt={item.name} 
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131618] to-transparent opacity-60"></div>
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-bold mb-2 group-hover:text-accent-blue transition-colors">{item.name}</h4>
                  <p className="text-text-muted text-sm mb-4 line-clamp-2">{item.description}</p>
                  <Link href={`/portfolio?id=${item.id}`} className="inline-flex items-center gap-2 text-xs font-bold text-accent-blue uppercase tracking-widest group-hover:gap-3 transition-all">
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About Section ─── */}
      <section className="py-24 px-6 bg-white/[0.01]">
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
    </div>
  );
}
