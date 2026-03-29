"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  PlusCircle, LogOut, ArrowLeft, Edit3, Edit2, Quote, Trash2, List, 
  Rocket, PlayCircle, Image, FileText, ChevronRight, 
  Layout, Save, X, Plus, AlertCircle, CheckCircle2,
  Lock, ArrowRight, Loader2, Mail, LayoutGrid, Download, Briefcase, Monitor
} from 'lucide-react';
import { usePortfolio, JobOpening } from '@/context/PortfolioContext';
import { PartnerLogo } from '@/context/PortfolioContext';
import { PortfolioItem } from '@/lib/portfolio';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetFromDB } from '@/lib/idb';

function AdminContent() {

  const { 
    portfolioItems, addItem, updateItem, deleteItem, 
    contactSubmissions, deleteSubmission, 
    partnerLogos, addPartnerLogo, deletePartnerLogo, 
    jobOpenings, addJobOpening, deleteJobOpening,
    testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
    labItems, addLabItem, updateLabItem, deleteLabItem,
    footerInfo, updateFooterInfo
  } = usePortfolio();
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSeedData = () => {
    if (confirm('Forces-sync with real content? This will ensure all dynamic sections have initial data.')) {
      alert('The real content is now the default seed in the codebase. Clear your browser storage to see it as the fresh initial state.');
    }
  };

  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'messages' | 'logos' | 'careers' | 'testimonials' | 'lab' | 'settings'>('projects');
  
  const [newLogo, setNewLogo] = useState<Partial<PartnerLogo>>({ url: '', alt: '', isWide: false });
  const [newJob, setNewJob] = useState<Partial<JobOpening>>({ title: '', team: '', type: '', desc: '' });
  
  const [newTestimonial, setNewTestimonial] = useState<any>({
    company: '',
    logoColor: 'text-[#0047AB]',
    authorName: '',
    authorTitle: '',
    authorImage: 'https://69c86795a9fb0ef7c012e385.imgix.net/testimonial%20female.jpg',
    authorLinkedin: '#',
    rating: 5,
    content: ''
  });
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);

  const [newLabItem, setNewLabItem] = useState<any>({
    id: '',
    name: '',
    description: '',
    category: ''
  });

  const [footerSettings, setFooterSettings] = useState(footerInfo);
  
  const [newItem, setNewItem] = useState<Partial<PortfolioItem>>({
    name: '',
    client: '',
    slug: '',
    description: '',
    category: '',
    industry: '',
    services: [],
    year: '',
    techStack: [],
    heroImage: '',
    intro: '',
    duration: '',
    scope: '',
    platform: '',
    deliverables: [],
    teamRole: '',
    challenge: '',
    goal: '',
    solution: '',
    keyFeatures: [],
    designDirection: '',
    outcome: '',
    imageUrl: '',
    galleryImages: [],
    mobileMockups: [],
    desktopMockups: [],
    videoUrl: '',
    uiComponents: [],
    systemDiagram: '',
    systemDiagramCaption: '',
    url: '',
    metaTitle: '',
    metaDescription: '',
    isFeatured: false,
    status: 'published',
    deviceType: 'desktop',
    primaryColor: '#002046',
    challenges: '',
    solutions: '',
    stats: [{ label: 'Performance', value: '+40%' }]
  });

  useEffect(() => {
    const auth = localStorage.getItem('isAdmin') === 'true';
    setIsLoggedIn(auth);
    
    // Handle deep linking for edit
    const editId = searchParams.get('edit');
    if (editId && auth) {
      const item = portfolioItems.find(i => i.id === editId);
      if (item) {
        handleEdit(item);
      }
    }
  }, [portfolioItems, searchParams]);

  const sha256 = async (str: string) => {
    const buf = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    const hashed = await sha256(password);
    const targetHash = 'aeae67b513fc017766f20f6dbfca5621b575bc62bfcc880748cf091f58287f39';
    
    if (hashed === targetHash) {

      setIsLoggedIn(true);
      localStorage.setItem('isAdmin', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
    setIsAuthenticating(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isAdmin');
    router.push('/admin');
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingId(item.id);
    setNewItem({ ...item });
    setShowEditor(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setNewItem({
      name: '',
      client: '',
      slug: '',
      description: '',
      category: '',
      industry: '',
      services: [],
      year: '',
      techStack: [],
      heroImage: '',
      intro: '',
      duration: '',
      scope: '',
      platform: '',
      deliverables: [],
      teamRole: '',
      challenge: '',
      goal: '',
      solution: '',
      keyFeatures: [],
      designDirection: '',
      outcome: '',
      imageUrl: '',
      galleryImages: [],
      mobileMockups: [],
      desktopMockups: [],
      videoUrl: '',
      url: '',
      metaTitle: '',
      metaDescription: '',
      isFeatured: false,
      status: 'published'
    });
    setShowEditor(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.description || !newItem.url || !newItem.imageUrl) {
      alert('Please fill mandatory fields (Title, Summary, URL, Thumbnail)');
      return;
    }

    if (editingId) {
      updateItem({ ...newItem, id: editingId } as PortfolioItem);
    } else {
      addItem(newItem as PortfolioItem);
    }
    
    setShowEditor(false);
    setEditingId(null);
  };

  const updateArrayField = (field: keyof PortfolioItem, idx: number, val: string) => {
    const arr = [...(newItem[field] as string[] || [])];
    arr[idx] = val;
    setNewItem(prev => ({ ...prev, [field]: arr }));
  };

  const addArrayItem = (field: keyof PortfolioItem) => {
    setNewItem(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[] || []), '']
    }));
  };

  const removeArrayItem = (field: keyof PortfolioItem, idx: number) => {
    setNewItem(prev => ({
      ...prev,
      [field]: (prev[field] as string[] || []).filter((_, i) => i !== idx)
    }));
  };

  const addStat = () => {
    setNewItem(prev => ({
      ...prev,
      stats: [...(prev.stats || []), { label: '', value: '' }]
    }));
  };

  const removeStat = (idx: number) => {
    setNewItem(prev => ({
      ...prev,
      stats: (prev.stats || []).filter((_, i) => i !== idx)
    }));
  };

  const updateStatField = (idx: number, key: 'label' | 'value', val: string) => {
    const arr = [...(newItem.stats || [])];
    arr[idx] = { ...arr[idx], [key]: val };
    setNewItem(prev => ({ ...prev, stats: arr }));
  };

  const handleDownloadAsset = async (id: string, name: string) => {
    try {
      const file = await getAssetFromDB(id);
      if (!file) {
        alert("File not found in local browser storage.");
        return;
      }
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Error retrieving file.");
    }
  };

  const handleAddLogo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogo.url) {
      alert('Logo URL is required.');
      return;
    }
    if (partnerLogos.length >= 9) {
      alert('Maximum of 9 logos allowed in the grid.');
      return;
    }
    addPartnerLogo({
      url: newLogo.url,
      alt: newLogo.alt || 'Partner Logo',
      isWide: newLogo.isWide || false
    });
    setNewLogo({ url: '', alt: '', isWide: false });
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-bg-dark min-h-screen flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-bg-card border border-white/5 p-12 rounded-none glow-blue text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-accent-blue to-accent-purple rounded-none flex items-center justify-center mx-auto mb-8 shadow-xl shadow-accent-blue/20">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-display font-bold mb-8">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password" 
              placeholder="Enter Password" 
              className="w-full bg-bg-dark border border-white/10 rounded-none px-6 py-4 focus:ring-2 focus:ring-accent-blue outline-none transition-all text-white"
            />
            <button 
              type="submit"
              disabled={isAuthenticating}
              className="w-full bg-white text-black py-4 rounded-none font-bold hover:bg-accent-blue hover:text-white transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isAuthenticating ? (
                <>Authenticating... <Loader2 className="animate-spin" size={18} /></>
              ) : (
                <>Continue to Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
            {loginError && <p className="text-red-500 text-sm mt-4 font-medium">{loginError}</p>}
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-bg-dark min-h-screen">
      <div className="max-w-7xl mx-auto py-32 px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 border-b border-white/10 pb-8 gap-6">
          <div>
            <h1 className="text-4xl font-display font-bold tracking-tight text-white">System <span className="text-accent-blue font-black">Control</span></h1>
            <p className="text-white/70 mt-1 font-black italic tracking-widest uppercase text-[10px]">Portfolio Management & Strategic Inquiries</p>
          </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-white/5 p-1.5 rounded-none border border-white/10 backdrop-blur-3xl">
            <button 
              onClick={() => { setActiveTab('projects'); setShowEditor(false); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-none font-black text-[11px] uppercase tracking-widest transition-all duration-300 ${activeTab === 'projects' ? 'bg-accent-blue text-white shadow-xl shadow-accent-blue/40' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <Layout size={14} strokeWidth={3} /> Projects
            </button>
            <button 
              onClick={() => { setActiveTab('testimonials'); setShowEditor(false); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-none font-black text-[11px] uppercase tracking-widest transition-all duration-300 ${activeTab === 'testimonials' ? 'bg-accent-blue text-white shadow-xl shadow-accent-blue/40' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <FileText size={14} strokeWidth={3} /> Testimonials
            </button>
            <button 
              onClick={() => { setActiveTab('lab'); setShowEditor(false); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-none font-black text-[11px] uppercase tracking-widest transition-all duration-300 ${activeTab === 'lab' ? 'bg-accent-blue text-white shadow-xl shadow-accent-blue/40' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <Rocket size={14} strokeWidth={3} /> Lab
            </button>
            <button 
              onClick={() => { setActiveTab('logos'); setShowEditor(false); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-none font-black text-[11px] uppercase tracking-widest transition-all duration-300 ${activeTab === 'logos' ? 'bg-accent-blue text-white shadow-xl shadow-accent-blue/40' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <Image size={14} strokeWidth={3} /> Logos
            </button>
            <button 
              onClick={() => { setActiveTab('messages'); setShowEditor(false); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-none font-black text-[11px] uppercase tracking-widest transition-all duration-300 ${activeTab === 'messages' ? 'bg-accent-purple text-white shadow-xl shadow-accent-purple/40' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <Mail size={14} strokeWidth={3} /> Messages 
              {contactSubmissions.length > 0 && (
                <span className="bg-accent-purple text-white px-2 py-0.5 rounded-none text-[9px] font-black border border-white/20 ml-2 animate-pulse">
                  {contactSubmissions.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => { setActiveTab('careers'); setShowEditor(false); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-none font-black text-[11px] uppercase tracking-widest transition-all duration-300 ${activeTab === 'careers' ? 'bg-accent-blue text-white shadow-xl shadow-accent-blue/40' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <Briefcase size={14} strokeWidth={3} /> Careers
            </button>
            <button 
              onClick={() => { setActiveTab('settings'); setShowEditor(false); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-none font-black text-[11px] uppercase tracking-widest transition-all duration-300 ${activeTab === 'settings' ? 'bg-accent-purple text-white shadow-xl shadow-accent-purple/40' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <Loader2 size={14} strokeWidth={3} /> Settings
            </button>
          </div>

          <button 
            onClick={handleLogout}
            className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] bg-white text-black hover:bg-red-600 hover:text-white px-8 py-4 rounded-none transition-all border border-white/10"
          >
            <LogOut size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" /> Sign Out
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      {!showEditor && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Live Projects', value: portfolioItems.length, icon: Rocket, color: 'blue' },
            { label: 'New Inquiries', value: contactSubmissions.length, icon: Mail, color: 'purple' },
            { label: 'Last Activity', value: 'Just now', icon: Loader2, color: 'blue' },
            { label: 'System Status', value: 'Optimal', icon: CheckCircle2, color: 'purple' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-bg-card border border-white/5 p-6 rounded-none relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform text-accent-${stat.color}`}>
                <stat.icon size={48} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-white/70 font-black mb-1 italic tracking-widest">{stat.label}</div>
              <div className="text-3xl font-display font-bold text-white tracking-widest">{stat.value}</div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {activeTab === 'projects' && showEditor ? (
          <motion.div 
            key="editor"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-8 pb-32"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowEditor(false)}
                  className="w-12 h-12 rounded-none bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/20 transition-all text-text-muted hover:text-white"
                >
                  <ArrowLeft size={20} />
                </button>
                <h2 className="text-3xl font-display font-bold">{editingId ? 'Refine' : 'Author'} Case Study</h2>
              </div>
              <div className="flex items-center gap-3">
                 <button 
                  onClick={() => setShowEditor(false)}
                  className="px-8 py-4 rounded-none font-bold bg-white/5 hover:bg-white/10 transition-all"
                >
                  Discard
                </button>
                <button 
                  onClick={handleSubmit}
                  className="bg-accent-blue text-white px-8 py-4 rounded-none font-black hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-accent-blue/20"
                >
                  <Save size={20} /> Finalize & Publish
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content Area (Left 3/4) */}
              <div className="lg:col-span-3 space-y-12">
                {/* General Info Section */}
                <div className="bg-bg-card border border-white/5 rounded-none p-12 space-y-10 shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue bg-[length:200%_auto] animate-gradient"></div>
                   <h3 className="text-2xl font-display font-bold flex items-center gap-3">
                     <Layout className="text-accent-blue" size={24} /> General Information
                   </h3>
                   
                   <div className="space-y-6">
                     <label className="text-xs uppercase tracking-[0.3em] text-accent-blue font-black opacity-80">Project Title</label>
                     <input 
                       value={newItem.name}
                       onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                       type="text" 
                       placeholder="e.g. EcoEnergy Smart Dashboard" 
                       className="w-full bg-transparent border-b border-white/10 py-4 text-4xl font-display font-black focus:border-accent-blue outline-none transition-all placeholder:text-white/30 tracking-tighter text-white"
                     />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">Client Name</label>
                       <input value={newItem.client} onChange={(e) => setNewItem({ ...newItem, client: e.target.value })} type="text" placeholder="Global Entity..." className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none text-sm transition-all text-white" />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">Project Slug</label>
                       <input value={newItem.slug} onChange={(e) => setNewItem({ ...newItem, slug: e.target.value })} type="text" placeholder="eco-energy-smart" className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none text-sm transition-all text-white" />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">Category</label>
                       <input value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} type="text" placeholder="Web, App, AI..." className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none text-sm transition-all text-white" />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">Industry</label>
                       <input value={newItem.industry} onChange={(e) => setNewItem({ ...newItem, industry: e.target.value })} type="text" placeholder="Healthcare, Fintech..." className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none text-sm transition-all text-white" />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">Year</label>
                       <input value={newItem.year} onChange={(e) => setNewItem({ ...newItem, year: e.target.value })} type="text" placeholder="2024" className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none text-sm transition-all text-white" />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">Duration</label>
                       <input value={newItem.duration} onChange={(e) => setNewItem({ ...newItem, duration: e.target.value })} type="text" placeholder="6 Months" className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none text-sm transition-all text-white" />
                     </div>
                   </div>
                </div>

                {/* Structured Narrative Content Section */}
                <div className="bg-bg-card border border-white/5 rounded-none p-12 space-y-12">
                   <h3 className="text-2xl font-display font-bold flex items-center gap-3">
                     <FileText className="text-accent-purple" size={24} /> Case Study Content
                   </h3>

                   <div className="space-y-6">
                     <label className="text-xs uppercase tracking-[0.3em] text-text-muted font-bold">Project Intro / Summary</label>
                     <textarea value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} placeholder="Brief high-level overview..." className="w-full bg-bg-dark border border-white/5 rounded-none px-8 py-6 focus:border-accent-blue outline-none min-h-[120px] text-lg leading-relaxed transition-all text-white" />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     {[
                       { label: 'The Challenge', key: 'challenge' as keyof PortfolioItem, color: 'red-500' },
                       { label: 'The Goal', key: 'goal' as keyof PortfolioItem, color: 'accent-purple' },
                       { label: 'The Solution', key: 'solution' as keyof PortfolioItem, color: 'accent-blue' },
                       { label: 'Design Direction', key: 'designDirection' as keyof PortfolioItem, color: 'pink-500' },
                       { label: 'Outcome / Result', key: 'outcome' as keyof PortfolioItem, color: 'green-500' }
                     ].map((section) => (
                       <div key={section.key} className="space-y-4">
                         <label className={`text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold flex items-center gap-2`}>
                            <span className={`w-2 h-2 rounded-none bg-${section.color}`}></span> {section.label}
                         </label>
                         <textarea 
                           value={newItem[section.key] as string}
                           onChange={(e) => setNewItem({ ...newItem, [section.key]: e.target.value })}
                           placeholder={`Details for ${section.label}...`} 
                           className="w-full bg-bg-dark border border-white/5 rounded-none px-6 py-5 focus:border-white/20 outline-none min-h-[160px] transition-all text-sm leading-relaxed text-white"
                         />
                       </div>
                     ))}
                   </div>

                   <div className="pt-10 border-t border-white/5 space-y-8">
                     <div className="flex items-center justify-between">
                       <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">Key Features & Innovation</label>
                       <button onClick={() => addArrayItem('keyFeatures')} className="text-[10px] font-black uppercase text-accent-blue bg-accent-blue/5 px-4 py-2 rounded-none hover:bg-accent-blue hover:text-white transition-all">Add Feature</button>
                     </div>
                     <div className="grid grid-cols-1 gap-4">
                       {newItem.keyFeatures?.map((feat, idx) => (
                         <div key={idx} className="flex items-center gap-4 group">
                           <input value={feat} onChange={(e) => updateArrayField('keyFeatures', idx, e.target.value)} type="text" className="flex-1 bg-bg-dark border border-white/5 rounded-none px-6 py-4 focus:border-accent-blue/30 outline-none text-sm text-white" />
                           <button onClick={() => removeArrayItem('keyFeatures', idx)} className="w-12 h-12 text-red-500 bg-red-500/5 hover:bg-red-500 hover:text-white rounded-none transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
                         </div>
                       ))}
                     </div>
                   </div>
                    <div className="pt-10 border-t border-white/5 space-y-8">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black opacity-80 italic">Performance Indicators (Stats)</label>
                        <button type="button" onClick={addStat} className="text-[10px] font-black uppercase text-accent-blue bg-accent-blue/5 px-4 py-2 rounded-none hover:bg-accent-blue hover:text-white transition-all">+ Add Stat</button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {newItem.stats?.map((stat, idx) => (
                          <div key={idx} className="flex flex-col gap-3 p-6 bg-bg-dark/40 border border-white/5 relative group">
                            <button type="button" onClick={() => removeStat(idx)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-all font-bold">×</button>
                            <input value={stat.value} onChange={(e) => updateStatField(idx, 'value', e.target.value)} type="text" placeholder="Value (+40%)" className="bg-transparent border-b border-white/10 py-2 outline-none text-2xl font-display font-medium text-accent-blue text-white" />
                            <input value={stat.label} onChange={(e) => updateStatField(idx, 'label', e.target.value)} type="text" placeholder="Label (Processing Speed)" className="bg-transparent py-1 outline-none text-[10px] uppercase tracking-widest text-text-muted text-white" />
                          </div>
                        ))}
                      </div>
                    </div>
                </div>

                {/* Media & Visuals Section */}
                <div className="bg-bg-card border border-white/5 rounded-none p-12 space-y-12">
                   <h3 className="text-2xl font-display font-bold flex items-center gap-3">
                     <Image className="text-accent-blue" size={24} /> Visual Showcase
                   </h3>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-4">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">Thumbnail / Cover Image</label>
                        <input value={newItem.imageUrl} onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })} type="text" placeholder="https://..." className="w-full bg-bg-dark border border-white/5 rounded-none px-6 py-4 outline-none text-xs text-white" />
                     </div>
                     <div className="space-y-4">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">Hero Showcase Image</label>
                        <input value={newItem.heroImage} onChange={(e) => setNewItem({ ...newItem, heroImage: e.target.value })} type="text" placeholder="https://..." className="w-full bg-bg-dark border border-white/5 rounded-none px-6 py-4 outline-none text-xs text-white" />
                     </div>
                   </div>
                    <div className="space-y-8 pt-8 border-t border-white/5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                          <div className="flex items-center justify-between border-b border-white/5 pb-2">
                             <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black">Desktop Mockups (Array)</label>
                             <button type="button" onClick={() => addArrayItem('desktopMockups')} className="text-[10px] text-accent-blue underline">+ Add</button>
                          </div>
                          <div className="space-y-3">
                            {newItem.desktopMockups?.map((img, idx) => (
                              <div key={idx} className="flex gap-2">
                                <input value={img} onChange={(e) => updateArrayField('desktopMockups', idx, e.target.value)} type="text" placeholder="URL..." className="flex-1 bg-bg-dark border border-white/5 px-4 py-3 outline-none text-xs text-white" />
                                <button type="button" onClick={() => removeArrayItem('desktopMockups', idx)} className="text-red-500 px-2 font-bold">×</button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div className="flex items-center justify-between border-b border-white/5 pb-2">
                             <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black">Mobile Mockups (Array)</label>
                             <button type="button" onClick={() => addArrayItem('mobileMockups')} className="text-[10px] text-accent-blue underline">+ Add</button>
                          </div>
                          <div className="space-y-3">
                            {newItem.mobileMockups?.map((img, idx) => (
                              <div key={idx} className="flex gap-2">
                                <input value={img} onChange={(e) => updateArrayField('mobileMockups', idx, e.target.value)} type="text" placeholder="URL..." className="flex-1 bg-bg-dark border border-white/5 px-4 py-3 outline-none text-xs text-white" />
                                <button type="button" onClick={() => removeArrayItem('mobileMockups', idx)} className="text-red-400 px-2 font-bold">×</button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                   <div className="space-y-8">
                     <div className="flex items-center justify-between border-b border-white/5 pb-4">
                       <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">Production Gallery</label>
                       <button onClick={() => addArrayItem('galleryImages')} className="text-[10px] font-black uppercase text-accent-blue bg-accent-blue/5 px-4 py-2 rounded-none hover:bg-accent-blue hover:text-white transition-all">Add Image</button>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {newItem.galleryImages?.map((img, idx) => (
                           <div key={idx} className="flex items-center gap-4 group">
                             <input value={img} onChange={(e) => updateArrayField('galleryImages', idx, e.target.value)} type="text" placeholder="Image URL..." className="flex-1 bg-bg-dark border border-white/5 rounded-none px-6 py-4 outline-none text-xs text-white" />
                             <button onClick={() => removeArrayItem('galleryImages', idx)} className="w-12 h-12 text-red-500 bg-red-500/5 hover:bg-red-500 hover:text-white rounded-none transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
                           </div>
                        ))}
                     </div>
                   </div>
                </div>

                {/* Showcase & Carousel Configuration */}
                <div className="bg-bg-card border border-white/5 rounded-none p-12 space-y-10 shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                   <h3 className="text-2xl font-display font-bold flex items-center gap-3">
                     <Monitor className="text-accent-blue" size={24} /> Carousel Showcase Architecture
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">Display Device Environment</label>
                       <select 
                         value={newItem.deviceType} 
                         onChange={e => setNewItem({...newItem, deviceType: e.target.value as any})}
                         className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none text-white text-sm transition-all"
                       >
                         <option value="desktop">Desktop // MacBook Pro</option>
                         <option value="tablet">Tablet // iPad Pro</option>
                         <option value="mobile">Mobile // iPhone 15</option>
                         <option value="random">Dynamic // Algorithmic Selection</option>
                       </select>
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">Brand Primary Focus Color (HEX)</label>
                       <div className="flex gap-4">
                         <input 
                           type="text" 
                           value={newItem.primaryColor} 
                           onChange={e => setNewItem({...newItem, primaryColor: e.target.value})} 
                           className="flex-1 bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none text-white text-sm font-mono" 
                           placeholder="#0024ff"
                         />
                         <div className="w-14 h-14 border border-white/10 shadow-inner" style={{ backgroundColor: newItem.primaryColor || '#000' }}></div>
                       </div>
                     </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">Case Challenges (Punchy / Carousel)</label>
                       <textarea 
                         value={newItem.challenges} 
                         onChange={e => setNewItem({...newItem, challenges: e.target.value})} 
                         className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none text-white text-sm min-h-[100px] leading-relaxed" 
                         placeholder="Summarize challenges for the showcase carousel..."
                       />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">Case Solutions (Punchy / Carousel)</label>
                       <textarea 
                         value={newItem.solutions} 
                         onChange={e => setNewItem({...newItem, solutions: e.target.value})} 
                         className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none text-white text-sm min-h-[100px] leading-relaxed" 
                         placeholder="Summarize solutions for the showcase carousel..."
                       />
                     </div>
                   </div>
                </div>
              </div>

              {/* Sidebar: Metadata & Publishing Controls */}
              <div className="space-y-8">
                <div className="bg-bg-card border border-white/5 rounded-none p-10 space-y-10 sticky top-32 shadow-2xl overflow-hidden">
                  <div className="space-y-8">
                    <h3 className="text-xl font-display font-bold flex items-center gap-3">
                      <Rocket className="text-accent-blue" size={20} /> Publishing
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-bg-dark/50 p-4 rounded-none border border-white/5">
                        <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Featured Project</span>
                        <button 
                          onClick={() => setNewItem({ ...newItem, isFeatured: !newItem.isFeatured })}
                          className={`w-12 h-6 rounded-none transition-all relative ${newItem.isFeatured ? 'bg-accent-blue' : 'bg-white/10'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-none transition-all ${newItem.isFeatured ? 'left-7' : 'left-1'}`}></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between bg-bg-dark/50 p-4 rounded-none border border-white/5">
                        <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Status</span>
                        <select 
                          value={newItem.status} 
                          onChange={(e) => setNewItem({ ...newItem, status: e.target.value as 'draft' | 'published' })}
                          className="bg-transparent text-xs font-black uppercase text-accent-blue outline-none"
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 pt-8 border-t border-white/5">
                    <h3 className="text-xl font-display font-bold flex items-center gap-3">
                      <Rocket className="text-accent-purple" size={20} /> Strategic Links
                    </h3>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">Master Deployment Node</label>
                      <input value={newItem.url} onChange={(e) => setNewItem({ ...newItem, url: e.target.value })} type="text" placeholder="https://..." className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 outline-none text-sm text-white" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">Video Showcase (Vimeo/YT)</label>
                      <input value={newItem.videoUrl} onChange={(e) => setNewItem({ ...newItem, videoUrl: e.target.value })} type="text" placeholder="https://..." className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 outline-none text-sm text-white" />
                    </div>
                  </div>

                  <div className="space-y-8 pt-8 border-t border-white/5">
                    <h3 className="text-xl font-display font-bold flex items-center gap-3">
                      <LayoutGrid className="text-accent-purple" size={20} /> Design System & Architecture
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">UI/UX Components Used</label>
                        {(newItem.uiComponents || []).map((comp, idx) => (
                          <div key={idx} className="flex gap-2">
                            <input value={comp} onChange={(e) => updateArrayField('uiComponents', idx, e.target.value)} type="text" className="flex-1 bg-bg-dark border border-white/5 rounded-none px-4 py-3 focus:border-accent-purple/30 outline-none text-sm text-white" />
                            <button type="button" onClick={() => removeArrayItem('uiComponents', idx)} className="px-3 rounded-none bg-red-500/10 text-red-400 text-xs font-bold hover:bg-red-500/20">×</button>
                          </div>
                        ))}
                        <button type="button" onClick={() => addArrayItem('uiComponents')} className="text-xs text-accent-purple underline">+ Add Component</button>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">System Architecture Diagram URL</label>
                        <input value={newItem.systemDiagram} onChange={(e) => setNewItem({ ...newItem, systemDiagram: e.target.value })} type="text" placeholder="https://..." className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 outline-none text-sm text-white" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">Diagram Caption</label>
                        <input value={newItem.systemDiagramCaption} onChange={(e) => setNewItem({ ...newItem, systemDiagramCaption: e.target.value })} type="text" placeholder="Pipeline description..." className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 outline-none text-sm text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 pt-8 border-t border-white/5">
                    <h3 className="text-xl font-display font-bold flex items-center gap-3">
                      <Lock className="text-accent-blue" size={20} /> SEO Management
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">Meta Title</label>
                        <input value={newItem.metaTitle} onChange={(e) => setNewItem({ ...newItem, metaTitle: e.target.value })} type="text" className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 outline-none text-xs text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">Meta Description</label>
                        <textarea value={newItem.metaDescription} onChange={(e) => setNewItem({ ...newItem, metaDescription: e.target.value })} className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 outline-none text-xs text-white min-h-[100px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'projects' ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between mb-8 group">
              <h2 className="text-2xl font-display font-bold flex items-center gap-4">
                <List className="text-accent-blue group-hover:rotate-180 transition-transform duration-700" size={28} /> Project Registry
              </h2>
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleSeedData}
                  className="bg-accent-blue/10 text-accent-blue border border-accent-blue/20 px-8 py-5 rounded-none font-bold tracking-tight hover:bg-accent-blue hover:text-white transition-all transform hover:-translate-y-1"
                >
                  Seed Real Data
                </button>
                <button 
                  onClick={handleCreateNew}
                  className="bg-white text-black px-10 py-5 rounded-none font-black tracking-tighter hover:bg-accent-blue hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl flex items-center gap-3"
                >
                  <Plus size={24} /> New Project Case Study
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {portfolioItems.map((item, i) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-bg-card/50 backdrop-blur-xl border border-white/5 rounded-none p-8 flex flex-col md:flex-row items-center gap-8 hover:border-accent-blue/20 transition-all group shadow-2xl"
                >
                  <div className="w-full md:w-48 aspect-video md:aspect-square rounded-none overflow-hidden border border-white/10 bg-bg-dark flex-shrink-0 relative">
                    <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" alt={item.name} />
                    <div className="absolute inset-0 bg-accent-blue/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-2">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black text-accent-blue uppercase tracking-[0.3em]">{item.client}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleEdit(item)} className="p-3 bg-white/5 hover:bg-accent-blue hover:text-white rounded-none transition-all duration-300">
                            <Edit3 size={18} />
                          </button>
                          <button onClick={() => { if (confirm('Purge this record?')) deleteItem(item.id); }} className="p-3 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white rounded-none transition-all duration-300">

                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <h4 className="text-2xl font-display font-bold leading-tight group-hover:text-accent-blue transition-colors mb-4">{item.name}</h4>
                    </div>
                    
                    <div className="bg-white/5 rounded-none px-5 py-3 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-text-muted truncate max-w-[140px]">{item.url}</span>
                      <ChevronRight size={14} className="text-accent-blue group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {portfolioItems.length === 0 && (
              <div className="text-center py-32 border-2 border-dashed border-white/5 rounded-none bg-white/[0.01]">
                <PlusCircle className="mx-auto text-white/5 mb-8" size={80} strokeWidth={0.5} />
                <p className="text-text-muted text-xl font-medium mb-10">The registry is currently empty.</p>
                <button onClick={handleCreateNew} className="bg-accent-blue text-white px-12 py-5 rounded-none font-black hover:scale-105 transition-all shadow-glow-blue">
                  Initiate New Case Study
                </button>
              </div>
            )}
          </motion.div>
        ) : activeTab === 'messages' ? (
          <motion.div 
            key="messages"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12 pb-32"
          >
            {/* Messages Content omitted for brevity, keeping existing code */}
            <div className="flex items-center justify-between border-b border-white/5 pb-8 group">
              <h2 className="text-3xl font-display font-black flex items-center gap-5 tracking-tighter">
                <Mail className="text-accent-purple group-hover:scale-110 transition-transform" size={32} /> Central Inquiries
              </h2>
              <div className="flex items-center gap-6">
                 <span className="text-white/70 font-black uppercase tracking-[0.4em] bg-white/5 px-6 py-3 rounded-none border border-white/5">
                  Synchronized Nodes: {contactSubmissions.length}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-10">
              {contactSubmissions.map((msg, i) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-bg-card/30 backdrop-blur-2xl border border-white/5 rounded-none p-12 shadow-2xl relative group hover:border-accent-purple/20 transition-all duration-500 overflow-hidden"
                >
                  {/* Accent Highlight */}
                  <div className="absolute top-0 left-0 w-2 h-full bg-accent-purple/20 group-hover:bg-accent-purple transition-all"></div>
                  
                  <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100">
                    <button 
                      onClick={() => {
                        if (confirm('Archive this submission?')) deleteSubmission(msg.id);
                      }}
                      className="w-16 h-16 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white rounded-none flex items-center justify-center transition-all shadow-2xl"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/3 flex flex-col justify-between py-2">
                       <div className="space-y-12">
                         <div className="relative">
                            <div className="text-[10px] uppercase font-black text-accent-blue tracking-[0.4em] mb-4">Identity Profile</div>
                            <div className="text-4xl font-display font-black tracking-tighter text-white mb-2">{msg.name}</div>
                            <div className="text-lg font-medium text-accent-purple/80 underline decoration-purple-500/30 underline-offset-8 decoration-2">{msg.email}</div>
                         </div>

                         <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                               <div className="space-y-1">
                                  <div className="text-[10px] uppercase font-black text-accent-purple tracking-[0.4em]">Company</div>
                                  <div className="text-sm font-bold text-white/70">{msg.company || 'N/A'}</div>
                               </div>
                               <div className="space-y-1">
                                  <div className="text-[10px] uppercase font-black text-accent-blue tracking-[0.4em]">Phone</div>
                                  <div className="text-sm font-bold text-white/70">{msg.phone || 'N/A'}</div>
                               </div>
                            </div>

                            {msg.service && (
                              <div className="space-y-2">
                                 <div className="text-[10px] uppercase font-black text-accent-purple tracking-[0.4em] mb-4">Strategic Interest</div>
                                 <span className="inline-flex items-center bg-accent-purple/10 text-accent-purple px-6 py-3 rounded-none text-xs font-black ring-1 ring-accent-purple/20 border border-white/5">
                                   {msg.service}
                                 </span>
                              </div>
                            )}
                         </div>
                       </div>

                       <div className="pt-12 border-t border-white/5 mt-auto">
                          <div className="text-white/70 font-black tracking-[0.4em] uppercase mb-3">Transmission Timestamp</div>
                          <div className="text-sm font-bold text-white/40 font-mono tracking-tight">{msg.date}</div>
                       </div>
                    </div>

                    <div className="lg:w-2/3 lg:pl-16 lg:border-l border-white/5 flex flex-col">
                      <div className="flex items-center gap-3 text-white/70 font-black tracking-[0.4em] uppercase mb-8">
                        <FileText size={14} className="text-accent-blue" /> Project Abstract
                      </div>
                      <div className="flex-1 bg-white/[0.02] rounded-none p-10 border border-white/5 relative shadow-inner">
                         <p className="text-2xl leading-[1.6] text-white/90 font-medium whitespace-pre-wrap tracking-tight italic">
                           "{msg.message}"
                         </p>
                         
                         {msg.assets && msg.assets.length > 0 && (
                           <div className="mt-8 space-y-4 relative z-10">
                             <div className="text-[10px] uppercase font-black text-text-muted tracking-[0.4em]">Attached Assets</div>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                               {msg.assets.map(asset => (
                                 <button
                                   key={asset.id}
                                   onClick={() => handleDownloadAsset(asset.id, asset.name)}
                                   className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-none hover:bg-accent-blue/10 hover:border-accent-blue/30 transition-all text-left group"
                                 >
                                    <div className="flex flex-col overflow-hidden">
                                      <p className="text-sm font-bold text-white truncate max-w-[200px]">{asset.name}</p>
                                      <p className="text-[10px] text-white/60">{(asset.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-none bg-white/5 flex items-center justify-center group-hover:bg-accent-blue group-hover:text-white text-text-muted transition-colors flex-shrink-0">
                                      <Download size={16} />
                                    </div>
                                 </button>
                               ))}
                             </div>
                           </div>
                         )}
                         
                         <div className="absolute bottom-6 right-8 opacity-5 pointer-events-none">
                            <Mail size={120} />
                         </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {contactSubmissions.length === 0 && (
              <div className="text-center py-40 bg-bg-card/50 rounded-none border-2 border-dashed border-white/5">
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <Mail className="mx-auto text-white/5 mb-10" size={100} strokeWidth={0.5} />
                </motion.div>
                <p className="text-white/80 font-display font-black tracking-tight mb-4">Registry Silent</p>
                <p className="text-text-muted/50 font-medium">Inbound signals haven't been detected yet.</p>
              </div>
            )}
          </motion.div>
        ) : activeTab === 'careers' ? (
          <motion.div 
            key="careers"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12 pb-32"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-8 group">
              <h2 className="text-3xl font-display font-black flex items-center gap-5 tracking-tighter">
                <Briefcase className="text-accent-blue group-hover:scale-110 transition-transform" size={32} /> Recruitment Nodes
              </h2>
              <div className="flex items-center gap-6">
                 <span className="text-white/70 font-black uppercase tracking-[0.4em] bg-white/5 px-6 py-3 rounded-none border border-white/5">
                  Open Positions: {jobOpenings.length}
                </span>
              </div>
            </div>

            <div className="bg-bg-card border border-white/5 rounded-none p-12 shadow-2xl relative overflow-hidden">
               <h3 className="text-2xl font-display font-bold flex items-center gap-3 mb-8">
                 <PlusCircle className="text-accent-blue" size={24} /> Add New Position
               </h3>
               <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newJob.title || !newJob.team || !newJob.type || !newJob.desc) {
                      alert('All fields are required.');
                      return;
                    }
                    addJobOpening(newJob as Omit<JobOpening, 'id'>);
                    setNewJob({ title: '', team: '', type: '', desc: '' });
                  }} 
                  className="space-y-6"
               >
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="space-y-3">
                     <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black">Job Title</label>
                     <input 
                       type="text" 
                       value={newJob.title}
                       onChange={e => setNewJob({ ...newJob, title: e.target.value })}
                       placeholder="e.g. Senior AI Strategist" 
                       className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none transition-all text-white"
                       required
                     />
                   </div>
                   <div className="space-y-3">
                     <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black">Team / Cluster</label>
                     <input 
                       type="text" 
                       value={newJob.team}
                       onChange={e => setNewJob({ ...newJob, team: e.target.value })}
                       placeholder="e.g. Intelligence Node" 
                       className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none transition-all text-white"
                       required
                     />
                   </div>
                   <div className="space-y-3">
                     <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black">Work Type</label>
                     <input 
                       type="text" 
                       value={newJob.type}
                       onChange={e => setNewJob({ ...newJob, type: e.target.value })}
                       placeholder="e.g. Full-time // Remote" 
                       className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none transition-all text-white"
                       required
                     />
                   </div>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black">Mission / Description</label>
                    <textarea 
                      value={newJob.desc}
                      onChange={e => setNewJob({ ...newJob, desc: e.target.value })}
                      placeholder="Briefly describe the mission of this node..." 
                      className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none transition-all min-h-[100px] text-white"
                      required
                    />
                 </div>
                 <button 
                   type="submit" 
                   className="bg-accent-blue text-white px-8 py-4 rounded-none font-black hover:scale-105 transition-all w-full md:w-auto shadow-xl shadow-accent-blue/20"
                 >
                   Deploy Position
                 </button>
               </form>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {jobOpenings.map((job) => (
                <div key={job.id} className="bg-bg-dark border border-white/5 rounded-none p-8 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-accent-blue/30 transition-all shadow-xl">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-accent-blue uppercase tracking-[0.3em] bg-accent-blue/5 px-3 py-1 border border-accent-blue/20">{job.team}</span>
                      <span className="w-1.5 h-1.5 rounded-none bg-accent-purple/40"></span>
                      <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.4em]">{job.type}</span>
                    </div>
                    <h4 className="text-2xl font-display font-black text-white tracking-tight">{job.title}</h4>
                    <p className="text-white/70 text-sm max-w-2xl leading-relaxed italic">{job.desc}</p>
                  </div>
                  <button 
                    onClick={() => {
                      if (confirm('Decommission this position?')) deleteJobOpening(job.id);
                    }}
                    className="w-14 h-14 flex items-center justify-center text-red-500 bg-red-500/5 hover:bg-red-500 hover:text-white transition-all duration-300 rounded-none border border-red-500/10"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              ))}
            </div>

            {jobOpenings.length === 0 && (
              <div className="text-center py-24 bg-bg-card/50 rounded-none border-2 border-dashed border-white/5">
                <Briefcase className="mx-auto text-white/5 mb-6" size={60} strokeWidth={1} />
                <p className="text-white/90 text-xl font-display font-medium">No active recruitment nodes.</p>
              </div>
            )}
          </motion.div>
        ) : activeTab === 'testimonials' ? (
          <motion.div 
            key="testimonials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12 pb-32"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-8 group">
              <h2 className="text-3xl font-display font-black flex items-center gap-5 tracking-tighter">
                <FileText className="text-accent-blue group-hover:scale-110 transition-transform" size={32} /> Testimonial Grid
              </h2>
              <div className="flex items-center gap-6">
                 <span className="text-white/70 font-black uppercase tracking-[0.4em] bg-white/5 px-6 py-3 rounded-none border border-white/5">
                  Verified Testimonials: {testimonials.length}
                </span>
              </div>
            </div>

            <div className="bg-bg-card border border-white/5 rounded-none p-12 shadow-2xl relative overflow-hidden">
               <h3 className="text-2xl font-display font-bold flex items-center gap-3 mb-8">
                 {editingTestimonialId ? <Edit3 className="text-accent-purple" size={24} /> : <PlusCircle className="text-accent-blue" size={24} />} 
                 {editingTestimonialId ? 'Refine Client Voice' : 'New Client Voice'}
               </h3>
               <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (editingTestimonialId) {
                      updateTestimonial(newTestimonial);
                      setEditingTestimonialId(null);
                    } else {
                      addTestimonial(newTestimonial);
                    }
                    setNewTestimonial({
                      company: '',
                      logoColor: 'text-[#0047AB]',
                      authorName: '',
                      authorTitle: '',
                      authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
                      authorLinkedin: '#',
                      rating: 5,
                      content: ''
                    });
                  }} 
                  className="space-y-6"
               >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-3">
                     <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black">Company Name</label>
                     <input type="text" value={newTestimonial.company} onChange={e => setNewTestimonial({...newTestimonial, company: e.target.value})} className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none text-white" required />
                   </div>
                   <div className="space-y-3">
                     <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black">Author Name</label>
                     <input type="text" value={newTestimonial.authorName} onChange={e => setNewTestimonial({...newTestimonial, authorName: e.target.value})} className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none text-white" required />
                   </div>
                   <div className="space-y-3">
                     <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black">Author Title</label>
                     <input type="text" value={newTestimonial.authorTitle} onChange={e => setNewTestimonial({...newTestimonial, authorTitle: e.target.value})} className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none text-white" required />
                   </div>
                   <div className="space-y-3">
                     <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black">LinkedIn URL</label>
                     <input type="text" value={newTestimonial.authorLinkedin} onChange={e => setNewTestimonial({...newTestimonial, authorLinkedin: e.target.value})} className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none text-white" />
                   </div>
                   <div className="space-y-3 md:col-span-2">
                     <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black flex items-center">
                       Author Profile Image 
                       {newTestimonial.authorImage?.length > 500 && <span className="text-green-500 lowercase tracking-normal ml-2 bg-green-500/10 px-2 py-0.5">(Local node loaded)</span>}
                     </label>
                     <div className="flex gap-4">
                       <input type="text" value={newTestimonial.authorImage} onChange={e => setNewTestimonial({...newTestimonial, authorImage: e.target.value})} placeholder="https://images.unsplash.com/... or upload" className="flex-1 bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none text-white" required />
                       <label className="cursor-pointer bg-accent-blue/10 hover:bg-accent-blue hover:text-white text-accent-blue px-8 py-4 rounded-none font-black transition-all flex items-center justify-center shrink-0 border border-accent-blue/20 tracking-widest text-[10px] uppercase">
                          Upload Node
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (file.size > 2 * 1024 * 1024) {
                                  alert('Image size must be less than 2MB to ensure structural integrity.');
                                  return;
                                }
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setNewTestimonial({ ...newTestimonial, authorImage: reader.result as string });
                                };
                                reader.readAsDataURL(file);
                              }
                            }} 
                          />
                       </label>
                     </div>
                   </div>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black">Testimonial Content (MD bold supported)</label>
                    <textarea value={newTestimonial.content} onChange={e => setNewTestimonial({...newTestimonial, content: e.target.value})} className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none min-h-[120px] text-white" required />
                 </div>
                 <div className="flex gap-4">
                  <button type="submit" className={`${editingTestimonialId ? 'bg-accent-purple' : 'bg-accent-blue'} text-white px-8 py-4 rounded-none font-black hover:scale-105 transition-all w-full md:w-auto`}>
                    {editingTestimonialId ? 'Update & Synchronize' : 'Deploy Testimonial'}
                  </button>
                  {editingTestimonialId && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditingTestimonialId(null);
                        setNewTestimonial({
                          company: '',
                          logoColor: 'text-[#0047AB]',
                          authorName: '',
                          authorTitle: '',
                          authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
                          authorLinkedin: '#',
                          rating: 5,
                          content: ''
                        });
                      }}
                      className="px-8 py-4 rounded-none font-bold bg-white/5 hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                 </div>
               </form>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-bg-dark border border-white/5 rounded-none p-8 flex items-start justify-between gap-8 group hover:border-accent-blue/30 transition-all shadow-xl">
                  <div className="flex gap-8">
                    <div className="relative">
                      <img src={t.authorImage} className="w-20 h-20 rounded-none object-cover grayscale group-hover:grayscale-0 transition-all border border-white/10 shadow-2xl" />
                      <div className="absolute -bottom-2 -right-2 bg-accent-blue p-2">
                        <Quote size={12} className="text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-display font-black text-white tracking-tight group-hover:text-accent-blue transition-colors">{t.authorName}</h4>
                      <p className="text-[10px] text-accent-blue font-black uppercase tracking-[0.3em] bg-accent-blue/5 px-2 py-1 inline-block border border-accent-blue/20">{t.authorTitle} @ {t.company}</p>
                      <div className="relative mt-6">
                        <p className="text-lg text-white/90 max-w-3xl leading-relaxed italic font-medium pr-8">
                          "{t.content}"
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => {
                        setEditingTestimonialId(t.id);
                        setNewTestimonial(t);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }} 
                      className="w-12 h-12 bg-white/5 hover:bg-accent-blue hover:text-white transition-all flex items-center justify-center text-white border border-white/10"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button onClick={() => deleteTestimonial(t.id)} className="w-12 h-12 bg-white/5 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center text-red-500 border border-white/10">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : activeTab === 'lab' ? (
          <motion.div 
            key="lab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12 pb-32"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-8 group">
              <h2 className="text-3xl font-display font-black flex items-center gap-5 tracking-tighter">
                <Rocket className="text-accent-blue group-hover:scale-110 transition-transform" size={32} /> Lab Registry
              </h2>
            </div>

            <div className="bg-bg-card border border-white/5 rounded-none p-12 shadow-2xl relative overflow-hidden">
               <h3 className="text-2xl font-display font-bold flex items-center gap-3 mb-8">
                 <PlusCircle className="text-accent-blue" size={24} /> New Lab Entry
               </h3>
               <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    addLabItem(newLabItem);
                    setNewLabItem({ id: '', name: '', desc: '', node: '' });
                  }} 
                  className="space-y-6"
               >
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="space-y-3">
                     <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black">Reference (e.g. 0x01)</label>
                     <input type="text" value={newLabItem.node} onChange={e => setNewLabItem({...newLabItem, node: e.target.value})} className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none text-white" required />
                   </div>
                   <div className="space-y-3">
                     <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black">Case Name</label>
                     <input type="text" value={newLabItem.name} onChange={e => setNewLabItem({...newLabItem, name: e.target.value})} className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none text-white" required />
                   </div>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black">Description</label>
                    <textarea value={newLabItem.desc} onChange={e => setNewLabItem({...newLabItem, desc: e.target.value})} className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none text-white" required />
                 </div>
                 <button type="submit" className="bg-accent-blue text-white px-8 py-4 rounded-none font-black hover:scale-105 transition-all w-full md:w-auto">Initialize Lab Item</button>
               </form>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {labItems.map((item) => (
                <div key={item.id} className="bg-bg-dark border border-white/5 rounded-none p-8 flex items-center justify-between group hover:border-accent-blue/30 transition-all shadow-xl">
                  <div className="flex gap-8 items-center">
                    <div className="text-xl font-mono text-accent-blue font-black bg-accent-blue/5 px-4 py-2 border border-accent-blue/20">{item.node}</div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-display font-black uppercase tracking-tighter text-white group-hover:text-accent-blue transition-colors">{item.name}</h4>
                      <p className="text-sm text-white/80 max-w-xl mt-2 leading-relaxed italic">{item.desc}</p>
                    </div>
                  </div>
                  <button onClick={() => deleteLabItem(item.id)} className="w-12 h-12 bg-white/5 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center border border-white/10 shadow-lg"><Trash2 size={20} /></button>
                </div>
              ))}
            </div>
          </motion.div>
        ) : activeTab === 'settings' ? (
          <motion.div 
            key="settings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12 pb-32"
          >
             <div className="flex items-center justify-between border-b border-white/5 pb-8 group">
              <h2 className="text-3xl font-display font-black flex items-center gap-5 tracking-tighter">
                <Loader2 className="text-accent-purple group-hover:rotate-180 transition-transform duration-700" size={32} /> System Overrides
              </h2>
            </div>

            <div className="bg-bg-card border border-white/5 rounded-none p-12 shadow-2xl space-y-10">
               <h3 className="text-2xl font-display font-bold flex items-center gap-3">
                 <Mail className="text-accent-blue" size={24} /> Global Contact Points
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                   <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black">Inquiry Routing Email</label>
                   <input type="email" value={footerSettings.email} onChange={e => setFooterSettings({...footerSettings, email: e.target.value})} className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none text-white" />
                 </div>
                 <div className="space-y-3">
                   <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black">Corporate LinkedIn URL</label>
                   <input type="text" value={footerSettings.linkedin} onChange={e => setFooterSettings({...footerSettings, linkedin: e.target.value})} className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none text-white" />
                 </div>
               </div>
               <button 
                onClick={() => {
                  updateFooterInfo(footerSettings);
                  alert('System parameters updated.');
                }}
                className="bg-accent-purple text-white px-10 py-5 rounded-none font-black hover:scale-105 transition-all shadow-xl shadow-accent-purple/20"
               >
                 Synchronize System Data
               </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="logos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12 pb-32"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-8 group">
              <h2 className="text-3xl font-display font-black flex items-center gap-5 tracking-tighter">
                <Image className="text-accent-blue group-hover:scale-110 transition-transform" size={32} /> Partner Logos
              </h2>
              <div className="flex items-center gap-6">
                 <span className="text-white/70 font-black uppercase tracking-[0.4em] bg-white/5 px-6 py-3 rounded-none border border-white/5">
                  Grid Capacity: {partnerLogos.length} / 9
                </span>
              </div>
            </div>

            <div className="bg-bg-card border border-white/5 rounded-none p-12 shadow-2xl relative overflow-hidden">
               <h3 className="text-2xl font-display font-bold flex items-center gap-3 mb-8">
                 <PlusCircle className="text-accent-blue" size={24} /> Add New Logo
               </h3>
               <form onSubmit={handleAddLogo} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                 <div className="md:col-span-2 space-y-3">
                   <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black">Image URL</label>
                   <input 
                     type="text" 
                     value={newLogo.url}
                     onChange={e => setNewLogo({ ...newLogo, url: e.target.value })}
                     placeholder="https://example.com/logo.png" 
                     className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none transition-all text-white"
                     required
                   />
                 </div>
                 <div className="space-y-3">
                   <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black">Alt Text (Optional)</label>
                   <input 
                     type="text" 
                     value={newLogo.alt}
                     onChange={e => setNewLogo({ ...newLogo, alt: e.target.value })}
                     placeholder="Brand Name" 
                     className="w-full bg-bg-dark border border-white/5 rounded-none px-5 py-4 focus:border-accent-blue outline-none transition-all text-white"
                   />
                 </div>
                 <div className="flex items-center gap-4 pb-2">
                   <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                     <input 
                       type="checkbox" 
                       checked={newLogo.isWide}
                       onChange={e => setNewLogo({ ...newLogo, isWide: e.target.checked })}
                       className="w-5 h-5 rounded-none accent-accent-blue bg-bg-dark border-white/10"
                     />
                     Wide Format (Spans 2 columns)
                   </label>
                 </div>
                 <div className="md:col-span-4 mt-6">
                   <button 
                     type="submit" 
                     disabled={partnerLogos.length >= 9}
                     className="bg-accent-blue text-white px-8 py-4 rounded-none font-black hover:scale-105 transition-all w-full md:w-auto shadow-xl shadow-accent-blue/20 disabled:opacity-50 disabled:hover:scale-100"
                   >
                     Add to Grid
                   </button>
                 </div>
               </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {partnerLogos.map((logo) => (
                <div key={logo.id} className={`bg-bg-dark border border-white/5 rounded-none p-6 relative group ${logo.isWide ? 'md:col-span-2' : ''}`}>
                  <div className="aspect-[4/3] bg-white/[0.02] rounded-none flex items-center justify-center p-6 relative overflow-hidden text-center">
                     <img src={logo.url} alt={logo.alt} className="w-full h-full object-contain filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300" 
                        onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxMDAgMTAwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSJ3aGl0ZSI+SW52YWxpZCBVUkw8L3RleHQ+PC9zdmc+'; }}
                     />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white truncate max-w-[200px]">{logo.alt || 'Partner'}</p>
                      <p className="text-xs text-white/60">{logo.isWide ? 'Wide (2 Cols)' : 'Square (1 Col)'}</p>
                    </div>
                    <button 
                      onClick={() => {
                        if (confirm('Remove this logo?')) deletePartnerLogo(logo.id);
                      }}
                      className="text-red-500 hover:text-red-400 p-2 bg-red-500/10 rounded-none transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {partnerLogos.length === 0 && (
              <div className="text-center py-20 bg-bg-card/50 rounded-none border-2 border-dashed border-white/5">
                <Image className="mx-auto text-white/5 mb-6" size={60} strokeWidth={1} />
                <p className="text-white/90 text-xl font-display font-medium">No partner logos configured.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-accent-blue" /></div>}>
      <AdminContent />
    </Suspense>
  );
}







