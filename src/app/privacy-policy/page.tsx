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

export default function PrivacyPolicyPage() {
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
           <div className="text-precision uppercase">Legal Protocol // Repository Node</div>
           <h1 className="text-7xl font-display font-medium text-primary tracking-tighter italic leading-none">Privacy <span className="text-secondary">Assurance.</span></h1>
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
              <div className="text-precision opacity-40 uppercase">Section 01 // Introduction</div>
              <h2 className="text-3xl font-display font-medium text-primary italic leading-none">Architectural Intent.</h2>
              <p>At QOARC, privacy is not a checkbox; it is a structural requirement of our architectural nodes. This policy outlines how we handle data across our global transmission network.</p>
           </section>

           <section className="space-y-8 border-t-[0.5px] border-primary/10 pt-12">
              <div className="text-precision opacity-40 uppercase">Section 02 // Sovereignty</div>
              <h2 className="text-3xl font-display font-medium text-primary italic leading-none">Sovereign Data Ownership.</h2>
              <p>We believe in full IP and data autonomy. Any data processed through our custom nodes remains 100% the property of the client. We do not utilize client data to train our internal global models unless explicitly contracted for a per-client fine-tuning node.</p>
           </section>

           <section className="space-y-8 border-t-[0.5px] border-primary/10 pt-12">
              <div className="text-precision opacity-40 uppercase">Section 03 // Encryption</div>
              <h2 className="text-3xl font-display font-medium text-primary italic leading-none">Hardened Standards.</h2>
              <p>All data at rest is encrypted via AES-256. All transmission nodes are hardened via TLS 1.3 and verified against our internal &quot;Zero Trust&quot; architectural standard.</p>
           </section>

           <section className="space-y-8 border-t-[0.5px] border-primary/10 pt-12">
              <div className="text-precision opacity-40 uppercase">Section 04 // Contact</div>
              <h2 className="text-3xl font-display font-medium text-primary italic leading-none">Legal Transmissions.</h2>
              <p>For inquiries regarding GDPR or data security standards, contact our legal node at legal@qoarc.ai.</p>
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
