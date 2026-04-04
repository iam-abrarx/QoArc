"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PortfolioItem, initialProjects } from '@/lib/portfolio';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
  date: string;
  assets?: { id: string, name: string, size: number }[];
}

export interface PartnerLogo {
  id: string;
  url: string;
  alt: string;
  isWide: boolean;
}

export interface JobOpening {
  id: string;
  title: string;
  team: string;
  type: string;
  desc: string;
}

export interface Testimonial {
  id: string;
  company: string;
  logoColor: string;
  authorName: string;
  authorTitle: string;
  authorImage: string;
  authorLinkedin: string;
  rating: number;
  content: string;
  companyUrl?: string;
  projectUrl?: string;
}

export interface LabItem {
  id: string;
  name: string;
  desc: string;
  node: string;
  imageUrl?: string;
}

export interface FooterInfo {
  email: string;
  linkedin: string;
  phone: string;
  address: string;
}

interface PortfolioContextType {
  portfolioItems: PortfolioItem[];
  contactSubmissions: ContactSubmission[];
  partnerLogos: PartnerLogo[];
  jobOpenings: JobOpening[];
  testimonials: Testimonial[];
  labItems: LabItem[];
  footerInfo: FooterInfo;
  addItem: (item: Omit<PortfolioItem, 'id'>) => void;
  deleteItem: (id: string) => void;
  updateItem: (item: PortfolioItem) => void;
  addSubmission: (submission: Omit<ContactSubmission, 'id' | 'date'>) => void;
  deleteSubmission: (id: string) => void;
  addPartnerLogo: (logo: Omit<PartnerLogo, 'id'>) => void;
  deletePartnerLogo: (id: string) => void;
  addJobOpening: (job: Omit<JobOpening, 'id'>) => void;
  deleteJobOpening: (id: string) => void;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;
  updateTestimonial: (testimonial: Testimonial) => void;
  addLabItem: (item: Omit<LabItem, 'id'>) => void;
  deleteLabItem: (id: string) => void;
  updateLabItem: (item: LabItem) => void;
  updateFooterInfo: (info: FooterInfo) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Helper: fetch with fallback (if DB not configured, fall back to hardcoded defaults)
async function fetchApi<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API ${url} returned ${res.status}`);
    return await res.json();
  } catch {
    console.warn(`Failed to fetch ${url}, using fallback data`);
    return fallback;
  }
}

const defaultTestimonials: Testimonial[] = [
  { id: '1', company: "BANcat", logoColor: "text-[#cc0000]", authorName: "Dr. Rafiq Ahmed", authorTitle: "Director of Operations, BANCAT Bangladesh", authorImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200&h=200", authorLinkedin: "#", rating: 5, content: "QOARC built a powerful platform for our cancer charity. It makes it simple for donors to find and support patients in real-time. The site is easy to use in both English and Bangla, helping us reach more people.", companyUrl: "https://bancat.org.bd", projectUrl: "/work/bancat" },
  { id: '2', company: "AsiaLinkage", logoColor: "text-[#002046]", authorName: "Shafiqul Islam", authorTitle: "Managing director", authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200", authorLinkedin: "#", rating: 5, content: "QOARC built a comprehensive digital catalog for our business. They created a structured website where all our products are beautifully categorized and easily accessible to our clients. It completely transformed how we showcase our inventory.", companyUrl: "https://asialinkage.com", projectUrl: "/work/asialinkage" },
  { id: '3', company: "2GO Bangladesh", logoColor: "text-[#ff6600]", authorName: "Noel Miazi", authorTitle: "Head of Digital, 2GO", authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200", authorLinkedin: "#", rating: 5, content: "Our new website is fast, modern, and looks great. QOARC made the shopping experience so much smoother for our customers. We've seen a huge improvement in how people interact with our brand.", companyUrl: "https://bout2go.com", projectUrl: "/work/2go" },
  { id: '5', company: "Epharma", logoColor: "text-[#008080]", authorName: "Nazmus Sakib", authorTitle: "Owner", authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200", authorLinkedin: "#", rating: 5, content: "QOARC developed a fast, reliable inventory management system for our local pharmacy. It helps us keep track of medicines, sales, and stock levels effortlessly. The system is easy to use and has completely modernized our daily operations.", companyUrl: "#", projectUrl: "#" },
  { id: '4', company: "Elizabeth Archer", logoColor: "text-[#b8860b]", authorName: "Elizabeth Kalinina", authorTitle: "Director of Photography", authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200", authorLinkedin: "#", rating: 5, content: "QOARC turned my photography portfolio into a high-end digital magazine. The cinematic feel and private client areas have completely changed how I present my work to filmmakers. It's truly elite.", companyUrl: "#", projectUrl: "/work/elizabeth" },
];

const defaultJobs: JobOpening[] = [
  { id: '1', title: 'Senior AI Engineer', team: 'Intelligence Node', type: 'Full-time // Remote/Hybrid', desc: 'Engineering RAG pipelines and GNN architectures for proprietary research nodes.' },
  { id: '2', title: 'Full-Stack Product Lead', team: 'SaaS Engineering', type: 'Full-time // Dhaka HQ', desc: 'Leading the end-to-end build of sovereign software systems for US/EU startups.' },
  { id: '3', title: 'UX / Systems Designer', team: 'Strategic Design', type: 'Full-time // Remote/Hybrid', desc: 'Designing high-fidelity "Intellectual Architect" interfaces for complex AI logic.' },
];

const defaultLabItems: LabItem[] = [
  { id: '1', name: 'Animal weight estimation from images', desc: 'A deep learning ML project for precision agriculture and livestock observation.', node: '0x01 // ARCHITECTURAL_RE' },
  { id: '2', name: 'Large scale PFAS generation for safety and toxicity analysis', desc: 'GNN-based toxicity modeling for accelerated materials science.', node: '0x02 // NEURAL_KINETICS' },
];

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [partnerLogos, setPartnerLogos] = useState<PartnerLogo[]>([]);
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [labItems, setLabItems] = useState<LabItem[]>([]);
  const [footerInfo, setFooterInfo] = useState<FooterInfo>({ 
    email: 'info@qoarc.com', 
    linkedin: 'https://linkedin.com',
    phone: '+880 1234 567890',
    address: 'Dhaka, Bangladesh'
  });

  // Fetch all data from API on mount
  useEffect(() => {
    fetchApi<PortfolioItem[]>('/api/projects', []).then(items => {
      // If the API returns any projects, we use them. 
      // If the API is empty, we fall back to initialProjects for the first-time setup.
      if (items && items.length > 0) {
        setPortfolioItems(items);
      } else {
        console.log('Database empty, initializing with default projects.');
        setPortfolioItems(initialProjects);
      }
    });
    fetchApi<ContactSubmission[]>('/api/submissions', []).then(setContactSubmissions);
    fetchApi<PartnerLogo[]>('/api/partner-logos', []).then(setPartnerLogos);
    fetchApi<JobOpening[]>('/api/job-openings', defaultJobs).then(items => {
      setJobOpenings(items && items.length > 0 ? items : defaultJobs);
    });
    fetchApi<Testimonial[]>('/api/testimonials', defaultTestimonials).then(items => {
      setTestimonials(items && items.length > 0 ? items : defaultTestimonials);
    });
    fetchApi<LabItem[]>('/api/lab-items', defaultLabItems).then(items => {
      setLabItems(items && items.length > 0 ? items : defaultLabItems);
    });

    // Footer info still uses localStorage (simple key-value, not worth a table)
    const savedFooter = localStorage.getItem('footerInfo');
    if (savedFooter) {
      setFooterInfo(JSON.parse(savedFooter));
    }
  }, []);

  // --- Projects ---
  const addItem = useCallback((item: Omit<PortfolioItem, 'id'>) => {
    const tempId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newItem = { ...item, id: tempId } as PortfolioItem;
    setPortfolioItems(prev => [...prev, newItem]);

    fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
      credentials: 'include',
    }).then(res => res.json()).then(data => {
      if (data.id && data.id !== tempId) {
        setPortfolioItems(prev => prev.map(p => p.id === tempId ? { ...p, id: data.id } : p));
      }
    }).catch(console.error);
  }, []);

  const deleteItem = useCallback((id: string) => {
    setPortfolioItems(prev => prev.filter(i => String(i.id) !== String(id)));
    fetch(`/api/projects/${id}`, { method: 'DELETE', credentials: 'include' }).catch(console.error);
  }, []);

  const updateItem = useCallback((item: PortfolioItem) => {
    setPortfolioItems(prev => prev.map(i => String(i.id) === String(item.id) ? item : i));
    fetch(`/api/projects/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
      credentials: 'include',
    }).catch(console.error);
  }, []);

  // --- Contact Submissions ---
  const addSubmission = useCallback((submission: Omit<ContactSubmission, 'id' | 'date'>) => {
    const tempId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newSubmission: ContactSubmission = {
      ...submission,
      id: tempId,
      date: new Date().toLocaleString(),
    };
    setContactSubmissions(prev => [newSubmission, ...prev]);

    fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    }).catch(console.error);
  }, []);

  const deleteSubmission = useCallback((id: string) => {
    setContactSubmissions(prev => prev.filter(s => String(s.id) !== String(id)));
    fetch(`/api/submissions/${id}`, { method: 'DELETE', credentials: 'include' }).catch(console.error);
  }, []);

  // --- Partner Logos ---
  const addPartnerLogo = useCallback((logo: Omit<PartnerLogo, 'id'>) => {
    const tempId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newLogo = { ...logo, id: tempId };
    setPartnerLogos(prev => [...prev, newLogo]);

    fetch('/api/partner-logos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logo),
      credentials: 'include',
    }).catch(console.error);
  }, []);

  const deletePartnerLogo = useCallback((id: string) => {
    setPartnerLogos(prev => prev.filter(l => String(l.id) !== String(id)));
    fetch(`/api/partner-logos/${id}`, { method: 'DELETE', credentials: 'include' }).catch(console.error);
  }, []);

  // --- Job Openings ---
  const addJobOpening = useCallback((job: Omit<JobOpening, 'id'>) => {
    const tempId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newJob = { ...job, id: tempId };
    setJobOpenings(prev => [...prev, newJob]);

    fetch('/api/job-openings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job),
      credentials: 'include',
    }).catch(console.error);
  }, []);

  const deleteJobOpening = useCallback((id: string) => {
    setJobOpenings(prev => prev.filter(j => String(j.id) !== String(id)));
    fetch(`/api/job-openings/${id}`, { method: 'DELETE', credentials: 'include' }).catch(console.error);
  }, []);

  // --- Testimonials ---
  const addTestimonial = useCallback((testimonial: Omit<Testimonial, 'id'>) => {
    const tempId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newTestimonial = { ...testimonial, id: tempId };
    setTestimonials(prev => [...prev, newTestimonial]);

    fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonial),
      credentials: 'include',
    }).catch(console.error);
  }, []);

  const deleteTestimonial = useCallback((id: string) => {
    setTestimonials(prev => prev.filter(t => String(t.id) !== String(id)));
    fetch(`/api/testimonials/${id}`, { method: 'DELETE', credentials: 'include' }).catch(console.error);
  }, []);

  const updateTestimonial = useCallback((testimonial: Testimonial) => {
    setTestimonials(prev => prev.map(t => String(t.id) === String(testimonial.id) ? testimonial : t));
    fetch(`/api/testimonials/${testimonial.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonial),
      credentials: 'include',
    }).catch(console.error);
  }, []);

  // --- Lab Items ---
  const addLabItem = useCallback((item: Omit<LabItem, 'id'>) => {
    const tempId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newItem = { ...item, id: tempId };
    setLabItems(prev => [...prev, newItem]);

    fetch('/api/lab-items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
      credentials: 'include',
    }).catch(console.error);
  }, []);

  const deleteLabItem = useCallback((id: string) => {
    setLabItems(prev => prev.filter(l => String(l.id) !== String(id)));
    fetch(`/api/lab-items/${id}`, { method: 'DELETE', credentials: 'include' }).catch(console.error);
  }, []);

  const updateLabItem = useCallback((item: LabItem) => {
    setLabItems(prev => prev.map(l => String(l.id) === String(item.id) ? item : l));
    fetch(`/api/lab-items/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
      credentials: 'include',
    }).catch(console.error);
  }, []);

  // --- Footer (stays localStorage for simplicity) ---
  const updateFooterInfo = useCallback((info: FooterInfo) => {
    setFooterInfo(info);
    localStorage.setItem('footerInfo', JSON.stringify(info));
  }, []);

  return (
    <PortfolioContext.Provider value={{ 
      portfolioItems, contactSubmissions, partnerLogos, jobOpenings, testimonials, labItems, footerInfo,
      addItem, deleteItem, updateItem, addSubmission, deleteSubmission, addPartnerLogo, deletePartnerLogo, addJobOpening, deleteJobOpening,
      addTestimonial, deleteTestimonial, updateTestimonial, addLabItem, deleteLabItem, updateLabItem, updateFooterInfo
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
