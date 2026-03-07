"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  PlusCircle, LogOut, ArrowLeft, Edit3, Trash2, List, 
  Rocket, PlayCircle, Image, FileText, ChevronRight, 
  Layout, Save, X, Plus, AlertCircle, CheckCircle2,
  Lock, ArrowRight, Loader2, Mail, LayoutGrid
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { PortfolioItem } from '@/lib/portfolio';
import { motion, AnimatePresence } from 'framer-motion';

function AdminContent() {

  const { portfolioItems, addItem, updateItem, deleteItem, contactSubmissions, deleteSubmission } = usePortfolio();
  
  const handleSeedData = () => {
    if (confirm('Forces-sync with real content (2GO, BANCAT, Liza Kalinina)? This will ensure these 3 projects are present.')) {
      // In a more complex app, this might fetch from an API or reset the context
      // For now, we'll just alert the user that the default seed is already in the codebase
      alert('The real content is now the default seed in the codebase. Clear your browser storage to see it as the fresh initial state.');
    }
  };

  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'messages'>('projects');
  
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
    status: 'published'
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
    const targetHash = 'c9f3b09280a028276fd20f0bc8e3986a49e81ba7f22e731728d9f92e177a7dfd';
    
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

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-bg-card border border-white/5 p-12 rounded-[40px] glow-blue text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-accent-blue to-accent-purple rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-accent-blue/20">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-display font-bold mb-8">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password" 
              placeholder="Enter Password" 
              className="w-full bg-bg-dark border border-white/10 rounded-xl px-6 py-4 focus:ring-2 focus:ring-accent-blue outline-none transition-all text-white"
            />
            <button 
              type="submit"
              disabled={isAuthenticating}
              className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-accent-blue hover:text-white transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-2 group disabled:opacity-50"
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
    <div className="max-w-7xl mx-auto py-32 px-6 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 border-b border-white/5 pb-8 gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold tracking-tight">System <span className="text-accent-blue font-black">Control</span></h1>
          <p className="text-text-muted mt-1 font-medium">Portfolio Management & Strategic Inquiries</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-white/5 p-1.5 rounded-[20px] border border-white/5 backdrop-blur-xl">
            <button 
              onClick={() => { setActiveTab('projects'); setShowEditor(false); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === 'projects' ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20' : 'text-text-muted hover:text-white'}`}
            >
              <Layout size={16} /> Projects
            </button>
            <button 
              onClick={() => { setActiveTab('messages'); setShowEditor(false); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === 'messages' ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/20' : 'text-text-muted hover:text-white'}`}
            >
              <Mail size={16} /> Messages 
              {contactSubmissions.length > 0 && (
                <span className="bg-white/10 px-2 py-0.5 rounded-full text-[10px] animate-pulse">
                  {contactSubmissions.length}
                </span>
              )}
            </button>
          </div>
          <button 
            onClick={handleLogout}
            className="group flex items-center gap-2 text-sm font-bold bg-white/5 hover:bg-red-500/10 hover:text-red-500 px-6 py-4 rounded-2xl transition-all border border-white/5"
          >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> Sign Out
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
              className="bg-bg-card border border-white/5 p-6 rounded-3xl relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform text-accent-${stat.color}`}>
                <stat.icon size={48} />
              </div>
              <div className="text-[10px] uppercase tracking-widest text-text-muted font-black mb-1">{stat.label}</div>
              <div className="text-2xl font-display font-bold">{stat.value}</div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {showEditor ? (
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
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/20 transition-all text-text-muted hover:text-white"
                >
                  <ArrowLeft size={20} />
                </button>
                <h2 className="text-3xl font-display font-bold">{editingId ? 'Refine' : 'Author'} Case Study</h2>
              </div>
              <div className="flex items-center gap-3">
                 <button 
                  onClick={() => setShowEditor(false)}
                  className="px-8 py-4 rounded-2xl font-bold bg-white/5 hover:bg-white/10 transition-all"
                >
                  Discard
                </button>
                <button 
                  onClick={handleSubmit}
                  className="bg-accent-blue text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-accent-blue/20"
                >
                  <Save size={20} /> Finalize & Publish
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content Area (Left 3/4) */}
              <div className="lg:col-span-3 space-y-12">
                {/* General Info Section */}
                <div className="bg-bg-card border border-white/5 rounded-[48px] p-12 space-y-10 shadow-2xl relative overflow-hidden">
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
                       className="w-full bg-transparent border-b border-white/10 py-4 text-4xl font-display font-black focus:border-accent-blue outline-none transition-all placeholder:text-white/5 tracking-tighter"
                     />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Client Name</label>
                       <input value={newItem.client} onChange={(e) => setNewItem({ ...newItem, client: e.target.value })} type="text" placeholder="Global Entity..." className="w-full bg-bg-dark border border-white/5 rounded-2xl px-5 py-4 focus:border-accent-blue outline-none text-sm transition-all" />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Project Slug</label>
                       <input value={newItem.slug} onChange={(e) => setNewItem({ ...newItem, slug: e.target.value })} type="text" placeholder="eco-energy-smart" className="w-full bg-bg-dark border border-white/5 rounded-2xl px-5 py-4 focus:border-accent-blue outline-none text-sm transition-all" />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Category</label>
                       <input value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} type="text" placeholder="Web, App, AI..." className="w-full bg-bg-dark border border-white/5 rounded-2xl px-5 py-4 focus:border-accent-blue outline-none text-sm transition-all" />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Industry</label>
                       <input value={newItem.industry} onChange={(e) => setNewItem({ ...newItem, industry: e.target.value })} type="text" placeholder="Healthcare, Fintech..." className="w-full bg-bg-dark border border-white/5 rounded-2xl px-5 py-4 focus:border-accent-blue outline-none text-sm transition-all" />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Year</label>
                       <input value={newItem.year} onChange={(e) => setNewItem({ ...newItem, year: e.target.value })} type="text" placeholder="2024" className="w-full bg-bg-dark border border-white/5 rounded-2xl px-5 py-4 focus:border-accent-blue outline-none text-sm transition-all" />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Duration</label>
                       <input value={newItem.duration} onChange={(e) => setNewItem({ ...newItem, duration: e.target.value })} type="text" placeholder="6 Months" className="w-full bg-bg-dark border border-white/5 rounded-2xl px-5 py-4 focus:border-accent-blue outline-none text-sm transition-all" />
                     </div>
                   </div>
                </div>

                {/* Structured Narrative Content Section */}
                <div className="bg-bg-card border border-white/5 rounded-[48px] p-12 space-y-12">
                   <h3 className="text-2xl font-display font-bold flex items-center gap-3">
                     <FileText className="text-accent-purple" size={24} /> Case Study Content
                   </h3>

                   <div className="space-y-6">
                     <label className="text-xs uppercase tracking-[0.3em] text-text-muted font-bold">Project Intro / Summary</label>
                     <textarea value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} placeholder="Brief high-level overview..." className="w-full bg-bg-dark border border-white/5 rounded-3xl px-8 py-6 focus:border-accent-blue outline-none min-h-[120px] text-lg leading-relaxed transition-all" />
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
                            <span className={`w-2 h-2 rounded-full bg-${section.color}`}></span> {section.label}
                         </label>
                         <textarea 
                           value={newItem[section.key] as string}
                           onChange={(e) => setNewItem({ ...newItem, [section.key]: e.target.value })}
                           placeholder={`Details for ${section.label}...`} 
                           className="w-full bg-bg-dark border border-white/5 rounded-2xl px-6 py-5 focus:border-white/20 outline-none min-h-[160px] transition-all text-sm leading-relaxed"
                         />
                       </div>
                     ))}
                   </div>

                   <div className="pt-10 border-t border-white/5 space-y-8">
                     <div className="flex items-center justify-between">
                       <label className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Key Features & Innovation</label>
                       <button onClick={() => addArrayItem('keyFeatures')} className="text-[10px] font-black uppercase text-accent-blue bg-accent-blue/5 px-4 py-2 rounded-xl hover:bg-accent-blue hover:text-white transition-all">Add Feature</button>
                     </div>
                     <div className="grid grid-cols-1 gap-4">
                       {newItem.keyFeatures?.map((feat, idx) => (
                         <div key={idx} className="flex items-center gap-4 group">
                           <input value={feat} onChange={(e) => updateArrayField('keyFeatures', idx, e.target.value)} type="text" className="flex-1 bg-bg-dark border border-white/5 rounded-2xl px-6 py-4 focus:border-accent-blue/30 outline-none text-sm" />
                           <button onClick={() => removeArrayItem('keyFeatures', idx)} className="w-12 h-12 text-red-500 bg-red-500/5 hover:bg-red-500 hover:text-white rounded-xl transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
                         </div>
                       ))}
                     </div>
                   </div>
                </div>

                {/* Media & Visuals Section */}
                <div className="bg-bg-card border border-white/5 rounded-[48px] p-12 space-y-12">
                   <h3 className="text-2xl font-display font-bold flex items-center gap-3">
                     <Image className="text-accent-blue" size={24} /> Visual Showcase
                   </h3>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-4">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Thumbnail / Cover Image</label>
                        <input value={newItem.imageUrl} onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })} type="text" placeholder="https://..." className="w-full bg-bg-dark border border-white/5 rounded-2xl px-6 py-4 outline-none text-xs" />
                     </div>
                     <div className="space-y-4">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Hero Showcase Image</label>
                        <input value={newItem.heroImage} onChange={(e) => setNewItem({ ...newItem, heroImage: e.target.value })} type="text" placeholder="https://..." className="w-full bg-bg-dark border border-white/5 rounded-2xl px-6 py-4 outline-none text-xs" />
                     </div>
                   </div>

                   <div className="space-y-8">
                     <div className="flex items-center justify-between border-b border-white/5 pb-4">
                       <label className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Production Gallery</label>
                       <button onClick={() => addArrayItem('galleryImages')} className="text-[10px] font-black uppercase text-accent-blue bg-accent-blue/5 px-4 py-2 rounded-xl hover:bg-accent-blue hover:text-white transition-all">Add Image</button>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {newItem.galleryImages?.map((img, idx) => (
                           <div key={idx} className="flex items-center gap-4 group">
                             <input value={img} onChange={(e) => updateArrayField('galleryImages', idx, e.target.value)} type="text" placeholder="Image URL..." className="flex-1 bg-bg-dark border border-white/5 rounded-2xl px-6 py-4 outline-none text-xs" />
                             <button onClick={() => removeArrayItem('galleryImages', idx)} className="w-12 h-12 text-red-500 bg-red-500/5 hover:bg-red-500 hover:text-white rounded-xl transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
                           </div>
                        ))}
                     </div>
                   </div>
                </div>
              </div>

              {/* Sidebar: Metadata & Publishing Controls */}
              <div className="space-y-8">
                <div className="bg-bg-card border border-white/5 rounded-[40px] p-10 space-y-10 sticky top-32 shadow-2xl overflow-hidden">
                  <div className="space-y-8">
                    <h3 className="text-xl font-display font-bold flex items-center gap-3">
                      <Rocket className="text-accent-blue" size={20} /> Publishing
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-bg-dark/50 p-4 rounded-2xl border border-white/5">
                        <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Featured Project</span>
                        <button 
                          onClick={() => setNewItem({ ...newItem, isFeatured: !newItem.isFeatured })}
                          className={`w-12 h-6 rounded-full transition-all relative ${newItem.isFeatured ? 'bg-accent-blue' : 'bg-white/10'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${newItem.isFeatured ? 'left-7' : 'left-1'}`}></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between bg-bg-dark/50 p-4 rounded-2xl border border-white/5">
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
                      <label className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Master Deployment Node</label>
                      <input value={newItem.url} onChange={(e) => setNewItem({ ...newItem, url: e.target.value })} type="text" placeholder="https://..." className="w-full bg-bg-dark border border-white/5 rounded-2xl px-5 py-4 outline-none text-sm" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Video Showcase (Vimeo/YT)</label>
                      <input value={newItem.videoUrl} onChange={(e) => setNewItem({ ...newItem, videoUrl: e.target.value })} type="text" placeholder="https://..." className="w-full bg-bg-dark border border-white/5 rounded-2xl px-5 py-4 outline-none text-sm" />
                    </div>
                  </div>

                  <div className="space-y-8 pt-8 border-t border-white/5">
                    <h3 className="text-xl font-display font-bold flex items-center gap-3">
                      <LayoutGrid className="text-accent-purple" size={20} /> Design System & Architecture
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">UI/UX Components Used</label>
                        {(newItem.uiComponents || []).map((comp, idx) => (
                          <div key={idx} className="flex gap-2">
                            <input value={comp} onChange={(e) => updateArrayField('uiComponents', idx, e.target.value)} type="text" className="flex-1 bg-bg-dark border border-white/5 rounded-xl px-4 py-3 focus:border-accent-purple/30 outline-none text-sm" />
                            <button type="button" onClick={() => removeArrayItem('uiComponents', idx)} className="px-3 rounded-xl bg-red-500/10 text-red-400 text-xs font-bold hover:bg-red-500/20">×</button>
                          </div>
                        ))}
                        <button type="button" onClick={() => addArrayItem('uiComponents')} className="text-xs text-accent-purple underline">+ Add Component</button>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">System Architecture Diagram URL</label>
                        <input value={newItem.systemDiagram} onChange={(e) => setNewItem({ ...newItem, systemDiagram: e.target.value })} type="text" placeholder="https://..." className="w-full bg-bg-dark border border-white/5 rounded-xl px-5 py-4 outline-none text-sm" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Diagram Caption</label>
                        <input value={newItem.systemDiagramCaption} onChange={(e) => setNewItem({ ...newItem, systemDiagramCaption: e.target.value })} type="text" placeholder="Pipeline description..." className="w-full bg-bg-dark border border-white/5 rounded-xl px-5 py-4 outline-none text-sm" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 pt-8 border-t border-white/5">
                    <h3 className="text-xl font-display font-bold flex items-center gap-3">
                      <Lock className="text-accent-blue" size={20} /> SEO Management
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Meta Title</label>
                        <input value={newItem.metaTitle} onChange={(e) => setNewItem({ ...newItem, metaTitle: e.target.value })} type="text" className="w-full bg-bg-dark border border-white/5 rounded-2xl px-5 py-4 outline-none text-xs" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Meta Description</label>
                        <textarea value={newItem.metaDescription} onChange={(e) => setNewItem({ ...newItem, metaDescription: e.target.value })} className="w-full bg-bg-dark border border-white/5 rounded-2xl px-5 py-4 outline-none text-xs min-h-[100px]" />
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
                  className="bg-accent-blue/10 text-accent-blue border border-accent-blue/20 px-8 py-5 rounded-[40px] font-bold tracking-tight hover:bg-accent-blue hover:text-white transition-all transform hover:-translate-y-1"
                >
                  Seed Real Data
                </button>
                <button 
                  onClick={handleCreateNew}
                  className="bg-white text-black px-10 py-5 rounded-[40px] font-black tracking-tighter hover:bg-accent-blue hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl flex items-center gap-3"
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
                  className="bg-bg-card/50 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 flex flex-col md:flex-row items-center gap-8 hover:border-accent-blue/20 transition-all group shadow-2xl"
                >
                  <div className="w-full md:w-48 aspect-video md:aspect-square rounded-3xl overflow-hidden border border-white/10 bg-bg-dark flex-shrink-0 relative">
                    <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" alt={item.name} />
                    <div className="absolute inset-0 bg-accent-blue/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-2">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black text-accent-blue uppercase tracking-[0.3em]">{item.client}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleEdit(item)} className="p-3 bg-white/5 hover:bg-accent-blue hover:text-white rounded-xl transition-all duration-300">
                            <Edit3 size={18} />
                          </button>
                          <button onClick={() => { if (confirm('Purge this record?')) deleteItem(item.id); }} className="p-3 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-300">

                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <h4 className="text-2xl font-display font-bold leading-tight group-hover:text-accent-blue transition-colors mb-4">{item.name}</h4>
                    </div>
                    
                    <div className="bg-white/5 rounded-2xl px-5 py-3 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-text-muted truncate max-w-[140px]">{item.url}</span>
                      <ChevronRight size={14} className="text-accent-blue group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {portfolioItems.length === 0 && (
              <div className="text-center py-32 border-2 border-dashed border-white/5 rounded-[60px] bg-white/[0.01]">
                <PlusCircle className="mx-auto text-white/5 mb-8" size={80} strokeWidth={0.5} />
                <p className="text-text-muted text-xl font-medium mb-10">The registry is currently empty.</p>
                <button onClick={handleCreateNew} className="bg-accent-blue text-white px-12 py-5 rounded-[40px] font-black hover:scale-105 transition-all shadow-glow-blue">
                  Initiate New Case Study
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="messages"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12 pb-32"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-8 group">
              <h2 className="text-3xl font-display font-black flex items-center gap-5 tracking-tighter">
                <Mail className="text-accent-purple group-hover:scale-110 transition-transform" size={32} /> Central Inquiries
              </h2>
              <div className="flex items-center gap-6">
                 <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em] bg-white/5 px-6 py-3 rounded-full border border-white/5">
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
                  className="bg-bg-card/30 backdrop-blur-2xl border border-white/5 rounded-[48px] p-12 shadow-2xl relative group hover:border-accent-purple/20 transition-all duration-500 overflow-hidden"
                >
                  {/* Accent Highlight */}
                  <div className="absolute top-0 left-0 w-2 h-full bg-accent-purple/20 group-hover:bg-accent-purple transition-all"></div>
                  
                  <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100">
                    <button 
                      onClick={() => {
                        if (confirm('Archive this submission?')) deleteSubmission(msg.id);
                      }}
                      className="w-16 h-16 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white rounded-[24px] flex items-center justify-center transition-all shadow-2xl"
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

                         <div className="space-y-2">
                            <div className="text-[10px] uppercase font-black text-accent-purple tracking-[0.4em] mb-4">Strategic Interest</div>
                            <span className="inline-flex items-center bg-accent-purple/10 text-accent-purple px-6 py-3 rounded-[20px] text-xs font-black ring-1 ring-accent-purple/20 border border-white/5">
                              {msg.service}
                            </span>
                         </div>
                       </div>

                       <div className="pt-12 border-t border-white/5 mt-auto">
                          <div className="text-[10px] uppercase font-black text-text-muted tracking-[0.4em] mb-3">Transmission Timestamp</div>
                          <div className="text-sm font-bold text-white/40 font-mono tracking-tight">{msg.date}</div>
                       </div>
                    </div>

                    <div className="lg:w-2/3 lg:pl-16 lg:border-l border-white/5 flex flex-col">
                      <div className="flex items-center gap-3 text-[10px] uppercase font-black text-text-muted tracking-[0.4em] mb-8">
                        <FileText size={14} className="text-accent-blue" /> Project Abstract
                      </div>
                      <div className="flex-1 bg-white/[0.02] rounded-[32px] p-10 border border-white/5 relative shadow-inner">
                         <p className="text-2xl leading-[1.6] text-white/90 font-medium whitespace-pre-wrap tracking-tight italic">
                           "{msg.message}"
                         </p>
                         <div className="absolute bottom-6 right-8 opacity-5">
                            <Mail size={120} />
                         </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {contactSubmissions.length === 0 && (
              <div className="text-center py-40 bg-bg-card/50 rounded-[60px] border-2 border-dashed border-white/5">
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <Mail className="mx-auto text-white/5 mb-10" size={100} strokeWidth={0.5} />
                </motion.div>
                <p className="text-text-muted text-2xl font-display font-black tracking-tight mb-4">Registry Silent</p>
                <p className="text-text-muted/50 font-medium">Inbound signals haven't been detected yet.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
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
