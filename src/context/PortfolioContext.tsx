"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PortfolioItem, initialProjects } from '@/lib/portfolio';
import { LabBlock } from '@/lib/labBlocks';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
  date: string;
  assets?: { id: string, name: string, size: number, url?: string }[];
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
  slug: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  featured: boolean;
  type: 'product' | 'research';
  docId: string;
  abstract: string;
  metrics: { val: string; label: string }[];
  motivation: string;
  methodology: string;
  tech: string[];
  results: string;
  arxiv: string;
  license: string;
  content?: LabBlock[];
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
  {
    id: 'pfas-rigidity',
    slug: 'pfas-rigidity',
    name: 'PFAS Rigidity Modeling',
    node: '0x01 // NEURAL_KINETICS',
    category: 'RESEARCH // GNN',
    date: 'July 12, 2026',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    type: 'research',
    docId: 'QOARC-2026-PFAS',
    abstract: 'Applying Hybrid GNN architectures and molecular rigidity hypotheses to predict the structural resilience and environmental persistence of Per- and Polyfluoroalkyl Substances (PFAS) in industrial water cycles.',
    metrics: [
      { val: '5.2M', label: 'Candidates Modeled' },
      { val: '98.5%', label: 'Prediction Precision' },
      { val: 'SAM2 + GNN', label: 'Neural Architecture' }
    ],
    motivation: 'Commercial filtration systems lack the ability to predict molecular degradation at scale. This research aims to identify "Unicorn" leads for biodegradable alternatives before synthesis.',
    methodology: 'The "Dual Brain" architecture combines Graph Convolutional Networks (GCN) with RDKit molecular descriptors. We utilized transfer learning from the ChEMBL database to specialize our toxicity prediction on fluorinated chains.',
    tech: ['Python', 'PyTorch', 'RDKit', 'ChEMBL', 'Neo4j', 'Ray Serve'],
    results: 'Our model identified 14 candidates for alternative surfactants that demonstrate a 60% higher degradation rate in standardized environmental simulations while maintaining industrial surfactant efficiency.',
    arxiv: 'https://arxiv.org/abs/example',
    license: 'Available for commercial licensing or custom development',
    desc: 'Applying Hybrid GNN architectures and the molecular rigidity hypothesis to predict environmental persistence and toxicity of PFAS in water cycles before chemical synthesis.'
  },
  {
    id: 'animal-weight',
    slug: 'animal-weight',
    name: 'Animal Weight Estimation',
    node: '0x02 // VISION_LIVESTOCK',
    category: 'RESEARCH // COMPUTER VISION',
    date: 'June 28, 2026',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    type: 'research',
    docId: 'QOARC-2026-ANIM',
    abstract: 'Applying advanced computer vision with Segment Anything 2 (SAM2) and Depth Anything v2 for non-invasive, precision agricultural livestock observation and mass estimation.',
    metrics: [
      { val: 'SAM2 + Depth', label: 'Neural Architecture' },
      { val: '92.4%', label: 'Estimation Accuracy' },
      { val: '0.8s', label: 'Inference Speed' }
    ],
    motivation: 'Traditional methods of livestock weight measurement are highly stress-inducing and logistically complex. This research leverages dual-perspective imaging to automate precise mass calculations in real-time.',
    methodology: 'The model utilizes SAM2 to segment the animal profile from background clutter, while Depth Anything v2 produces high-resolution relative depth maps. An integrated regression transformer maps the spatial volume to actual mass.',
    tech: ['Python', 'PyTorch', 'SAM 2', 'Depth Anything', 'OpenCV', 'FastAPI'],
    results: 'Evaluations on sheep and cattle cohorts demonstrated an estimation error rate of less than 7.6% under varied outdoor lighting conditions, paving the way for fully automated livestock monitoring.',
    arxiv: 'https://arxiv.org/abs/example-sam2',
    license: 'Open source research under Apache 2.0 license',
    desc: 'Using SAM2 and Depth Anything v2 for precision agricultural livestock observation and non-invasive weight mass estimation.'
  },
  {
    id: 'bancat-tech',
    slug: 'bancat-tech',
    name: 'Real-Time Sync on BANcat',
    node: '0x03 // LEDGER_SYNC',
    category: 'PRODUCT // HEALTHCARE',
    date: 'July 15, 2026',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    type: 'product',
    docId: 'QOARC-2026-BANCAT',
    abstract: 'Designing zero-latency distributed data pipelines and dual-language state management systems to power real-time cancer support and direct donor connections.',
    metrics: [
      { val: '99.9%', label: 'Sync Accuracy' },
      { val: '<150ms', label: 'Sync Latency' },
      { val: 'PostgreSQL', label: 'Transaction Engine' }
    ],
    motivation: 'Oncology charity organizations face massive friction in allocating emergency funds to patients in real-time, often plagued by disconnected payment logs and delayed balance sheets.',
    methodology: 'We engineered a bi-directional synchronization loop combining PostgreSQL transaction isolation levels (Serializable) with custom WebSocket channels to broadcast donor updates to client portals concurrently.',
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'WebSockets', 'Tailwind CSS'],
    results: 'Successfully processed donations supporting over 500 cancer patients in Bangladesh, maintaining absolute sync precision and a 0% double-ledger rate.',
    arxiv: 'https://bancat.org.bd',
    license: 'Proprietary platform architecture for non-profit operations',
    desc: 'How we built a bi-lingual, zero-latency donor communication system and real-time patient support ledger tracking for the BANCAT cancer charity foundation.'
  },
  {
    id: 'asialinkage-tech',
    slug: 'asialinkage-tech',
    name: 'B2B Catalog Indexing Engines',
    node: '0x04 // CATALOG_DB',
    category: 'PRODUCT // ENTERPRISE',
    date: 'July 10, 2026',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    type: 'product',
    docId: 'QOARC-2026-ASIA',
    abstract: 'Developing structured database schemas, multi-tier caching architectures, and search indexes to organize and serve extensive commercial catalogs for regional trade networks.',
    metrics: [
      { val: '75%', label: 'Query Speedup' },
      { val: '10K+', label: 'Catalog SKUs' },
      { val: 'Redis', label: 'Caching Tier' }
    ],
    motivation: 'B2B wholesale trading environments experience heavy database performance degradation when searching and filtering large, nested product hierarchies.',
    methodology: 'The engine implements PostgreSQL compound indexes alongside a write-through caching layer on Redis. Complex product variants are structured in JSONB fields, utilizing GIN indexes for fast fuzzy search queries.',
    tech: ['Next.js', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Framer Motion'],
    results: 'Achieved a 75% reduction in product listing query times, handling 10,000+ business items with instant autocomplete responses.',
    arxiv: 'https://asialinkage.com',
    license: 'Custom B2B licensing option available',
    desc: 'A technical study on custom relational database designs, catalog classifications, and indexing schemas built to organize business inventories for AsiaLinkage.'
  },
  {
    id: '2go-tech',
    slug: '2go-tech',
    name: 'checkout funnel optimization',
    node: '0x05 // CART_SYNC',
    category: 'PRODUCT // RETAIL',
    date: 'July 05, 2026',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    type: 'product',
    docId: 'QOARC-2026-2GO',
    abstract: 'Refactoring checkout state sync and client-side memory storage to streamline retail transactions and minimize cart abandonment in local delivery platforms.',
    metrics: [
      { val: '35%', label: 'Conversion Lift' },
      { val: 'Optimistic UI', label: 'State Sync' },
      { val: 'React Context', label: 'Cart Management' }
    ],
    motivation: 'Traditional e-commerce checkouts often suffer from slow server-side cart state resolution, causing shopping cart abandonments and bad user retention.',
    methodology: 'We redesigned the checkout funnel by moving the primary cart state to local storage with optimistic UI updates. API requests are batched and executed asynchronously in the background, keeping the path-to-purchase completely fluid.',
    tech: ['Next.js', 'Framer Motion', 'React Context', 'Tailwind CSS'],
    results: 'Cut down checkout steps from 6 to 3, achieving a 35% improvement in retail order completions for 2GO Bangladesh.',
    arxiv: 'https://bout2go.com',
    license: 'Commercial deployment architecture for retail platforms',
    desc: 'Revamping the digital checkout funnel and state synchronization for 2GO Bangladesh retail platform, resulting in minimized shopping friction.'
  }
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
