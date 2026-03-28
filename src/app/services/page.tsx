"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Layers, 
  Workflow, 
  Activity, 
  Globe, 
  Terminal,
  Search,
  Zap
} from 'lucide-react';
import { useLeadCapture } from '@/context/LeadCaptureContext';

const fadeInUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true },
  transition: { duration: 0.8, delay: 0, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

const services = [
  {
    title: "AI Product Engineering",
    slug: "ai-integration",
    desc: "We build scalable, high-performing applications with embedded intelligence—from AI-native startups to enterprise solutions.",
    icon: <Sparkles size={18} />,
    items: [
      "Custom AI-Powered Platforms",
      "MVP & PoC Rapid Development",
      "Enterprise SaaS Architecture",
      "LLM & Third-Party Integrations"
    ]
  },
  {
    title: "Strategic AI Consulting",
    slug: "technical-consulting",
    desc: "Guiding organizations through the complexities of AI adoption, ROI validation, and long-term technical architecture.",
    icon: <Terminal size={18} />,
    items: [
      "AI Roadmap & Implementation Strategy",
      "Digital Transformation Advisory",
      "Sovereign Infrastructure Audits",
      "Security & Compliance Logic"
    ]
  },
  {
    title: "Intelligent Automation",
    slug: "automation",
    desc: "Transforming manual processes into autonomous, self-correcting workflows using advanced orchestration agents.",
    icon: <Workflow size={18} />,
    items: [
      "Process & Workflow Automation",
      "LLM-Orchestrated AI Agents",
      "Performance Node Optimization",
      "Data-Driven Operational Intelligence"
    ]
  },
  {
    title: "High-Performance R&D",
    slug: "web-mobile-development",
    desc: "Robust full-stack engineering paired with deep research to build products that define the next technical frontier.",
    icon: <Globe size={18} />,
    items: [
      "Modern Web & Mobile Clusters",
      "Cloud-Native Performance Nodes",
      "Legacy System Modernization",
      "DevOps & Security Engineering"
    ]
  }
];

export default function ServicesHubPage() {
  const { openModal } = useLeadCapture();
  return (
    <div className="bg-surface pt-40 pb-20">
      {/* Header - Sharpened */}
      <section className="px-8 pb-32 relative overflow-hidden bg-grid bg-[length:32px_32px] cad-line">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface pointer-events-none"></div>
        <div className="max-w-screen-2xl mx-auto space-y-12 relative z-10 text-center md:text-left">
          <div className="text-precision uppercase">
             Service Infrastructure // Capability Matrix
          </div>
          <h1 className="text-8xl md:text-9xl font-display font-medium text-primary tracking-tighter leading-none italic">
            Engineering <br/> <span className="text-secondary">Excellence.</span>
          </h1>
          <p className="text-2xl text-primary/60 max-w-xl font-sans leading-tight italic border-l-[0.5px] border-primary/20 pl-8">
            Modular, high-performance solutions designed to scale. We bridge the gap between complex research and commercial application.
          </p>
        </div>
      </section>

      {/* Services Grid - Sharpened */}
       <section className="py-24 px-8 bg-white cad-line">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.015, y: -5 }}
              className="tonal-card p-12 flex flex-col justify-between min-h-[500px] group cad-crosshair relative overflow-hidden"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              ></motion.div>
              <div className="space-y-10 relative z-10">
                <div className="w-14 h-14 rounded-none bg-surface-container-low border-[0.5px] border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sharp group-hover:scale-110">
                  {s.icon}
                </div>
                <div>
                  <h3 className="text-4xl font-display font-medium text-primary italic leading-none mb-6 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-md text-primary/50 leading-relaxed font-sans mb-10 italic font-medium opacity-60">
                    {s.desc}
                  </p>
                  
                  <ul className="space-y-4 pt-8 border-t-[0.5px] border-primary/10">
                    {s.items.map(item => (
                      <li key={item} className="flex items-center gap-4 text-precision group-hover:text-primary/70 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-none bg-secondary/40"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative z-10 pt-12">
                <button 
                  onClick={openModal}
                  className="w-full py-5 border-[0.5px] border-primary/10 rounded-none flex items-center justify-center gap-4 text-precision group-hover:bg-primary group-hover:text-white transition-all shadow-sharp font-bold uppercase tracking-widest text-[10px] cursor-pointer"
                >
                  Initiate Service Node <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Initiation Protocol - Restored - Sharpened */}
      <section className="py-40 px-8 bg-surface-container-low rounded-none lg:mx-8 cad-line mb-32">
        <div className="max-w-screen-2xl mx-auto space-y-32">
          <div className="max-w-2xl space-y-8">
            <div className="text-precision text-primary/40 uppercase">Inbound Transmission // Initiation</div>
            <h2 className="text-7xl font-display font-medium text-primary tracking-tight leading-none italic">
              Project <br/> <span className="opacity-40">Onboarding.</span>
            </h2>
            <p className="text-xl text-primary/60 font-sans italic border-l-[0.5px] border-primary/20 pl-8 leading-tight">
              A precise sequence to integrate your requirements into our engineering clusters.
            </p>
          </div>          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                step: '01', 
                title: 'Discovery Node', 
                desc: 'A 30-minute technical audit to identify core objectives and verify feasibility.',
                icon: Search,
                img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop"
              },
              { 
                step: '02', 
                title: 'Technical Scoping', 
                desc: 'We draft a multi-phase structural map detailing ROI, logic, and delivery.',
                icon: Layers,
                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop"
              },
              { 
                step: '03', 
                title: 'Execution Node', 
                desc: 'Official engagement kickoff with dedicated engineering and fractional leadership.',
                icon: Zap,
                img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop"
              }
            ].map((p, i) => (
              <motion.div 
                key={p.step}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-none border-[0.5px] border-primary/10 shadow-sharp relative overflow-hidden group hover:shadow-premium transition-all duration-700"
              >
                <div className="space-y-10 relative z-10">
                  <div className="h-64 rounded-none overflow-hidden relative shadow-sharp mb-8">
                     <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                     <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-40"></div>
                     <div className="absolute top-6 left-6 w-10 h-10 rounded-none bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                        <p.icon size={16} />
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="text-precision opacity-40 italic">Engagement Phase {p.step}</div>
                     <h3 className="text-3xl font-display font-medium italic text-primary tracking-tighter uppercase tracking-widest leading-none">{p.title}</h3>
                     <p className="text-sm text-primary/50 leading-relaxed font-sans italic opacity-80">{p.desc}</p>
                     <div className="pt-6">
                        <button 
                          onClick={openModal} 
                          className="w-full py-5 rounded-none bg-primary text-white font-bold uppercase tracking-widest text-[10px] hover:shadow-premium transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          Initiate Sequence →
                        </button>
                     </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
