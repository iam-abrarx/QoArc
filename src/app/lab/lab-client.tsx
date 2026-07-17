"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar, Beaker, Loader2 } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

export default function LabPage() {
  const { labItems } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<'all' | 'product' | 'research'>('all');

  if (!labItems) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  const filteredPosts = labItems.filter(p => {
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

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Sticky Vertical Filter Navigation */}
          <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-28">
            <div className="space-y-4">
              <h3 className="text-precision text-primary/40 uppercase tracking-widest text-[9px] font-bold">Filter Archives</h3>
              <nav className="flex flex-col gap-2">
                {[
                  { id: 'all', label: 'All Articles', count: labItems.length },
                  { id: 'product', label: 'Product Cases', count: labItems.filter(p => p.type === 'product').length },
                  { id: 'research', label: 'Scientific Research', count: labItems.filter(p => p.type === 'research').length }
                ].map(f => {
                  const isActive = activeFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setActiveFilter(f.id as any)}
                      className={`w-full text-left font-sans text-xs uppercase tracking-wider transition-all duration-300 py-3 border-l-2 pl-4 flex justify-between items-center
                        ${isActive 
                          ? 'border-[#cc0000] text-[#cc0000] font-bold bg-primary/5 pl-6' 
                          : 'border-transparent text-primary/50 hover:text-primary hover:pl-5'
                        }`}
                    >
                      <span>{f.label}</span>
                      <span className={`text-[9px] font-mono px-2 py-0.5 border ${isActive ? 'bg-[#cc0000]/10 border-[#cc0000]/20 text-[#cc0000]' : 'bg-primary/5 border-primary/10 text-primary/40'}`}>{f.count}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Right Main Articles Section */}
          <div className="lg:col-span-9 space-y-16">
            
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
                      alt={featuredPost.name} 
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
                        {featuredPost.name}
                      </h2>

                      {/* Desc */}
                      <p className="text-primary/60 font-sans leading-relaxed text-base">
                        {featuredPost.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-precision text-primary font-bold group-hover:text-[#cc0000] transition-colors uppercase tracking-widest">
                      Read Article <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Secondary Grid */}
            {secondaryPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
                          alt={post.name} 
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
                            {post.name}
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
      </div>
    </div>
  );
}
