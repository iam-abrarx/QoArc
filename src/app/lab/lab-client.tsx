"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar, Beaker, Filter } from 'lucide-react';

const blogPosts = [
  {
    slug: 'pfas-rigidity',
    title: 'Large-scale PFAS generation for safety and toxicity analysis',
    category: 'RESEARCH // GNN',
    date: 'July 12, 2026',
    readTime: '8 min read',
    desc: 'Applying Hybrid GNN architectures and the molecular rigidity hypothesis to predict environmental persistence and toxicity of PFAS in water cycles before chemical synthesis.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    type: 'research'
  },
  {
    slug: 'animal-weight',
    title: 'Animal Weight Estimation from Images via Segment Anything 2',
    category: 'RESEARCH // COMPUTER VISION',
    date: 'June 28, 2026',
    readTime: '5 min read',
    desc: 'Using SAM2 and Depth Anything v2 for precision agricultural livestock observation and non-invasive weight mass estimation.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    type: 'research'
  },
  {
    slug: 'bancat-tech',
    title: 'Architecting Real-Time Donor Synchronization for BANcat',
    category: 'PRODUCT // HEALTHCARE',
    date: 'July 15, 2026',
    readTime: '6 min read',
    desc: 'How we built a bi-lingual, zero-latency donor communication system and real-time patient support ledger tracking for the BANCAT cancer charity foundation.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    type: 'product'
  },
  {
    slug: 'asialinkage-tech',
    title: 'Scalable B2B Catalog Categorization and Search Systems',
    category: 'PRODUCT // ENTERPRISE',
    date: 'July 10, 2026',
    readTime: '7 min read',
    desc: 'A technical study on custom relational database designs, catalog classifications, and indexing schemas built to organize business inventories for AsiaLinkage.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    type: 'product'
  },
  {
    slug: '2go-tech',
    title: 'Optimizing E-Commerce User Conversion and Fluid Checkout',
    category: 'PRODUCT // RETAIL',
    date: 'July 05, 2026',
    readTime: '5 min read',
    desc: 'Revamping the digital checkout funnel and state synchronization for 2GO Bangladesh retail platform, resulting in minimized shopping friction.',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    type: 'product'
  }
];

export default function LabPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'product' | 'research'>('all');

  const filteredPosts = blogPosts.filter(p => {
    if (activeFilter === 'all') return true;
    return p.type === activeFilter;
  });

  const featuredPost = filteredPosts.find(p => p.featured) || filteredPosts[0];
  const secondaryPosts = filteredPosts.filter(p => p.slug !== featuredPost?.slug);

  return (
    <div className="bg-surface pt-48 pb-24 px-6 relative overflow-hidden bg-grid bg-[length:32px_32px]">
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface pointer-events-none"></div>
      
      <div className="max-w-screen-2xl mx-auto relative z-10 space-y-24">
        {/* Blog Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary/5 border border-primary/10 rounded-none text-precision shadow-sharp">
            <Beaker size={14} className="text-primary animate-pulse" /> QOARC Blog // Product & Research Insights
          </div>
          <h1 className="text-7xl md:text-9xl font-display font-medium tracking-tighter text-primary italic leading-[0.8]">
            QOARC <span className="opacity-40">Lab.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-primary/60 font-sans leading-relaxed border-l border-primary/20 pl-8 text-center">
            Our writing hub for sharing insights on our own products, advanced machine learning research, and ideas.
          </p>
        </motion.div>

        {/* Categories / Filter Nav */}
        <div className="flex justify-center gap-4 border-b border-primary/5 pb-8">
          {[
            { id: 'all', label: 'All Articles' },
            { id: 'product', label: 'Product Cases' },
            { id: 'research', label: 'Scientific Research' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-6 py-2.5 font-bold uppercase tracking-widest text-[10px] transition-all
                ${activeFilter === f.id 
                  ? 'bg-primary text-white shadow-sharp' 
                  : 'bg-white text-primary/60 border border-primary/10 hover:text-primary'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            key={`featured-${featuredPost.slug}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white border border-primary/10 rounded-none overflow-hidden shadow-premium group"
          >
            <Link href={`/lab/${featuredPost.slug}`} className="grid lg:grid-cols-12 gap-0">
              {/* Image Column */}
              <div className="lg:col-span-7 h-[350px] lg:h-[550px] relative overflow-hidden bg-primary/5">
                <img 
                  src={featuredPost.imageUrl} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply group-hover:opacity-0 transition-opacity"></div>
              </div>

              {/* Text Info Column */}
              <div className="lg:col-span-5 p-10 md:p-16 flex flex-col justify-between space-y-12">
                <div className="space-y-6">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest text-[#cc0000] uppercase">
                    <span>{featuredPost.category}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/10"></span>
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {featuredPost.date}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/10"></span>
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {featuredPost.readTime}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-4xl md:text-5xl font-display font-semibold text-primary group-hover:text-[#cc0000] transition-colors leading-tight italic">
                    {featuredPost.title}
                  </h2>

                  {/* Desc */}
                  <p className="text-primary/60 font-sans leading-relaxed text-base">
                    {filteredPosts[0]?.desc}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-precision text-primary font-bold group-hover:text-[#cc0000] transition-colors uppercase tracking-widest">
                  Read Article <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Secondary Posts Grid */}
        {secondaryPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {secondaryPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="bg-white border border-primary/10 rounded-none overflow-hidden shadow-sharp hover:shadow-premium transition-shadow group flex flex-col justify-between"
              >
                <Link href={`/lab/${post.slug}`} className="flex flex-col h-full">
                  {/* Thumbnail */}
                  <div className="h-[240px] relative overflow-hidden bg-primary/5">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-primary/10 mix-blend-multiply group-hover:opacity-0 transition-opacity"></div>
                  </div>

                  {/* Body */}
                  <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-[9px] font-bold tracking-widest text-[#cc0000] uppercase">
                        <span>{post.category}</span>
                        <span className="w-1 h-1 rounded-full bg-primary/10"></span>
                        <span>{post.date}</span>
                      </div>
                      <h3 className="text-2xl font-display font-semibold text-primary group-hover:text-[#cc0000] transition-colors leading-tight italic">
                        {post.title}
                      </h3>
                      <p className="text-sm text-primary/50 font-sans leading-relaxed">
                        {post.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-4 text-[10px] font-bold text-primary/40 group-hover:text-[#cc0000] uppercase tracking-widest transition-colors">
                      Read Paper <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
