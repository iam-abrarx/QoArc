"use client";

import React, { useState } from 'react';
import { Mail, Calendar, MapPin, CheckCircle, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';

const fadeInUp: any = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }
};

export default function ContactPage() {
  const { addSubmission } = usePortfolio();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Local persistence is our primary truth for the Admin Dashboard
      addSubmission({
        name: data.name as string,
        email: data.email as string,
        service: data.service as string,
        message: data.message as string
      });

      // Set success immediately for better UX since it's saved to Admin
      setStatus('success');
      form.reset();

      // Background attempt to Formspree, but don't block UI if it fails
      fetch('https://formspree.io/f/xvgzgeea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      }).catch(err => console.error("External backup delivery failed:", err));

    } catch (error) {
      console.error("Local submission failed:", error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-grid min-h-screen pt-40 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div {...fadeInUp}>
            <h1 className="text-sm font-bold uppercase tracking-widest text-accent-blue mb-6">Contact Us</h1>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tighter mb-8">Let's <span className="text-gradient-blue">Connect</span></h2>
            <p className="text-xl text-text-muted leading-relaxed mb-12">
              Ready to start your next project? Our team is here to help you navigate the future of digital systems.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Mail className="text-accent-blue" />
                </div>
                <div>
                  <div className="text-sm text-text-muted font-bold uppercase tracking-widest">Email Us</div>
                  <div className="text-xl font-bold">qoarcstudio@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Calendar className="text-accent-purple" />
                </div>
                <div>
                  <div className="text-sm text-text-muted font-bold uppercase tracking-widest">Book a Call</div>
                  <div className="text-xl font-bold">Schedule Consultation</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin className="text-accent-blue" />
                </div>
                <div>
                  <div className="text-sm text-text-muted font-bold uppercase tracking-widest">Location</div>
                  <div className="text-xl font-bold">Global / Remote First</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeInUp}>
            <div className="bg-bg-card bg-gradient-to-br from-bg-card via-bg-card to-accent-purple/10 border border-white/5 rounded-[48px] p-10 md:p-16 glow-blue">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-accent-blue/20 flex items-center justify-center mx-auto mb-6 text-accent-blue">
                      <CheckCircle size={40} />
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-4">Message Sent!</h3>
                    <p className="text-text-muted mb-8">Thank you for reaching out. Abrar Al Sayem or one of our researchers will get back to you shortly.</p>
                    <button 
                      onClick={() => setStatus('idle')} 
                      className="bg-white/5 border border-white/10 px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={onSubmit} 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-text-muted">Name</label>
                        <input id="name" name="name" type="text" placeholder="Abrar Al Sayem" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent-blue transition-colors" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-text-muted">Email</label>
                        <input id="email" name="email" type="email" placeholder="contact@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent-blue transition-colors" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="service" className="text-xs font-bold uppercase tracking-widest text-text-muted">Service Interested In</label>
                      <select id="service" name="service" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent-blue transition-colors appearance-none text-white">
                        <option className="bg-bg-dark" value="Web Design">Web Design</option>
                        <option className="bg-bg-dark" value="AI Automation">AI Automation</option>
                        <option className="bg-bg-dark" value="SaaS Development">SaaS Development</option>
                        <option className="bg-bg-dark" value="Lab Collaboration">QoArc Lab Collaboration</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-text-muted">Message</label>
                      <textarea id="message" name="message" rows={4} placeholder="Tell us about your project..." className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent-blue transition-colors" required></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={status === 'submitting'}
                      className="w-full bg-white text-black py-5 rounded-xl font-black text-lg hover:bg-accent-blue hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send size={18} />
                        </>
                      )}
                    </button>
                    {status === 'error' && (
                      <p className="text-red-400 text-sm text-center mt-4">Something went wrong. Please try again or email us directly.</p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
