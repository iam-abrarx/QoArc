"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Search, 
  Calendar, 
  Clock, 
  Tag, 
  Sparkles,
  Zap,
  Terminal,
  Layers
} from 'lucide-react';

const posts = [
  {
    title: "The Rigidity Hypothesis: Screening PFAS with GNNs",
    slug: "pfas-rigidity-gnn",
    excerpt: "How our lab used Graph Neural Networks to identify non-toxic molecular structures in the PFAS chemical space.",
    date: "Mar 24, 2026",
    readTime: "8 min",
    category: "Research",
    icon: <Sparkles size={18} />
  },
  {
    title: "DDP: Scaling Distributed Training on Decentralized Nodes",
    slug: "ddp-distributed-training",
    excerpt: "A deep dive into the architecture of our Distributed Deep Learning Platform and Top-1% gradient compression.",
    date: "Mar 18, 2026",
    readTime: "12 min",
    category: "Engineering",
    icon: <Terminal size={18} />
  },
  {
    title: "AI Product Studios: The Dual Model for 2026",
    slug: "product-studio-model",
    excerpt: "Why the client-service + in-house product model is the most resilient architecture for modern software firms.",
    date: "Mar 12, 2026",
    readTime: "6 min",
    category: "Strategy",
    icon: <Layers size={18} />
  }
];

export default function InsightsHubPage() {
  return (
    <div className="bg-surface pt-40 pb-20">
      {/* Hero - Sharpened */}
      <section className="px-8 pb-32 relative overflow-hidden bg-grid bg-[length:32px_32px] cad-line">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface pointer-events-none"></div>
        <div className="max-w-screen-2xl mx-auto space-y-12 relative z-10 text-center md:text-left">
          <div className="text-precision uppercase">
             Strategic Intelligence // Signal Analysis
          </div>
          <h1 className="text-8xl md:text-9xl font-display font-medium text-primary tracking-tighter leading-none italic">
             Insights <br/> <span className="text-secondary">& Systems.</span>
          </h1>
          <p className="text-2xl text-primary/60 max-w-xl font-sans leading-tight italic border-l-[0.5px] border-primary/20 pl-8">
             Deep-dives into the research nodes, architectural patterns, and operational logic that drive our studio.
          </p>
        </div>
      </section>

      {/* Blog Feed - Sharpened */}
      <section className="py-24 px-8 bg-white cad-line">
        <div className="max-w-screen-2xl mx-auto space-y-24">
           {/* Featured Post */}
           <motion.div 
             initial={{ opacity: 0, y: 15 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4 }}
             viewport={{ once: true }}
             className="tonal-card p-12 lg:p-20 group relative overflow-hidden shadow-sharp cad-crosshair"
           >
              <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>
              <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
                 <div className="space-y-10">
                    <div className="flex items-center gap-4 text-precision">
                       <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary">Featured Analysis</span>
                       <span className="opacity-40">// PR-NODE-01</span>
                    </div>
                    <h2 className="text-6xl font-display font-medium text-primary italic leading-tight tracking-tight">The Future of <br/> <span className="text-secondary">Sovereign AI.</span></h2>
                    <p className="text-xl text-primary/60 font-sans italic border-l-[0.5px] border-primary/20 pl-8 leading-tight">
                       Our roadmap for deploying locally-hosted, high-performance LLMs that ensure 100% data sovereignty for enterprise clients.
                    </p>
                    <Link href="/insights/sovereign-ai" className="inline-flex items-center gap-4 bg-primary text-white px-10 py-5 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-sharp hover:shadow-premium transition-all">
                       Read Full Artifact <ArrowRight size={14} />
                    </Link>
                 </div>
                 <div className="hidden lg:block">
                    <div className="bg-surface-container-low p-20 rounded-[80px] shape-notched border-[0.5px] border-primary/10 shadow-sharp relative overflow-hidden">
                       <Zap size={200} strokeWidth={0.5} className="absolute -bottom-10 -right-10 text-primary opacity-5" />
                       <div className="relative z-10 space-y-6">
                          <div className="text-5xl font-display italic text-primary">0ms</div>
                          <div className="text-precision opacity-40">Local Inference Target</div>
                       </div>
                    </div>
                 </div>
              </div>
           </motion.div>

           {/* Post Grid */}
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post, i) => (
                <motion.div 
                  key={post.slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="tonal-card p-12 flex flex-col justify-between min-h-[450px] group cad-crosshair"
                >
                   <div className="space-y-8">
                      <div className="flex items-center justify-between text-precision opacity-40 uppercase">
                         <div className="flex items-center gap-2">
                            <Tag size={12} className="text-secondary" /> {post.category}
                         </div>
                         <div>{post.date}</div>
                      </div>
                      <div>
                         <h3 className="text-3xl font-display font-medium text-primary italic leading-none mb-6 group-hover:text-primary/70 transition-colors uppercase">{post.title}</h3>
                         <p className="text-sm text-primary/50 leading-relaxed font-sans mb-10 italic font-medium opacity-60">
                            {post.excerpt}
                         </p>
                      </div>
                   </div>
                   <div className="pt-8 border-t-[0.5px] border-primary/10 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-precision opacity-40">
                         <Clock size={12} /> {post.readTime}
                      </div>
                      <Link href={`/insights/${post.slug}`} className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sharp">
                         <ArrowRight size={16} />
                      </Link>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Newsletter Node - Sharpened */}
      <section className="py-24 px-8 bg-surface-container-low rounded-[80px] lg:mx-8 cad-line mb-20 relative overflow-hidden">
         <div className="absolute inset-0 bg-grid opacity-5"></div>
         <div className="max-w-screen-2xl mx-auto space-y-12 relative z-10 text-center">
            <div className="text-precision uppercase">Data Subscription // Weekly Sync</div>
            <h2 className="text-6xl font-display font-medium text-primary tracking-tight leading-none italic">
               The Archive <br/> <span className="text-secondary">Newsletter.</span>
            </h2>
            <div className="max-w-xl mx-auto relative mt-12">
               <input type="email" placeholder="architect@qoarc.ai" className="w-full bg-white border-[0.5px] border-primary/10 p-6 rounded-2xl font-sans text-primary focus:border-primary transition-all shadow-sharp outline-none pr-48 italic font-medium opacity-60" />
               <button className="absolute right-2 top-2 bottom-2 bg-primary text-white px-8 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-sharp hover:shadow-premium transition-all">
                  Subscribe Node
               </button>
            </div>
         </div>
      </section>
    </div>
  );
}
