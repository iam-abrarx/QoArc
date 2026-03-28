"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Zap, 
  Layers, 
  BarChart3, 
  Globe, 
  ShieldCheck,
  Code2,
  Terminal,
  Sparkles,
  Search,
  Users
} from 'lucide-react';

import { useLeadCapture } from '@/context/LeadCaptureContext';

const fadeInUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

export default function AIIntegrationPage() {
  const { openModal } = useLeadCapture();
  return (
    <div className="bg-surface pt-40">
      {/* Hero - Sharpened */}
      <section className="px-8 pb-32 relative overflow-hidden bg-grid bg-[length:32px_32px] cad-line">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface pointer-events-none"></div>
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            <div className="text-precision">
               Engineering Protocol // Intelligence
            </div>
            <h1 className="text-8xl md:text-9xl font-display font-medium text-primary tracking-tighter leading-none italic">
              AI <span className="text-secondary">Integration.</span>
            </h1>
            <p className="text-2xl text-primary/60 max-w-xl font-sans leading-tight italic border-l-[0.5px] border-primary/20 pl-8">
              We don&apos;t just add chat boxes. We architect sovereign intelligence nodes that automate decision cycles and extract value from unstructured data.
            </p>
            <div className="flex flex-wrap gap-6 pt-8">
               <button 
                  onClick={openModal}
                  className="bg-primary text-white px-10 py-5 rounded-lg font-bold uppercase tracking-widest text-[11px] shadow-sharp hover:shadow-premium transition-all hover:scale-105 cursor-pointer"
               >
                  Start AI Scoping →
               </button>
               <div className="px-10 py-5 rounded-lg border-[0.5px] border-primary/10 text-primary font-bold text-[11px] uppercase tracking-widest bg-white shadow-sharp">
                  6–12 Week Delivery
               </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative group lg:block hidden"
          >
             <div className="relative bg-white border-[0.5px] border-primary/10 p-16 rounded-[32px] shadow-sharp shape-notched overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-10"></div>
                <div className="relative z-10 space-y-10">
                   <div className="flex items-center justify-between">
                      <Terminal size={32} className="text-primary/20" />
                      <div className="px-4 py-2 bg-primary/5 rounded-full text-precision">Active Node</div>
                   </div>
                   <div className="space-y-4">
                      <div className="h-2 w-3/4 bg-primary/10 rounded-full"></div>
                      <div className="h-2 w-1/2 bg-primary/5 rounded-full"></div>
                      <div className="h-2 w-2/3 bg-primary/20 rounded-full"></div>
                   </div>
                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <div className="text-4xl font-display font-medium italic text-primary">97.2%</div>
                         <div className="text-precision">Accuracy Parity</div>
                      </div>
                      <div className="space-y-2">
                         <div className="text-4xl font-display font-medium italic text-primary">0.04s</div>
                         <div className="text-precision">Latency Floor</div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Strip - Sharpened */}
      <section className="px-8 pb-40 cad-line bg-white">
         <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 py-24 px-12">
            {[
              { val: 'RAG-Native', label: 'Semantic Search Focus' },
              { val: 'Full IP Transfer', label: 'Client-Owned Models' },
              { val: 'Sovereign Nodes', label: 'On-Prem / Cloud' }
            ].map((m, i) => (
              <div key={m.label} className="space-y-4 border-l-[0.5px] border-primary/10 pl-8 group">
                 <div className="text-4xl font-display font-medium italic text-primary tracking-tighter group-hover:text-secondary transition-colors duration-500">{m.val}</div>
                 <div className="text-precision">{m.label}</div>
              </div>
            ))}
         </div>
      </section>

      {/* Services Breakdown - Sharpened */}
      <section className="py-40 px-8 bg-surface-container-low rounded-[40px] lg:mx-8 mb-8 cad-line">
         <div className="max-w-screen-2xl mx-auto space-y-32">
            <div className="max-w-2xl space-y-8">
               <h2 className="text-precision">Intelligence Modalities</h2>
               <h3 className="text-7xl font-display font-medium text-primary tracking-tight leading-none italic">
                 Sovereign <br/> <span className="opacity-40">Architectures.</span>
               </h3>
               <p className="text-xl text-primary/60 font-sans italic border-l-[0.5px] border-primary/20 pl-8 font-medium">
                 We specialize in these specific AI engineering domains to ensure technical superiority for our partners.
               </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                 { title: 'LLM Fine-Tuning', desc: 'Custom weights trained on your proprietary datasets (Legislation, Medicine, Finance).', icon: Code2 },
                 { title: 'Agentic Workflows', desc: 'Multi-agent systems that perform complex multi-step reasoning without human supervision.', icon: Zap },
                 { title: 'Cognitive RAG', desc: 'Advanced Retrieval Augmented Generation using semantic search and vector nodes.', icon: Search },
                 { title: 'Computer Vision', desc: 'Real-time object detection and video analytics for industrial and retail environments.', icon: Globe },
                 { title: 'Predictive Nodes', desc: 'Time-series forecasting and anomaly detection for supply chain and finance.', icon: BarChart3 },
                 { title: 'Voice & NLP', desc: 'High-fidelity transcription, translation, and natural language interfaces.', icon: Users }
               ].map((s, i) => (
                 <motion.div 
                   key={s.title} 
                   initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
                   whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                   transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                   viewport={{ once: true }}
                   whileHover={{ scale: 1.02, y: -5 }}
                   className="tonal-card p-12 flex flex-col justify-between min-h-[320px] group cad-crosshair rounded-xl shadow-sharp hover:shadow-premium transition-all"
                 >
                    <div className="space-y-8">
                       <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sharp">
                          <s.icon size={20} />
                       </div>
                       <div className="space-y-4">
                          <h4 className="text-3xl font-display font-medium text-primary leading-tight italic group-hover:text-primary transition-colors">{s.title}</h4>
                          <p className="text-sm text-primary/50 font-sans leading-relaxed italic opacity-80">{s.desc}</p>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 px-8 overflow-hidden bg-white">
         <div className="max-w-screen-2xl mx-auto flex flex-col items-center text-center gap-16">
            <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/30">AI Engineering Stack</div>
            <div className="flex flex-wrap justify-center gap-6">
               {['OpenAI', 'Anthropic', 'Llama-3', 'LangChain', 'Pinecone', 'Weights & Biases', 'PyTorch', 'vLLM', 'Nvidia CUDA'].map(t => (
                 <div key={t} className="px-8 py-4 rounded-lg bg-surface-container-low border border-outline-variant/10 text-xs font-bold text-primary italic shadow-sharp hover:shadow-premium transition-all">
                    {t}
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Case Study Snippet - Sharpened */}
      <section className="py-40 px-8 bg-white border-y border-outline-variant/10">
         <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
            <motion.div 
               initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
               whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               viewport={{ once: true }}
               className="space-y-12"
            >
               <h2 className="text-precision">Validation Model // BANCAT</h2>
               <h2 className="text-7xl font-display font-medium text-primary tracking-tighter italic leading-[0.85]">
                  Accelerated Data <br/> Extraction Node.
               </h2>
               <p className="text-xl text-primary/60 italic border-l-[0.5px] border-primary/20 pl-8 leading-tight">
                  Automating the extraction of 12,000+ medicinal chemistry papers with 97.2% human-parity accuracy.
               </p>
               <Link href="/work/bancat" className="inline-flex items-center gap-4 text-precision text-primary hover:text-secondary border-b-[0.5px] border-primary/10 pb-2 transition-all">
                  Analysis Report <ArrowRight size={10} />
               </Link>
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
               whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               viewport={{ once: true }}
               className="aspect-video bg-surface-container-low rounded-[32px] overflow-hidden shape-notched relative shadow-sharp border-[0.5px] border-primary/10"
            >
               <div className="absolute inset-0 bg-grid opacity-20"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles size={120} className="text-primary/10" />
               </div>
            </motion.div>
         </div>
      </section>

      {/* Pricing Signal */}
      <section className="py-40 px-8 text-center bg-surface">
         <div className="max-w-screen-md mx-auto space-y-12">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-primary/30">Engagement Signal</h2>
            <h2 className="text-7xl font-display font-medium text-primary tracking-tighter italic leading-none">
               AI nodes starting <br/> from $12,000.
            </h2>
            <div className="pt-8">
               <button 
                  onClick={openModal}
                  className="bg-primary text-white px-12 py-6 rounded-lg font-bold uppercase tracking-[0.2em] text-sm shadow-premium hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
               >
                  Request AI Audit →
               </button>
            </div>
         </div>
      </section>
    </div>
  );
}
