"use client";

import React from 'react';
import Link from 'next/link';
import { Github, Mail, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bg-card border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">Q</span>
              </div>
              <span className="font-display font-bold text-xl">QoArc Studio</span>
            </div>
            <p className="text-text-muted max-w-sm mb-8 leading-relaxed">
              We build intelligent digital systems that empower visionaries to change the world. From AI automation to pioneering scientific research.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-blue hover:text-white transition-all">
                <Github size={18} />
              </a>
              <a href="mailto:qoarcstudio@gmail.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-blue hover:text-white transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Studio</h4>
            <ul className="space-y-4 text-text-muted text-sm">
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/lab" className="hover:text-white transition-colors">QoArc Lab</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Contract</h4>
            <ul className="space-y-4 text-text-muted text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
                Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-purple"></span>
                Remote Worldwide
              </li>
              <li>qoarcstudio@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-text-muted opacity-50">
            © {new Date().getFullYear()} QoArc Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-text-muted opacity-50">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
