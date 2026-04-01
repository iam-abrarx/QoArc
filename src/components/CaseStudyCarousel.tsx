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
                <div className="lg:w-[50%] bg-[#f8f9ff] relative overflow-hidden flex items-center justify-center p-12 lg:p-24 perspective-[2000px]">
                    <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none"></div>
                    
                    {/* Mockup Rendering Logic with 3D Transforms */}
                    <div className="relative w-full h-full flex items-center justify-center z-10 transition-transform duration-700 ease-out-quart">
                        {resolvedDeviceTypes[current] === 'mobile' && (
                          <motion.div 
                            initial={{ rotateY: -20, rotateX: 5, x: 20, opacity: 0 }}
                            animate={{ rotateY: -10, rotateX: 2, x: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative flex items-center justify-center gap-10"
                            style={{ transformStyle: 'preserve-3d' }}
                          >
                             {/* Primary Mobile - iPhone 16 Style (No Notch) */}
                             <div className="relative group">
                                {/* Hardware Buttons */}
                                <div className="absolute -left-[11px] top-24 w-[2px] h-10 bg-[#1a1f2e] rounded-l-md border-y border-white/5"></div>
                                <div className="absolute -left-[11px] top-40 w-[2px] h-16 bg-[#1a1f2e] rounded-l-md border-y border-white/5"></div>
                                <div className="absolute -left-[11px] top-60 w-[2px] h-16 bg-[#1a1f2e] rounded-l-md border-y border-white/5"></div>
                                <div className="absolute -right-[11px] top-44 w-[2px] h-20 bg-[#1a1f2e] rounded-r-md border-y border-white/5"></div>

                                <div className="w-64 aspect-[9/19.5] bg-[#001026] rounded-[48px] border-[10px] border-[#080c14] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.6)] overflow-hidden relative">
                                    <motion.div 
                                       animate={{ x: ['100%', '-100%'] }}
                                       transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                                       className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20"
                                    ></motion.div>
                                    <img src={cs.mobileMockups?.[0] || cs.imageUrl} alt="Mobile Mockup" className="w-full h-full object-cover" />
                                </div>
                             </div>
                          </motion.div>
                        )}

                        {resolvedDeviceTypes[current] === 'desktop' && (
                          <motion.div 
                            initial={{ y: 60, opacity: 0, rotateX: 10 }}
                            animate={{ y: 0, opacity: 1, rotateX: 5 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full max-w-3xl flex flex-col items-center"
                          >
                             <div className="w-full aspect-[16/10] bg-[#000814] rounded-t-[14px] border-[12px] border-[#080c14] shadow-2xl overflow-hidden relative">
                                <img src={cs.desktopMockups?.[0] || cs.imageUrl} alt="Desktop Mockup" className="w-full h-full object-cover" />
                             </div>
                             <div className="w-[102%] h-4 bg-[#0d1117] rounded-b-[40%] shadow-[0_25px_50px_-12px_rgba(0,0,0,1)] border-t border-white/5 relative z-20 flex justify-center">
                                <div className="w-24 h-[1px] bg-white/10 absolute top-0"></div>
                             </div>
                          </motion.div>
                        )}

                        {resolvedDeviceTypes[current] === 'mixed' && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="relative w-full h-full flex items-center justify-center p-8"
                          >
                             {/* Desktop Component (Static Background) */}
                             <motion.div 
                               initial={{ scale: 0.9, y: 20, rotateX: 5 }}
                               animate={{ scale: 1, y: 0, rotateX: 3 }}
                               className="w-full max-w-2xl flex flex-col items-center"
                             >
                                <div className="w-full aspect-[16/10] bg-[#000814] rounded-t-[12px] border-[10px] border-[#080c14] shadow-xl overflow-hidden relative">
                                   <img src={cs.desktopMockups?.[0] || cs.imageUrl} alt="Desktop Backdrop" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-[101%] h-3 bg-[#0d1117] rounded-b-[30%] border-t border-white/5 shadow-2xl"></div>
                             </motion.div>
                             
                             {/* Mobile Component (Floating Front) */}
                             <motion.div 
                               initial={{ x: 100, y: 100, rotateY: -15, opacity: 0 }}
                               animate={{ x: 60, y: 60, rotateY: -10, opacity: 1 }}
                               transition={{ delay: 0.5, duration: 1 }}
                               className="absolute bottom-1/2 translate-y-1/2 right-[10%] w-48 aspect-[9/19.5] bg-[#001026] rounded-[36px] border-[8px] border-[#080c14] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.7)] overflow-hidden z-30"
                             >
                                <img src={cs.mobileMockups?.[0] || cs.imageUrl} alt="Mobile Overlay" className="w-full h-full object-cover" />
                             </motion.div>
                          </motion.div>
                        )}
                    </div>

                    {/* Branding Watermark */}
                    <div className="absolute bottom-12 right-12 text-8xl font-display italic opacity-[0.02] text-[#002046] select-none uppercase tracking-tighter mix-blend-multiply">
                       {cs.id.replace(/-/g, '')}
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
