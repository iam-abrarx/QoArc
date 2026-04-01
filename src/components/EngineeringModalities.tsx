"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Terminal, 
  Zap, 
  Globe, 
  Cpu, 
  Plus, 
  Minus,
  ArrowRight,
  Layers,
  Search,
  Database,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

import PharmaAIAnimation from './PharmaAIAnimation';
import PharmaBIDashboard from './PharmaBIDashboard';

const categories = [
  {
    id: 'software',
    title: 'Custom Software Engineering',
    desc: 'Delivering high-concurrency, multi-tenant engineering solutions at global scale. We bridge complex architectural requirements with premium user experiences through sub-second latency and hardened security.',
    image: '/images/mockups/software-engineering.png',
    links: [
      { name: 'Web App Development', href: '/services/custom-software/web-app-development' },
      { name: 'Mobile App Development', href: '/services/custom-software/mobile-app-development' },
      { name: 'MVP Development', href: '/services/custom-software/mvp-development' },
      { name: 'Enterprise Software', href: '/services/custom-software/enterprise-software-development' },
      { name: 'SaaS Development', href: '/services/custom-software/saas-development' },
      { name: 'Custom CRM', href: '/services/custom-software/custom-crm' },
      { name: 'ERP Development', href: '/services/custom-software/erp-development' }
    ]
  },
  {
    id: 'ai-data',
    title: 'AI & Data Intelligence',
    desc: 'Engineering sovereign AI nodes and precision data pipelines. We move beyond simple wrappers to build deterministic intelligence layers into the core of your industrial systems.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
    links: [
      { name: 'ML Development', href: '/ai-data/machine-learning-development' },
      { name: 'MLOps Consulting', href: '/ai-data/mlops-consulting' },
      { name: 'Computer Vision', href: '/ai-data/computer-vision' },
      { name: 'NLP', href: '/ai-data/natural-language-processing' },
      { name: 'Business Intelligence', href: '/ai-data/business-intelligence' },
      { name: 'Predictive Analytics', href: '/ai-data/predictive-analytics' },
      { name: 'RPA Development', href: '/ai-data/rpa-development' },
      { name: 'IPA', href: '/ai-data/intelligent-process-automation' }
    ]
  },
  {
    id: 'consulting',
    title: 'IT & Strategy Consulting',
    desc: 'Architecting scientific go-to-market frameworks and high-fidelity technical blueprints. We ensure your digital transformation and solution architecture are designed for first-market capture.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop',
    links: [
      { name: 'GTM Strategy', href: '/services/it-consulting/gtm-strategy-consulting' },
      { name: 'Digital Transformation', href: '/services/it-consulting/digital-transformation-consulting' },
      { name: 'Solution Architecture', href: '/services/it-consulting/solution-architecture' }
    ]
  },
  {
    id: 'industries',
    title: 'Industry Sector Solutions',
    desc: 'Bespoke engineering solutions for mission-critical global sectors. We architect industry-compliant platforms for FinTech, Healthcare, and high-growth technology markets.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
    links: [
      { name: 'FinTech', href: '/industries/fintech' },
      { name: 'Healthcare', href: '/industries/healthcare' },
      { name: 'HRTech', href: '/industries/hrtech' },
      { name: 'Retail & eCommerce', href: '/industries/retail-ecommerce' },
      { name: 'Travel & Hospitality', href: '/industries/travel-hospitality' },
      { name: 'Manufacturing', href: '/industries/manufacturing' }
    ]
  }
];

export default function EngineeringModalities() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="py-24 px-8 bg-white cad-line overflow-hidden border-t-[0.5px] border-primary/10">
      <div className="max-w-screen-2xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-6">
            <div className="text-precision text-primary/40 uppercase tracking-widest">Global Ops // Service Framework</div>
            <h3 className="text-7xl font-display font-medium text-primary tracking-tight leading-none">
               The Services <br /> <span className="opacity-40">Portfolio.</span>
            </h3>
          </div>
          <div className="text-precision text-primary/40 hidden md:block max-w-xs text-right italic font-medium">
            04 Active Sectors // Full-Stack, AI & Global Industries
          </div>
        </div>

        {/* Accordion Container */}
        <div className="border-t-[0.5px] border-primary/10">
          {categories.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={item.id}
                className="border-b-[0.5px] border-primary/10 transition-colors duration-500"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full py-6 flex items-center gap-8 text-left group transition-all"
                >
                  <div className={`text-[#cc0000] flex-shrink-0 transition-transform duration-500 font-display text-3xl font-light w-8 flex justify-center`}>
                    {isOpen ? '—' : '+'}
                  </div>
                  <h4 className={`text-2xl md:text-4xl font-display font-medium text-primary tracking-tight transition-all ${isOpen ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
                    {item.title}
                  </h4>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-12 pt-4 grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left Content */}
                        <div className="space-y-10">
                          <p className="text-xl text-primary/80 font-sans leading-tight max-w-2xl border-l-[0.5px] border-primary/20 pl-8">
                            {item.desc}
                          </p>
                          
                          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 pl-8 pt-4">
                            {item.links.map((link, i) => (
                              <motion.div 
                                key={link.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 + 0.2 }}
                              >
                                <Link 
                                  href={link.href}
                                  className="flex items-center gap-6 group/link text-xl font-display text-primary/80 hover:text-primary transition-all underline-offset-8 hover:underline decoration-primary/20"
                                >
                                  <ArrowRight size={18} className="group-hover/link:translate-x-2 transition-transform text-[#cc0000]" strokeWidth={3} />
                                  <span className="font-bold">{link.name}</span>
                                </Link>
                              </motion.div>
                            ))}
                          </div>

                          <div className="pl-8 pt-6">
                             <button className="bg-primary text-white px-8 py-4 rounded-none font-bold uppercase tracking-widest text-[10px] shadow-sharp hover:scale-[1.03] transition-all">
                               Initiate Scope Sequence →
                             </button>
                          </div>
                        </div>

                        {/* Right Content - Mockup Scene */}
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="hidden lg:block h-[500px] relative rounded-none overflow-hidden shadow-sharp group/img bg-[#f0f2f5]"
                        >
                           {item.id === 'software' ? (
                             <div className="w-full h-full relative flex items-center justify-center p-12 overflow-hidden bg-[#e5e7eb]">
                                {/* Desk Texture/Background */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
                                <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black/5 to-transparent"></div>
                                
                                {/* Laptop on Table Mockup */}
                                <motion.div 
                                  whileHover={{ y: -5, rotateX: 2 }}
                                  className="relative w-full aspect-[16/10] max-w-xl z-10 transition-transform duration-700"
                                  style={{ perspective: '1000px' }}
                                >
                                   {/* Laptop Screen (Top) */}
                                   <div className="w-full h-full bg-[#080c14] rounded-t-xl border-[8px] border-[#1a1f2e] shadow-2xl relative overflow-hidden">
                                      {/* No notch as per previous UX standard */}
                                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20"></div>
                                      <PharmaBIDashboard />
                                   </div>
                                   
                                   {/* Laptop Base (Bottom/Table Surface) */}
                                   <div className="w-[104%] h-2 bg-[#0d1117] rounded-b-[4px] -ml-[2%] relative z-0 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)] border-t border-white/10"></div>
                                   <div className="w-[108%] h-2 bg-[#1a1f2e]/60 rounded-b-lg -ml-[4%] blur-[2px]"></div>
                                </motion.div>

                                {/* Perspective/Scene Details */}
                                <div className="absolute bottom-20 left-10 text-[80px] font-display italic opacity-[0.03] text-primary/40 select-none uppercase tracking-tighter">
                                   ENG // 2026
                                </div>
                             </div>
                           ) : item.id === 'ai-data' ? (
                             <PharmaAIAnimation />
                           ) : (
                             <>
                               <img 
                                  src={item.image} 
                                  alt={item.title} 
                                  className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110" 
                               />
                               <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-20"></div>
                             </>
                           )}
                           
                           <div className="absolute top-8 right-8 px-6 py-3 bg-white/10 backdrop-blur-md rounded-none border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest z-20">
                                Engineering // Verified
                           </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
