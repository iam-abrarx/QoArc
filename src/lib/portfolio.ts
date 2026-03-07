export interface PortfolioItem {
  id: string;
  name: string; // Project Title
  client?: string; // Client Name
  slug?: string;
  description: string; // Short Summary
  category?: string; // e.g. Web, App, Branding
  industry?: string; // e.g. Healthcare, Fintech
  services?: string[]; // Array of services provided
  timeline?: string; // e.g. 6 Months
  year?: string; // e.g. 2024
  techStack?: string[];
  
  // Hero Section
  heroImage?: string;
  intro?: string;
  duration?: string;

  // Overview Section
  scope?: string;
  platform?: string;
  deliverables?: string[];
  teamRole?: string;

  // Main Content
  challenge?: string;
  goal?: string;
  solution?: string;
  keyFeatures?: string[];
  designDirection?: string;
  outcome?: string;
  fullStory?: string; // Legacy field for flexibility

  // Visuals
  imageUrl: string; // Thumbnail/Cover
  galleryImages?: string[];
  mobileMockups?: string[];
  desktopMockups?: string[];
  videoUrl?: string;

  // Trust & Metadata
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  impact?: string;
  relatedProjectIds?: string[];
  url: string; // External Project Link

  // SEO & Display
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  isFeatured?: boolean;
  isVisibleOnHome?: boolean;
  status?: 'draft' | 'published';
  order?: number;
}

export const initialProjects: PortfolioItem[] = [
  {
    id: '1',
    name: 'BANCAT.ORG.BD',
    client: 'BANCAT Foundation',
    slug: 'bancat-foundation',
    description: 'A comprehensive digital platform for BANCAT, focusing on healthcare accessibility and community support.',
    category: 'Web',
    industry: 'Healthcare',
    services: ['Web Design', 'Backend Development', 'UX Research'],
    year: '2024',
    techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'PostgreSQL'],
    url: 'https://BANCAT.ORG.BD',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=2670',
    isFeatured: true,
    status: 'published',
    challenge: 'The organization lacked a centralized digital hub for managing patient data and connecting with donors effectively.',
    solution: 'We built a high-performance web application with a secure donation portal and an intuitive patient management system.',
    fullStory: `BANCAT's mission required a design that was both compassionate and technically robust.`
  },
  {
    id: '2',
    name: 'EcoEnergy Smart Systems',
    client: 'EcoCity Solutions',
    slug: 'eco-energy-smart',
    description: 'Next-generation energy monitoring dashboard for urban infrastructure.',
    category: 'AI & IoT',
    industry: 'Smart Cities',
    services: ['AI Integration', 'Dashboard Design', 'IoT Infrastructure'],
    year: '2023',
    techStack: ['React', 'Python', 'TensorFlow', 'D3.js'],
    url: 'https://ecoenergy.qoarc.com',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426',
    isFeatured: false,
    status: 'published',
    challenge: 'Urban areas were experiencing unoptimized energy distribution leading to 30% wastage.',
    solution: 'Implementing a graph-based AI model that predicts peaks and reroutes power in real-time.'
  }
];
