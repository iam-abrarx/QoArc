import {ChangeDetectionStrategy, Component, afterNextRender, signal, OnInit} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import {animate, inView} from 'motion';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="bg-grid min-h-screen pt-40 pb-24 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div class="reveal">
            <h1 class="text-sm font-bold uppercase tracking-widest text-accent-blue mb-6">Contact Us</h1>
            <h2 class="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tighter mb-8">Let's <span class="text-gradient-blue">Connect</span></h2>
            <p class="text-xl text-text-muted leading-relaxed mb-12">
              Ready to start your next project? Our team is here to help you navigate the future of digital systems.
            </p>
            
            <div class="space-y-8">
              <div class="flex items-center gap-6">
                <div class="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <mat-icon class="text-accent-blue">alternate_email</mat-icon>
                </div>
                <div>
                  <div class="text-sm text-text-muted font-bold uppercase tracking-widest">Email Us</div>
                  <div class="text-xl font-bold">qoarcstudio&#64;gmail.com</div>
                </div>
              </div>
              <div class="flex items-center gap-6">
                <div class="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <mat-icon class="text-accent-purple">event_available</mat-icon>
                </div>
                <div>
                  <div class="text-sm text-text-muted font-bold uppercase tracking-widest">Book a Call</div>
                  <div class="text-xl font-bold">Schedule Consultation</div>
                </div>
              </div>
              <div class="flex items-center gap-6">
                <div class="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <mat-icon class="text-accent-blue">location_on</mat-icon>
                </div>
                <div>
                  <div class="text-sm text-text-muted font-bold uppercase tracking-widest">Location</div>
                  <div class="text-xl font-bold">Global / Remote First</div>
                </div>
              </div>
            </div>
          </div>

          <div class="reveal">
            <div class="bg-bg-card bg-gradient-to-br from-bg-card via-bg-card to-accent-purple/10 border border-white/5 rounded-[48px] p-10 md:p-16 glow-blue">
              @if (isSuccess()) {
                <div class="text-center py-12 animate-in fade-in zoom-in duration-500">
                  <div class="w-20 h-20 rounded-full bg-accent-blue/20 flex items-center justify-center mx-auto mb-6 text-accent-blue">
                    <mat-icon class="text-4xl">check_circle</mat-icon>
                  </div>
                  <h3 class="text-3xl font-display font-bold mb-4">Message Sent!</h3>
                  <p class="text-text-muted mb-8">Thank you for reaching out. Abrar Al Sayem or one of our researchers will get back to you shortly.</p>
                  <button (click)="isSuccess.set(false)" class="bg-white/5 border border-white/10 px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all">
                    Send Another Message
                  </button>
                </div>
              } @else {
                <form (submit)="onSubmit($event)" class="space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label for="name" class="text-xs font-bold uppercase tracking-widest text-text-muted">Name</label>
                    <input id="name" name="name" type="text" placeholder="Abrar Al Sayem" class="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent-blue transition-colors" required>
                  </div>
                  <div class="space-y-2">
                    <label for="email" class="text-xs font-bold uppercase tracking-widest text-text-muted">Email</label>
                    <input id="email" name="email" type="email" placeholder="contact&#64;example.com" class="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent-blue transition-colors" required>
                  </div>
                </div>
                <div class="space-y-2">
                  <label for="service" class="text-xs font-bold uppercase tracking-widest text-text-muted">Service Interested In</label>
                  <select id="service" name="service" class="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent-blue transition-colors appearance-none">
                    <option class="bg-bg-dark">Web Design</option>
                    <option class="bg-bg-dark">AI Automation</option>
                    <option class="bg-bg-dark">SaaS Development</option>
                    <option class="bg-bg-dark">QoArc Lab Collaboration</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label for="message" class="text-xs font-bold uppercase tracking-widest text-text-muted">Message</label>
                  <textarea id="message" name="message" rows="4" placeholder="Tell us about your project..." class="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent-blue transition-colors" required></textarea>
                </div>
                <button 
                  type="submit" 
                  [disabled]="isSubmitting()"
                  class="w-full bg-white text-black py-5 rounded-xl font-black text-lg hover:bg-accent-blue hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  @if (isSubmitting()) {
                    <span class="w-5 h-5 border-2 border-black border-t-white rounded-full animate-spin"></span>
                    Sending...
                  } @else {
                    Send Message
                  }
                </button>
                @if (isError()) {
                  <p class="text-red-400 text-sm text-center mt-4">Something went wrong. Please try again or email us directly.</p>
                }
              </form>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact implements OnInit {
  isSubmitting = signal(false);
  isSuccess = signal(false);
  isError = signal(false);

  async onSubmit(event: Event) {
    event.preventDefault();
    this.isSubmitting.set(true);
    this.isError.set(false);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formspree.io/f/xvgzgeea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        this.isSuccess.set(true);
        form.reset();
      } else {
        this.isError.set(true);
      }
    } catch (error) {
      this.isError.set(true);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  ngOnInit() {
    this.title.setTitle('Contact QoArc Studio | Let\'s Build the Future');
    this.meta.updateTag({ name: 'description', content: 'Get in touch with QoArc Studio for AI automation, SaaS development, or research collaborations. We\'re here to help you navigate the future.' });
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

