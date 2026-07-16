"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Star, FileText, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

export default function Testimonials() {
  const { testimonials } = usePortfolio();
  const [expandedId, setExpandedId] = useState<string | null>('1');

  return (
    <section className="py-32 px-8 bg-white overflow-hidden border-t-[0.5px] border-primary/10">
      <div className="max-w-screen-xl mx-auto space-y-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-6">
            <div className="text-precision text-primary/40 uppercase tracking-widest">Client Feedback // Trust Node</div>
            <h2 className="text-7xl font-display font-medium text-primary tracking-tight leading-none">
              Our Clients <br /> <span className="opacity-40">Say.</span>
            </h2>
          </div>
          <div className="text-precision text-primary/40 hidden md:block max-w-xs text-right italic font-medium">
            Click any card below to expand and view the full case details.
          </div>
        </div>

        {/* Stacked Testimonials Container */}
        <div className="relative flex flex-col pt-12">
          {testimonials.map((t, index) => {
            const isExpanded = expandedId === t.id;
            
            return (
              <motion.div
                key={t.id}
                layout
                onClick={() => setExpandedId(isExpanded ? null : t.id)}
                style={{ 
                  zIndex: isExpanded ? 50 : index + 10,
                }}
                className={`relative border border-primary/10 p-8 md:p-10 transition-all duration-500 cursor-pointer 
                  ${index > 0 ? '-mt-8' : 'mt-0'} 
                  ${isExpanded 
                    ? 'bg-gradient-to-br from-primary via-[#002046] to-[#001026] text-white shadow-premium scale-[1.01]' 
                    : 'bg-[#F8FAFC] text-primary hover:bg-[#F1F5F9] hover:-translate-y-2 shadow-sm'
                  }`}
              >
                {/* Banner Header - Always Visible */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  {/* Left: Company & Author Info */}
                  <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                    {/* Company Logo/Name */}
                    <div className={`text-3xl font-display font-black tracking-tighter italic ${isExpanded ? 'text-[#4A90D9]' : t.logoColor}`}>
                      {t.company}
                    </div>
                    {/* Divider (Desktop only) */}
                    <div className={`hidden md:block w-[1px] h-6 ${isExpanded ? 'bg-white/10' : 'bg-primary/10'}`}></div>
                    {/* Author brief */}
                    <div className="space-y-0.5">
                      <h4 className={`text-lg font-display font-bold ${isExpanded ? 'text-white' : 'text-primary'}`}>
                        {t.authorName}
                      </h4>
                      <p className={`text-xs ${isExpanded ? 'text-white/50' : 'text-primary/40'} font-medium`}>
                        {t.authorTitle}
                      </p>
                    </div>
                  </div>

                  {/* Right: Stars & Toggle Button */}
                  <div className="flex items-center gap-6 self-stretch md:self-auto justify-between border-t border-primary/5 md:border-t-0 pt-4 md:pt-0">
                    <div className="flex gap-1 text-[#FFD700]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" stroke="none" />
                      ))}
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${isExpanded ? 'border-white/20 text-white hover:bg-white/10' : 'border-primary/15 text-primary hover:bg-primary/5'} transition-all`}>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                </div>

                {/* Collapsible Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 32 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 border-t border-white/10 grid md:grid-cols-12 gap-8 items-start">
                        {/* Profile Image Column */}
                        <div className="md:col-span-2 flex flex-col items-center gap-4">
                          <div className="w-24 h-24 rounded-none overflow-hidden border-2 border-white/20 shadow-sharp bg-white/5">
                            <img src={t.authorImage} alt={t.authorName} className="w-full h-full object-cover" />
                          </div>
                          <a 
                            href={t.authorLinkedin} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-xs font-bold tracking-tight text-[#4A90D9] hover:underline"
                          >
                            <Linkedin size={14} fill="currentColor" stroke="none" />
                            LinkedIn Profile
                          </a>
                        </div>

                        {/* Text & Links Column */}
                        <div className="md:col-span-10 space-y-8">
                          <div 
                            className="text-xl text-white/80 leading-relaxed font-sans font-light italic"
                            dangerouslySetInnerHTML={{ __html: t.content.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }}
                          />

                          {/* Footer Links */}
                          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/5">
                            {t.companyUrl && t.companyUrl !== '#' && (
                              <a 
                                href={t.companyUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-2 text-white/50 hover:text-white font-bold text-xs tracking-tight transition-colors"
                              >
                                <FileText size={14} />
                                Visit Company Website
                              </a>
                            )}
                            {t.projectUrl && t.projectUrl !== '#' && (
                              <a 
                                href={t.projectUrl} 
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-2 text-white/50 hover:text-white font-bold text-xs tracking-tight transition-colors"
                              >
                                <ExternalLink size={14} />
                                View Project Case
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
