"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Mail, Globe, Sparkles, MapPin, Clock } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const footerLinks = [
  {
    title: 'Capabilities',
    links: [
      { name: 'AI Integration', href: '/services/ai-integration' },
      { name: 'SaaS Development', href: '/services/saas-development' },
      { name: 'Automation', href: '/services/automation' },
      { name: 'Full-Stack Engineering', href: '/services/web-mobile-development' },
      { name: 'Technical Consulting', href: '/services/technical-consulting' }
    ]
  },
  {
    title: 'Innovation',
    links: [
      { name: 'QOARC Lab', href: '/lab' },
      { name: 'Animal weight estimation from images', href: '/lab/cow-project' },
      { name: 'Large scale PFAS generation and toxicity analysis', href: '/lab/pfas-rigidity' },
      { name: 'DDP Platform', href: '/lab/ddp-platform' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'Work / Portfolio', href: '/work' },
      { name: 'Our Team', href: '/about/team' },
      { name: 'How We Work', href: '/about/how-we-work' },
      { name: 'Careers', href: '/about/careers' },
      { name: 'Pricing', href: '/pricing' }
    ]
  },
  {
    title: 'Strategic',
    links: [
      { name: 'Industries', href: '#' },
      { name: 'Case Studies', href: '/work' },
      { name: 'Solutions', href: '/#solutions' },
      { name: 'Partnerships', href: '/contact' }
    ]
  }
];

export default function Footer() {
  const { footerInfo } = usePortfolio();

  return (
    <footer className="bg-[#001026] border-t border-white/5 pt-32 pb-12 px-8 overflow-hidden text-white">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-16 mb-24">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-3 relative mr-8 group transition-opacity duration-300 hover:opacity-80">
              <Image 
                src="/images/logo/Qoarc_logo_White.png" 
                alt="QOARC Logo" 
                width={150} 
                height={45} 
                className="w-auto h-10 object-contain transition-all duration-300"
              />
            </Link>
            <p className="text-lg text-white/40 leading-relaxed max-w-sm font-sans font-light">
              A full-service AI product studio architecture firm building intelligent SaaS, automating business operations, and shipping autonomous systems.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <a href={footerInfo.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${footerInfo.email}`} className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-12">
            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
                  {group.title}
                </h4>
                <div className="flex flex-col gap-4">
                  {group.links.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href}
                      className="text-[13px] font-bold text-white/40 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tactical Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-white/5 mb-12">
          <div className="flex items-center gap-4 text-white/40">
            <MapPin size={18} />
            <span className="text-xs font-bold uppercase tracking-widest leading-relaxed">
              Dhaka, Bangladesh <br/> <span className="opacity-50">Headquarters</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-white/40">
            <Clock size={18} />
            <span className="text-xs font-bold uppercase tracking-widest leading-relaxed">
              GMT +6 <br/> <span className="opacity-50">US & EU Overlap Windows</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-white/40">
            <Globe size={18} />
            <span className="text-xs font-bold uppercase tracking-widest leading-relaxed">
              Global Transmission <br/> <span className="opacity-50">Invoicing in USD / EUR</span>
            </span>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
          <div className="flex gap-10">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Engagement</Link>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles size={12} className="text-white/10" />
            <span>© 2024 QOARC AI & BI. Verified Production Environment.</span>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 p-32 opacity-[0.01] pointer-events-none">
        <Sparkles size={400} />
      </div>
    </footer>
  );
}
