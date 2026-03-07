"use client";

import React, { useState } from 'react';
import { 
  PlusCircle, LogOut, ArrowLeft, Edit3, Trash2, List, 
  Rocket, PlayCircle, Image, FileText, ChevronRight, 
  Layout, Save, X, Plus, AlertCircle, CheckCircle2,
  Lock, ArrowRight, Loader2, Mail, LayoutGrid, CheckCircle, Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';

const fadeInUp: any = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }
};

const ProjectDiscoveryFlow = () => {
  const { addSubmission } = usePortfolio();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const steps = [
    // ... (steps 0-2)
    {
      id: 'intent',
      question: "What are you looking to work on?",
      options: [
        "Web Platform",
        "Mobile App",
        "AI Application / Autonomous System",
        "SaaS Development",
        "Research & Innovation"
      ]
    },
    {
      id: 'research',
      question: "What type of research focus fits your needs?",
      condition: (prevAnswers: any) => prevAnswers.intent === "Research & Innovation",
      options: [
        "AI Research",
        "Market Research",
        "Product Research",
        "Scientific Research"
      ]
    },
    {
      id: 'stage',
      question: "Where are you in your journey?",
      options: [
        "Just an idea",
        "Early planning",
        "Requirements defined",
        "Existing product needs improvement",
        "Looking for end-to-end execution"
      ]
    },
    {
      id: 'scope',
      question: "How would you like Qoarc to support you?",
      multiSelect: true,
      options: [
        "Strategy & Planning",
        "UI/UX & Experience Design",
        "Full Product Development",
        "AI Systems & Automation",
        "Research & Validation",
        "Long-term Technical Partnership"
      ]
    }
  ];

  // Filter steps based on conditions
  const activeSteps = steps.filter(s => !s.condition || s.condition(answers));
  const isFinalStep = step === activeSteps.length;
  const currentStepData = activeSteps[step];

  const toggleSelection = (opt: string) => {
    if (currentStepData.multiSelect) {
      setAnswers(prev => {
        const currentVals = prev[currentStepData.id] || [];
        const nextVals = currentVals.includes(opt) 
          ? currentVals.filter((v: string) => v !== opt)
          : [...currentVals, opt];
        return { ...prev, [currentStepData.id]: nextVals };
      });
    } else {
      setAnswers(prev => ({ ...prev, [currentStepData.id]: opt }));
      nextStep();
    }
  };

  const nextStep = () => {
    setDirection(1);
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setStatus('submitting');

    const formattedScope = Array.isArray(answers.scope) 
      ? answers.scope.join(', ') 
      : answers.scope;

    const fullMessage = `
Project Discovery Brief:
- Phone: ${formData.phone || 'Not provided'}
- Intent: ${answers.intent}
${answers.research ? `- Research Focus: ${answers.research}` : ''}
- Project Stage: ${answers.stage}
- Collaboration Scope: ${formattedScope}
    `.trim();

    try {
      addSubmission({
        name: formData.name,
        email: formData.email,
        service: answers.intent,
        message: fullMessage
      });

      // Background Formspree backup
      fetch('https://formspree.io/f/xvgzgeea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ ...formData, message: fullMessage, ...answers })
      }).catch(err => console.error("Backup failed:", err));

      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  if (status === 'success') {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          <div className="w-24 h-24 rounded-full bg-accent-blue/10 flex items-center justify-center mx-auto text-accent-blue border border-accent-blue/20 glow-blue">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight">Project Logged</h2>
          <p className="text-xl text-text-muted max-w-lg mx-auto leading-relaxed">
            Thanks. This gives us a clear starting point. Our team will reach out to shape this into a plan.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-white text-black px-12 py-5 rounded-full font-black text-lg hover:bg-accent-blue hover:text-white transition-all shadow-2xl"
          >
            Return Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto min-h-[60vh] flex flex-col justify-center relative px-4">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-between mb-12 px-2">
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted">
          Design Phase — {step + 1} of {activeSteps.length + 1}
        </div>
        <div className="flex-1 max-w-[200px] h-1 bg-white/5 rounded-full mx-6 overflow-hidden">
          <motion.div 
            className="h-full bg-accent-blue shadow-glow-blue"
            animate={{ width: `${((step + 1) / (activeSteps.length + 1)) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-20">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          {!isFinalStep ? (
            <motion.div
              key={activeSteps[step].id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="space-y-12"
            >
              <div className="text-center">
                <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.1]">
                  {activeSteps[step].question}
                </h2>
                {activeSteps[step].multiSelect && (
                  <p className="text-accent-blue font-bold uppercase tracking-[0.2em] text-[10px] mb-12">Select all that apply</p>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeSteps[step].options.map((opt) => {
                    const isSelected = activeSteps[step].multiSelect 
                      ? (answers[activeSteps[step].id] || []).includes(opt)
                      : answers[activeSteps[step].id] === opt;
                    
                    return (
                      <button
                        key={opt}
                        onClick={() => toggleSelection(opt)}
                        className={`group relative p-8 rounded-[32px] border transition-all duration-300 text-left hover:-translate-y-1 ${
                          isSelected 
                            ? 'bg-accent-blue/10 border-accent-blue shadow-glow-blue' 
                            : 'bg-white/5 border-white/5 hover:border-accent-blue/40 hover:bg-accent-blue/5'
                        }`}
                      >
                        <div className="flex flex-col h-full justify-between items-start">
                          <span className={`text-lg font-bold transition-colors leading-tight ${
                            isSelected ? 'text-accent-blue' : 'text-white group-hover:text-accent-blue'
                          }`}>{opt}</span>
                          <div className={`mt-6 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                            isSelected 
                              ? 'bg-accent-blue border-accent-blue' 
                              : 'border-white/10 group-hover:bg-accent-blue group-hover:border-accent-blue'
                          }`}>
                            {isSelected ? (
                              <CheckCircle size={16} className="text-white" />
                            ) : (
                              <Plus size={16} className="text-text-muted group-hover:text-white" />
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {activeSteps[step].multiSelect && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => nextStep()}
                    disabled={!(answers[activeSteps[step].id] || []).length}
                    className="mt-16 bg-white text-black px-12 py-5 rounded-full font-black text-lg hover:bg-accent-blue hover:text-white transition-all shadow-2xl disabled:opacity-20"
                  >
                    Continue <ArrowRight size={20} className="inline-block ml-2" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="final-details"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="max-w-2xl mx-auto space-y-12 text-center"
            >
              <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white leading-tight">
                Almost there. <br/> Who are we talking to?
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-lg focus:border-accent-blue outline-none transition-all placeholder:text-white/20"
                    required
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-lg focus:border-accent-blue outline-none transition-all placeholder:text-white/20"
                    required
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number (Optional)" 
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full md:col-span-2 bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-lg focus:border-accent-blue outline-none transition-all placeholder:text-white/20"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-white text-black py-6 rounded-2xl font-black text-xl hover:bg-accent-blue hover:text-white transition-all shadow-2xl disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {status === 'submitting' ? (
                    <>Sending Design Brief <Loader2 size={24} className="animate-spin" /></>
                  ) : (
                    <>Submit Project Brief <Send size={20} /></>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Button */}
        {step > 0 && (status as string) !== 'success' && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={prevStep}
            className="mt-12 mx-auto flex items-center gap-2 text-text-muted hover:text-white transition-colors font-bold uppercase tracking-widest text-[10px]"
          >
            <ArrowLeft size={14} /> Previous Step
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default function ContactPage() {
  return (
    <div className="bg-grid min-h-screen pt-40 pb-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ProjectDiscoveryFlow />
      </div>
    </div>
  );
}

