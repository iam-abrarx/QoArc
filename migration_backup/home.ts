import {ChangeDetectionStrategy, Component, afterNextRender, OnInit, inject} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {animate, stagger, inView} from 'motion';
import {PortfolioService} from './portfolio.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  template: `
    <div class="bg-grid min-h-screen">
      <!-- Hero -->
      <section class="relative pt-40 pb-24 px-6 overflow-hidden">
        <div class="max-w-7xl mx-auto text-center relative z-10">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent-blue text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
            <span class="w-2 h-2 rounded-full bg-accent-blue animate-pulse"></span>
            The Future of Digital Systems
          </div>
          <h1 class="hero-title opacity-0 text-5xl sm:text-7xl md:text-9xl font-display font-extrabold tracking-tighter leading-[0.85] mb-8">
            Building <span class="text-gradient-blue">Intelligent</span><br/>Digital Systems
          </h1>
          <p class="hero-subtitle opacity-0 max-w-2xl mx-auto text-lg md:text-xl text-text-muted mb-12 leading-relaxed">
            Web. AI. Automation. Research. We craft high-performance solutions that scale with your vision.
          </p>
          <div class="hero-cta opacity-0 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a routerLink="/contact" class="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl shadow-white/10 flex items-center justify-center gap-2">
              Start Your Project <mat-icon>rocket_launch</mat-icon>
            </a>
            <a routerLink="/services" class="w-full sm:w-auto glass px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
              Explore Services
            </a>
          </div>
        </div>

        <!-- Background Blobs -->
        <div class="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
        <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" style="animation-delay: 2s"></div>
      </section>

      <!-- Services Preview -->
      <section class="py-24 px-6">
        <div class="max-w-7xl mx-auto">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div class="reveal">
              <h2 class="text-sm font-bold uppercase tracking-widest text-accent-blue mb-4">Core Capabilities</h2>
              <h3 class="text-4xl md:text-6xl font-display font-bold tracking-tight">Intelligent Solutions</h3>
            </div>
            <a routerLink="/services" class="reveal text-accent-blue font-bold flex items-center gap-2 hover:gap-4 transition-all">
              View All Services <mat-icon>arrow_forward</mat-icon>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div class="reveal group p-8 rounded-[32px] bg-bg-card border border-white/5 hover:border-accent-blue/50 transition-all duration-500">
              <div class="w-14 h-14 bg-accent-blue/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <mat-icon class="text-accent-blue">auto_awesome</mat-icon>
              </div>
              <h4 class="text-2xl font-display font-bold mb-4">AI Automation</h4>
              <p class="text-text-muted leading-relaxed">
                Automate complex business processes with custom AI agents and intelligent workflows.
              </p>
            </div>
            <div class="reveal group p-8 rounded-[32px] bg-bg-card border border-white/5 hover:border-accent-purple/50 transition-all duration-500">
              <div class="w-14 h-14 bg-accent-purple/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <mat-icon class="text-accent-purple">web</mat-icon>
              </div>
              <h4 class="text-2xl font-display font-bold mb-4">Web Apps</h4>
              <p class="text-text-muted leading-relaxed">
                Scalable, high-performance web applications built with modern frameworks and robust backends.
              </p>
            </div>
            <div class="reveal group p-8 rounded-[32px] bg-bg-card border border-white/5 hover:border-accent-blue/50 transition-all duration-500">
              <div class="w-14 h-14 bg-accent-blue/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <mat-icon class="text-accent-blue">science</mat-icon>
              </div>
              <h4 class="text-2xl font-display font-bold mb-4">QoArc Lab</h4>
              <p class="text-text-muted leading-relaxed">
                Research-driven innovation exploring the frontiers of AI and computer science.
              </p>
            </div>
          </div>

          <!-- Featured Projects -->
          <div class="border-t border-white/5 pt-24">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div class="reveal">
                <h2 class="text-sm font-bold uppercase tracking-widest text-accent-blue mb-4">Showcase</h2>
                <h3 class="text-4xl md:text-6xl font-display font-bold tracking-tight">Featured Projects</h3>
              </div>
              <a routerLink="/portfolio" class="reveal text-accent-blue font-bold flex items-center gap-2 hover:gap-4 transition-all">
                Explore Portfolio <mat-icon>arrow_forward</mat-icon>
              </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              @for (item of portfolioService.portfolioItems().slice(0, 2); track item.id) {
                <div class="reveal group relative bg-bg-card border border-white/5 rounded-3xl overflow-hidden hover:border-accent-blue/30 transition-all duration-500">
                  <div class="aspect-[16/10] relative overflow-hidden">
                    <img [src]="item.imageUrl" [alt]="item.name" 
                         class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                    <div class="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent opacity-60"></div>
                  </div>
                  <div class="p-8">
                    <h4 class="text-2xl font-bold mb-3 group-hover:text-accent-blue transition-colors">{{item.name}}</h4>
                    <p class="text-text-muted mb-6 line-clamp-2">
                      {{item.description}}
                    </p>
                    <a [href]="item.url" class="inline-flex items-center gap-2 text-sm font-bold text-accent-blue group-hover:gap-4 transition-all">
                      Learn More <mat-icon class="text-sm">arrow_forward</mat-icon>
                    </a>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- Lab Highlight -->
      <section class="py-24 px-6 bg-accent-blue/5 relative overflow-hidden">
        <div class="max-w-7xl mx-auto relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="reveal">
              <h2 class="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight mb-8">Where Research Meets <span class="text-gradient-blue">Reality</span></h2>
              <p class="text-xl text-text-muted mb-10 leading-relaxed">
                QoArc Lab is our innovation engine. We don't just use technology; we advance it through rigorous research and experimental development.
              </p>
              <div class="space-y-6 mb-10">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-full bg-accent-blue/20 flex items-center justify-center shrink-0">
                    <mat-icon class="text-accent-blue text-sm">science</mat-icon>
                  </div>
                  <div>
                    <h5 class="font-bold mb-1">PFAS Discovery Engine</h5>
                    <p class="text-sm text-text-muted">High-throughput screening of molecules using GNN-driven safety models.</p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-full bg-accent-purple/20 flex items-center justify-center shrink-0">
                    <mat-icon class="text-accent-purple text-sm">psychology</mat-icon>
                  </div>
                  <div>
                    <h5 class="font-bold mb-1">Dual Brain Architecture</h5>
                    <p class="text-sm text-text-muted">A hybrid AI model trained on Tox21/ChEMBL chemical physics data.</p>
                  </div>
                </div>
              </div>
              <a routerLink="/lab" class="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-accent-blue hover:text-white transition-all">
                Explore PFAS Research <mat-icon>science</mat-icon>
              </a>
            </div>
            <div class="reveal relative">
              <div class="aspect-video rounded-[40px] bg-bg-card border border-white/10 p-1 overflow-hidden glow-blue">
                <div class="w-full h-full rounded-[38px] bg-gradient-to-br from-zinc-900 to-black p-8 flex flex-col justify-between">
                  <div class="flex justify-between items-start">
                    <div class="font-mono text-[10px] text-accent-blue">LAB_SESSION_042</div>
                    <div class="flex gap-1">
                      <div class="w-2 h-2 rounded-full bg-red-500"></div>
                      <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div class="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div class="font-mono text-sm text-text-muted space-y-2">
                    <p>> Initializing GNN_Dual_Brain...</p>
                    <p>> Loading dataset: Tox21_ChEMBL_PFAS</p>
                    <p>> Screening epoch 42/100... [||||||||||] 94%</p>
                    <p class="text-accent-blue">> Discovery complete. Unicorns found: 12</p>
                  </div>
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <mat-icon class="text-accent-blue">bolt</mat-icon>
                    </div>
                    <div class="text-xs font-bold uppercase tracking-widest">Research Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact CTA -->
      <section class="py-24 px-6">
        <div class="max-w-5xl mx-auto bg-gradient-to-br from-accent-blue to-accent-purple rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden glow-purple">
          <div class="relative z-10 reveal">
            <h2 class="text-4xl sm:text-6xl md:text-7xl font-display font-bold mb-8 leading-tight">Case Study: PFAS Safety Discovery</h2>
            <p class="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              We developed a custom GNN-driven discovery engine to identify non-toxic "Unicorn" alternatives to persistent "Forever Chemicals".
            </p>
            <div class="grid grid-cols-2 gap-8 mb-12 max-w-lg mx-auto">
              <div class="text-center">
                <div class="text-5xl font-black mb-2">5M</div>
                <div class="text-xs uppercase tracking-widest font-bold opacity-70">Candidates Screened</div>
              </div>
              <div class="text-center">
                <div class="text-5xl font-black mb-2">10/10</div>
                <div class="text-xs uppercase tracking-widest font-bold opacity-70">Safety Score</div>
              </div>
            </div>
            <a routerLink="/lab" class="inline-flex items-center gap-2 bg-white text-black px-12 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl">
              Read Full Case Study <mat-icon>science</mat-icon>
            </a>
          </div>
          <!-- Tech pattern -->
          <div class="absolute inset-0 opacity-10 pointer-events-none bg-grid"></div>
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  portfolioService = inject(PortfolioService);

  ngOnInit() {
    this.title.setTitle('QoArc Studio | Building Intelligent Digital Systems');
    this.meta.updateTag({ name: 'description', content: 'QoArc Studio specializes in AI automation, custom SaaS development, and high-performance digital systems. Explore our cutting-edge PFAS research and lab innovations.' });
    this.meta.updateTag({ property: 'og:title', content: 'QoArc Studio | Intelligent Digital Systems' });
    this.meta.updateTag({ property: 'og:description', content: 'Expert AI automation and pioneering PFAS research. Building the future of digital systems.' });
  }

  constructor(private title: Title, private meta: Meta) {
    afterNextRender(() => {
      const heroTitle = document.querySelector('.hero-title');
      const heroSubtitle = document.querySelector('.hero-subtitle');
      const heroCta = document.querySelector('.hero-cta');

      if (heroTitle && heroSubtitle && heroCta) {
        animate(
          [heroTitle, heroSubtitle, heroCta],
          { opacity: [0, 1], y: [30, 0] },
          { delay: stagger(0.15), duration: 1, ease: "easeOut" }
        );
      }

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

