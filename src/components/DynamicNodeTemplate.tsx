"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  Zap, 
  Globe, 
  Cpu, 
  ShieldCheck,
  Layers,
  Search,
  Database,
  Smartphone,
  Eye,
  MessageSquare,
  BarChart,
  Bot,
  Activity,
  TrendingUp,
  Heart,
  Building,
  ShoppingCart,
  Plane,
  Scale,
  Users,
  Sprout
} from 'lucide-react';
import Link from 'next/link';

const IconMap: Record<string, any> = {
  Zap, Sparkles, Terminal, Globe, Cpu, ShieldCheck, Layers, Search, Database, 
  Smartphone, Eye, MessageSquare, BarChart, Bot, Activity, TrendingUp, 
  Heart, Building, ShoppingCart, Plane, Scale, Users, Sprout
};

interface NodeContent {
  title: string;
  category: string;
  desc: string;
  techStack: string[];
  features: { title: string; desc: string; icon: string }[];
  visual: string;
  secondaryImage?: string;
  stats?: { label: string; value: string }[];
}

export default function DynamicNodeTemplate({ content }: { content: NodeContent }) {
  return (
    <main className="pt-32 bg-white selection:bg-primary selection:text-white">
      {/* Hero Section */}
      <section className="px-8 py-24 md:py-40">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-precision text-primary/40 flex items-center gap-4"
            >
              <div className="w-10 h-[0.5px] bg-primary/20"></div>
              {content.category}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl md:text-9xl font-display font-medium text-primary tracking-tight leading-none italic"
            >
              {content.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 1 ? 'opacity-40' : ''}>
                  {word} {i === content.title.split(' ').length - 1 ? '' : <br className="hidden md:block" />}
                </span>
              ))}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-primary/60 font-sans italic leading-relaxed max-w-xl border-l-[0.5px] border-primary/20 pl-8"
            >
              {content.desc}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              {content.techStack.map((tech) => (
                <span key={tech} className="px-5 py-2.5 rounded-none bg-surface-container-low border border-primary/5 text-[10px] font-bold uppercase tracking-widest text-primary/60">
                  {tech}
                </span>
              ))}
            </motion.div>

            {content.stats && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-10 border-t border-primary/5"
              >
                {content.stats.map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-primary/30">{stat.label}</div>
                    <div className="text-xl font-display italic text-primary">{stat.value}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-none overflow-hidden shadow-premium relative group">
              <img src={content.visual} alt={content.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-20"></div>
              <div className="absolute inset-0 bg-grid opacity-10"></div>
            </div>
            
            {/* Absolute CAD elements */}
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-surface rounded-none border border-primary/10 shadow-sharp p-10 hidden md:flex flex-col justify-between italic">
               <div className="text-precision text-primary/20 uppercase">Node Deployment Status</div>
               <div className="text-4xl font-display text-primary">Active.</div>
               <div className="w-full h-[0.5px] bg-primary/10"></div>
               <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter opacity-40">
                  <span>Latency: &lt; 5ms</span>
                  <span>Sovereign: 100%</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technical Infrastructure - New Section */}
      {content.secondaryImage && (
        <section className="px-8 py-40 bg-primary overflow-hidden relative">
          <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10 order-2 lg:order-1"
            >
              <h2 className="text-precision text-white/40 uppercase">Technical Infrastructure</h2>
              <h3 className="text-5xl md:text-7xl font-display italic text-white leading-tight">
                Hardened <span className="opacity-40 text-white">Engineering</span> Foundations.
              </h3>
              <p className="text-xl text-white/60 font-sans italic leading-relaxed border-l-[0.5px] border-white/20 pl-8">
                Our approach to {content.title} focuses on deterministic outcomes, utilizing distributed systems that guarantee data sovereignty and absolute operational continuity.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="p-8 rounded-none bg-white/5 border border-white/10 backdrop-blur-md">
                  <Terminal className="text-white/40 mb-4" size={24} />
                  <div className="text-white font-bold text-sm uppercase tracking-widest mb-2">Protocol</div>
                  <div className="text-white/60 text-xs leading-relaxed">End-to-end encrypted signals via sovereign bridge nodes.</div>
                </div>
                <div className="p-8 rounded-none bg-white/5 border border-white/10 backdrop-blur-md">
                  <Database className="text-white/40 mb-4" size={24} />
                  <div className="text-white font-bold text-sm uppercase tracking-widest mb-2">Storage</div>
                  <div className="text-white/60 text-xs leading-relaxed">Geographically distributed shards with real-time consensus.</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="aspect-video rounded-none overflow-hidden border border-white/10 shadow-sharp relative group">
                <img src={content.secondaryImage} alt="Technical Infrastructure" className="w-full h-full object-cover grayscale opacity-60 transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-grid opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-none blur-[120px]"></div>
        </section>
      )}

      {/* Features Grid */}
      <section className="px-8 py-40 bg-surface-container-lowest cad-line">
        <div className="max-w-screen-2xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-precision uppercase opacity-40">Architectural Depth</h2>
            <h3 className="text-5xl font-display font-medium italic text-primary">Core Operational Capabilities.</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.features.map((f, i) => {
              const Icon = IconMap[f.icon] || Zap;
              return (
                <motion.div 
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-10 rounded-none bg-white border border-primary/5 hover:border-primary/20 transition-all group hover:shadow-sharp"
                >
                  <div className="w-12 h-12 rounded-none bg-surface-container-low border border-primary/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                    <Icon size={18} />
                  </div>
                  <h4 className="text-2xl font-display italic text-primary mb-4">{f.title}</h4>
                  <p className="text-md text-primary/60 leading-relaxed font-sans">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-40 overflow-hidden relative bg-primary">
         <div className="max-w-screen-xl mx-auto text-center space-y-12 relative z-10">
            <h2 className="text-6xl md:text-8xl font-display italic text-white leading-none">
               Ready to architect <br /> <span className="opacity-40">this node?</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto italic">
               Initiate a technical scoping session to define requirements and deterministic outcome paths for your {content.title} project.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
               <button className="bg-white text-primary px-12 py-5 rounded-none font-bold uppercase tracking-widest text-[11px] hover:shadow-2xl transition-all hover:scale-105">
                  Start Project Node
               </button>
               <button className="bg-white/10 text-white border border-white/20 backdrop-blur-md px-12 py-5 rounded-none font-bold uppercase tracking-widest text-[11px] hover:bg-white/20 transition-all">
                  Full Capabilities Guide
               </button>
            </div>
         </div>
         <div className="absolute inset-0 bg-grid opacity-10"></div>
      </section>
    </main>
  );
}
