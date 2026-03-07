import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a routerLink="/" class="flex items-center gap-3 group">
          <div class="w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-purple rounded-xl flex items-center justify-center glow-blue group-hover:scale-110 transition-transform duration-300">
            <span class="text-white font-display font-black text-xl">Q</span>
          </div>
          <span class="font-display font-bold text-xl tracking-tight">QoArc Studio</span>
        </a>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-8">
          <a routerLink="/" routerLinkActive="text-accent-blue" [routerLinkActiveOptions]="{exact: true}" class="text-sm font-medium hover:text-accent-blue transition-colors">Home</a>
          <a routerLink="/services" routerLinkActive="text-accent-blue" class="text-sm font-medium hover:text-accent-blue transition-colors">Services</a>
          <a routerLink="/portfolio" routerLinkActive="text-accent-blue" class="text-sm font-medium hover:text-accent-blue transition-colors">Portfolio</a>
          <a routerLink="/lab" routerLinkActive="text-accent-blue" class="text-sm font-medium hover:text-accent-blue transition-colors">QoArc Lab</a>
          <a routerLink="/about" routerLinkActive="text-accent-blue" class="text-sm font-medium hover:text-accent-blue transition-colors">About</a>
          <a routerLink="/contact" class="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-accent-blue hover:text-white transition-all duration-300 shadow-lg shadow-white/5">
            Start Project
          </a>
        </div>

        <!-- Mobile Toggle -->
        <button class="md:hidden p-2 text-white" (click)="toggleMenu()">
          <mat-icon>{{ isMenuOpen() ? 'close' : 'menu' }}</mat-icon>
        </button>
      </div>

      <!-- Mobile Menu -->
      @if (isMenuOpen()) {
        <div class="md:hidden fixed inset-0 z-40 bg-bg-dark/95 backdrop-blur-xl p-8 pt-32 flex flex-col gap-8 animate-in fade-in zoom-in-95 duration-300">
          <a routerLink="/" (click)="closeMenu()" class="text-3xl font-display font-bold tracking-tight border-b border-white/5 pb-4">Home</a>
          <a routerLink="/services" (click)="closeMenu()" class="text-3xl font-display font-bold tracking-tight border-b border-white/5 pb-4">Services</a>
          <a routerLink="/lab" (click)="closeMenu()" class="text-3xl font-display font-bold tracking-tight border-b border-white/5 pb-4">QoArc Lab</a>
          <a routerLink="/portfolio" (click)="closeMenu()" class="text-3xl font-display font-bold tracking-tight border-b border-white/5 pb-4">Portfolio</a>
          <a routerLink="/about" (click)="closeMenu()" class="text-3xl font-display font-bold tracking-tight border-b border-white/5 pb-4">About</a>
          <a routerLink="/contact" (click)="closeMenu()" class="mt-auto bg-gradient-to-r from-accent-blue to-accent-purple text-white px-6 py-5 rounded-2xl text-center font-black text-xl shadow-xl shadow-accent-blue/20">
            Start Project
          </a>
        </div>
      }
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
