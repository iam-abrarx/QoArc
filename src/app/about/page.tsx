"use client";

import React from 'react';
import { Users, Eye, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp: any = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }
};

export default function AboutPage() {
  return (
    <div className="bg-grid min-h-screen pt-40 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <motion.div {...fadeInUp}>
            <h1 className="text-sm font-bold uppercase tracking-widest text-accent-blue mb-6">Our Story</h1>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tighter mb-8">Visionary <span className="text-gradient-blue">Team</span></h2>
            <p className="text-xl text-text-muted leading-relaxed mb-10">
              QoArc Studio was founded on the belief that technology should be as intuitive as it is powerful. We are a collective of designers, engineers, and researchers dedicated to building the future of digital systems.
            </p>
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="text-3xl font-bold mb-2">3+</h4>
                <p className="text-sm text-text-muted uppercase tracking-widest font-bold">Projects Delivered</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold mb-2">6</h4>
                <p className="text-sm text-text-muted uppercase tracking-widest font-bold">Core Researchers</p>
              </div>
            </div>
          </motion.div>
          <motion.div {...fadeInUp} className="relative">
            <div className="aspect-square rounded-[60px] bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 border border-white/10 p-12 flex items-center justify-center">
              <div className="text-center">
                <Users size={80} className="text-white mb-6 mx-auto" strokeWidth={1.5} />
                <div className="text-2xl font-display font-bold">Driven by Innovation</div>
              </div>
            </div>
            {/* Decorative circle */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-blue/20 rounded-full blur-3xl animate-pulse"></div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { 
              title: 'Our Mission', 
              desc: 'To empower businesses with intelligent digital systems that provide practical problem solutions and drive sustainable growth.',
              icon: <Eye className="text-accent-blue" />,
            },
            { 
              title: 'Our Vision', 
              desc: 'To be the global leader in research-driven AI and automation solutions, shaping the future of technology.',
              icon: <Sparkles className="text-accent-purple" />,
            },
            { 
              title: 'Core Values', 
              desc: 'Excellence, Integrity, Innovation, and a relentless focus on delivering measurable value to our partners.',
              icon: <ShieldCheck className="text-accent-blue" />,
            }
          ].map((value, i) => (
            <motion.div key={i} {...fadeInUp}>
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                {value.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
              <p className="text-text-muted leading-relaxed">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
