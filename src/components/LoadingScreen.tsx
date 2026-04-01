"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const statusSequence = [
  "INITIALIZING_ENGINE_CORE",
  "LOADING_NEURAL_ARCHITECTURES",
  "ESTABLISHING_HIGH_BANDWIDTH_SIGNAL",
  "CALIBRATING_VISUAL_NODES",
  "SYSTEM_READY"
];

export default function LoadingScreen() {
  const [percent, setPercent] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds total
    const interval = 30;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setPercent(prev => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return next;
      });
    }, interval);

    // Update status text
    const statusInterval = duration / statusSequence.length;
    const statusTimer = setInterval(() => {
      setStatusIndex(prev => {
        if (prev >= statusSequence.length - 1) {
          clearInterval(statusTimer);
          return prev;
        }
        return prev + 1;
      });
    }, statusInterval);

    return () => {
      clearInterval(timer);
      clearInterval(statusTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(20px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[999] bg-primary flex flex-col items-center justify-center p-8 overflow-hidden"
        >
          {/* Background Grid Scanning */}
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
          <motion.div 
            initial={{ y: '-100%' }}
            animate={{ y: '100%' }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 w-full h-[1px] bg-secondary/40 shadow-[0_0_20px_rgba(5,138,255,0.5)] z-0"
          ></motion.div>

          {/* Main Content */}
          <div className="relative z-10 w-full max-w-md space-y-12">
            <div className="space-y-4">
               <div className="flex justify-end items-end">
                  <div className="text-xl font-display font-medium italic text-white tracking-tighter">
                     {Math.round(percent)}%
                  </div>
               </div>
               
               {/* Progress Bar Container */}
               <div className="h-[2px] w-full bg-white/10 relative overflow-hidden rounded-full">
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: percent / 100 }}
                    transition={{ ease: "linear" }}
                    className="absolute inset-0 bg-secondary origin-left"
                  ></motion.div>
               </div>
            </div>

            <div className="flex justify-between items-center text-[8px] font-bold text-white/20 uppercase tracking-widest">
               <span>QOARC_OS v2.4.0</span>
               <span>Signal: Stabilized</span>
            </div>
          </div>

          {/* Logo Brand */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center justify-center transition-opacity duration-700">
             <Image 
               src="/images/logo/Qoarc_logo_White.png" 
               alt="QOARC Engineering" 
               width={120} 
               height={36} 
               className="w-auto h-6 opacity-40 mix-blend-plus-lighter drop-shadow-lg" 
             />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
