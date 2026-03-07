import {ChangeDetectionStrategy, Component, inject, signal, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PortfolioService, PortfolioItem} from './portfolio.service';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  template: `
    <section class="pt-32 pb-20 px-6">
      <div class="max-w-7xl mx-auto">
        @if (!isLoggedIn()) {
          <!-- Login View -->
          <div class="max-w-md mx-auto bg-bg-dark border border-white/5 p-12 rounded-3xl glow-blue text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-accent-blue to-accent-purple rounded-2xl flex items-center justify-center mx-auto mb-8">
              <mat-icon class="text-white text-3xl">lock</mat-icon>
            </div>
            <h1 class="text-3xl font-display font-bold mb-8">Admin Access</h1>
            <div class="space-y-4 max-w-sm mx-auto">
              <input [(ngModel)]="password" type="password" placeholder="Enter Password" 
                     class="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:ring-2 focus:ring-accent-blue outline-none transition-all text-white">
              <button (click)="login()" 
                      class="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-accent-blue hover:text-white transition-all shadow-xl shadow-white/5">
                Continue to Dashboard
              </button>
              @if (error()) {
                <p class="text-red-500 text-sm mt-4">{{error()}}</p>
              }
            </div>
            <p class="text-text-muted text-xs mt-8 uppercase tracking-widest opacity-50">Hint: admin123</p>
          </div>
        } @else {
          <!-- Admin Dashboard -->
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 border-b border-white/5 pb-8 gap-6">
            <div>
              <h1 class="text-4xl font-display font-bold">Admin <span class="text-accent-blue">Dashboard</span></h1>
              <p class="text-text-muted mt-1">Manage your project portfolio and blog-style case studies.</p>
            </div>
            <div class="flex items-center gap-4">
              <button (click)="createNew()" class="bg-accent-blue text-white px-8 py-4 rounded-2xl font-black hover:bg-white hover:text-black transition-all flex items-center gap-2 shadow-xl shadow-accent-blue/20">
                <mat-icon>add_circle</mat-icon> Create Project
              </button>
              <button (click)="logout()" class="text-sm font-bold bg-white/5 hover:bg-white/10 px-6 py-4 rounded-2xl transition-all flex items-center gap-2">
                <mat-icon class="text-sm">logout</mat-icon> Sign Out
              </button>
            </div>
          </div>

          @if (showEditor()) {
            <!-- WordPress-style Editor -->
            <div class="mb-20 animate-in slide-in-from-top duration-500">
              <div class="flex items-center justify-between mb-8">
                <div class="flex items-center gap-4">
                  <button (click)="cancelEdit()" class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                    <mat-icon>arrow_back</mat-icon>
                  </button>
                  <h2 class="text-3xl font-display font-bold">{{editingId() ? 'Edit' : 'New'}} Project Case Study</h2>
                </div>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <!-- Main Content Area (Left 3/4) -->
                <div class="lg:col-span-3 space-y-8">
                  <!-- Blog Content Area -->
                  <div class="bg-white/5 border border-white/10 rounded-[32px] p-10 space-y-10 shadow-2xl">
                    <div class="space-y-4">
                      <label class="text-sm uppercase tracking-[0.2em] text-accent-blue font-black">Project Title</label>
                      <input [(ngModel)]="newItem.name" type="text" placeholder="Enter project name..." 
                             class="w-full bg-transparent border-b-2 border-white/10 py-4 text-4xl font-display font-bold focus:border-accent-blue outline-none transition-all placeholder:opacity-20">
                    </div>

                    <div class="space-y-6">
                      <label class="text-sm uppercase tracking-[0.2em] text-text-muted font-bold flex items-center gap-3">
                        <mat-icon class="text-accent-blue">edit_note</mat-icon> The Case Study (Storytelling)
                      </label>
                      <div class="bg-bg-dark/50 border border-white/5 rounded-2xl p-6">
                        <textarea [(ngModel)]="newItem.fullStory" placeholder="Write your project journey here like a blog post... Support long-form text and narrative storytelling." 
                                  class="w-full bg-transparent outline-none min-h-[500px] font-sans text-xl leading-relaxed text-white placeholder:opacity-20 resize-none"></textarea>
                      </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                      <div class="space-y-4">
                        <label class="text-xs uppercase tracking-widest text-text-muted font-bold">Problem Outline</label>
                        <textarea [(ngModel)]="newItem.problem" placeholder="What challenge did we face?" 
                                  class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-accent-blue outline-none min-h-[120px] transition-all"></textarea>
                      </div>
                      <div class="space-y-4">
                        <label class="text-xs uppercase tracking-widest text-text-muted font-bold">Solution Implementation</label>
                        <textarea [(ngModel)]="newItem.solution" placeholder="How was it resolved?" 
                                  class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-accent-blue outline-none min-h-[120px] transition-all"></textarea>
                      </div>
                    </div>
                  </div>

                  <!-- Media & Interactive Section -->
                  <div class="bg-white/5 border border-white/10 rounded-[32px] p-10 space-y-10">
                    <h3 class="text-xl font-bold flex items-center gap-3">
                      <mat-icon class="text-accent-purple">play_circle</mat-icon> Rich Media Settings
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div class="space-y-4">
                        <label class="text-xs uppercase tracking-widest text-text-muted font-bold">Video Presentation URL (YouTube/Vimeo)</label>
                        <input [(ngModel)]="newItem.videoUrl" type="text" placeholder="https://youtube.com/watch?v=..." 
                               class="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-4 focus:border-accent-blue outline-none">
                      </div>
                      <div class="space-y-4">
                        <label class="text-xs uppercase tracking-widest text-text-muted font-bold">Flow Architecture Image</label>
                        <input [(ngModel)]="newItem.flowDiagramUrl" type="text" placeholder="https://..." 
                               class="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-4 focus:border-accent-blue outline-none">
                      </div>
                    </div>

                    <div class="space-y-6">
                      <div class="flex items-center justify-between">
                        <label class="text-xs uppercase tracking-widest text-text-muted font-bold">Project Gallery (Inline Images)</label>
                        <button (click)="addGalleryImage()" class="text-xs font-bold text-accent-blue hover:underline flex items-center gap-1">
                          <mat-icon class="text-xs">add</mat-icon> Add Image URL
                        </button>
                      </div>
                      <div class="grid grid-cols-1 gap-4">
                        @for (img of newItem.extraImages; track $index) {
                          <div class="flex items-center gap-4">
                            <input [(ngModel)]="newItem.extraImages[$index]" type="text" [placeholder]="'Image URL ' + ($index + 1)" 
                                   class="flex-1 bg-bg-dark border border-white/10 rounded-xl px-4 py-3 focus:border-accent-blue outline-none">
                            <button (click)="removeGalleryImage($index)" class="text-red-500 hover:text-red-400">
                              <mat-icon>delete</mat-icon>
                            </button>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Sidebar Metadata (Right 1/4) -->
                <div class="space-y-8">
                  <!-- Publishing Card -->
                  <div class="bg-white/5 border border-white/10 rounded-[32px] p-8 space-y-6 sticky top-32">
                    <h3 class="text-lg font-bold flex items-center gap-3">
                      <mat-icon class="text-accent-purple">rocket_launch</mat-icon> Publishing
                    </h3>
                    <div class="flex flex-col gap-3">
                      <button (click)="submit()" 
                              class="w-full bg-accent-blue text-white py-4 rounded-xl font-bold hover:bg-white hover:text-black transition-all shadow-xl shadow-accent-blue/10">
                        {{editingId() ? 'Update' : 'Publish'}} Project
                      </button>
                      <button (click)="cancelEdit()" 
                              class="w-full bg-white/5 text-white py-4 rounded-xl font-bold hover:bg-white/10 transition-all">
                        Move to Trash/Discard
                      </button>
                    </div>

                    <div class="pt-6 border-t border-white/5 space-y-6">
                      <div class="space-y-4">
                        <label class="text-xs uppercase tracking-widest text-text-muted font-bold">Client Name</label>
                        <input [(ngModel)]="newItem.client" type="text" placeholder="Fixed Client Name" 
                               class="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 focus:border-accent-blue outline-none">
                      </div>

                      <div class="space-y-4">
                        <label class="text-xs uppercase tracking-widest text-text-muted font-bold">Project Website URL</label>
                        <input [(ngModel)]="newItem.url" type="text" placeholder="https://..." 
                               class="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 focus:border-accent-blue outline-none">
                      </div>

                      <div class="space-y-4">
                        <label class="text-xs uppercase tracking-widest text-text-muted font-bold">Featured Image (Main)</label>
                        <div class="aspect-video rounded-xl overflow-hidden border border-white/10 bg-bg-dark mb-4 group relative">
                          @if (newItem.imageUrl) {
                            <img [src]="newItem.imageUrl" class="w-full h-full object-cover">
                          } @else {
                            <div class="w-full h-full flex items-center justify-center text-white/10">
                              <mat-icon class="text-4xl">add_photo_alternate</mat-icon>
                            </div>
                          }
                        </div>
                        <input [(ngModel)]="newItem.imageUrl" type="text" placeholder="https://..." 
                               class="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 focus:border-accent-blue outline-none text-xs">
                      </div>

                      <div class="space-y-4">
                        <label class="text-xs uppercase tracking-widest text-text-muted font-bold">Excerpt (Card View)</label>
                        <textarea [(ngModel)]="newItem.description" placeholder="A short summary for the portfolio grid..." 
                                  class="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 focus:border-accent-blue outline-none min-h-[100px] text-sm"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } @else {
            <!-- Post List Area -->
            <div class="space-y-8 animate-in fade-in duration-500">
              <div class="flex items-center justify-between mb-2">
                <h2 class="text-xl font-bold flex items-center gap-3">
                  <mat-icon class="text-accent-blue">list</mat-icon> Your Case Studies
                </h2>
                <span class="text-xs text-text-muted uppercase tracking-widest">Total: {{portfolioService.portfolioItems().length}}</span>
              </div>
              
              <div class="grid grid-cols-1 gap-4">
                @for (item of portfolioService.portfolioItems(); track item.id) {
                  <div class="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-accent-blue/30 transition-all group">
                    <div class="flex items-center gap-6 w-full">
                      <div class="w-24 h-16 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
                        <img [src]="item.imageUrl" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                      </div>
                      <div class="min-w-0">
                        <h4 class="text-xl font-bold truncate">{{item.name}}</h4>
                        <div class="flex items-center gap-2 mt-1">
                          <span class="text-xs text-accent-blue font-bold uppercase tracking-widest">{{item.client}}</span>
                          <span class="text-white/10">•</span>
                          <span class="text-xs text-text-muted truncate text-balance">{{item.url}}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div class="flex items-center gap-3 w-full md:w-auto">
                      <button (click)="editItem(item)" 
                              class="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl font-bold transition-all text-sm">
                        <mat-icon class="text-sm">edit</mat-icon> Edit Post
                      </button>
                      <button (click)="deleteItem(item.id)" 
                              class="flex items-center justify-center w-12 h-12 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all">
                        <mat-icon>delete</mat-icon>
                      </button>
                    </div>
                  </div>
                }
              </div>

              @if (portfolioService.portfolioItems().length === 0) {
                <div class="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
                  <mat-icon class="text-5xl text-white/10 mb-4">post_add</mat-icon>
                  <p class="text-text-muted">No posts found. Create your first case study!</p>
                  <button (click)="createNew()" class="mt-6 text-accent-blue font-bold hover:underline">
                    Get Started &rarr;
                  </button>
                </div>
              }
            </div>
          }
        }
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      color: white;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Admin implements OnInit {
  portfolioService = inject(PortfolioService);
  route = inject(ActivatedRoute);
  isLoggedIn = signal(typeof window !== 'undefined' && localStorage.getItem('isAdmin') === 'true');
  password = '';
  error = signal('');

  editingId = signal<string | null>(null);
  showEditor = signal(false);

  newItem = {
    name: '',
    description: '',
    url: '',
    imageUrl: '',
    client: '',
    problem: '',
    solution: '',
    flowDiagramUrl: '',
    fullStory: '',
    videoUrl: '',
    extraImages: [] as string[]
  };

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const editId = params.get('edit');
      if (editId && this.isLoggedIn()) {
        const item = this.portfolioService.portfolioItems().find(i => i.id === editId);
        if (item) {
          this.editItem(item);
        }
      }
    });
  }

  login() {
    if (this.password === 'admin123') {
      this.isLoggedIn.set(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('isAdmin', 'true');
      }
      this.error.set('');
    } else {
      this.error.set('Invalid credentials');
    }
  }

  logout() {
    this.isLoggedIn.set(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAdmin');
    }
    this.password = '';
    this.editingId.set(null);
    this.showEditor.set(false);
  }

  createNew() {
    this.cancelEdit();
    this.showEditor.set(true);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  addGalleryImage() {
    this.newItem.extraImages.push('');
  }

  removeGalleryImage(index: number) {
    this.newItem.extraImages.splice(index, 1);
  }

  submit() {
    if (!this.newItem.name || !this.newItem.description || !this.newItem.url || !this.newItem.imageUrl) {
      alert('Please fill all fields');
      return;
    }

    if (this.editingId()) {
      // Update existing
      this.portfolioService.deleteItem(this.editingId()!);
      this.portfolioService.addItem({...this.newItem});
    } else {
      // Add new
      this.portfolioService.addItem({...this.newItem});
    }

    this.cancelEdit();
  }

  editItem(item: PortfolioItem) {
    this.editingId.set(item.id);
    this.newItem = {
      name: item.name,
      description: item.description,
      url: item.url,
      imageUrl: item.imageUrl,
      client: item.client || '',
      problem: item.problem || '',
      solution: item.solution || '',
      flowDiagramUrl: item.flowDiagramUrl || '',
      fullStory: item.fullStory || '',
      videoUrl: item.videoUrl || '',
      extraImages: [...(item.extraImages || [])]
    };
    this.showEditor.set(true);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  cancelEdit() {
    this.editingId.set(null);
    this.showEditor.set(false);
    this.newItem = {
      name: '',
      description: '',
      url: '',
      imageUrl: '',
      client: '',
      problem: '',
      solution: '',
      flowDiagramUrl: '',
      fullStory: '',
      videoUrl: '',
      extraImages: []
    };
  }

  deleteItem(id: string) {
    if (confirm('Are you sure?')) {
      this.portfolioService.deleteItem(id);
    }
  }
}
