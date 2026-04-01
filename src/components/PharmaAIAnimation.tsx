"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PharmaAIAnimation: A React port of the requested PharmAI Assistant.
 * It uses similar CSS variables and logic as the provided HTML.
 */
export default function PharmaAIAnimation() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, opacity: 0, ringScale: 0 });
  const chatRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Helper to simulate typing into input
  const typeInInput = async (text: string) => {
    setInputValue("");
    for (let i = 0; i < text.length; i++) {
      setInputValue((prev) => prev + text[i]);
      await new Promise(r => setTimeout(r, 30 + Math.random() * 20));
    }
    await new Promise(r => setTimeout(r, 400));
    setInputValue("");
  };

  // Helper to add a message with a scroll
  const addMessage = (msg: any) => {
    setMessages((prev) => [...prev, msg]);
  };

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    let active = true;
    const runSequence = async () => {
      while (active) {
        setMessages([]);
        await new Promise(r => setTimeout(r, 1000));

        // 1. Initial Query
        await typeInInput("Napa Extra 500mg Dhaka zone stock status.");
        if (!active) break;
        addMessage({
          id: 1,
          type: 'user',
          text: "What's the current stock status of Napa Extra 500mg across Dhaka zone?"
        });

        setIsTyping(true);
        await new Promise(r => setTimeout(r, 1500));
        setIsTyping(false);
        if (!active) break;
        
        addMessage({
          id: 2,
          type: 'ai',
          content: (
            <div className="space-y-4">
              <p>Here's the real-time inventory status for <b>Napa Extra 500mg</b>:</p>
              <div className="bg-[#11172b] border border-white/10 rounded overflow-hidden">
                <div className="flex border-b border-white/5 p-3 items-center justify-between">
                  <span className="text-white/60">Motijheel Depot</span>
                  <span className="text-[#10b981] font-bold">12,400 units ✓</span>
                </div>
                <div className="flex border-b border-white/5 p-3 items-center justify-between">
                  <span className="text-white/60">Uttara Warehouse</span>
                  <span className="text-[#f59e0b] font-bold">1,820 units ⚠</span>
                </div>
                <div className="flex p-3 items-center justify-between">
                  <span className="text-white/60">Mirpur Distribution</span>
                  <span className="text-[#ef4444] font-bold">340 units ✗</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 bg-[#ef44441a] border border-[#ef444433] text-[#ef4444] px-3 py-1.5 rounded-full text-xs font-bold">
                 Mirpur at critical level — 0.3 days remaining
              </div>
            </div>
          )
        });

        await new Promise(r => setTimeout(r, 2000));

        // 2. Request Form
        await typeInInput("Draft an urgent restocking request for Mirpur.");
        if (!active) break;
        addMessage({
          id: 3,
          type: 'user',
          text: "Prepare a restocking request form for Mirpur distribution zone. Priority: Urgent."
        });

        setIsTyping(true);
        await new Promise(r => setTimeout(r, 1800));
        setIsTyping(false);
        if (!active) break;

        addMessage({
          id: 4,
          type: 'ai',
          content: (
            <div className="space-y-3 w-full">
              <p>Generated the restocking manifest. Please review below.</p>
              <div className="bg-[#11172b] border border-white/10 rounded-lg p-4 space-y-3 shadow-xl">
                 <div className="text-[10px] font-bold uppercase tracking-wider text-white border-b border-white/5 pb-2 mb-2">Restocking Manifest #RM-8821</div>
                 <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-white/40">Product SKU</label>
                    <div className="bg-[#0d1221] border border-white/5 p-2 rounded text-xs text-white/80">NAPA-EXT-500-MG</div>
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                       <label className="text-[9px] uppercase font-bold text-white/40">Quantity</label>
                       <div className="bg-[#0d1221] border border-white/5 p-2 rounded text-xs text-white/80">5,000 Units</div>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[9px] uppercase font-bold text-white/40">Zone</label>
                       <div className="bg-[#0d1221] border border-white/5 p-2 rounded text-xs text-white/80">MIRPUR-D1</div>
                    </div>
                 </div>
                 <button 
                  ref={btnRef}
                  className="w-full bg-[#4c7cff] text-white p-3 rounded font-bold text-xs shadow-lg transition-transform"
                 >
                   Confirm & Dispatch Request
                 </button>
              </div>
            </div>
          )
        });

        await new Promise(r => setTimeout(r, 1500));

        // 3. Cursor Animation
        if (btnRef.current) {
          const rect = btnRef.current.getBoundingClientRect();
          const parentRect = btnRef.current.closest('.app-container')?.getBoundingClientRect();
          if (parentRect) {
            const relX = rect.left + rect.width/2 - parentRect.left;
            const relY = rect.top + rect.height/2 - parentRect.top;
            
            // Move cursor to button
            setCursorPos({ x: relX + 100, y: relY + 100, opacity: 1, ringScale: 0 });
            await new Promise(r => setTimeout(r, 200));
            setCursorPos(prev => ({ ...prev, x: relX, y: relY }));
            await new Promise(r => setTimeout(r, 1000));
            
            // "Click"
            setCursorPos(prev => ({ ...prev, ringScale: 1 }));
            if (btnRef.current) btnRef.current.style.transform = 'scale(0.96)';
            await new Promise(r => setTimeout(r, 400));
            if (btnRef.current) btnRef.current.style.transform = 'scale(1)';
            setCursorPos(prev => ({ ...prev, opacity: 0, ringScale: 0 }));
          }
        }

        // 4. Success Result
        addMessage({
          id: 5,
          type: 'ai',
          content: (
            <div className="bg-[#11172b] border border-[#10b981] rounded-lg p-5 text-center space-y-3 shadow-xl w-full">
              <div className="w-12 h-12 bg-[#10b9811a] text-[#10b981] rounded-full flex items-center justify-center mx-auto shadow-inner">✓</div>
              <div className="font-bold text-white">Request Dispatched</div>
              <p className="text-white/60 text-[11px]">Inventory transfer authorized. Procurement team notified.</p>
              <div className="font-mono text-[10px] text-[#4c7cff] bg-[#0d1221] px-2 py-1 rounded inline-block">REF: PX-992-881</div>
            </div>
          )
        });

        await new Promise(r => setTimeout(r, 5000)); // Pause on end
      }
    };

    runSequence();
    return () => { active = false; };
  }, []);

  return (
    <div className="app-container relative w-full h-full bg-[#030509] border border-white/10 overflow-hidden font-sans text-sm">
      {/* Background Floats */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#4c7cff] opacity-[0.05] blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#10b981] opacity-[0.03] blur-[100px] translate-x-1/2 translate-y-1/2"></div>

      {/* Main Chat Area */}
      <div 
        ref={chatRef}
        className="h-full flex flex-col p-6 scroll-smooth overflow-y-auto pb-24 no-scrollbar"
      >
        <AnimatePresence>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 mb-6 max-w-[85%] ${m.type === 'user' ? 'self-end flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-[10px] font-bold ${
                m.type === 'ai' ? 'bg-[#4c7cff]' : 'bg-[#1e3a8a]'
              }`}>
                {m.type === 'ai' ? 'AI' : 'SM'}
              </div>
              <div className={`p-4 rounded-xl leading-relaxed text-xs ${
                m.type === 'ai' ? 'bg-[#0d1221] border border-white/10 text-white/80' : 'bg-[#4c7cff] text-white shadow-lg'
              }`}>
                {m.text ? m.text : m.content}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-3 mb-6"
            >
              <div className="w-8 h-8 rounded-lg bg-[#4c7cff] flex items-center justify-center text-[10px] font-bold">AI</div>
              <div className="bg-[#0d1221] border border-white/10 p-3 rounded-xl flex gap-1 items-center">
                 <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce"></div>
                 <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce delay-150"></div>
                 <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce delay-300"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#080c16]/80 backdrop-blur-xl border-t border-white/5">
        <div className="bg-[#0d1221] border border-white/10 rounded-lg p-3 flex items-center gap-3">
          <div className="flex-1 text-white/40 text-[11px] overflow-hidden truncate">
            {inputValue || "Ask anything about inventory, sales..."}
            {inputValue && <span className="inline-block w-0.5 h-3 bg-[#4c7cff] ml-1 animate-pulse"></span>}
          </div>
          <div className="w-7 h-7 bg-[#4c7cff] rounded-lg flex items-center justify-center cursor-pointer opacity-80">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
               <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Simulated Cursor */}
      <div 
        className="absolute pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] z-50"
        style={{ 
          left: cursorPos.x, 
          top: cursorPos.y, 
          opacity: cursorPos.opacity 
        }}
      >
        <div 
          className="absolute -translate-x-4 -translate-y-4 w-8 h-8 border-2 border-[#4c7cff]/50 rounded-full transition-transform duration-500 scale-0"
          style={{ transform: `scale(${cursorPos.ringScale ? 2 : 0})`, opacity: cursorPos.ringScale ? 0 : 1 }}
        ></div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1.5" className="drop-shadow-lg">
          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
          <path d="M13 13l6 6" />
        </svg>
      </div>
    </div>
  );
}
