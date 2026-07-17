"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [percent, setPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 2500;
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

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(20px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[999] bg-primary flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Loading bar + label */}
          <div className="relative z-10 w-full max-w-xs flex flex-col items-center gap-5 px-6">
            {/* Progress Bar */}
            <div className="h-[2px] w-full bg-white/10 relative overflow-hidden rounded-full">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: percent / 100 }}
                transition={{ ease: 'linear' }}
                className="absolute inset-0 bg-secondary origin-left"
              />
            </div>

            {/* Domain label */}
            <span className="text-[11px] font-mono text-white/30 tracking-[0.2em] uppercase select-none">
              www.qoarc.com
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
