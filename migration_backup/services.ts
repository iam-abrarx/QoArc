import {ChangeDetectionStrategy, Component, afterNextRender, OnInit} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import {animate, inView} from 'motion';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="bg-grid min-h-screen pt-40 pb-24 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-24 reveal">
          <h1 class="text-sm font-bold uppercase tracking-widest text-accent-blue mb-6">Our Expertise</h1>
          <h2 class="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tighter mb-8">Premium <span class="text-gradient-blue">Services</span></h2>
          <p class="max-w-2xl mx-auto text-xl text-text-muted">
            From intelligent web design to complex AI automation, we build the systems that power modern enterprises.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Web Design -->
          <div class="reveal group p-12 rounded-[48px] bg-bg-card border border-white/5 hover:border-accent-blue/50 hover:-translate-y-2 hover:glow-blue active:scale-[0.98] cursor-pointer transition-all duration-500">
            <div class="w-16 h-16 bg-accent-blue/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <mat-icon class="text-accent-blue text-3xl">brush</mat-icon>
            </div>
            <h3 class="text-3xl font-display font-bold mb-6">Web Design & Development</h3>
            <p class="text-text-muted text-lg leading-relaxed mb-8">
              We create bespoke digital experiences that are not only visually stunning but also engineered for maximum performance and conversion.
            </p>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-white/70">
              <li class="flex items-center gap-2"><mat-icon class="text-accent-blue text-sm">check_circle</mat-icon> UI/UX Strategy</li>
              <li class="flex items-center gap-2"><mat-icon class="text-accent-blue text-sm">check_circle</mat-icon> Responsive Systems</li>
              <li class="flex items-center gap-2"><mat-icon class="text-accent-blue text-sm">check_circle</mat-icon> Brand Identity</li>
              <li class="flex items-center gap-2"><mat-icon class="text-accent-blue text-sm">check_circle</mat-icon> Performance Audit</li>
            </ul>
          </div>

          <!-- AI Automation -->
          <div class="reveal group p-12 rounded-[48px] bg-bg-card border border-white/5 hover:border-accent-purple/50 hover:-translate-y-2 hover:glow-purple active:scale-[0.98] cursor-pointer transition-all duration-500">
            <div class="w-16 h-16 bg-accent-purple/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <mat-icon class="text-accent-purple text-3xl">psychology</mat-icon>
            </div>
            <h3 class="text-3xl font-display font-bold mb-6">AI Automation Solutions</h3>
            <p class="text-text-muted text-lg leading-relaxed mb-8">
              Leverage the power of Generative AI to automate repetitive tasks, gain insights, and provide 24/7 intelligent support.
            </p>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-white/70">
              <li class="flex items-center gap-2"><mat-icon class="text-accent-purple text-sm">check_circle</mat-icon> Custom AI Agents</li>
              <li class="flex items-center gap-2"><mat-icon class="text-accent-purple text-sm">check_circle</mat-icon> Workflow Automation</li>
              <li class="flex items-center gap-2"><mat-icon class="text-accent-purple text-sm">check_circle</mat-icon> Data Intelligence</li>
              <li class="flex items-center gap-2"><mat-icon class="text-accent-purple text-sm">check_circle</mat-icon> Smart Chatbots</li>
            </ul>
          </div>

          <!-- SaaS Development -->
          <div class="reveal group p-12 rounded-[48px] bg-bg-card border border-white/5 hover:border-accent-blue/50 hover:-translate-y-2 hover:glow-blue active:scale-[0.98] cursor-pointer transition-all duration-500">
            <div class="w-16 h-16 bg-accent-blue/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <mat-icon class="text-accent-blue text-3xl">cloud_done</mat-icon>
            </div>
            <h3 class="text-3xl font-display font-bold mb-6">SaaS Development</h3>
            <p class="text-text-muted text-lg leading-relaxed mb-8">
              End-to-end development of scalable Software-as-a-Service platforms, from architecture to deployment and maintenance.
            </p>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-white/70">
              <li class="flex items-center gap-2"><mat-icon class="text-accent-blue text-sm">check_circle</mat-icon> Multi-tenant Arch</li>
              <li class="flex items-center gap-2"><mat-icon class="text-accent-blue text-sm">check_circle</mat-icon> Cloud Infrastructure</li>
              <li class="flex items-center gap-2"><mat-icon class="text-accent-blue text-sm">check_circle</mat-icon> API Ecosystems</li>
              <li class="flex items-center gap-2"><mat-icon class="text-accent-blue text-sm">check_circle</mat-icon> Subscription Logic</li>
            </ul>
          </div>

          <!-- Custom Solutions -->
          <div class="reveal group p-12 rounded-[48px] bg-bg-card border border-white/5 hover:border-accent-purple/50 hover:-translate-y-2 hover:glow-purple active:scale-[0.98] cursor-pointer transition-all duration-500">
            <div class="w-16 h-16 bg-accent-purple/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <mat-icon class="text-accent-purple text-3xl">architecture</mat-icon>
            </div>
            <h3 class="text-3xl font-display font-bold mb-6">Custom Tech Solutions</h3>
            <p class="text-text-muted text-lg leading-relaxed mb-8">
              Unique business challenges require unique solutions. We build custom software tailored precisely to your operational needs.
            </p>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-white/70">
              <li class="flex items-center gap-2"><mat-icon class="text-accent-purple text-sm">check_circle</mat-icon> Legacy Migration</li>
              <li class="flex items-center gap-2"><mat-icon class="text-accent-purple text-sm">check_circle</mat-icon> System Integration</li>
              <li class="flex items-center gap-2"><mat-icon class="text-accent-purple text-sm">check_circle</mat-icon> Data Pipelines</li>
              <li class="flex items-center gap-2"><mat-icon class="text-accent-purple text-sm">check_circle</mat-icon> Security Audits</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services implements OnInit {
  ngOnInit() {
    this.title.setTitle('QoArc Services | AI Automation & SaaS Development');
    this.meta.updateTag({ name: 'description', content: 'Discover our expert services in AI automation, custom SaaS development, and building high-performance digital systems for the future.' });
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
