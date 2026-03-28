import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, ChevronDown, CheckCircle2 } from 'lucide-react';
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
      company: formData.get('company') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    };

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addSubmission(data);
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <section id="contact" className="py-24 px-8 bg-white overflow-hidden">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center text-center space-y-8 min-h-[400px]">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-green-50 text-green-600 rounded-none flex items-center justify-center shadow-sm"
          >
            <CheckCircle2 size={40} />
          </motion.div>
          <div className="space-y-4">
            <h2 className="text-4xl font-display font-bold text-[#1a1a1a]">Message Received</h2>
            <p className="text-[#666666] max-w-md mx-auto">
              Thank you for reaching out. Your strategic inquiry has been synchronized with our backend systems. Our team will contact you shortly.
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
    <section id="contact" className="py-24 px-8 bg-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto grid lg:grid-cols-12 gap-16 relative">
        
        {/* Left Side: Form (Col 8) */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-12">
          <div className="space-y-4">
            <h2 className="text-6xl font-display font-bold text-[#1a1a1a] tracking-tight">Contact us</h2>
            <p className="text-lg text-[#666666] font-sans">
              <a href="#" className="text-[#cc0000] border-b border-[#cc0000] hover:opacity-70 transition-opacity">Book a call</a> or fill out the form below and we'll get back to you once we've processed your request.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl">
            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-12">
              <UnderlineInput label="Name*" name="name" placeholder="" required />
              <UnderlineInput label="Company*" name="company" placeholder="" required />
            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-2 gap-12">
              <UnderlineInput label="Corporate email*" name="email" type="email" placeholder="" required />
              <UnderlineInput label="Phone*" name="phone" type="tel" placeholder="" required />
            </div>

            {/* Row 4: Textarea */}
            <div className="space-y-2">
              <label className="text-[14px] text-[#999999] font-medium block">Describe your needs in detail*</label>
              <textarea 
                name="message"
                className="w-full bg-transparent border-b border-[#dddddd] focus:border-[#cc0000] outline-none py-4 min-h-[100px] resize-none transition-colors font-sans"
                required
              ></textarea>
            </div>

            {/* Row 6: Submit & Privacy */}
            <div className="flex flex-col md:flex-row gap-12 items-end">
              <p className="text-[11px] text-[#999999] leading-relaxed flex-1 font-sans max-w-lg">
                By clicking Send, you consent to QOARC processing your personal data per our <a href="#" className="text-[#333333] underline">Privacy Policy</a> to provide you with relevant information. By submitting your phone number, you agree that we may contact you via voice calls, SMS, and messaging apps. Calling, message, and data rates may apply.
              </p>
              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="bg-[#cc0000] text-white px-14 py-4 font-bold uppercase tracking-widest text-[14px] transition-all hover:bg-[#b30000] active:scale-95 disabled:opacity-50 min-w-[140px] flex items-center justify-center shadow-lg shadow-red-500/10"
              >
                {status === 'submitting' ? 'Sending...' : 'Send'}
              </button>
            </div>

            {/* Row 7: Direct Email */}
            <div className="pt-8 border-t border-[#f0f0f0]">
              <p className="text-lg font-display font-medium text-[#1a1a1a]">
                You can also send us your request to <a href="mailto:info@qoarc.com" className="text-[#cc0000] hover:underline decoration-1 underline-offset-4">info@qoarc.com</a>
              </p>
            </div>
          </form>
        </div>

        {/* Right Side: Process (Col 5) - Compact & Elegant */}
        <div className="lg:hidden xl:block xl:col-span-5 self-stretch">
          <div className="h-full bg-[#f8fafc]/50 p-10 lg:p-12 border border-[#f0f0f0] shadow-sm relative overflow-hidden group">
            
            <h3 className="text-3xl font-display font-bold text-[#1a1a1a] mb-10 tracking-tight">What happens <br/> next?</h3>
            
            <div className="space-y-8 relative">
              {/* Connecting Line */}
              <div className="absolute left-[15px] top-5 bottom-5 w-[0.5px] bg-[#dddddd]/60"></div>
              
              <Step number={1} content="Once we've received and processed your request, we'll get back to you to detail your project needs and sign an NDA to ensure confidentiality." />
              <Step number={2} content="After examining your wants, needs, and expectations, our team will devise a project proposal with the scope of work, team size, time, and cost estimates." />
              <Step number={3} content="We'll arrange a meeting with you to discuss the offer and nail down the details." />
              <Step number={4} content="Finally, we'll sign a contract and start working on your project right away." />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function UnderlineInput({ label, name, type = 'text', placeholder, required }: any) {
  return (
    <div className="space-y-2 group">
      <label className="text-[13px] text-[#999999] font-medium block uppercase tracking-tight">{label}</label>
      <input 
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full bg-transparent border-b border-[#dddddd] group-focus-within:border-[#cc0000] outline-none py-2 transition-colors font-sans text-[#1a1a1a] placeholder:text-[#bbbbbb]"
      />
    </div>
  );
}

function Step({ number, content }: { number: number, content: string }) {
  return (
    <div className="flex gap-4 relative z-10 group/step">
      <div className="w-8 h-8 rounded-none bg-white border border-[#dddddd]/60 flex-shrink-0 flex items-center justify-center text-[12px] font-bold text-[#1a1a1a] shadow-sm group-hover/step:border-[#cc0000] transition-colors">
        {number}
      </div>
      <p className="text-[14px] text-[#555555] leading-relaxed font-sans pt-1 font-medium">
        {content}
      </p>
    </div>
  );
}
