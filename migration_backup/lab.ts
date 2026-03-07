import {ChangeDetectionStrategy, Component, afterNextRender, OnInit} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import {animate, inView} from 'motion';

@Component({
  selector: 'app-lab',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="bg-grid min-h-screen pt-40 pb-24 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-24 reveal">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-bold uppercase tracking-widest mb-6">
            <mat-icon class="text-sm">science</mat-icon> Experimental Division
          </div>
          <h1 class="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tighter mb-8">QoArc <span class="text-gradient-purple">Lab</span></h1>
          <p class="max-w-2xl mx-auto text-xl text-text-muted">
            Pushing the boundaries of what's possible with AI, automation, and computer science research.
          </p>
        </div>

        <!-- Research Areas -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          <div class="reveal p-10 rounded-[40px] bg-bg-card border border-white/5 relative overflow-hidden group">
            <div class="absolute inset-0 bg-dots opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div class="relative z-10">
              <h3 class="text-2xl font-bold mb-4">"Dual Brain" GNN</h3>
              <p class="text-text-muted mb-8">A hybrid architecture fusing Graph Convolutional Networks (Topology) with RDKit physics descriptors (Cheminformatics).</p>
              <div class="flex items-center gap-2 text-accent-blue font-bold text-sm">
                <span>192-dim Latent Space</span> <mat-icon class="text-sm">psychology</mat-icon>
              </div>
            </div>
            <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-accent-blue/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>
          <div class="reveal p-10 rounded-[40px] bg-bg-card border border-white/5 relative overflow-hidden group">
            <div class="absolute inset-0 bg-network opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <div class="relative z-10">
              <h3 class="text-2xl font-bold mb-4">Rigidity Hypothesis</h3>
              <p class="text-text-muted mb-8">Identifying why legacy PFAS are toxic: "Rigid Crowbars" that physically jam nuclear receptors and trigger toxicity.</p>
              <div class="flex items-center gap-2 text-accent-purple font-bold text-sm">
                <span>Chemical Physics</span> <mat-icon class="text-sm">science</mat-icon>
              </div>
            </div>
            <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-accent-purple/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>
          <div class="reveal p-10 rounded-[40px] bg-bg-card border border-white/5 relative overflow-hidden group">
            <div class="absolute inset-0 bg-dots opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div class="relative z-10">
              <h3 class="text-2xl font-bold mb-4">Discovery Funnel</h3>
              <p class="text-text-muted mb-8">Scaling molecular screening to 5 Million unique candidates via LSTM-based generation and Reinforcement Learning (PPO).</p>
              <div class="flex items-center gap-2 text-accent-blue font-bold text-sm">
                <span>5M Candidates</span> <mat-icon class="text-sm">filter_alt</mat-icon>
              </div>
            </div>
            <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-accent-blue/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>
        </div>

        <!-- Case Study Highlight -->
        <div class="reveal bg-bg-card rounded-[48px] border border-white/5 p-12 md:p-20 relative overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 class="text-4xl font-display font-bold mb-8">Breakthrough: The Unicorn Discovery</h2>
              <p class="text-lg text-text-muted mb-10 leading-relaxed">
                By incorporating flexible "ether hinges" (-O-), we identified molecules that achieve perfect safety scores (10/10) while maintaining vital industrial properties.
              </p>
              <button class="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-accent-blue hover:text-white transition-all">
                Read Research Paper
              </button>
            </div>
            <div class="grid grid-cols-2 gap-6">
              <div class="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
                <div class="text-4xl font-black text-accent-blue mb-2">10/10</div>
                <div class="text-xs text-text-muted uppercase tracking-widest font-bold">Safety Score</div>
              </div>
              <div class="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
                <div class="text-4xl font-black text-accent-purple mb-2">50K</div>
                <div class="text-xs text-text-muted uppercase tracking-widest font-bold">Safe Variants</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Lab implements OnInit {
  ngOnInit() {
    this.title.setTitle('QoArc Lab | PFAS Research & Molecular Innovation');
    this.meta.updateTag({ name: 'description', content: 'Explore QoArc Lab\'s groundbreaking PFAS research, featuring our "Dual Brain" GNN and the discovery of safe molecular alternatives.' });
  }

  constructor(private title: Title, private meta: Meta) {
    afterNextRender(() => {
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach((el) => {
        inView(el, (element) => {
          animate(
            element,
            { opacity: [0, 1], y: [30, 0] },
            { duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }
          );
        });
      });
    });
  }
}

