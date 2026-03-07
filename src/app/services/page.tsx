"use client";

import React from 'react';
import { Brush, Cloud, Layers, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp: any = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }
};

export default function ServicesPage() {
  const services = [
    {
      title: 'Web Design & Development',
      description: 'We create bespoke digital experiences that are not only visually stunning but also engineered for maximum performance and conversion.',
      icon: <Brush className="text-accent-blue" size={32} />,
      accent: 'blue',
      features: ['UI/UX Strategy', 'Responsive Systems', 'Brand Identity', 'Performance Audit']
    },
    {
      title: 'AI Automation Solutions',
      description: 'Leverage the power of Generative AI to automate repetitive tasks, gain insights, and provide 24/7 intelligent support.',
      icon: <PsychologyIcon className="text-accent-purple" size={32} />,
      accent: 'purple',
      features: ['Custom AI Agents', 'Workflow Automation', 'Data Intelligence', 'Smart Chatbots']
    },
    {
      title: 'SaaS Development',
      description: 'End-to-end development of scalable Software-as-a-Service platforms, from architecture to deployment and maintenance.',
      icon: <Cloud className="text-accent-blue" size={32} />,
      accent: 'blue',
      features: ['Multi-tenant Arch', 'Cloud Infrastructure', 'API Ecosystems', 'Subscription Logic']
    },
    {
      title: 'Custom Tech Solutions',
      description: 'Unique business challenges require unique solutions. We build custom software tailored precisely to your operational needs.',
      icon: <Layers className="text-accent-purple" size={32} />,
      accent: 'purple',
      features: ['Legacy Migration', 'System Integration', 'Data Pipelines', 'Security Audits']
    }
  ];

  return (
    <div className="bg-grid min-h-screen pt-40 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-24">
          <h1 className="text-sm font-bold uppercase tracking-widest text-accent-blue mb-6">Our Expertise</h1>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tighter mb-8">Premium <span className="text-gradient-blue">Services</span></h2>
          <p className="max-w-2xl mx-auto text-xl text-text-muted">
            From intelligent web design to complex AI automation, we build the systems that power modern enterprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              {...fadeInUp}
              className={`group p-12 rounded-[48px] bg-bg-card border border-white/5 hover:border-accent-${service.accent}/50 hover:-translate-y-2 hover:glow-${service.accent} active:scale-[0.98] cursor-pointer transition-all duration-500`}
            >
              <div className={`w-16 h-16 bg-accent-${service.accent}/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-3xl font-display font-bold mb-6">{service.title}</h3>
              <p className="text-text-muted text-lg leading-relaxed mb-8">
                {service.description}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-white/70">
                {service.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <CheckCircle className={`text-accent-${service.accent}`} size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Map Psychology icon to Psychology (lucide - Brain or BrainCircuit)
function PsychologyIcon(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 8.105 4 4 0 0 0 8 0 4 4 0 0 0 .52-8.105 4 4 0 0 0-2.526-5.77A3 3 0 1 0 12 5z" />
      <path d="M9 13a4.5 4.5 0 0 0 3-4" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4" />
      <path d="M12 9v10" />
    </svg>
  );
}
