"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
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
}

export interface LabItem {
  id: string;
  name: string;
  desc: string;
  node: string;
}

export interface FooterInfo {
  email: string;
  linkedin: string;
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

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [partnerLogos, setPartnerLogos] = useState<PartnerLogo[]>([]);
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [labItems, setLabItems] = useState<LabItem[]>([]);
  const [footerInfo, setFooterInfo] = useState<FooterInfo>({ email: 'info@qoarc.com', linkedin: 'https://linkedin.com' });

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

    const savedLogos = localStorage.getItem('partnerLogos');
    if (savedLogos) {
      setPartnerLogos(JSON.parse(savedLogos));
    }

    const savedJobs = localStorage.getItem('jobOpenings');
    if (savedJobs) {
      setJobOpenings(JSON.parse(savedJobs));
    } else {
      setJobOpenings([
        { id: '1', title: 'Senior AI Engineer', team: 'Intelligence Node', type: 'Full-time // Remote/Hybrid', desc: 'Engineering RAG pipelines and GNN architectures for proprietary research nodes.' },
        { id: '2', title: 'Full-Stack Product Lead', team: 'SaaS Engineering', type: 'Full-time // Dhaka HQ', desc: 'Leading the end-to-end build of sovereign software systems for US/EU startups.' },
        { id: '3', title: 'UX / Systems Designer', team: 'Strategic Design', type: 'Full-time // Remote/Hybrid', desc: 'Designing high-fidelity "Intellectual Architect" interfaces for complex AI logic.' }
      ]);
    }

    // Force re-seed of testimonials as requested
    localStorage.removeItem('testimonials');
    const savedTestimonials = localStorage.getItem('testimonials');
    if (savedTestimonials) {
      setTestimonials(JSON.parse(savedTestimonials));
    } else {
      setTestimonials([
        {
          id: '1',
          company: "BANcat",
          logoColor: "text-[#cc0000]",
          authorName: "Dr. Rafiq Ahmed",
          authorTitle: "Director of Operations, BANCAT Bangladesh",
          authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
          authorLinkedin: "#",
          rating: 5,
          content: "QOARC built a powerful platform for our cancer charity. It makes it simple for donors to find and support patients in real-time. The site is easy to use in both English and Bangla, helping us reach more people.",
        },
        {
          id: '2',
          company: "AsiaLinkage",
          logoColor: "text-[#002046]",
          authorName: "Tanvir Hossain",
          authorTitle: "CEO, AsiaLinkage International",
          authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
          authorLinkedin: "#",
          rating: 5,
          content: "QOARC built a comprehensive digital catalogue for our business. They created a structured website where all our products are beautifully categorized and easily accessible to our clients. It completely transformed how we showcase our inventory.",
        },
        {
          id: '3',
          company: "2GO Bangladesh",
          logoColor: "text-[#ff6600]",
          authorName: "Nusrat Jahan",
          authorTitle: "Head of Digital, 2GO",
          authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
          authorLinkedin: "#",
          rating: 5,
          content: "Our new website is fast, modern, and looks great. QOARC made the shopping experience so much smoother for our customers. We've seen a huge improvement in how people interact with our brand.",
        },
        {
          id: '4',
          company: "Elizabeth Archer",
          logoColor: "text-[#b8860b]",
          authorName: "Elizabeth Archer",
          authorTitle: "Director of Photography",
          authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
          authorLinkedin: "#",
          rating: 5,
          content: "QOARC turned my photography portfolio into a high-end digital magazine. The cinematic feel and private client areas have completely changed how I present my work to filmmakers. It's truly elite.",
        },
        {
          id: '5',
          company: "Nazmus Sakib Pharmacy",
          logoColor: "text-[#008080]",
          authorName: "Nazmus Sakib",
          authorTitle: "Owner",
          authorImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=200&auto=format&fit=crop",
          authorLinkedin: "#",
          rating: 5,
          content: "QOARC developed a fast, reliable inventory management system for our local pharmacy. It helps us keep track of medicines, sales, and stock levels effortlessly. The system is easy to use and has completely modernized our daily operations.",
        }
      ]);
      // Save the new defaults
      localStorage.setItem('testimonials', JSON.stringify([
        {
          id: '1',
          company: "BANcat",
          logoColor: "text-[#cc0000]",
          authorName: "Dr. Rafiq Ahmed",
          authorTitle: "Director of Operations, BANCAT Bangladesh",
          authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
          authorLinkedin: "#",
          rating: 5,
          content: "QOARC built a powerful platform for our cancer charity. It makes it simple for donors to find and support patients in real-time. The site is easy to use in both English and Bangla, helping us reach more people.",
        },
        {
          id: '2',
          company: "AsiaLinkage",
          logoColor: "text-[#002046]",
          authorName: "Tanvir Hossain",
          authorTitle: "CEO, AsiaLinkage International",
          authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
          authorLinkedin: "#",
          rating: 5,
          content: "QOARC built a comprehensive digital catalogue for our business. They created a structured website where all our products are beautifully categorized and easily accessible to our clients. It completely transformed how we showcase our inventory.",
        },
        {
          id: '3',
          company: "2GO Bangladesh",
          logoColor: "text-[#ff6600]",
          authorName: "Nusrat Jahan",
          authorTitle: "Head of Digital, 2GO",
          authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
          authorLinkedin: "#",
          rating: 5,
          content: "Our new website is fast, modern, and looks great. QOARC made the shopping experience so much smoother for our customers. We've seen a huge improvement in how people interact with our brand.",
        },
        {
          id: '4',
          company: "Elizabeth Archer",
          logoColor: "text-[#b8860b]",
          authorName: "Elizabeth Archer",
          authorTitle: "Director of Photography",
          authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
          authorLinkedin: "#",
          rating: 5,
          content: "QOARC turned my photography portfolio into a high-end digital magazine. The cinematic feel and private client areas have completely changed how I present my work to filmmakers. It's truly elite.",
        },
        {
          id: '5',
          company: "Nazmus Sakib Pharmacy",
          logoColor: "text-[#008080]",
          authorName: "Nazmus Sakib",
          authorTitle: "Owner",
          authorImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=200&auto=format&fit=crop",
          authorLinkedin: "#",
          rating: 5,
          content: "QOARC developed a fast, reliable inventory management system for our local pharmacy. It helps us keep track of medicines, sales, and stock levels effortlessly. The system is easy to use and has completely modernized our daily operations.",
        }
      ]));
    }

    // Force re-seed of lab items
    localStorage.removeItem('labItems');
    const savedLab = localStorage.getItem('labItems');
    if (savedLab) {
      setLabItems(JSON.parse(savedLab));
    } else {
      const defaultLabItems = [
        { id: '1', name: 'Animal weight estimation from images', desc: 'A deep learning ML project for precision agriculture and livestock observation.', node: '0x01 // ARCHITECTURAL_RE' },
        { id: '2', name: 'Large scale PFAS generation for safety and toxicity analysis', desc: 'GNN-based toxicity modeling for accelerated materials science.', node: '0x02 // NEURAL_KINETICS' }
      ];
      setLabItems(defaultLabItems);
      localStorage.setItem('labItems', JSON.stringify(defaultLabItems));
    }

    const savedFooter = localStorage.getItem('footerInfo');
    if (savedFooter) {
      setFooterInfo(JSON.parse(savedFooter));
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

  const addPartnerLogo = (logo: Omit<PartnerLogo, 'id'>) => {
    const newLogo = { ...logo, id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}` };
    setPartnerLogos(prev => {
      const updated = [...prev, newLogo];
      localStorage.setItem('partnerLogos', JSON.stringify(updated));
      return updated;
    });
  };

  const deletePartnerLogo = (id: string) => {
    setPartnerLogos(prev => {
      const updated = prev.filter(l => String(l.id) !== String(id));
      localStorage.setItem('partnerLogos', JSON.stringify(updated));
      return updated;
    });
  };

  const addJobOpening = (job: Omit<JobOpening, 'id'>) => {
    const newJob = { ...job, id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}` };
    setJobOpenings(prev => {
      const updated = [...prev, newJob];
      localStorage.setItem('jobOpenings', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteJobOpening = (id: string) => {
    setJobOpenings(prev => {
      const updated = prev.filter(j => String(j.id) !== String(id));
      localStorage.setItem('jobOpenings', JSON.stringify(updated));
      return updated;
    });
  };

  const addTestimonial = (testimonial: Omit<Testimonial, 'id'>) => {
    const newTestimonial = { ...testimonial, id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}` };
    setTestimonials(prev => {
      const updated = [...prev, newTestimonial];
      localStorage.setItem('testimonials', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => {
      const updated = prev.filter(t => String(t.id) !== String(id));
      localStorage.setItem('testimonials', JSON.stringify(updated));
      return updated;
    });
  };

  const updateTestimonial = (testimonial: Testimonial) => {
    setTestimonials(prev => {
      const updated = prev.map(t => String(t.id) === String(testimonial.id) ? testimonial : t);
      localStorage.setItem('testimonials', JSON.stringify(updated));
      return updated;
    });
  };

  const addLabItem = (item: Omit<LabItem, 'id'>) => {
    const newItem = { ...item, id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}` };
    setLabItems(prev => {
      const updated = [...prev, newItem];
      localStorage.setItem('labItems', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteLabItem = (id: string) => {
    setLabItems(prev => {
      const updated = prev.filter(l => String(l.id) !== String(id));
      localStorage.setItem('labItems', JSON.stringify(updated));
      return updated;
    });
  };

  const updateLabItem = (item: LabItem) => {
    setLabItems(prev => {
      const updated = prev.map(l => String(l.id) === String(item.id) ? item : l);
      localStorage.setItem('labItems', JSON.stringify(updated));
      return updated;
    });
  };

  const updateFooterInfo = (info: FooterInfo) => {
    setFooterInfo(info);
    localStorage.setItem('footerInfo', JSON.stringify(info));
  };

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
