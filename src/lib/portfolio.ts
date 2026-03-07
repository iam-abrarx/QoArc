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

export const initialProjects: PortfolioItem[] = [
  {
    id: '1',
    name: 'EcoEnergy Dashboard',
    description: 'AI-driven energy monitoring system for smart cities.',
    url: 'https://eco-energy.example.com',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426',
    client: 'EcoCity Solutions',
    problem: 'City-wide energy waste was at an all-time high due to inefficient monitoring of legacy grids.',
    solution: 'We implemented a real-time AI dashboard that predicts peak usage and optimizes distribution automatically.',
    fullStory: `Our journey with EcoCity started with a simple question: "How can we make a city breathe better?" 
    
We spent months analyzing grid patterns and legacy sensor data. The breakthrough came when we integrated satellite imagery with local power sensors to identify micro-grid inefficiencies.

The resulting dashboard now serves as the central nervous system for three major metropolitan areas, reducing energy waste by 40% in just six months.`
  },
  {
    id: '2',
    name: 'NexFlow Commerce',
    description: 'High-performance e-commerce engine with real-time inventory.',
    url: 'https://nexflow.example.com',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=2689',
    client: 'Global Retailers Inc',
    problem: 'The client faced massive sales losses during peak traffic because their legacy SQL database couldn\'t scale.',
    solution: 'A serverless, event-driven architecture using CosmosDB and Redis caching to handle million-plus concurrent users.',
    fullStory: `Black Friday was the ultimate test. While other retailers went offline, NexFlow processed 50,000 orders per minute without a single millisecond of latency increase.

We utilized edge computing to ensure the storefront was always available, regardless of regional traffic spikes. The result? A 300% increase in conversion rates during holiday seasons.`
  }
];
