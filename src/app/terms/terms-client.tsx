"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

export default function TermsPage() {
  return (
    <div className="bg-surface pt-40 pb-40 px-8 bg-grid bg-[length:32px_32px]">
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface pointer-events-none"></div>
      <div className="max-w-screen-md mx-auto space-y-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
           <div className="text-precision uppercase">Operational Protocol // Engagement Node</div>
           <h1 className="text-7xl font-display font-medium text-primary tracking-tighter italic leading-none">Terms of <br/> <span className="text-secondary">Engagement.</span></h1>
           <p className="text-lg text-primary/60 font-sans italic border-l-[0.5px] border-primary/20 pl-8 leading-tight">Last Updated: March 2026</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true }}
          className="prose prose-sm prose-primary max-w-none text-primary/70 font-sans leading-relaxed space-y-12 italic font-medium opacity-60"
        >
           <section className="space-y-8 border-t-[0.5px] border-primary/10 pt-12">
              <div className="text-precision opacity-40 uppercase">Gate 01 // Engagement Boundary</div>
              <h2 className="text-3xl font-display font-medium text-primary italic leading-none">Strategic Parameters.</h2>
              <p>All architectural engagements with QOARC are governed by a mutual Discovery Document which defines the node map, delivery sequence, and IP transfer gates.</p>
           </section>

           <section className="space-y-8 border-t-[0.5px] border-primary/10 pt-12">
              <div className="text-precision opacity-40 uppercase">Gate 02 // IP Autonomy</div>
              <h2 className="text-3xl font-display font-medium text-primary italic leading-none">Asset Sovereignty.</h2>
              <p>Upon final reconciliation of the engagement invoice, 100% of the developed IP assets are transferred to the client. QOARC retains no &quot;logic locks&quot; on delivered production systems.</p>
           </section>

           <section className="space-y-8 border-t-[0.5px] border-primary/10 pt-12">
              <div className="text-precision opacity-40 uppercase">Gate 03 // Governing Node</div>
              <h2 className="text-3xl font-display font-medium text-primary italic leading-none">Jurisdictional Alignment.</h2>
              <p>Terms are governed by the laws of the jurisdiction specified in the Master Service Agreement (MSA), typically aligned with US or EU international commercial standards.</p>
           </section>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="pt-20 border-t-[0.5px] border-primary/10"
        >
           <Link href="/" className="text-precision opacity-40 hover:opacity-100 transition-all flex items-center gap-4">
              Return to Primary Node <ArrowRight size={14} />
           </Link>
        </motion.div>
      </div>
    </div>
  );
}
