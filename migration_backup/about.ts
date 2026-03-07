import {ChangeDetectionStrategy, Component, afterNextRender, OnInit} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import {animate, inView} from 'motion';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="bg-grid min-h-screen pt-40 pb-24 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <div class="reveal">
            <h1 class="text-sm font-bold uppercase tracking-widest text-accent-blue mb-6">Our Story</h1>
            <h2 class="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tighter mb-8">Visionary <span class="text-gradient-blue">Team</span></h2>
            <p class="text-xl text-text-muted leading-relaxed mb-10">
              QoArc Studio was founded on the belief that technology should be as intuitive as it is powerful. We are a collective of designers, engineers, and researchers dedicated to building the future of digital systems.
            </p>
            <div class="grid grid-cols-2 gap-12">
              <div>
                <h4 class="text-3xl font-bold mb-2">3+</h4>
                <p class="text-sm text-text-muted uppercase tracking-widest font-bold">Projects Delivered</p>
              </div>
              <div>
                <h4 class="text-3xl font-bold mb-2">6</h4>
                <p class="text-sm text-text-muted uppercase tracking-widest font-bold">Core Researchers</p>
              </div>
            </div>
          </div>
          <div class="reveal relative">
            <div class="aspect-square rounded-[60px] bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 border border-white/10 p-12 flex items-center justify-center">
              <div class="text-center">
                <mat-icon class="text-8xl text-white mb-6">groups</mat-icon>
                <div class="text-2xl font-display font-bold">Driven by Innovation</div>
              </div>
            </div>
            <!-- Decorative circle -->
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-accent-blue/20 rounded-full blur-3xl animate-pulse"></div>
          </div>
        </div>

        <!-- Values -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="reveal">
            <div class="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
              <mat-icon class="text-accent-blue">visibility</mat-icon>
            </div>
            <h3 class="text-2xl font-bold mb-4">Our Mission</h3>
            <p class="text-text-muted leading-relaxed">
              To empower businesses with intelligent digital systems that provide practical problem solutions and drive sustainable growth.
            </p>
          </div>
          <div class="reveal">
            <div class="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
              <mat-icon class="text-accent-purple">auto_awesome</mat-icon>
            </div>
            <h3 class="text-2xl font-bold mb-4">Our Vision</h3>
            <p class="text-text-muted leading-relaxed">
              To be the global leader in research-driven AI and automation solutions, shaping the future of technology.
            </p>
          </div>
          <div class="reveal">
            <div class="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
              <mat-icon class="text-accent-blue">verified</mat-icon>
            </div>
            <h3 class="text-2xl font-bold mb-4">Core Values</h3>
            <p class="text-text-muted leading-relaxed">
              Excellence, Integrity, Innovation, and a relentless focus on delivering measurable value to our partners.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About implements OnInit {
  ngOnInit() {
    this.title.setTitle('About QoArc Studio | Our Mission & Team');
    this.meta.updateTag({ name: 'description', content: 'Learn about QoArc Studio\'s mission to build intelligent digital systems and solve practical problems through advanced AI and research.' });
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

