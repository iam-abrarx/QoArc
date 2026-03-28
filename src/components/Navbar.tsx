"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { useLeadCapture } from '@/context/LeadCaptureContext';

const navItems = [
  { 
    name: 'Services', 
    href: '/services',
    isMega: true,
    description: 'Engineering high-fidelity systems for the global digital architecture.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    categories: [
      {
        label: 'Custom Software',
        items: [
          { name: 'Web App Development', href: '/services/custom-software/web-app-development' },
          { name: 'Mobile App Development', href: '/services/custom-software/mobile-app-development' },
          { name: 'MVP Development', href: '/services/custom-software/mvp-development' },
          { name: 'Enterprise Software', href: '/services/custom-software/enterprise-software-development' },
          { name: 'SaaS Development', href: '/services/custom-software/saas-development' },
          { name: 'Custom CRM', href: '/services/custom-software/custom-crm' },
          { name: 'ERP Development', href: '/services/custom-software/erp-development' }
        ]
      },
      {
        label: 'IT Consulting',
        items: [
          { name: 'GTM Strategy', href: '/services/it-consulting/gtm-strategy-consulting' },
          { name: 'Digital Transformation', href: '/services/it-consulting/digital-transformation-consulting' },
          { name: 'Solution Architecture', href: '/services/it-consulting/solution-architecture' }
        ]
      }
    ]
  },
  {
    name: 'AI & Data',
    href: '/ai-data',
    isMega: true,
    description: 'Transforming industrial signal into sovereign predictive intelligence.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
    categories: [
      {
        label: 'Intelligence',
        items: [
          { name: 'ML Development', href: '/ai-data/machine-learning-development' },
          { name: 'MLOps Consulting', href: '/ai-data/mlops-consulting' },
          { name: 'Computer Vision', href: '/ai-data/computer-vision' },
          { name: 'NLP', href: '/ai-data/natural-language-processing' }
        ]
      },
      {
        label: 'Analytics & Automation',
        items: [
          { name: 'Business Intelligence', href: '/ai-data/business-intelligence' },
          { name: 'Predictive Analytics', href: '/ai-data/predictive-analytics' },
          { name: 'RPA Development', href: '/ai-data/rpa-development' },
          { name: 'Intelligent Process Automation', href: '/ai-data/intelligent-process-automation' }
        ]
      }
    ]
  },
  {
    name: 'Industries',
    href: '#',
    isMega: true,
    description: 'Bespoke engineering solutions for mission-critical global sectors.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
    categories: [
      {
        label: 'Sectors',
        items: [
          { name: 'FinTech', href: '/industries/fintech' },
          { name: 'Healthcare', href: '/industries/healthcare' },
          { name: 'HRTech', href: '/industries/hrtech' },
          { name: 'Cleantech', href: '/industries/cleantech' },
          { name: 'EdTech', href: '/industries/edtech' },
          { name: 'InsurTech', href: '/industries/insurtech' }
        ]
      },
      {
        label: 'Markets',
        items: [
          { name: 'Retail & eCommerce', href: '/industries/retail-ecommerce' },
          { name: 'Travel & Hospitality', href: '/industries/travel-hospitality' },
          { name: 'LegalTech', href: '/industries/legaltech' },
          { name: 'Software & Hi-Tech', href: '/industries/software-hitech' },
          { name: 'Manufacturing', href: '/industries/manufacturing' }
        ]
      }
    ]
  },
  { name: 'Lab', href: '/lab' },
  { name: 'Work', href: '/work' }, 
  { 
    name: 'About', 
    href: '/about',
    dropdown: [
      { name: 'Team', href: '/about/team' },
      { name: 'How We Work', href: '/about/how-we-work' },
      { name: 'Careers', href: '/about/careers' }
    ]
  }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { openModal } = useLeadCapture();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'bg-surface/80 backdrop-blur-xl border-b-[0.5px] border-primary/10 py-3' : 'bg-transparent py-5'}`}
    >
      <div className="max-w-screen-2xl mx-auto px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 relative mr-8 group transition-opacity duration-300 hover:opacity-80">
          <Image 
            src={isScrolled || !(['/', '/about'].includes(pathname)) ? "/images/logo/Qoarc_logo_blue.png" : "/images/logo/Qoarc_logo_White.png"} 
            alt="QOARC Logo" 
            width={120} 
            height={36} 
            priority
            className="w-auto h-8 object-contain transition-all duration-300"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <div 
              key={item.name} 
              className="relative group h-full flex items-center"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                href={item.href}
                className={`text-sm font-bold tracking-tight transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-1.5 hover:scale-[1.02] ${
                   pathname.startsWith(item.href) 
                    ? (isScrolled || !(['/', '/about'].includes(pathname)) ? 'text-primary' : 'text-white') 
                    : (isScrolled || !(['/', '/about'].includes(pathname)) ? 'text-primary/60 hover:text-primary' : 'text-white/70 hover:text-white')
                }`}
              >
                {item.name}
                {(item.dropdown || item.isMega) && (
                  <ChevronDown size={14} className={`transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeDropdown === item.name ? 'rotate-180' : ''} ${isScrolled || !(['/', '/about'].includes(pathname)) ? 'text-primary/40' : 'text-white/40'}`} />
                )}
              </Link>

              {/* Dropdown / Mega Menu */}
              {(item.dropdown || item.isMega) && (
                <AnimatePresence>
                  {activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.98, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: 10, scale: 0.98, filter: 'blur(4px)' }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-[#001026] border border-white/10 rounded-none shadow-premium z-50 overflow-hidden ${item.isMega ? 'w-[850px]' : 'w-62'}`}
                    >
                      {item.isMega ? (
                        <div className="flex relative z-10 h-full min-h-[400px]">
                          {/* Blurb Side */}
                          <div className="w-[300px] bg-primary p-10 flex flex-col justify-between text-white relative overflow-hidden group/blurb">
                            <div className="relative z-10 transition-transform duration-700 group-hover/blurb:-translate-y-2">
                              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-none flex items-center justify-center mb-6">
                                <Sparkles className="text-white/80" size={24} />
                              </div>
                              <h3 className="text-2xl font-display font-medium italic mb-4 leading-tight">{item.name}</h3>
                              <p className="text-white/60 text-sm leading-relaxed font-medium tracking-tight">
                                {item.description}
                              </p>
                            </div>
                            
                            <Link href={item.href} className="group/btn relative z-10 flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-white transition-colors duration-300">
                              Explore All
                              <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                            </Link>

                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover opacity-20 filter grayscale transition-transform duration-1000 group-hover/blurb:scale-110" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
                            </div>
                          </div>

                          {/* Content Side */}
                          <div className="flex-1 p-10 bg-[#001830]">
                            <div className="grid grid-cols-2 gap-10">
                              {item.categories?.map((cat) => (
                                <div key={cat.label} className="space-y-6">
                                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 border-b border-white/5 pb-3">
                                    {cat.label}
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    {cat.items.map((sub) => (
                                      <Link
                                        key={sub.name}
                                        href={sub.href}
                                        className="text-[13px] font-bold text-white/60 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-none transition-all duration-300 block"
                                      >
                                        {sub.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1 relative z-10 p-2 bg-[#001830]">
                          {item.dropdown?.map((sub, idx) => (
                            <motion.div
                              key={sub.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.03, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            >
                              <Link
                                href={sub.href}
                                className="text-[13px] font-bold text-white/60 hover:text-white hover:bg-white/5 px-4 py-3 rounded-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] block"
                              >
                                {sub.name}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}

          {/* CTA */}
          <button 
            onClick={openModal}
            className="bg-primary text-white px-8 py-3.5 rounded-none font-bold text-sm uppercase tracking-[0.15em] hover:shadow-xl shadow-primary/20 transition-all active:scale-95 group flex items-center gap-2 cursor-pointer"
          >
            Start a Project
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-primary">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-t border-outline-variant/10 px-8 pb-12 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col gap-6 pt-12">
              {navItems.map((item) => (
                <div key={item.name} className="space-y-4">
                  <Link 
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-display font-medium text-primary block"
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-6 flex flex-col gap-4 border-l border-outline-variant/10">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setIsOpen(false)}
                          className="text-primary/50 font-bold text-sm"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                  {item.isMega && (
                    <div className="pl-6 flex flex-col gap-8 border-l border-outline-variant/10">
                      {item.categories?.map((cat) => (
                        <div key={cat.label} className="space-y-4">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-primary/30">
                            {cat.label}
                          </div>
                          <div className="flex flex-col gap-4">
                            {cat.items.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                className="text-primary/50 font-bold text-sm"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button 
                onClick={() => { setIsOpen(false); openModal(); }}
                className="bg-primary text-white px-8 py-5 rounded-none font-bold text-sm uppercase tracking-widest text-center mt-8 block w-full cursor-pointer"
              >
                Start a Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
