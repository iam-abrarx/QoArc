"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LeadCaptureContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const LeadCaptureContext = createContext<LeadCaptureContextType | undefined>(undefined);

export function LeadCaptureProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <LeadCaptureContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </LeadCaptureContext.Provider>
  );
}

export function useLeadCapture() {
  const context = useContext(LeadCaptureContext);
  if (context === undefined) {
    throw new Error('useLeadCapture must be used within a LeadCaptureProvider');
  }
  return context;
}
