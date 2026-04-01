"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Star, FileText, ExternalLink } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';


export default function Testimonials() {
  const { testimonials } = usePortfolio();
  
  return (
    <section className="py-32 px-8 bg-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto space-y-24">
        {/* Header */}
        <div className="inline-flex items-center gap-2">
          <div className="bg-[#E6F0FF] px-4 py-2 text-[#0047AB] text-4xl font-display font-medium">Our</div>
          <h2 className="text-4xl font-display font-medium text-primary">Clients Say</h2>
        </div>

        {/* Testimonials Grid */}
        <div className="flex flex-col gap-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative bg-[#F8FAFC] border border-primary/5 rounded-none p-10 md:p-14 hover:shadow-premium transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row gap-12 items-start">
                {/* Left Side: Logo */}
                <div className={`w-40 flex-shrink-0 pt-2 text-2xl font-display font-black tracking-tighter italic ${t.logoColor}`}>
                  {t.company}
                </div>

                {/* Right Side: Content */}
                <div className="flex-1 space-y-8">
                  {/* Author Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-none overflow-hidden border-2 border-white shadow-sharp">
                        <img src={t.authorImage} alt={t.authorName} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xl font-display font-bold text-primary">{t.authorName}</h4>
                          <a href={t.authorLinkedin} target="_blank" rel="noopener noreferrer" className="text-[#0077b5] hover:scale-110 transition-transform">
                            <Linkedin size={18} fill="currentColor" stroke="none" />
                          </a>
                        </div>
                        <p className="text-sm text-primary/40 font-medium">{t.authorTitle}</p>
                      </div>
                    </div>
                    {/* Stars */}
                    <div className="flex gap-1 text-[#FFD700]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={20} fill="currentColor" stroke="none" />
                      ))}
                    </div>
                  </div>

                  {/* Body Text */}
                  <div 
                    className="text-lg text-primary/70 leading-relaxed font-sans"
                    dangerouslySetInnerHTML={{ __html: t.content.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }}
                  />

                  {/* Footer Links */}
                  <div className="flex justify-end items-center gap-8 pt-4 border-t border-primary/5">
                    <a href={t.companyUrl || "#"} target={t.companyUrl && t.companyUrl !== "#" ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-2 text-primary/60 hover:text-[#0047AB] font-bold text-sm tracking-tight transition-colors">
                      <FileText size={16} />
                      Check the original
                    </a>
                    <div className="w-[1px] h-4 bg-primary/10"></div>
                    <a href={t.projectUrl || "#"} className="flex items-center gap-2 text-primary/60 hover:text-[#0047AB] font-bold text-sm tracking-tight transition-colors">
                      <ExternalLink size={16} />
                      Check the project
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
