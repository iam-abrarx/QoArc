"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Cpu, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useLeadCapture } from '@/context/LeadCaptureContext';
import { useChat } from '@/context/ChatContext';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const SUGGESTED_QUESTIONS = [
  "What services does QOARC offer?",
  "How much does a project cost?",
  "Tell me about your healthcare projects.",
  "What is Sovereign Architecture?",
];

export default function ChatWidget() {
  const { isChatOpen, openChat, closeChat, toggleChat } = useChat();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello. I am the QOARC Smart Assistant. How can I assist you with information about our engineering services, pricing, or capabilities today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openModal } = useLeadCapture();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isChatOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Setup the API request
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!response.ok) {
        throw new Error('API Error');
      }

      // Add a placeholder for the assistant's streaming response
      const assistantMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: assistantMessageId, role: 'assistant', content: '' }]);

      // Process the stream
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let chunkText = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          chunkText = decoder.decode(value, { stream: true });
          const events = chunkText.split('\n\n').filter(Boolean);
          
          for (const event of events) {
             if (event === 'data: [DONE]') continue;
             if (event.startsWith('data: ')) {
               try {
                 const data = JSON.parse(event.slice(6));
                 if (data.content) {
                   setMessages(prev => prev.map(msg => 
                     msg.id === assistantMessageId 
                       ? { ...msg, content: msg.content + data.content }
                       : msg
                   ));
                 }
               } catch (e) {
                 // Log parse errors silently
                 console.error("Parse error in stream:", e);
               }
             }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'assistant', 
        content: 'I am experiencing a communication error with my core node. Please try again or use the main contact form.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Simple Markdown-like formatter for bolding and simple bullet points
  const formatMessageText = (text: string) => {
    // We do a very simple parse: convert **bold** and handle basic bullets
    return text.split('\n').map((line, i) => {
       // Convert **bold** to <strong>bold</strong>
       let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
       
       // Convert [Text](url) to <a href="url">Text</a>
       formattedLine = formattedLine.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary-300 font-bold underline underline-offset-2 decoration-primary-300/50 hover:decoration-primary-300 transition-colors">$1</a>');
       
       if (formattedLine.trim() === '') return <br key={i} />;
       
       if (formattedLine.startsWith('- ')) {
         return <li key={i} className="ml-4 list-disc" dangerouslySetInnerHTML={{ __html: formattedLine.substring(2) }} />;
       }
       
       return <p key={i} dangerouslySetInnerHTML={{ __html: formattedLine }} className="mb-1" />;
    });
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openChat}
            className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-premium flex items-center justify-center z-50 overflow-hidden group cursor-pointer"
          >
            {/* Pulsing effect */}
            <div className="absolute inset-0 border-2 border-primary rounded-full animate-ping opacity-20"></div>
            
            <div className="relative z-10 flex items-center justify-center">
               <Cpu size={24} className="group-hover:hidden transition-all duration-300" />
               <MessageSquare size={24} className="hidden group-hover:block transition-all duration-300" />
            </div>
            
            {/* Node identifier tag (subtle) */}
             <div className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full flex items-center justify-center">
                 <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
             </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[80vh] md:h-[600px] max-h-[800px] bg-[#001026] border border-white/10 rounded-2xl shadow-premium z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-[#001026] to-primary/30 relative">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-primary-300 shadow-sharp">
                  <Cpu size={16} className="text-white/60" />
                </div>
                <div>
                  <h3 className="text-white font-display font-medium text-sm italic">Smart Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={closeChat}
                className="text-white/40 hover:text-white p-2 transition-colors cursor-pointer"
              >
                <ChevronDown size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide relative bg-[#000a18]">
               {/* Grid Background */}
               <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none mix-blend-screen"></div>
               
              <div className="relative z-10 space-y-6">
                 {messages.map((msg) => (
                   <motion.div
                     key={msg.id}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                   >
                     <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sharp relative overflow-hidden ${
                       msg.role === 'user' 
                         ? 'bg-primary text-white rounded-br-sm' 
                         : 'bg-white/5 border border-white/10 text-white/90 rounded-bl-sm font-sans font-light'
                     }`}>
                       {msg.role === 'assistant' && (
                         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
                       )}
                       {formatMessageText(msg.content)}
                     </div>
                   </motion.div>
                 ))}

                 {isLoading && (
                   <motion.div
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="flex justify-start"
                   >
                     <div className="bg-white/5 border border-white/10 text-white/90 rounded-2xl rounded-bl-sm px-5 py-3.5 flex items-center gap-1.5 shadow-sharp">
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                     </div>
                   </motion.div>
                 )}
                 <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="px-6 pb-2 bg-[#000a18] relative z-10 border-t border-white/5 pt-4">
                <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-3 italic">Suggested Queries:</div>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(q)}
                      className="text-[11px] font-sans text-white/60 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white px-3 py-1.5 rounded-full transition-colors truncate max-w-[90%] text-left cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-[#001026] relative z-20">
               {/* Quick action button for CTA */}
               <div className="mb-4">
                  <button 
                     onClick={openModal}
                     className="w-full flex items-center justify-center gap-2 py-2 border-[0.5px] border-[#cc0000]/30 hover:border-[#cc0000] bg-[#cc0000]/5 hover:bg-[#cc0000]/10 text-white transition-all text-[11px] font-bold uppercase tracking-widest shadow-sharp cursor-pointer group"
                  >
                     <CheckCircle2 size={12} className="text-[#cc0000] group-hover:scale-110 transition-transform" />
                     <span>Start a Project</span>
                  </button>
               </div>

              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }}
                className="relative flex items-center"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Query Smart Assistant..."
                  disabled={isLoading}
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-5 pr-12 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-sans font-light disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 w-9 h-9 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary-container disabled:opacity-50 disabled:hover:bg-primary transition-colors cursor-pointer"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="ml-0.5" />}
                </button>
              </form>
              <div className="text-center mt-3">
                 <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold font-sans">Powered by QOARC Smart Assistant // GPT-5.4</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
