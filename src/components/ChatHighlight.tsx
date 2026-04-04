"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Cpu, Zap, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useChat } from '@/context/ChatContext';

export default function ChatHighlight() {
  const { openChat } = useChat();

  return (
    <section className="py-32 px-8 bg-[#000a18] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      
      {/* CAD Grid Overlay */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none"></div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-12 md:p-20 overflow-hidden relative group">
          {/* Subtle glow effect */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full"
              >
                <Sparkles size={14} className="text-primary-300" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Live smart assistance</span>
              </motion.div>

              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-display font-medium text-white tracking-tighter leading-none italic">
                  Instant Strategic <br />
                  <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>Assistance.</span>
                </h2>
                <p className="text-xl text-white/40 max-w-xl font-sans font-light leading-relaxed italic">
                  Our autonomous Intelligence Node is online 24/7. Get instant answers on project scoping, technical feasibility, and architectural frameworks.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 py-6">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <Cpu size={20} className="text-white" />
                  </div>
                  <h4 className="text-white font-display font-medium italic">Project Scoping</h4>
                  <p className="text-xs text-white/30 font-sans">Instant estimates and resource allocation logic.</p>
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-secondary shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <Zap size={20} className="text-white" />
                  </div>
                  <h4 className="text-white font-display font-medium italic">Tech Stack Advice</h4>
                  <p className="text-xs text-white/30 font-sans">Optimized recommendations for your specific use-case.</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openChat}
                className="inline-flex items-center gap-4 bg-white text-primary px-10 py-5 rounded-none font-bold uppercase tracking-widest text-xs shadow-premium group cursor-pointer"
              >
                Talk to Agent
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            <div className="relative">
              {/* Visual Representation of the Chatbot */}
              <div className="relative z-10 bg-[#001026] border border-white/10 rounded-2xl shadow-2xl p-8 space-y-6 transform lg:rotate-3 group-hover:rotate-0 transition-transform duration-700">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Cpu size={16} className="text-white" />
                    </div>
                    <span className="text-sm font-display font-medium text-white italic">Node 0x8F</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Online</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white/60 font-sans italic">
                    "Hello. I've analyzed your requirements. Based on the current market dynamics, a RAG-based architecture would be optimal for your SaaS platform."
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary text-white rounded-xl p-4 text-xs font-sans max-w-[80%]">
                      "That sounds great. What about the database latency?"
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white/60 font-sans italic">
                    "Latency can be mitigated by deploying Edge-Interceptors. Would you like a detailed schematic?"
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                  <div className="flex-1 h-10 bg-white/5 border border-white/10 rounded-full px-4 flex items-center text-[10px] text-white/20 italic">
                    Query Intelligence...
                  </div>
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Zap size={16} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Decorative elements behind the "window" */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 rounded-full blur-[80px] -z-10"></div>
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-24 h-24 border border-white/5 rounded-full flex items-center justify-center animate-spin-slow">
                <ShieldCheck size={40} className="text-white/5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
