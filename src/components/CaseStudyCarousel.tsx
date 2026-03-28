"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Monitor,
  Smartphone,
  CheckCircle2
} from 'lucide-react';

import { usePortfolio } from '@/context/PortfolioContext';

const DEVICE_TYPES = ['mobile', 'tablet', 'desktop'] as const;

export default function CaseStudyCarousel() {
  const { portfolioItems } = usePortfolio();
  const caseStudies = portfolioItems.filter(item => item.status === 'published');
  
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  // Resolve 'random' device types to stable concrete types (seeded by index)
  const resolvedDeviceTypes = useMemo(() => {
    return caseStudies.map((item, i) => {
      if (item.deviceType === 'random' || !item.deviceType) {
        return DEVICE_TYPES[i % DEVICE_TYPES.length];
      }
      return item.deviceType;
    });
  }, [caseStudies]);

  if (caseStudies.length === 0) return null;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + caseStudies.length) % caseStudies.length);
  };

  const cs = caseStudies[current];

  return (
    <section className="py-32 px-8 bg-[#ebf5ff] border-t border-primary/5">
      <div className="max-w-screen-2xl mx-auto space-y-16">
        {/* Header - Centered */}
        <div className="text-center space-y-4">
           <div className="text-precision text-[#0024ff]/60 uppercase tracking-widest">Engineering Showcase // 2026</div>
           <h2 className="text-4xl md:text-5xl font-display font-medium text-[#002046] tracking-tight leading-none group">
              Real-World Case Studies in <span className="opacity-40">Intelligent Software Development</span>
           </h2>
        </div>

        {/* Carousel Content */}
        <div className="relative">
           {/* Side Navigation Buttons */}
           <div className="absolute top-1/2 -translate-y-1/2 -left-20 z-20 hidden lg:block">
              <button 
                onClick={() => paginate(-1)}
                className="w-14 h-14 rounded-none bg-[#002046] text-white flex items-center justify-center hover:scale-110 transition-all shadow-premium"
              >
                 <ChevronLeft size={24} />
              </button>
           </div>
           <div className="absolute top-1/2 -translate-y-1/2 -right-20 z-20 hidden lg:block">
              <button 
                onClick={() => paginate(1)}
                className="w-14 h-14 rounded-none bg-[#002046] text-white flex items-center justify-center hover:scale-110 transition-all shadow-premium"
              >
                 <ChevronRight size={24} />
              </button>
           </div>

           <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 }
                }}
                className="w-full bg-white rounded-none border border-primary/5 shadow-sharp overflow-hidden flex flex-col lg:flex-row min-h-[650px]"
              >
                {/* Left Side: Text Info */}
                <div className="flex-1 p-12 lg:p-20 space-y-12 bg-white flex flex-col justify-center">
                  <div className="space-y-4">
                      <div className="text-[10px] font-bold tracking-[0.2em] text-[#0024ff] uppercase">
                         {cs.category}
                      </div>
                      <h3 className="text-4xl md:text-5xl font-display font-medium text-[#002046] tracking-tight leading-tight">
                         {cs.name}
                      </h3>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                         <h5 className="text-[12px] font-bold uppercase tracking-widest text-[#0024ff] italic">Challenges</h5>
                         <p className="text-lg text-[#002046]/70 leading-relaxed font-sans">
                            {cs.challenges || cs.challenge}
                         </p>
                      </div>
                      <div className="space-y-4">
                         <h5 className="text-[12px] font-bold uppercase tracking-widest text-[#0024ff] italic">Solutions</h5>
                         <p className="text-lg text-[#002046]/70 leading-relaxed font-sans">
                            {cs.solutions || cs.solution}
                         </p>
                      </div>
                   </div>

                   <div className="flex flex-wrap items-center gap-12 pt-8 border-t border-primary/5">
                      {cs.stats?.map((stat, i) => (
                         <div key={i} className="space-y-1">
                            <div className="text-4xl font-display font-bold text-[#0024ff]">{stat.value}</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#002046]/40">{stat.label}</div>
                         </div>
                      ))}
                   </div>

                   <div className="pt-8">
                      <a 
                        href={cs.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 bg-[#0024ff] text-white px-10 py-5 rounded-none font-bold uppercase tracking-widest text-[11px] hover:shadow-premium transition-all hover:scale-105"
                      >
                         View Case Study <ArrowRight size={14} />
                      </a>
                   </div>
                </div>

                {/* Right Side: Mockups */}
                <div className="lg:w-[45%] bg-[#f8f9ff] relative overflow-hidden flex items-center justify-center p-12 lg:p-20">
                    <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none"></div>
                    
                    {/* Mockup Rendering Logic */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        {resolvedDeviceTypes[current] === 'mobile' && (
                          <div className="relative flex items-center justify-center gap-8">
                            <motion.div 
                              initial={{ y: 50, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.2, duration: 0.6 }}
                              className="w-56 aspect-[9/19] bg-[#002046] rounded-[40px] border-[8px] border-[#002046] shadow-premium overflow-hidden relative z-10"
                            >
                                <img src={cs.mobileMockups?.[0] || cs.imageUrl} alt="Mockup 1" className="w-full h-full object-cover" />
                            </motion.div>
                            <motion.div 
                              initial={{ y: 100, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.4, duration: 0.6 }}
                              className="w-56 aspect-[9/19] bg-[#002046] rounded-[40px] border-[8px] border-[#002046] shadow-premium overflow-hidden relative hidden xl:block translate-y-20 -rotate-6"
                            >
                                <img src={cs.mobileMockups?.[1] || cs.imageUrl} alt="Mockup 2" className="w-full h-full object-cover" />
                            </motion.div>
                          </div>
                        )}

                        {resolvedDeviceTypes[current] === 'tablet' && (
                          <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="w-full max-w-lg aspect-[3/4] bg-[#002046] rounded-[24px] border-[12px] border-[#002046] shadow-premium overflow-hidden relative"
                          >
                             <img src={cs.desktopMockups?.[0] || cs.imageUrl} alt="Tablet Mockup" className="w-full h-full object-cover" />
                          </motion.div>
                        )}

                        {resolvedDeviceTypes[current] === 'desktop' && (
                          <motion.div 
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="w-full max-w-2xl aspect-video bg-[#001026] rounded-none border-[10px] border-[#002046] shadow-premium overflow-hidden relative"
                          >
                             {/* Mac Bar */}
                             <div className="absolute top-0 left-0 w-full h-6 bg-[#002046] flex items-center px-4 gap-1.5 border-b border-white/5">
                                <div className="w-2 h-2 rounded-full bg-red-500/40"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500/40"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500/40"></div>
                             </div>
                             <img src={cs.desktopMockups?.[0] || cs.imageUrl} alt="Desktop Mockup" className="w-full h-full object-cover pt-6" />
                          </motion.div>
                        )}
                    </div>

                    {/* Branding Watermark */}
                    <div className="absolute bottom-12 right-12 text-6xl font-display italic opacity-5 text-[#002046]">
                       {cs.id.toUpperCase()}
                    </div>
                </div>
              </motion.div>
           </AnimatePresence>

           {/* Pagination Dots */}
           <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3">
              {caseStudies.map((_, i) => (
                 <button 
                   key={i}
                   onClick={() => setCurrent(i)}
                   className={`h-1.5 transition-all duration-500 rounded-none ${i === current ? 'w-12 bg-[#0024ff]' : 'w-6 bg-[#0024ff]/20'}`}
                 />
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
