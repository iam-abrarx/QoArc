"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLeadCapture } from '@/context/LeadCaptureContext';
import LeadCaptureForm from './LeadCaptureForm';

export default function LeadCaptureModal() {
  const { isOpen, closeModal } = useLeadCapture();

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[100] bg-primary/20 backdrop-blur-2xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 md:inset-10 z-[101] bg-surface-container-low border border-primary/10 rounded-none shadow-premium overflow-hidden flex flex-col"
          >
             {/* Close Button Node */}
             <button 
                onClick={closeModal}
                className="absolute top-10 right-10 w-12 h-12 rounded-none bg-white border border-primary/5 flex items-center justify-center text-primary/40 hover:text-primary hover:bg-white transition-all shadow-sharp z-[102] group"
             >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
             </button>

             {/* Form Wrapper - Fixed height or scrollable */}
             <div className="flex-1 overflow-y-auto custom-scrollbar pt-20">
                <LeadCaptureForm />
             </div>

             {/* Background Decoration */}
             <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
