"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Plus, 
  Upload, 
  Link as LinkIcon,
  Sparkles,
  Cpu,
  Globe,
  Monitor,
  Smartphone,
  Search,
  Layers,
  Zap,
  ShieldCheck,
  User,
  Mail,
  Phone
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

type FormData = {
  projectTypes: string[];
  journeyStages: string[];
  supportTypes: string[];
  assets: string;
  name: string;
  email: string;
  phone: string;
};

const STEPS = [
  { id: 1, title: "What are you looking to work on?" },
  { id: 2, title: "Where are you in your journey?" },
  { id: 3, title: "How would you like QOARC to support you?" },
  { id: 4, title: "Do you have any existing assets?" },
  { id: 5, title: "Almost there. Who are we talking to?" },
];

export default function LeadCaptureForm() {
  const { addSubmission } = usePortfolio();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    projectTypes: [],
    journeyStages: [],
    supportTypes: [],
    assets: '',
    name: '',
    email: '',
    phone: '',
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmitSequence = async () => {
    setIsSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const messageBody = `
Project Types: ${formData.projectTypes.join(', ')}
Journey Stages: ${formData.journeyStages.join(', ')}
Support Types: ${formData.supportTypes.join(', ')}
Assets/Links: ${formData.assets || 'None'}
      `.trim();

      addSubmission({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.projectTypes.join(', ') || 'General Inquiry',
        message: messageBody,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
       console.error(error);
       setIsSubmitting(false);
       alert('Transmission failure. Please try again.');
    }
  };

  const toggleSelection = (field: 'projectTypes' | 'journeyStages' | 'supportTypes', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((t: string) => t !== value)
        : [...prev[field], value]
    }));
  };

  const isStepValid = () => {
    if (currentStep === 1) return formData.projectTypes.length > 0;
    if (currentStep === 2) return formData.journeyStages.length > 0;
    if (currentStep === 3) return formData.supportTypes.length > 0;
    if (currentStep === 5) return formData.name && formData.email && formData.phone;
    return true; // Step 4 is skippable
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-12">
            <div className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40">Select all that apply</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'web', label: 'Web Platform', icon: Monitor },
                { id: 'mobile', label: 'Mobile App', icon: Smartphone },
                { id: 'ai', label: 'AI Application / Autonomous System', icon: Sparkles },
                { id: 'saas', label: 'SaaS Development', icon: Cpu },
                { id: 'research', label: 'Research & Innovation', icon: Search },
              ].map(item => (
                <OptionCard 
                  key={item.id}
                  multi
                  selected={formData.projectTypes.includes(item.id)}
                  onClick={() => toggleSelection('projectTypes', item.id)}
                  label={item.label}
                  icon={item.icon}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <button 
                onClick={nextStep}
                disabled={!isStepValid()}
                className="bg-primary text-white px-16 py-6 rounded-none font-bold uppercase tracking-widest text-[10px] shadow-premium hover:scale-105 transition-all disabled:opacity-50 disabled:grayscale"
              >
                Continue <ArrowRight size={14} className="inline ml-2" />
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-12">
            <div className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40">Select all that apply</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { id: 'idea', label: 'Just an idea' },
                { id: 'planning', label: 'Early planning' },
                { id: 'ready', label: 'Requirements defined' },
                { id: 'improvement', label: 'Existing product needs improvement' },
                { id: 'execution', label: 'Looking for end-to-end execution' },
              ].map(item => (
                <OptionCard 
                  key={item.id}
                  multi
                  selected={formData.journeyStages.includes(item.id)}
                  onClick={() => toggleSelection('journeyStages', item.id)}
                  label={item.label}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <button 
                onClick={nextStep}
                disabled={!isStepValid()}
                className="bg-primary text-white px-16 py-6 rounded-none font-bold uppercase tracking-widest text-[10px] shadow-premium hover:scale-105 transition-all disabled:opacity-50 disabled:grayscale"
              >
                Continue <ArrowRight size={14} className="inline ml-2" />
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-12">
            <div className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40">Select all that apply</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'strategy', label: 'Strategy & Planning' },
                { id: 'design', label: 'UI/UX & Experience Design' },
                { id: 'dev', label: 'Full Product Development' },
                { id: 'automation', label: 'AI Systems & Automation' },
                { id: 'validation', label: 'Research & Validation' },
                { id: 'partnership', label: 'Long-term Technical Partnership' },
              ].map(item => (
                <OptionCard 
                  key={item.id}
                  multi
                  selected={formData.supportTypes.includes(item.id)}
                  onClick={() => toggleSelection('supportTypes', item.id)}
                  label={item.label}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <button 
                onClick={nextStep}
                disabled={!isStepValid()}
                className="bg-primary text-white px-16 py-6 rounded-none font-bold uppercase tracking-widest text-[10px] shadow-premium hover:scale-105 transition-all disabled:opacity-50 disabled:grayscale"
              >
                Continue <ArrowRight size={14} className="inline ml-2" />
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="max-w-2xl mx-auto space-y-12">
            <div className="relative">
              <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
              <input 
                type="text" 
                placeholder="Paste Google Drive or Dropbox link"
                value={formData.assets}
                onChange={e => setFormData({...formData, assets: e.target.value})}
                className="w-full bg-white border border-outline-variant/10 rounded-none p-6 pl-16 text-sm focus:outline-none focus:border-primary/40 transition-all font-sans italic"
              />
            </div>
            <div className="text-center text-[10px] font-bold text-primary/20 uppercase tracking-widest">— OR UPLOAD DIRECTLY —</div>
            <div className="aspect-[2/1] bg-white border-[0.5px] border-dashed border-primary/20 rounded-none flex flex-col items-center justify-center space-y-6 group hover:border-primary/40 transition-all cursor-pointer">
              <div className="w-14 h-14 rounded-none bg-surface-container-low flex items-center justify-center text-primary/40 group-hover:bg-primary group-hover:text-white transition-all shadow-sharp">
                <Upload size={20} />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-primary italic">Click to upload <span className="font-medium text-primary/40">or drag and drop</span></div>
                <div className="text-[10px] text-primary/30 mt-2 uppercase tracking-widest font-medium">Logos, Guidelines, Requirements (Max 20MB)</div>
              </div>
            </div>
            <div className="flex justify-center">
               <button 
                onClick={nextStep}
                className="text-primary/60 hover:text-primary px-10 py-4 font-bold uppercase tracking-widest text-[10px] transition-all"
              >
                Skip this step →
              </button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <InputBlock icon={User} label="Full Name" value={formData.name} onChange={v => setFormData({...formData, name: v})} />
              <InputBlock icon={Mail} label="Email Address" value={formData.email} onChange={v => setFormData({...formData, email: v})} />
            </div>
            <div className="relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
                 <Globe size={16} className="text-primary/30" />
                 <span className="text-xs font-bold text-primary/40">+1</span>
              </div>
              <input 
                type="tel" 
                placeholder="Phone Number"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-white border border-outline-variant/10 rounded-none p-6 pl-20 text-sm focus:outline-none focus:border-primary/40 transition-all font-sans"
              />
            </div>
            <div className="pt-8 flex justify-center">
               <button 
                onClick={handleSubmitSequence}
                disabled={!isStepValid() || isSubmitting}
                className="bg-primary text-white px-20 py-8 rounded-none font-bold uppercase tracking-widest text-xs shadow-premium hover:scale-105 transition-all disabled:opacity-50 disabled:grayscale flex items-center gap-4"
              >
                {isSubmitting ? 'Transmitting...' : <>Submit Project Brief <Zap size={16} /></>}
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full max-w-screen-xl mx-auto py-20 px-4">
      {/* Progress Header */}
      <div className="flex justify-between items-center mb-24 px-8">
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary space-x-4">
          <span className="opacity-40 italic">Design Phase —</span>
          <span className="italic">{currentStep} of 5</span>
        </div>
        <div className="flex gap-2 w-32 h-1 bg-primary/5 rounded-none overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / 5) * 100}%` }}
            className="h-full bg-primary"
          />
        </div>
      </div>

      {/* Main Form Area */}
      <div className="min-h-[600px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-16"
            >
              <h2 className="text-6xl md:text-8xl font-display font-medium text-primary text-center tracking-tighter italic">
                {STEPS[currentStep - 1].title}
              </h2>

              {renderStep()}
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-primary p-20 rounded-none shadow-premium text-center space-y-12"
            >
              <div className="w-24 h-24 rounded-none bg-white/10 mx-auto flex items-center justify-center text-white mb-8 border border-white/20">
                <Check size={48} />
              </div>
              <div className="space-y-6">
                <h2 className="text-6xl md:text-7xl font-display font-medium text-white italic leading-none">Brief <br/> <span className="opacity-40">Received.</span></h2>
                <p className="text-xl text-white/60 font-sans italic leading-relaxed max-w-2xl mx-auto border-t border-white/10 pt-12">
                   Your architectural brief has been logged in our system. An engineering lead will be in contact within 24 hours.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      {currentStep > 1 && !isSubmitted && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <button 
            onClick={prevStep}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors italic"
          >
            <ArrowLeft size={10} /> Previous Step
          </button>
        </div>
      )}
    </div>
  );
}

function OptionCard({ label, selected, onClick, icon: Icon, multi }: { label: string, selected: boolean, onClick: () => void, icon?: any, multi?: boolean }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative p-10 rounded-none border-[0.5px] cursor-pointer transition-all duration-500 min-h-[160px] flex flex-col justify-between group overflow-hidden
        ${selected 
          ? 'bg-white border-primary shadow-sharp scale-[1.02]' 
          : 'bg-white border-primary/10 hover:border-primary/30'}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className={`
        w-8 h-8 rounded-none border-[0.5px] flex items-center justify-center transition-all
        ${selected 
          ? 'bg-primary border-primary text-white shadow-sharp' 
          : 'bg-surface-container-low border-primary/10 text-primary/30 group-hover:border-primary/30'}
      `}>
        {selected ? <Check size={14} strokeWidth={3} /> : <Plus size={14} />}
      </div>
      
      <div className="relative z-10 space-y-4">
        {Icon && <Icon size={24} className={`transition-colors ${selected ? 'text-primary' : 'text-primary/20 group-hover:text-primary/40'}`} />}
        <h4 className={`text-xl font-display italic font-medium leading-none tracking-tight ${selected ? 'text-primary' : 'text-primary/60 group-hover:text-primary'}`}>
          {label}
        </h4>
      </div>
    </motion.div>
  );
}

function InputBlock({ label, value, onChange, icon: Icon }: { label: string, value: string, onChange: (v: string) => void, icon: any }) {
  return (
    <div className="relative">
      <Icon className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
      <input 
        type="text" 
        placeholder={label}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-white border border-outline-variant/10 rounded-none p-6 pl-16 text-sm focus:outline-none focus:border-primary/40 transition-all font-sans"
      />
    </div>
  )
}
