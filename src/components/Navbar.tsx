"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Portfolio', href: '/#portfolio' },
    { name: 'Studio', href: '/studio' },
    { name: 'QoArc Lab', href: '/lab' },
    { name: 'About', href: '/#about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/5 py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-purple rounded-xl flex items-center justify-center glow-blue group-hover:scale-110 transition-transform duration-300">
            <span className="text-white font-display font-black text-xl">Q</span>
          </div>
          <span className="font-display font-bold text-xl tracking-tight">QoArc Studio</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent-blue ${pathname === link.href ? 'text-accent-blue' : 'text-white/70'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contact" className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-accent-blue hover:text-white transition-all duration-300 shadow-lg shadow-white/5">
            Start Project
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="md:hidden fixed inset-0 z-40 bg-bg-dark/95 backdrop-blur-xl p-8 pt-32 flex flex-col gap-8"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-display font-bold tracking-tight border-b border-white/5 pb-4"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-auto bg-gradient-to-r from-accent-blue to-accent-purple text-white px-6 py-5 rounded-2xl text-center font-black text-xl shadow-xl shadow-accent-blue/20 flex items-center justify-center gap-2"
            >
              Start Project <Rocket size={20} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
