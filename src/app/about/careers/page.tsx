"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Globe,
  Workflow,
  ShieldAlert,
  FlaskConical,
  CheckCircle2,
  Upload,
  Video,
  FileText,
  Zap
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const fadeInUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

// Roles are now managed via PortfolioContext

export default function CareersPage() {
  const { jobOpenings } = usePortfolio();
  const [selectedRole, setSelectedRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleApply = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate high-fidelity processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <div className="bg-surface pt-40 pb-40">
      {/* Header - Sharpened */}
      <section className="px-8 pb-32">
        <div className="max-w-screen-2xl mx-auto space-y-12">
          <motion.div {...fadeInUp} className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary/30 italic">
            Cognitive Expansion // Recruitment Protocol
          </motion.div>
          <motion.h1 {...fadeInUp} transition={{ delay: 0.1 }} className="text-7xl md:text-8xl font-display font-medium text-primary tracking-tighter leading-none italic">
            Collaborative <br/> <span className="text-secondary">Nodes.</span>
          </motion.h1>
          <motion.p {...fadeInUp} transition={{ delay: 0.2 }} className="text-2xl text-primary/60 max-w-2xl font-sans leading-relaxed italic border-l-[0.5px] border-primary/20 pl-8">
            We are looking for elite engineers who prioritize structural logic over rapid shipping. Build things that last. Build things that lead.
          </motion.p>
        </div>
      </section>

      {/* Role Grid - Sharpened */}
      <section className="py-20 px-8 bg-white cad-line">
        <div className="max-w-screen-2xl mx-auto space-y-8">
           <h2 className="text-precision uppercase opacity-40 mb-12">Available Positions</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {jobOpenings.map((role, i) => (
                <motion.div 
                  key={role.title} 
                  {...fadeInUp} 
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="p-12 rounded-none bg-surface-container-low border border-primary/5 shadow-sharp group hover:border-primary/20 transition-all duration-500 relative overflow-hidden"
                >
                   <div className="space-y-8 relative z-10">
                      <div className="space-y-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-primary/40 italic">{role.team}</div>
                        <h3 className="text-3xl font-display font-medium italic text-primary leading-none group-hover:text-primary transition-colors">{role.title}</h3>
                      </div>
                      <p className="text-md text-primary/60 font-sans leading-relaxed italic opacity-80">{role.desc}</p>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-primary/30 border-l-[0.5px] border-primary/10 pl-4 italic">{role.type}</div>
                      <button 
                        onClick={() => handleApply(role.title)}
                        className="w-full py-5 rounded-none bg-white border border-primary/10 text-primary font-bold uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white transition-all shadow-sharp cursor-pointer active:scale-95"
                      >
                        Initiate Application →
                      </button>
                   </div>
                </motion.div>
              ))}
           </div>
            {jobOpenings.length === 0 && (
              <div className="py-20 text-center border-[0.5px] border-dashed border-primary/20 italic text-primary/40">
                No active nodes detected in the current cycle.
              </div>
            )}
        </div>
      </section>

      {/* Application Form Section - NEW & SHARP */}
      <section ref={formRef} className="py-40 px-8 bg-surface-container-low transition-all duration-1000">
        <div className="max-w-screen-xl mx-auto">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-12 md:p-20 rounded-none border border-primary/10 shadow-premium space-y-16"
              >
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-display font-medium text-primary tracking-tight leading-none italic">
                    Onboarding <span className="opacity-40">Protocol.</span>
                  </h2>
                  <p className="text-xl text-primary/50 font-sans italic border-l-[0.5px] border-primary/20 pl-8">
                    Submit your technical credentials and a 2-minute introductory video for architectural review.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-precision uppercase opacity-40">Personal Intelligence (Name)</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Elizabeth Archer"
                        className="w-full bg-surface py-5 px-8 border-[0.5px] border-primary/10 rounded-none outline-none focus:border-primary/40 transition-all font-sans italic"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-precision uppercase opacity-40">Communication Node (Email)</label>
                      <input 
                        required
                        type="email" 
                        placeholder="architect@qoarc.ai"
                        className="w-full bg-surface py-5 px-8 border-[0.5px] border-primary/10 rounded-none outline-none focus:border-primary/40 transition-all font-sans italic"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-precision uppercase opacity-40">Target Cluster (Role)</label>
                      <select 
                        required
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full bg-surface py-5 px-8 border-[0.5px] border-primary/10 rounded-none outline-none focus:border-primary/40 transition-all font-sans italic appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select a role...</option>
                        {jobOpenings.map(r => <option key={r.id} value={r.title}>{r.title}</option>)}
                        <option value="speculative">Speculative Node</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <label className="text-precision uppercase opacity-40 italic flex items-center gap-2">
                        <Video size={14} /> 2-Minute Intro Video (URL)
                      </label>
                      <input 
                        required
                        type="url" 
                        placeholder="Loom, Drive, or YouTube Link"
                        className="w-full bg-surface py-5 px-8 border-[0.5px] border-primary/10 rounded-none outline-none focus:border-primary/40 transition-all font-sans italic"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-precision uppercase opacity-40 italic flex items-center gap-2">
                      <FileText size={14} /> Technical Documentation (CV / PDF)
                    </label>
                    <div className="relative group">
                      <input 
                        required
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      />
                      <div className="w-full bg-surface py-10 border-[0.5px] border-dashed border-primary/20 rounded-none flex flex-col items-center justify-center gap-4 group-hover:bg-primary/5 transition-all">
                        <Upload className="text-primary/20 group-hover:text-primary transition-colors" size={32} />
                        <span className="text-precision opacity-40 group-hover:opacity-100 transition-opacity italic">Click to upload CV nodes or drag files here</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-10">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-6 bg-primary text-white font-bold uppercase tracking-[0.3em] text-xs rounded-none shadow-sharp hover:shadow-premium transition-all disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-4"
                    >
                      {isSubmitting ? 'Architecting Application...' : <>Submit Application Sequence <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" /></>}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary p-20 rounded-none shadow-premium text-center space-y-12"
              >
                <div className="w-24 h-24 rounded-none bg-white/10 mx-auto flex items-center justify-center text-white mb-8 border border-white/20">
                  <CheckCircle2 size={48} />
                </div>
                <div className="space-y-6">
                  <h2 className="text-6xl md:text-7xl font-display font-medium text-white italic leading-none">Transmission <br/> <span className="opacity-40">Received.</span></h2>
                  <p className="text-xl text-white/60 font-sans italic leading-relaxed max-w-2xl mx-auto border-t border-white/10 pt-12">
                     Your technical credentials have been logged in our research registry. Our engineering leads will review your node alignment within 48-72 hours.
                  </p>
                </div>
                <div className="pt-12">
                   <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-12 py-5 bg-white text-primary font-bold uppercase tracking-widest text-[10px] rounded-none hover:bg-white/90 transition-all cursor-pointer"
                   >
                     Reset Submission Node
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Benefits - Sharpened */}
      <section className="py-40 px-8 bg-surface-container-low rounded-none lg:mx-8 mb-40 overflow-hidden relative border-y border-primary/5">
        <div className="absolute top-0 right-0 p-32 opacity-[0.02] pointer-events-none text-primary">
           <Workflow size={400} />
        </div>
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-32 relative z-10">
           <div className="space-y-12">
              <h2 className="text-6xl md:text-7xl font-display font-medium text-primary tracking-tight leading-none italic">The QOARC <br/> <span className="opacity-40">Standard.</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                 {[
                   { t: 'Strategic R&D', d: '20% of your time dedicated to sovereign lab explorations.', icon: FlaskConical },
                   { t: 'Remote First', d: 'Work from anywhere with occasional HQ transmission nodes.', icon: Globe },
                   { t: 'Global Scale', d: 'Your code powers systems for US & EU market leaders.', icon: Zap },
                   { t: 'Hardened Ops', d: 'High-density benefits and competitive international rates.', icon: Sparkles }
                 ].map(b => (
                   <div key={b.t} className="space-y-6 border-l-[0.5px] border-primary/10 pl-8">
                      <div className="w-10 h-10 rounded-none bg-white border border-primary/10 flex items-center justify-center text-primary shadow-sharp">
                         <b.icon size={16} />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary italic text-xl mb-2">{b.t}</h4>
                        <p className="text-sm text-primary/50 font-sans leading-relaxed italic">{b.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           
           <motion.div {...fadeInUp} className="bg-primary p-20 rounded-none shadow-2xl text-white space-y-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldAlert size={120} />
              </div>
              <h3 className="text-4xl md:text-5xl font-display font-medium italic leading-[1.1] relative z-10">
                 We are not a <br/><span className="opacity-40">feature-factory.</span>
              </h3>
              <p className="text-xl font-sans leading-relaxed italic opacity-60 relative z-10">
                 We do not value tickets closed. We value structural integrity and architectural foresight. If you believe engineering is closer to architecture than to assembly, you belong here.
              </p>
              <div className="flex items-center gap-12 border-t border-white/10 pt-12 relative z-10">
                 <div className="text-center">
                    <div className="text-4xl font-display italic">12</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Elite Architects</div>
                 </div>
                  <div className="text-center">
                    <div className="text-4xl font-display italic">{jobOpenings.length.toString().padStart(2, '0')}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Open Roles</div>
                  </div>
                 <div className="text-center">
                    <div className="text-4xl font-display italic">100%</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">IP Autonomy</div>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Bottom CTA - Sharpened */}
      <section className="py-20 text-center mb-40 border-t border-primary/5">
         <div className="space-y-12">
            <h2 className="text-5xl font-display font-medium italic text-primary">No role matches your stack?</h2>
            <button 
              onClick={() => handleApply('speculative')}
              className="inline-block text-precision uppercase tracking-[0.4em] text-primary/40 hover:text-primary transition-all border-b-[0.5px] border-primary/20 pb-4 italic font-bold cursor-pointer bg-transparent"
            >
               Submit a Speculative Node Proposal →
            </button>
         </div>
      </section>
    </div>
  );
}
