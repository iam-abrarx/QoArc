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
    const newItem = { ...item, id: Date.now().toString() };
    const updated = [...portfolioItems, newItem];
    setPortfolioItems(updated);
    localStorage.setItem('portfolioItems', JSON.stringify(updated));
  };

  const deleteItem = (id: string) => {
    const updated = portfolioItems.filter(i => i.id !== id);
    setPortfolioItems(updated);
    localStorage.setItem('portfolioItems', JSON.stringify(updated));
  };

  const updateItem = (item: PortfolioItem) => {
    const updated = portfolioItems.map(i => i.id === item.id ? item : i);
    setPortfolioItems(updated);
    localStorage.setItem('portfolioItems', JSON.stringify(updated));
  };

  const addSubmission = (submission: Omit<ContactSubmission, 'id' | 'date'>) => {
    const newSubmission: ContactSubmission = {
      ...submission,
      id: Date.now().toString(),
      date: new Date().toLocaleString()
    };
    const updated = [newSubmission, ...contactSubmissions];
    setContactSubmissions(updated);
    localStorage.setItem('contactSubmissions', JSON.stringify(updated));
  };

  const deleteSubmission = (id: string) => {
    const updated = contactSubmissions.filter(s => s.id !== id);
    setContactSubmissions(updated);
    localStorage.setItem('contactSubmissions', JSON.stringify(updated));
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
