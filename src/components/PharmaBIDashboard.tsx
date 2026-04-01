"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const PharmaBIDashboard = () => {
  // Revenue vs Target Chart Data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Actual',
        data: [14.2, 16.8, 17.2],
        backgroundColor: '#3b82f6',
        borderRadius: 5,
        barPercentage: 0.5,
      },
      {
        label: 'Target',
        data: [15, 15.5, 17.7],
        backgroundColor: '#1e293b',
        borderRadius: 5,
        barPercentage: 0.5,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => ' ৳' + ctx.parsed.y + 'Cr',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#475569', font: { size: 10 } },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        ticks: { 
          color: '#475569', 
          font: { size: 10 },
          callback: (v: any) => '৳' + v + 'Cr'
        },
        grid: { color: 'rgba(255,255,255,0.04)' },
        border: { display: false },
      },
    },
  };

  // Category Data
  const categoryData = {
    labels: ['Analgesic', 'GI', 'Antibiotic', 'Diabetes', 'Cardio', 'Other'],
    datasets: [
      {
        data: [28, 22, 18, 14, 11, 7],
        backgroundColor: [
          '#3b82f6',
          '#8b5cf6',
          '#14b8a6',
          '#f59e0b',
          '#ec4899',
          '#334155',
        ],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const categoryOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: {
        display: true,
        position: 'right' as const,
        labels: {
          color: '#64748b',
          font: { size: 9 },
          boxWidth: 8,
          padding: 8,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => ' ' + ctx.label + ': ' + ctx.parsed + '%',
        },
      },
    },
  };

  return (
    <div className="w-full h-full bg-[#0a0f1e] text-[#e2e8f0] font-sans flex flex-col overflow-hidden text-[9px] scale-[0.95] origin-top">
      {/* Topbar */}
      <div className="bg-[#0f1629] border-b border-white/5 px-3 py-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] rounded flex items-center justify-center font-bold text-white text-[10px]">
            Rx
          </div>
          <div>
            <div className="font-bold text-white tracking-tight leading-none text-[11px]">PharmaIntel</div>
            <div className="text-[8px] text-slate-500 leading-none">Business Intelligence</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full font-bold text-[7px] uppercase tracking-wider">
            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div> Live
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded text-blue-400 font-bold text-[7px] uppercase">
             Powered by QOARC
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-32 bg-[#0d1225] border-r border-white/5 py-3 hidden sm:block overflow-y-auto no-scrollbar">
          <div className="px-3 mb-3">
            <div className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mb-2">Analytics</div>
            <div className="flex items-center gap-2 p-1.5 bg-blue-500/10 text-blue-400 rounded-md mb-1 cursor-pointer">
              <span className="font-medium">Dashboard</span>
            </div>
            <div className="flex items-center gap-2 p-1.5 text-slate-500 hover:text-slate-300 rounded-md mb-1 cursor-pointer">
              <span>Trends</span>
            </div>
          </div>
          <div className="px-3">
             <div className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mb-2">Operations</div>
             <div className="p-1.5 text-slate-500 rounded-md cursor-pointer">Inventory</div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 overflow-y-auto no-scrollbar bg-[#0a0f1e]">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-[14px] font-bold text-white tracking-tight">Executive Overview</h2>
              <p className="text-[9px] text-slate-500 mt-0.5">Bangladesh Market · Updated 2 min ago</p>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { label: 'Revenue', value: '৳48.2Cr', delta: '↑ 14%', color: 'text-green-400' },
              { label: 'Units', value: '2.14M', delta: '↑ 8%', color: 'text-green-400' },
              { label: 'SKUs', value: '1,847', delta: '↑ 32', color: 'text-green-400' },
              { label: 'Alerts', value: '7', delta: '↑ 3', color: 'text-red-400' }
            ].map((kpi, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-lg p-2.5">
                <div className="text-[7px] font-bold text-slate-600 uppercase tracking-wider mb-1">{kpi.label}</div>
                <div className="text-[14px] font-bold text-white tracking-tighter font-mono">{kpi.value}</div>
                <div className={`text-[8px] mt-1 font-bold ${kpi.color}`}>
                   {kpi.delta}
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-5 gap-2 mb-3">
             <div className="col-span-3 bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="font-bold text-slate-400 text-[9px] mb-2 uppercase tracking-wide">Revenue vs Target</div>
                <div className="h-28">
                  <Bar data={revenueData} options={revenueOptions} />
                </div>
             </div>
             <div className="col-span-2 bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="font-bold text-slate-400 text-[9px] mb-2 uppercase tracking-wide">Category Share</div>
                <div className="h-28">
                  <Doughnut data={categoryData} options={categoryOptions} />
                </div>
             </div>
          </div>

          {/* Bottom Table */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="font-bold text-slate-400 text-[8px] uppercase mb-2 tracking-wide">Top Product Lines</div>
            <div className="space-y-2">
               {[
                 { name: 'Napa Extra', val: '412K', pct: 92, color: 'bg-blue-500' },
                 { name: 'Seclo 20mg', val: '332K', pct: 74, color: 'bg-purple-500' },
                 { name: 'Ciproflox', val: '274K', pct: 61, color: 'bg-teal-500' }
               ].map((prod, i) => (
                 <div key={i} className="flex items-center justify-between text-[9px]">
                    <div className="w-20 text-slate-300 truncate">{prod.name}</div>
                    <div className="flex-1 h-1 bg-white/5 rounded-full mx-3">
                       <div className={`h-full ${prod.color} rounded-full`} style={{ width: `${prod.pct}%` }}></div>
                    </div>
                    <div className="w-8 text-right text-slate-500 font-mono">{prod.val}</div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmaBIDashboard;
