import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <footer class="bg-bg-dark border-t border-white/5 py-16 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 bg-gradient-to-br from-accent-blue to-accent-purple rounded-lg flex items-center justify-center">
                <span class="text-white font-display font-bold text-sm">Q</span>
              </div>
              <span class="font-display font-bold text-lg tracking-tight">QoArc Studio</span>
            </div>
            <p class="text-text-muted max-w-xs leading-relaxed mb-8">
              Building intelligent digital systems for the next generation of business.
            </p>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <mat-icon class="text-sm">public</mat-icon>
              </a>
              <a href="#" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <mat-icon class="text-sm">code</mat-icon>
              </a>
              <a href="#" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <mat-icon class="text-sm">alternate_email</mat-icon>
              </a>
            </div>
          </div>
          <div>
            <h4 class="font-bold mb-6 text-white">Services</h4>
            <ul class="space-y-4 text-sm text-text-muted">
              <li><a href="#" class="hover:text-accent-blue transition-colors">Web Design</a></li>
              <li><a href="#" class="hover:text-accent-blue transition-colors">AI Automation</a></li>
              <li><a href="#" class="hover:text-accent-blue transition-colors">SaaS Development</a></li>
              <li><a href="#" class="hover:text-accent-blue transition-colors">Custom Solutions</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-6 text-white">Company</h4>
            <ul class="space-y-4 text-sm text-text-muted">
              <li><a href="#" class="hover:text-accent-blue transition-colors">About Us</a></li>
              <li><a href="#" class="hover:text-accent-blue transition-colors">QoArc Lab</a></li>
              <li><a href="#" class="hover:text-accent-blue transition-colors">Contact</a></li>
              <li><a href="#" class="hover:text-accent-blue transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p class="text-xs text-text-muted">© 2026 QoArc Studio. All rights reserved.</p>
          <div class="flex gap-8 text-xs text-text-muted">
            <span class="flex items-center gap-1"><mat-icon class="text-[10px]">bolt</mat-icon> Powered by AI</span>
            <span class="flex items-center gap-1"><mat-icon class="text-[10px]">verified</mat-icon> ISO Certified</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {}
