"use client";

import React from 'react';
import { motion } from 'framer-motion';

const locations = [
  { name: "Fairfax, US", top: "32%", left: "18%" },
  { name: "London, UK", top: "22%", left: "46%" },
  { name: "Dubai, UAE", top: "42%", left: "58%" },
  { name: "Dhaka, BD", top: "48%", left: "72%" }
];

const stats = [
  { value: "5+", label: "Years in Market" },
  { value: "30+", label: "Systems Built" },
  { value: "08+", label: "Industries Transformed" },
  { value: "25+", label: "Elite Architects" }
];

export default function AboutQOARC() {
  return (
    <section className="py-32 px-8 bg-[#001026] text-white relative overflow-hidden">
      {/* Background World Map - Full Cover */}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" 
          alt="World Map"
          className="w-full h-full object-cover opacity-30 grayscale invert scale-125" 
        />
      </div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
          {/* Left Side: Content */}
          <div className="space-y-16">
            <div className="space-y-2">
              <h2 className="text-[120px] font-display font-black leading-none tracking-tighter uppercase block">
                ABOUT
              </h2>
              <h2 className="text-[120px] font-display font-black leading-none tracking-tighter uppercase block text-transparent" 
                  style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>
                QOARC
              </h2>
            </div>

            <div className="space-y-10 max-w-xl">
              <p className="text-xl text-white/70 leading-relaxed font-sans font-medium">
                Since 2021, QOARC has specialized in architecting high-fidelity software solutions and autonomous intelligence layers for diverse industries, including high-frequency fintech, logistics, and healthcare.
              </p>
              <p className="text-xl text-white/70 leading-relaxed font-sans font-medium">
                By focusing on &quot;Intellectual Architecture&quot;, we develop secure, future-proof products that deliver maximum value and ensure long-term market dominance. We seamlessly align technical solutions with your strategic goals.
              </p>
            </div>
          </div>

          {/* Right Side: World Map Pins */}
          <div className="relative aspect-video lg:aspect-square flex items-center justify-center">
            {/* Markers */}
            {locations.map((loc, i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="absolute group cursor-pointer"
                style={{ top: loc.top, left: loc.left }}
              >
                {/* Pulsing Core */}
                <div className="relative">
                  <div className="w-3 h-3 bg-[#cc0000] rounded-none relative z-10 shadow-[0_0_15px_rgba(204,0,0,0.8)]"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-[#cc0000] rounded-none animate-ping opacity-75"></div>
                </div>
                
                {/* Label */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-none whitespace-nowrap shadow-sharp">
                    {loc.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border-t border-white/10 pt-16">
          {stats.map((stat, i) => (
            <div key={i} className="group relative px-8 first:pl-0">
              {/* Vertical Divider */}
              {i > 0 && (
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#cc0000] opacity-30 group-hover:opacity-100 transition-opacity"></div>
              )}
              
              <div className="space-y-2">
                <div className="flex items-start gap-1">
                  <span className="text-6xl font-display font-medium text-white">{stat.value.replace('+', '')}</span>
                  <span className="text-4xl font-display text-[#cc0000] font-bold mt-1">+</span>
                </div>
                <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white/60 transition-colors">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
