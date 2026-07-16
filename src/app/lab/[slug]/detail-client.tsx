"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Terminal, 
  FlaskConical, 
  FileText, 
  Code2, 
  Dna,
  Share2,
  Download,
  BookOpen,
  ArrowLeft,
  ChevronRight,
  ShieldAlert,
  Server,
  Zap,
  ShoppingBag
} from 'lucide-react';
import { useLeadCapture } from '@/context/LeadCaptureContext';

const labData: Record<string, any> = {
  'pfas-rigidity': {
    docId: 'QOARC-2026-PFAS',
    name: 'PFAS Rigidity Modeling',
    abstract: 'Applying Hybrid GNN architectures and molecular rigidity hypotheses to predict the structural resilience and environmental persistence of Per- and Polyfluoroalkyl Substances (PFAS) in industrial water cycles.',
    metrics: [
      { val: '5.2M', label: 'Candidates Modeled' },
      { val: '98.5%', label: 'Prediction Precision' },
      { val: 'SAM2 + GNN', label: 'Neural Architecture' }
    ],
    motivation: 'Commercial filtration systems lack the ability to predict molecular degradation at scale. This research aims to identify "Unicorn" leads for biodegradable alternatives before synthesis.',
    methodology: 'The "Dual Brain" architecture combines Graph Convolutional Networks (GCN) with RDKit molecular descriptors. We utilized transfer learning from the ChEMBL database to specialize our toxicity prediction on fluorinated chains.',
    tech: ['Python', 'PyTorch', 'RDKit', 'ChEMBL', 'Neo4j', 'Ray Serve'],
    results: 'Our model identified 14 candidates for alternative surfactants that demonstrate a 60% higher degradation rate in standardized environmental simulations while maintaining industrial surfactant efficiency.',
    arxiv: 'https://arxiv.org/abs/example',
    license: 'Available for commercial licensing or custom development'
  },
  'animal-weight': {
    docId: 'QOARC-2026-ANIM',
    name: 'Animal Weight Estimation',
    abstract: 'Applying advanced computer vision with Segment Anything 2 (SAM2) and Depth Anything v2 for non-invasive, precision agricultural livestock observation and mass estimation.',
    metrics: [
      { val: 'SAM2 + Depth', label: 'Neural Architecture' },
      { val: '92.4%', label: 'Estimation Accuracy' },
      { val: '0.8s', label: 'Inference Speed' }
    ],
    motivation: 'Traditional methods of livestock weight measurement are highly stress-inducing and logistically complex. This research leverages dual-perspective imaging to automate precise mass calculations in real-time.',
    methodology: 'The model utilizes SAM2 to segment the animal profile from background clutter, while Depth Anything v2 produces high-resolution relative depth maps. An integrated regression transformer maps the spatial volume to actual mass.',
    tech: ['Python', 'PyTorch', 'SAM 2', 'Depth Anything', 'OpenCV', 'FastAPI'],
    results: 'Evaluations on sheep and cattle cohorts demonstrated an estimation error rate of less than 7.6% under varied outdoor lighting conditions, paving the way for fully automated livestock monitoring.',
    arxiv: 'https://arxiv.org/abs/example-sam2',
    license: 'Open source research under Apache 2.0 license'
  },
  'bancat-tech': {
    docId: 'QOARC-2026-BANCAT',
    name: 'Real-Time Sync on BANcat',
    abstract: 'Designing zero-latency distributed data pipelines and dual-language state management systems to power real-time cancer support and direct donor connections.',
    metrics: [
      { val: '99.9%', label: 'Sync Accuracy' },
      { val: '<150ms', label: 'Sync Latency' },
      { val: 'PostgreSQL', label: 'Transaction Engine' }
    ],
    motivation: 'Oncology charity organizations face massive friction in allocating emergency funds to patients in real-time, often plagued by disconnected payment logs and delayed balance sheets.',
    methodology: 'We engineered a bi-directional synchronization loop combining PostgreSQL transaction isolation levels (Serializable) with custom WebSocket channels to broadcast donor updates to client portals concurrently.',
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'WebSockets', 'Tailwind CSS'],
    results: 'Successfully processed donations supporting over 500 cancer patients in Bangladesh, maintaining absolute sync precision and a 0% double-ledger rate.',
    arxiv: 'https://bancat.org.bd',
    license: 'Proprietary platform architecture for non-profit operations'
  },
  'asialinkage-tech': {
    docId: 'QOARC-2026-ASIA',
    name: 'B2B Catalog Indexing Engines',
    abstract: 'Developing structured database schemas, multi-tier caching architectures, and search indexes to organize and serve extensive commercial catalogs for regional trade networks.',
    metrics: [
      { val: '75%', label: 'Query Speedup' },
      { val: '10K+', label: 'Catalog SKUs' },
      { val: 'Redis', label: 'Caching Tier' }
    ],
    motivation: 'B2B wholesale trading environments experience heavy database performance degradation when searching and filtering large, nested product hierarchies.',
    methodology: 'The engine implements PostgreSQL compound indexes alongside a write-through caching layer on Redis. Complex product variants are structured in JSONB fields, utilizing GIN indexes for fast fuzzy search queries.',
    tech: ['Next.js', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Framer Motion'],
    results: 'Achieved a 75% reduction in product listing query times, handling 10,000+ business items with instant autocomplete responses.',
    arxiv: 'https://asialinkage.com',
    license: 'Custom B2B licensing option available'
  },
  '2go-tech': {
    docId: 'QOARC-2026-2GO',
    name: 'checkout funnel optimization',
    abstract: 'Refactoring checkout state sync and client-side memory storage to streamline retail transactions and minimize cart abandonment in local delivery platforms.',
    metrics: [
      { val: '35%', label: 'Conversion Lift' },
      { val: 'Optimistic UI', label: 'State Sync' },
      { val: 'React Context', label: 'Cart Management' }
    ],
    motivation: 'Traditional e-commerce checkouts often suffer from slow server-side cart state resolution, causing shopping cart abandonments and bad user retention.',
    methodology: 'We redesigned the checkout funnel by moving the primary cart state to local storage with optimistic UI updates. API requests are batched and executed asynchronously in the background, keeping the path-to-purchase completely fluid.',
    tech: ['Next.js', 'Framer Motion', 'React Context', 'Tailwind CSS'],
    results: 'Cut down checkout steps from 6 to 3, achieving a 35% improvement in retail order completions for 2GO Bangladesh.',
    arxiv: 'https://bout2go.com',
    license: 'Commercial deployment architecture for retail platforms'
  }
};

export default function LabDetailPage() {
  const { openModal } = useLeadCapture();
  const { slug } = useParams();
  const data = labData[slug as string] || labData['pfas-rigidity'];

  const [activeSection, setActiveSection] = useState('abstract');
  
  const sectionRefs = {
    abstract: useRef<HTMLElement>(null),
    motivation: useRef<HTMLElement>(null),
    methodology: useRef<HTMLElement>(null),
    tech: useRef<HTMLElement>(null),
    results: useRef<HTMLElement>(null)
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navbarOffset = 110;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-[#f0f2f5] pt-32 pb-24 px-4 md:px-8 selection:bg-primary selection:text-white">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-4 text-xs font-sans text-primary/50">
          <Link href="/lab" className="flex items-center gap-2 hover:text-primary transition-colors">
            <ArrowLeft size={14} /> Back to Lab
          </Link>
          <ChevronRight size={12} className="opacity-30" />
          <span className="font-bold text-primary">{data.name}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: Sticky Table of Contents & PDF Meta */}
          <div className="lg:col-span-4 space-y-6 sticky top-28 hidden lg:block">
            
            {/* Table of Contents */}
            <div className="space-y-6 p-4">
              <h3 className="text-precision text-primary/40">Outline // Contents</h3>
              <nav className="space-y-4">
                {[
                  { id: 'abstract', label: '01. Abstract & Overview' },
                  { id: 'motivation', label: '02. Commercial Incentive' },
                  { id: 'methodology', label: '03. Research Methodology' },
                  { id: 'tech', label: '04. Technical Infrastructure' },
                  { id: 'results', label: '05. Derived Value & Results' }
                ].map(section => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left font-sans text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-4 py-1.5 border-l-2 pl-4
                        ${isActive 
                          ? 'border-[#cc0000] text-[#cc0000] font-bold translate-x-2' 
                          : 'border-transparent text-primary/50 hover:text-primary'
                        }`}
                    >
                      {section.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Document Metadata Card */}
            <div className="space-y-6 p-4 pt-0">
              <h3 className="text-precision text-primary/40">Metadata // Info</h3>
              <div className="space-y-4 font-sans text-xs">
                <div className="flex justify-between border-b border-primary/10 pb-2">
                  <span className="text-primary/40 font-bold">Document ID</span>
                  <span className="font-mono text-primary font-bold">{data.docId}</span>
                </div>
                <div className="flex justify-between border-b border-primary/10 pb-2">
                  <span className="text-primary/40 font-bold">Classification</span>
                  <span className="text-[#cc0000] font-bold font-mono">PUBLIC / RESEARCH</span>
                </div>
                <div className="space-y-1">
                  <span className="text-primary/40 font-bold block">License</span>
                  <span className="text-primary/70 italic font-medium leading-relaxed block">{data.license}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-3">
                <Link 
                  href={data.arxiv} 
                  target="_blank" 
                  className="w-full bg-[#cc0000] text-white py-4 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-sm hover:bg-[#b30000] transition-colors"
                >
                  <Download size={14} /> Download Abstract (PDF)
                </Link>
                <button 
                  onClick={openModal}
                  className="w-full bg-primary text-white py-4 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-sm hover:bg-primary/95 transition-colors"
                >
                  Request Technical Collab
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: Simulated Paper Sheet (Academic PDF style) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-primary/10 shadow-premium p-8 md:p-20 relative overflow-hidden">
              
              {/* Paper Layout Top Border CAD element */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary via-[#cc0000] to-primary"></div>
              
              <div className="space-y-12">
                
                {/* Paper Header */}
                <div className="border-b border-primary/10 pb-8 space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-[9px] font-bold tracking-widest text-primary/40 uppercase">
                    <span>QOARC Research Publications</span>
                    <span>No. {data.docId}</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-primary leading-tight">
                    {data.name}
                  </h1>
                  
                  <div className="pt-4 flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-bold text-primary/60 font-mono">
                    <span className="flex items-center gap-1.5"><Terminal size={12} className="text-[#cc0000]" /> AUTHOR: QOARC LABS</span>
                    <span className="flex items-center gap-1.5"><FlaskConical size={12} className="text-[#cc0000]" /> CLASSIFICATION: OPEN RESEARCH</span>
                  </div>
                </div>

                {/* Section 1: Abstract */}
                <section 
                  id="abstract" 
                  ref={sectionRefs.abstract} 
                  className="space-y-6 scroll-mt-28"
                >
                  <h2 className="text-lg font-display font-bold text-primary flex items-center gap-3">
                    <span className="text-[#cc0000] font-mono text-xs">01 //</span> Abstract
                  </h2>
                  <div className="bg-primary/5 p-6 md:p-8 border-l-2 border-primary/20">
                    <p className="text-lg text-primary/80 font-fraunces font-light italic leading-relaxed">
                      {data.abstract}
                    </p>
                  </div>
                </section>

                {/* Research Parameters Table (Scientific addition) */}
                <section className="space-y-6 pt-4 border-t border-primary/5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary/40">Key Performance Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.metrics.map((m: any) => (
                      <div key={m.label} className="bg-[#f8fafc] border border-primary/5 p-6 text-center shadow-sm">
                        <div className="text-[9px] font-bold uppercase tracking-widest text-primary/40 mb-2">{m.label}</div>
                        <div className="text-3xl font-display font-bold text-primary leading-none">{m.val}</div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Section 2: Motivation */}
                <section 
                  id="motivation" 
                  ref={sectionRefs.motivation} 
                  className="space-y-6 pt-8 border-t border-primary/5 scroll-mt-28"
                >
                  <h2 className="text-lg font-display font-bold text-primary flex items-center gap-3">
                    <span className="text-[#cc0000] font-mono text-xs">02 //</span> Commercial Incentive & Objective
                  </h2>
                  <p className="text-lg text-primary/70 leading-relaxed font-fraunces font-light italic">
                    {data.motivation}
                  </p>
                </section>

                {/* Section 3: Methodology */}
                <section 
                  id="methodology" 
                  ref={sectionRefs.methodology} 
                  className="space-y-6 pt-8 border-t border-primary/5 scroll-mt-28"
                >
                  <h2 className="text-lg font-display font-bold text-primary flex items-center gap-3">
                    <span className="text-[#cc0000] font-mono text-xs">03 //</span> Research Methodology & Design
                  </h2>
                  <p className="text-lg text-primary/70 leading-relaxed font-fraunces font-light italic">
                    {data.methodology}
                  </p>
                </section>

                {/* Section 4: Tech Stack */}
                <section 
                  id="tech" 
                  ref={sectionRefs.tech} 
                  className="space-y-6 pt-8 border-t border-primary/5 scroll-mt-28"
                >
                  <h2 className="text-lg font-display font-bold text-primary flex items-center gap-3">
                    <span className="text-[#cc0000] font-mono text-xs">04 //</span> Technical Infrastructure Stack
                  </h2>
                  <div className="flex flex-wrap gap-3 pt-2">
                    {data.tech.map((t: string) => (
                      <span 
                        key={t} 
                        className="px-6 py-2.5 bg-[#f8fafc] border border-primary/5 text-xs font-bold text-primary font-mono shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Section 5: Results */}
                <section 
                  id="results" 
                  ref={sectionRefs.results} 
                  className="space-y-6 pt-8 border-t border-primary/5 scroll-mt-28"
                >
                  <h2 className="text-lg font-display font-bold text-primary flex items-center gap-3">
                    <span className="text-[#cc0000] font-mono text-xs">05 //</span> Derived Value & Findings
                  </h2>
                  <div className="bg-[#cc0000]/5 border-l-2 border-[#cc0000] p-6 md:p-8">
                    <p className="text-lg text-primary/80 font-fraunces font-light italic leading-relaxed">
                      {data.results}
                    </p>
                  </div>
                </section>

                {/* Footer Disclaimer */}
                <div className="pt-12 border-t border-primary/10 text-center text-[10px] text-primary/30 space-y-2">
                  <p>© 2026 QOARC LABS. ALL RIGHTS RESERVED. FOR COMMERCIAL INTEGRATIONS, CONTACT OFFICE@QOARC.COM</p>
                  <p>DOCUMENT ID: {data.docId} // VERIFIED CRYPTOGRAPHIC SIGNATURE: SECURE</p>
                </div>

              </div>
            </div>

            {/* Mobile Actions block */}
            <div className="lg:hidden bg-white border border-primary/5 p-8 shadow-sm space-y-6">
              <h3 className="text-precision text-primary/40">Metadata & Actions</h3>
              <div className="space-y-4 text-xs font-sans">
                <div className="flex justify-between border-b border-primary/5 pb-2">
                  <span className="text-primary/40 font-bold">License</span>
                  <span className="text-primary font-bold text-right">{data.license}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Link 
                  href={data.arxiv} 
                  target="_blank" 
                  className="bg-[#cc0000] text-white py-4 font-bold uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 shadow-sm hover:bg-[#b30000] transition-colors text-center"
                >
                  <Download size={12} /> Abstract PDF
                </Link>
                <button 
                  onClick={openModal}
                  className="bg-primary text-white py-4 font-bold uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 shadow-sm hover:bg-primary/95 transition-colors text-center"
                >
                  Request Collab
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
