import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const { addSubmission } = usePortfolio();

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
      <section id="contact" className="py-32 px-8 bg-white border-t-[0.5px] border-primary/10">
        <div className="max-w-screen-md mx-auto flex flex-col items-center justify-center text-center space-y-8 min-h-[400px]">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-green-50 text-green-600 rounded-none flex items-center justify-center shadow-sm"
          >
            <CheckCircle2 size={40} />
          </motion.div>
          <div className="space-y-4">
            <h2 className="text-4xl font-display font-bold text-primary">Message Received</h2>
            <p className="text-primary/60 max-w-md mx-auto font-sans leading-relaxed">
              Thank you for reaching out. Your strategic inquiry has been synchronized. Our team will contact you shortly.
            </p>
          </div>
          <button 
            onClick={() => setStatus('idle')}
            className="text-[#cc0000] font-bold uppercase tracking-widest text-xs border-b border-transparent hover:border-[#cc0000] transition-all pb-1"
          >
            Send another message
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-32 px-8 bg-white border-t-[0.5px] border-primary/10">
      <div className="max-w-screen-md mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-6 text-center">
          <div className="text-precision text-primary/40 uppercase tracking-widest">Connect // Client Node</div>
          <h2 className="text-6xl font-display font-bold text-primary tracking-tight">Contact Us</h2>
          <p className="text-lg text-primary/60 font-sans max-w-xl mx-auto">
            Fill out the form below and we will get back to you once we have processed your request.
          </p>
        </div>

        {/* Simplified Form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid md:grid-cols-2 gap-12">
            <UnderlineInput label="Name*" name="name" placeholder="Your name" required />
            <UnderlineInput label="Corporate email*" name="email" type="email" placeholder="you@company.com" required />
          </div>

          <div className="space-y-2">
            <label className="text-[14px] text-primary/40 font-medium block uppercase tracking-tight">Describe your needs in detail*</label>
            <textarea 
              name="message"
              placeholder="What are you building?"
              className="w-full bg-transparent border-b border-primary/10 focus:border-primary outline-none py-4 min-h-[120px] resize-none transition-colors font-sans text-primary placeholder:text-primary/20"
              required
            ></textarea>
          </div>

          {/* Submit & Disclaimer */}
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between pt-4">
            <p className="text-[10px] text-primary/40 leading-relaxed font-sans max-w-md text-center md:text-left">
              By sending, you consent to QOARC processing your data per our <a href="/privacy-policy" className="text-primary underline">Privacy Policy</a> to address your request.
            </p>
            <button 
              type="submit"
              disabled={status === 'submitting'}
              className="w-full md:w-auto bg-primary text-white px-12 py-4 rounded-none font-bold uppercase tracking-widest text-[12px] hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 min-w-[160px] flex items-center justify-center shadow-sharp"
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {/* Direct Email */}
          <div className="pt-8 border-t border-primary/5 text-center">
            <p className="text-md font-display font-medium text-primary">
              Or write to us directly at <a href="mailto:info@qoarc.com" className="text-[#cc0000] hover:underline decoration-1 underline-offset-4 font-bold">info@qoarc.com</a>
            </p>
          </div>
        </form>

      </div>
    </section>
  );
}

function UnderlineInput({ label, name, type = 'text', placeholder, required }: any) {
  return (
    <div className="space-y-2 group w-full text-left">
      <label className="text-[13px] text-primary/40 font-medium block uppercase tracking-tight">{label}</label>
      <input 
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full bg-transparent border-b border-primary/10 group-focus-within:border-primary outline-none py-2 transition-colors font-sans text-primary placeholder:text-primary/20"
      />
    </div>
  );
}
