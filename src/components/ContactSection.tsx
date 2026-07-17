import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const { addSubmission } = usePortfolio();

  const sectionRef = useRef<HTMLElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsDark(entry.isIntersecting);
    }, {
      threshold: 0.15 // 15% visibility triggers the dark mode shift
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      company: '',
      email: formData.get('email') as string,
      phone: '',
      message: formData.get('message') as string,
    };

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addSubmission(data);
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <section 
        ref={sectionRef}
        id="contact" 
        className={`py-32 px-8 border-t-[0.5px] transition-all duration-1000 ease-out ${
          isDark 
            ? 'bg-[#001026] border-white/10 text-white' 
            : 'bg-white border-primary/10 text-primary'
        }`}
      >
        <div className="max-w-screen-md mx-auto flex flex-col items-center justify-center text-center space-y-8 min-h-[400px]">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`w-20 h-20 rounded-none flex items-center justify-center shadow-sm transition-colors duration-1000 ${
              isDark ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600'
            }`}
          >
            <CheckCircle2 size={40} />
          </motion.div>
          <div className="space-y-4">
            <h2 className={`text-4xl font-display font-bold transition-colors duration-1000 ${isDark ? 'text-white' : 'text-primary'}`}>Message Received</h2>
            <p className={`max-w-md mx-auto font-sans leading-relaxed transition-colors duration-1000 ${isDark ? 'text-white/70' : 'text-primary/60'}`}>
              Thank you for reaching out. Your strategic inquiry has been synchronized. Our team will contact you shortly.
            </p>
          </div>
          <button 
            onClick={() => setStatus('idle')}
            className={`font-bold uppercase tracking-widest text-xs border-b border-transparent hover:border-current transition-all pb-1 ${
              isDark ? 'text-[#4A90D9]' : 'text-[#cc0000]'
            }`}
          >
            Send another message
          </button>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className={`py-32 px-8 border-t-[0.5px] transition-all duration-1000 ease-out ${
        isDark 
          ? 'bg-[#001026] border-white/10' 
          : 'bg-white border-primary/10'
      }`}
    >
      <div className="max-w-screen-md mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-6 text-center">
          <div className={`text-precision uppercase tracking-widest transition-colors duration-1000 ${isDark ? 'text-white/40' : 'text-primary/40'}`}>Connect // Client Node</div>
          <h2 className={`text-6xl font-display font-bold tracking-tight transition-colors duration-1000 ${isDark ? 'text-white' : 'text-primary'}`}>Contact Us</h2>
          <p className={`text-lg font-sans max-w-xl mx-auto transition-colors duration-1000 ${isDark ? 'text-white/60' : 'text-primary/60'}`}>
            Fill out the form below and we will get back to you once we have processed your request.
          </p>
        </div>

        {/* Simplified Form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid md:grid-cols-2 gap-12">
            <UnderlineInput label="Name*" name="name" placeholder="Your name" required isDark={isDark} />
            <UnderlineInput label="Corporate email*" name="email" type="email" placeholder="you@company.com" required isDark={isDark} />
          </div>

          <div className="space-y-2">
            <label className={`text-[14px] font-medium block uppercase tracking-tight transition-colors duration-1000 ${isDark ? 'text-white/40' : 'text-primary/40'}`}>Describe your needs in detail*</label>
            <textarea 
              name="message"
              placeholder="What are you building?"
              className={`w-full bg-transparent border-b outline-none py-4 min-h-[120px] resize-none transition-all duration-1000 font-sans ${
                isDark 
                  ? 'border-white/10 focus:border-white text-white placeholder:text-white/20' 
                  : 'border-primary/10 focus:border-primary text-primary placeholder:text-primary/20'
              }`}
              required
            ></textarea>
          </div>

          {/* Submit & Disclaimer */}
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between pt-4">
            <p className={`text-[10px] leading-relaxed font-sans max-w-md text-center md:text-left transition-colors duration-1000 ${isDark ? 'text-white/40' : 'text-primary/40'}`}>
              By sending, you consent to QOARC processing your data per our <a href="/privacy-policy" className={`underline ${isDark ? 'text-white' : 'text-primary'}`}>Privacy Policy</a> to address your request.
            </p>
            <button 
              type="submit"
              disabled={status === 'submitting'}
              className={`w-full md:w-auto px-12 py-4 rounded-none font-bold uppercase tracking-widest text-[12px] transition-all duration-700 active:scale-95 disabled:opacity-50 min-w-[160px] flex items-center justify-center shadow-sharp ${
                isDark 
                  ? 'bg-white text-primary hover:bg-white/90' 
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {/* Direct Email */}
          <div className={`pt-8 border-t text-center transition-colors duration-1000 ${isDark ? 'border-white/5' : 'border-primary/5'}`}>
            <p className={`text-md font-display font-medium transition-colors duration-1000 ${isDark ? 'text-white' : 'text-primary'}`}>
              Or write to us directly at <a href="mailto:info@qoarc.com" className={`hover:underline decoration-1 underline-offset-4 font-bold transition-colors duration-1000 ${isDark ? 'text-[#4A90D9]' : 'text-[#cc0000]'}`}>info@qoarc.com</a>
            </p>
          </div>
        </form>

      </div>
    </section>
  );
}

function UnderlineInput({ label, name, type = 'text', placeholder, required, isDark }: any) {
  return (
    <div className="space-y-2 group w-full text-left">
      <label className={`text-[13px] font-medium block uppercase tracking-tight transition-colors duration-1000 ${isDark ? 'text-white/40' : 'text-primary/40'}`}>{label}</label>
      <input 
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`w-full bg-transparent border-b outline-none py-2 transition-all duration-1000 font-sans ${
          isDark 
            ? 'border-white/10 focus:border-white text-white placeholder:text-white/20' 
            : 'border-primary/10 focus:border-primary text-primary placeholder:text-primary/20'
        }`}
      />
    </div>
  );
}
