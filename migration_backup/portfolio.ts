import {ChangeDetectionStrategy, Component, inject, signal, OnInit} from '@angular/core';
import {PortfolioService, PortfolioItem} from './portfolio.service';
import {MatIconModule} from '@angular/material/icon';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <section class="pt-32 pb-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="mb-16">
          <h1 class="text-5xl md:text-7xl font-display font-black mb-6 tracking-tight">
            Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-pink-500">Portfolio</span>
          </h1>
          <p class="text-xl text-text-muted max-w-2xl leading-relaxed">
            Delivering high-impact digital solutions for visionary clients across the globe.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          @for (item of portfolioService.portfolioItems(); track item.id) {
            <div class="group relative bg-bg-card border border-white/5 rounded-3xl overflow-hidden hover:border-accent-blue/30 transition-all duration-500 cursor-pointer"
                 (click)="showDetail(item)">
              
              <!-- Quick Edit Button (Admin Only) -->
              @if (isAdmin()) {
                <button (click)="editPost($event, item)" 
                        class="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-accent-blue text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all">
                  <mat-icon>edit</mat-icon>
                </button>
              }

              <!-- Image Container -->
              <div class="aspect-video relative overflow-hidden">
                <img [src]="item.imageUrl" [alt]="item.name" 
                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                     (error)="$event.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2670'">
                <div class="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent opacity-60"></div>
                
                <!-- Client Badge -->
                @if (item.client) {
                  <div class="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full">
                    <span class="text-xs font-bold text-white uppercase tracking-widest">{{item.client}}</span>
                  </div>
                }
              </div>

              <!-- Content -->
              <div class="p-8">
                <h3 class="text-2xl font-bold mb-3 group-hover:text-accent-blue transition-colors">{{item.name}}</h3>
                <p class="text-text-muted mb-6 leading-relaxed">
                  {{item.description}}
                </p>
                <div class="inline-flex items-center gap-2 text-sm font-bold text-accent-blue group-hover:gap-4 transition-all">
                  Learn More
                  <mat-icon class="text-sm">arrow_forward</mat-icon>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Case Study Detail View -->
    @if (selectedItem(); as item) {
      <div class="fixed inset-0 z-[60] flex items-center justify-center p-6 animate-in fade-in duration-300">
        <div class="absolute inset-0 bg-bg-dark/95 backdrop-blur-2xl" (click)="closeDetail()"></div>
        
        <div class="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-bg-card border border-white/10 rounded-[32px] shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
          <!-- Header -->
          <div class="sticky top-0 z-10 p-8 flex items-center justify-between bg-bg-card/80 backdrop-blur-md border-b border-white/5">
            <div>
              <h2 class="text-3xl font-display font-bold">{{item.name}}</h2>
              <p class="text-accent-blue font-bold uppercase tracking-widest text-xs mt-1">{{item.client}}</p>
            </div>
            <button (click)="closeDetail()" class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <mat-icon>close</mat-icon>
            </button>
          </div>

          <div class="p-8 md:p-12 space-y-16">
            <!-- Hero Image -->
            <div class="aspect-video rounded-3xl overflow-hidden border border-white/10">
              <img [src]="item.imageUrl" class="w-full h-full object-cover">
            </div>

            <!-- Problem & Solution -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div class="space-y-4">
                <h4 class="text-xl font-bold text-white flex items-center gap-3">
                  <span class="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center font-mono italic">!</span>
                  The Problem
                </h4>
                <p class="text-text-muted leading-relaxed text-lg">
                  {{item.problem || 'Coming soon...'}}
                </p>
              </div>
              <div class="space-y-4">
                <h4 class="text-xl font-bold text-white flex items-center gap-3">
                  <span class="w-8 h-8 rounded-lg bg-accent-blue/10 text-accent-blue flex items-center justify-center font-mono italic">✓</span>
                  Our Solution
                </h4>
                <p class="text-text-muted leading-relaxed text-lg">
                  {{item.solution || 'Coming soon...'}}
                </p>
              </div>
            </div>

            <!-- Video Section -->
            @if (item.videoUrl) {
              <div class="space-y-6 pt-16 border-t border-white/5">
                <h4 class="text-xl font-bold text-white flex items-center gap-3">
                  <mat-icon class="text-accent-blue">play_circle</mat-icon>
                  Video Presentation
                </h4>
                <div class="aspect-video rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
                  <iframe [src]="getSafeVideoUrl(item.videoUrl)" 
                          class="w-full h-full" 
                          frameborder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowfullscreen></iframe>
                </div>
              </div>
            }

            <!-- Full Story Section -->
            @if (item.fullStory) {
              <div class="pt-16 border-t border-white/5">
                <h4 class="text-xs uppercase tracking-[0.3em] text-accent-blue font-black mb-10 text-center">Project Analysis & Journey</h4>
                <div class="max-w-3xl mx-auto prose prose-invert">
                  <p class="text-xl text-text-muted leading-[1.8] whitespace-pre-wrap font-sans">
                    {{item.fullStory}}
                  </p>
                </div>
                
                <!-- Extra Images Gallery -->
                @if (item.extraImages && item.extraImages.length > 0) {
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                    @for (img of item.extraImages; track $index) {
                      <div class="rounded-2xl overflow-hidden border border-white/5 hover:border-accent-blue/30 transition-all duration-500">
                        <img [src]="img" class="w-full h-auto object-cover hover:scale-105 transition-transform duration-700">
                      </div>
                    }
                  </div>
                }
              </div>
            }

            <!-- Flow Diagram / Visual Representation -->
            @if (item.flowDiagramUrl) {
              <div class="space-y-6">
                <h4 class="text-xl font-bold text-white flex items-center gap-3">
                  <mat-icon class="text-accent-purple">account_tree</mat-icon>
                  Flow Architecture
                </h4>
                <div class="bg-white/5 p-4 rounded-[32px] border border-white/10 overflow-hidden">
                  <img [src]="item.flowDiagramUrl" class="w-full rounded-2xl grayscale hover:grayscale-0 transition-all duration-700">
                </div>
              </div>
            }

            <!-- CTA -->
            <div class="pt-8 text-center border-t border-white/5">
              <a [href]="item.url" target="_blank" 
                 class="inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-black text-xl hover:bg-accent-blue hover:text-white transition-all shadow-xl shadow-accent-blue/10">
                Launch Website <mat-icon>rocket_launch</mat-icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Portfolio {
  portfolioService = inject(PortfolioService);
  sanitizer = inject(DomSanitizer);
  selectedItem = signal<PortfolioItem | null>(null);
  isAdmin = signal(typeof window !== 'undefined' && localStorage.getItem('isAdmin') === 'true');

  showDetail(item: PortfolioItem) {
    this.selectedItem.set(item);
    document.body.style.overflow = 'hidden';
  }

  closeDetail() {
    this.selectedItem.set(null);
    document.body.style.overflow = 'auto';
  }

  editPost(event: Event, item: PortfolioItem) {
    event.stopPropagation();
    // Navigate to admin with the edit parameter
    window.location.href = `/admin?edit=${item.id}`;
  }

  getSafeVideoUrl(url: string | undefined): SafeResourceUrl {
    if (!url) return this.sanitizer.bypassSecurityTrustResourceUrl('');
    
    let embedUrl = url;
    
    // YouTube
    if (url.includes('youtube.com/watch?v=')) {
      embedUrl = url.replace('watch?v=', 'embed/');
    } else if (url.includes('youtu.be/')) {
      embedUrl = url.replace('youtu.be/', 'youtube.com/embed/');
    }
    
    // Vimeo
    if (url.includes('vimeo.com/')) {
      const vimeoId = url.split('/').pop();
      embedUrl = `https://player.vimeo.com/video/${vimeoId}`;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
