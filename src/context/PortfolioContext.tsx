"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioItem, initialProjects } from '@/lib/portfolio';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  date: string;
}

interface PortfolioContextType {
  portfolioItems: PortfolioItem[];
  contactSubmissions: ContactSubmission[];
  addItem: (item: Omit<PortfolioItem, 'id'>) => void;
  deleteItem: (id: string) => void;
  updateItem: (item: PortfolioItem) => void;
  addSubmission: (submission: Omit<ContactSubmission, 'id' | 'date'>) => void;
  deleteSubmission: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('portfolioItems');
    if (saved) {
      setPortfolioItems(JSON.parse(saved));
    } else {
      setPortfolioItems(initialProjects);
    }

    const savedMsgs = localStorage.getItem('contactSubmissions');
    if (savedMsgs) {
      setContactSubmissions(JSON.parse(savedMsgs));
    }
  }, []);

  const addItem = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem = { ...item, id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}` };
    setPortfolioItems(prev => {
      const updated = [...prev, newItem];
      localStorage.setItem('portfolioItems', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteItem = (id: string) => {
    setPortfolioItems(prev => {
      const updated = prev.filter(i => String(i.id) !== String(id));
      localStorage.setItem('portfolioItems', JSON.stringify(updated));
      return updated;
    });
  };

  const updateItem = (item: PortfolioItem) => {
    setPortfolioItems(prev => {
      const updated = prev.map(i => String(i.id) === String(item.id) ? item : i);
      localStorage.setItem('portfolioItems', JSON.stringify(updated));
      return updated;
    });
  };


  const addSubmission = (submission: Omit<ContactSubmission, 'id' | 'date'>) => {
    const newSubmission: ContactSubmission = {
      ...submission,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toLocaleString()
    };
    setContactSubmissions(prev => {
      const updated = [newSubmission, ...prev];
      localStorage.setItem('contactSubmissions', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteSubmission = (id: string) => {
    setContactSubmissions(prev => {
      const updated = prev.filter(s => String(s.id) !== String(id));
      localStorage.setItem('contactSubmissions', JSON.stringify(updated));
      return updated;
    });
  };



  return (
    <PortfolioContext.Provider value={{ 
      portfolioItems, contactSubmissions, addItem, deleteItem, updateItem, addSubmission, deleteSubmission 
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within a PortfolioProvider');
  return context;
}
