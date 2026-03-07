import {Injectable, PLATFORM_ID, inject, signal} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

export interface PortfolioItem {
  id: string;
  name: string;
  description: string;
  url: string;
  imageUrl: string;
  client?: string;
  problem?: string;
  solution?: string;
  flowDiagramUrl?: string;
  fullStory?: string;
  videoUrl?: string;
  extraImages?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private platformId = inject(PLATFORM_ID);
  
  private initialItems: PortfolioItem[] = [
    {
      id: '1',
      name: 'EcoEnergy Dashboard',
      description: 'A comprehensive energy monitoring system designed for real-time analytics and predictive maintenance.',
      url: 'https://ecoenergy.ai',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426',
      client: 'GreenState Power',
      problem: 'GreenState Power faced challenges in managing peak loads and predicting equipment failure, leading to significant downtime.',
      solution: 'We built a custom AI dashboard that monitors grid health in real-time and provides predictive maintenance alerts 48 hours in advance.',
      flowDiagramUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2670',
      fullStory: `Our journey with GreenState Power began with a simple observation: the human eye cannot catch the micro-fluctuations in grid frequency that signal impending transformer failure.

We spent six months embedded with their field engineers, understanding the acoustic and thermal signatures of aging infrastructure. The result was EcoEnergy—an AI system that doesn't just monitor; it understands.

By integrating sensors from three different manufacturers into a unified data lake, we were able to train a custom GNN (Graph Neural Network) that treats the power grid as a living organism. Today, GreenState operates with a 99.99% uptime, saving millions in emergency repairs.`
    },
    {
      id: '2',
      name: 'NexFlow Commerce',
      description: 'Next-generation headless commerce platform with AI-driven personalization and lightning-fast checkout.',
      url: 'https://nexflow.shop',
      imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=2689',
      client: 'RetailHub Global',
      problem: 'Legacy e-commerce platforms were slow, causing high bounce rates and poor conversion on mobile devices.',
      solution: 'NexFlow uses a headless architecture with edge-computed AI for product recommendations, resulting in sub-second load times and 40% higher conversion.',
      flowDiagramUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2670',
      fullStory: `In the world of high-velocity retail, a delay of 100 milliseconds can mean the difference between a sale and a lost customer. NexFlow was born out of this necessity.

Instead of traditional server-side rendering, we implemented a custom Edge-Compute strategy that pushes the AI recommendation engine directly to the CDN nodes nearest to the user.

This project redefined how RetailHub views their digital footprint, moving from a static catalog to a dynamic, living storefront that adapts to every click in real-time.`
    },
    {
      id: '3',
      name: 'Bancat',
      description: 'A revolutionary fintech platform streamlining international transfers and currency exchange.',
      url: 'https://bancat.com',
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2670',
      client: 'Bancat Financial',
      problem: 'Users struggled with high fees and slow processing times for cross-border payments, often taking 3-5 business days.',
      solution: 'We implemented a blockchain-based ledger system and smart routing algorithms to reduce fees by 60% and achieve near-instant settlement.',
      flowDiagramUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2670',
      fullStory: `Bancat was a challenge of trust. How do you convince users that a digital ledger is as secure as a brick-and-mortar vault?

Our approach was technical transparency. We built a proprietary smart-routing engine that splits transactions across multiple liquidity pools to ensure the lowest possible spread, while maintaining a real-time immutable record on a private sidechain.

The final product isn't just a transfer app—it's a global financial nervous system. Bancat currently handles over $50M in monthly volume with zero reconciliation errors.`
    }
  ];

  portfolioItems = signal<PortfolioItem[]>([]);

  constructor() {
    this.loadItems();
  }

  private loadItems() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('qoarc_portfolio');
      if (saved) {
        this.portfolioItems.set(JSON.parse(saved));
      } else {
        this.portfolioItems.set(this.initialItems);
        this.saveToStorage();
      }
    } else {
      this.portfolioItems.set(this.initialItems);
    }
  }

  addItem(item: Omit<PortfolioItem, 'id'>) {
    const newItem = {...item, id: crypto.randomUUID()};
    this.portfolioItems.update(items => [...items, newItem]);
    this.saveToStorage();
  }

  deleteItem(id: string) {
    this.portfolioItems.update(items => items.filter(i => i.id !== id));
    this.saveToStorage();
  }

  private saveToStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('qoarc_portfolio', JSON.stringify(this.portfolioItems()));
    }
  }
}
