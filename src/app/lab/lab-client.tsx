"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar, Beaker } from 'lucide-react';

const blogPosts = [
  {
    slug: 'pfas-rigidity',
    title: 'Large-scale PFAS generation for safety and toxicity analysis',
    category: 'MATERIALS SCIENCE // GNN',
    date: 'July 12, 2026',
    readTime: '8 min read',
    desc: 'Applying Hybrid GNN architectures and the molecular rigidity hypothesis to predict environmental persistence and toxicity of PFAS in water cycles before synthesis.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    featured: true
  },
  {
    slug: 'cow-project',
    title: 'Project COW: Cognitive Over-Write in Domain LLMs',
    category: 'AI ENGINEERING',
    date: 'July 15, 2026',
    readTime: '6 min read',
    desc: 'Developing self-correcting neural nodes to check outputs against symbolic knowledge graphs, reducing hallucination in mission-critical legal environments.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
    featured: false
  },
  {
    slug: 'animal-weight',
    title: 'Animal Weight Estimation from Images via Segment Anything 2',
    category: 'COMPUTER VISION',
    date: 'June 28, 2026',
    readTime: '5 min read',
    desc: 'Using SAM2 and Depth Anything v2 for precision agricultural livestock observation and non-invasive weight estimation.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
    featured: false
  }
];

export default function LabPage() {
  const featuredPost = blogPosts.find(p => p.featured);
  const secondaryPosts = blogPosts.filter(p => !p.featured);

  return (
    <div className="bg-surface pt-48 pb-24 px-6 relative overflow-hidden bg-grid bg-[length:32px_32px]">
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface pointer-events-none"></div>
      
      <div className="max-w-screen-2xl mx-auto relative z-10 space-y-32">
        {/* Blog Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary/5 border border-primary/10 rounded-none text-precision shadow-sharp">
            <Beaker size={14} className="text-primary animate-pulse" /> QOARC Blog // Research & Insights
          </div>
          <h1 className="text-7xl md:text-9xl font-fraunces font-black tracking-tighter text-primary italic leading-[0.8]">
            QOARC <span className="opacity-40">Lab.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-primary/60 font-fraunces font-light italic leading-relaxed border-l border-primary/20 pl-8">
            Our publishing system for advanced products, machine learning research, and strategic technical ideation.
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
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

                  {/* Title (Fraunces) */}
                  <h2 className="text-4xl md:text-5xl font-fraunces font-bold text-primary group-hover:text-[#cc0000] transition-colors leading-tight italic">
                    {featuredPost.title}
                  </h2>

                  {/* Description */}
                  <p className="text-lg text-primary/60 font-fraunces font-light italic leading-relaxed pt-2">
                    {featuredPost.desc}
                  </p>
                </div>

                <div>
                  <span className="inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-none font-bold uppercase tracking-widest text-xs hover:bg-[#cc0000] transition-all group-hover:translate-x-2">
                    Read Article <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Secondary Posts Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {secondaryPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="bg-white border border-primary/10 rounded-none overflow-hidden shadow-sharp hover:shadow-premium transition-all duration-500 flex flex-col justify-between group h-full"
            >
              <Link href={`/lab/${post.slug}`} className="flex flex-col h-full justify-between">
                <div>
                  {/* Card Image */}
                  <div className="h-[250px] md:h-[300px] relative overflow-hidden bg-primary/5">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-primary/5 mix-blend-multiply"></div>
                  </div>

                  {/* Card Info */}
                  <div className="p-8 space-y-6">
                    {/* Meta Row */}
                    <div className="flex items-center gap-4 text-[9px] font-bold tracking-widest text-[#cc0000] uppercase">
                      <span>{post.category}</span>
                      <span className="w-1 h-1 rounded-full bg-primary/10"></span>
                      <span className="flex items-center gap-1.5"><Calendar size={11} /> {post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-primary/10"></span>
                      <span className="flex items-center gap-1.5"><Clock size={11} /> {post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-fraunces font-bold text-primary group-hover:text-[#cc0000] transition-colors leading-tight italic">
                      {post.title}
                    </h3>

                    {/* Description Excerpt */}
                    <p className="text-base text-primary/60 font-fraunces font-light italic leading-relaxed">
                      {post.desc}
                    </p>
                  </div>
                </div>

                <div className="p-8 pt-0">
                  <span className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[11px] group-hover:text-[#cc0000] transition-colors">
                    Read Article <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
