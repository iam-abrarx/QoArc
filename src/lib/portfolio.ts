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
  tabletMockups?: string[];
  desktopMockups?: string[];
  videoUrl?: string;

  // Design System & Architecture
  uiComponents?: string[]; // UI/UX components used (e.g. "Radix Accordion", "Custom Chart")
  systemDiagram?: string; // URL to system architecture diagram
  systemDiagramCaption?: string;

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

  // New fields for Carousel/Showcase
  deviceType?: 'mobile' | 'tablet' | 'desktop' | 'mixed' | 'random';
  primaryColor?: string;
  challenges?: string; // Specific for carousel-style display
  solutions?: string; // Specific for carousel-style display
  stats?: { value: string; label: string }[];
}

export const initialProjects: PortfolioItem[] = [
  {
    id: 'aether-node',
    name: 'Aether Node: Distributed AI Infrastructure',
    client: 'NeuroFlow Systems',
    slug: 'aether-ai-infra',
    description: 'Infrastructure // Case Study',
    category: 'Infrastructure',
    industry: 'AI / LLM',
    challenge: 'Developing a sovereign, high-concurrency inference engine for distributed LLM architectures without centralized latency bottlenecks.',
    solution: 'Architected a decentralized node cluster with sub-millisecond data synchronization and tactical load-balancing across edge regions.',
    challenges: 'Developing a sovereign, high-concurrency inference engine for distributed LLM architectures without centralized latency bottlenecks.',
    solutions: 'Architected a decentralized node cluster with sub-millisecond data synchronization and tactical load-balancing across edge regions.',
    stats: [{ value: '0.4ms', label: 'Node Latency' }, { value: '100%', label: 'Sovereignty' }],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
    desktopMockups: ['https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop'],
    deviceType: 'desktop',
    primaryColor: '#0024ff',
    status: 'published',
    isFeatured: true,
    year: '2024',
    techStack: ['Rust', 'gRPC', 'Next.js 15', 'PyTorch'],
    url: '#'
  },
  {
    id: 'quantus-fx',
    name: 'Quantus: High-Frequency Transaction Engine',
    client: 'Global Liquidity Hub',
    slug: 'quantus-fintech',
    description: 'Fintech // Case Study',
    category: 'Fintech',
    industry: 'Financial Services',
    challenge: 'Fragmented ledger synchronization and non-performant transaction routing resulted in significant slippage and data drift during high-volatility events.',
    solution: 'Engineered a reactive, event-driven transaction orchestration engine using WebSocket clusters and optimized linear algebra for real-time risk modeling.',
    challenges: 'Fragmented ledger synchronization and non-performant transaction routing resulted in significant slippage and data drift during high-volatility events.',
    solutions: 'Engineered a reactive, event-driven transaction orchestration engine using WebSocket clusters and optimized linear algebra for real-time risk modeling.',
    stats: [{ value: '1.2M', label: 'Events / Sec' }, { value: '< 2ms', label: 'Settlement' }],
    imageUrl: 'https://images.unsplash.com/photo-1611974714851-eb605161882b?q=80&w=2000&auto=format&fit=crop',
    mobileMockups: ['https://images.unsplash.com/photo-1611974714851-eb605161882b?q=80&w=2000&auto=format&fit=crop'],
    deviceType: 'mobile',
    primaryColor: '#cc0000',
    status: 'published',
    isFeatured: true,
    year: '2024',
    techStack: ['Node.js', 'Redis', 'Framer Motion', 'Prisma'],
    url: '#'
  },
  {
    id: 'sovereign-cloud',
    name: 'Sovereign Cloud: Enterprise Control Plane',
    client: 'DynaScale Global',
    slug: 'sovereign-saas',
    description: 'SaaS // Case Study',
    category: 'SaaS',
    industry: 'Cloud Infrastructure',
    challenge: 'Enterprise partners required a unified, multi-tenant interface to manage massive edge-compute clusters without compromising on design precision or security overhead.',
    solution: 'Built a cinematic, precision-engineered control plane with CAD-grid overlays and real-time node telemetry visualization.',
    challenges: 'Enterprise partners required a unified, multi-tenant interface to manage massive edge-compute clusters without compromising on design precision or security overhead.',
    solutions: 'Built a cinematic, precision-engineered control plane with CAD-grid overlays and real-time node telemetry visualization.',
    stats: [{ value: '42k+', label: 'Managed Nodes' }, { value: '99.999%', label: 'Uptime' }],
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop',
    desktopMockups: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop'],
    deviceType: 'desktop',
    primaryColor: '#00c2ff',
    status: 'published',
    isFeatured: true,
    year: '2023',
    techStack: ['TypeScript', 'Three.js', 'Terraform', 'Go'],
    url: '#'
  },
  {
    id: 'nexus-industrial',
    name: 'Nexus Ops: Predictive Maintenance Node',
    client: 'Industrial Corp',
    slug: 'nexus-iot',
    description: 'IoT // Case Study',
    category: 'IoT',
    industry: 'Manufacturing',
    challenge: 'Industrial manufacturing lines suffered from unexpected downtime and invisible inefficiencies across legacy sensor networks.',
    solution: 'Deployed a real-time predictive maintenance node using edge-AI to analyze vibration and thermal telemetry before failures occurs.',
    challenges: 'Industrial manufacturing lines suffered from unexpected downtime and invisible inefficiencies across legacy sensor networks.',
    solutions: 'Deployed a real-time predictive maintenance node using edge-AI to analyze vibration and thermal telemetry before failures occurs.',
    stats: [{ value: '30%', label: 'Zero-Downtime' }, { value: '85%', label: 'Accuracy' }],
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop',
    tabletMockups: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop'],
    deviceType: 'tablet',
    primaryColor: '#ff4d00',
    status: 'published',
    isFeatured: true,
    year: '2023',
    techStack: ['C++', 'Python', 'React', 'Socket.io'],
    url: '#'
  },
  {
    id: 'sentinel-vision',
    name: 'Sentinel: Precision Computer Vision',
    client: 'SecureGrid',
    slug: 'sentinel-ai-vision',
    description: 'Security // Case Study',
    category: 'AI',
    industry: 'Security',
    challenge: 'Legacy video monitoring systems lacked the sub-second classification depth required for high-risk industrial parameters.',
    solution: 'Architected a custom vision transformer model (ViT) optimized for the browser to maintain real-time tracking with zero server round-trips.',
    challenges: 'Legacy video monitoring systems lacked the sub-second classification depth required for high-risk industrial parameters.',
    solutions: 'Architected a custom vision transformer model (ViT) optimized for the browser to maintain real-time tracking with zero server round-trips.',
    stats: [{ value: '99.8%', label: 'Classification' }, { value: '0ms', label: 'Server Trip' }],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
    mobileMockups: ['https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop'],
    deviceType: 'mobile',
    primaryColor: '#0de3ff',
    status: 'published',
    isFeatured: true,
    year: '2024',
    techStack: ['TensorFlow.js', 'Webhooks', 'Zustand'],
    url: '#'
  },
  {
    id: 'velocity-pay',
    name: 'Velocity: Enterprise Settlement Engine',
    client: 'Standard FinTech',
    slug: 'velocity-saas',
    description: 'Fintech // Case Study',
    category: 'SaaS',
    industry: 'Financial Services',
    challenge: 'Cross-border gross settlements took up to 3 days, severely impacting liquidity and architectural flexibility for global merchants.',
    solution: 'Implemented a high-concurrency payment gateway optimized for real-time gross settlement (RTGS) using atomic ledger locks.',
    challenges: 'Cross-border gross settlements took up to 3 days, severely impacting liquidity and architectural flexibility for global merchants.',
    solutions: 'Implemented a high-concurrency payment gateway optimized for real-time gross settlement (RTGS) using atomic ledger locks.',
    stats: [{ value: 'Instant', label: 'Liquidity' }, { value: '40%', label: 'Cost Reduction' }],
    imageUrl: 'https://images.unsplash.com/photo-1551288560-192895f8564a?q=80&w=2000&auto=format&fit=crop',
    desktopMockups: ['https://images.unsplash.com/photo-1551288560-192895f8564a?q=80&w=2000&auto=format&fit=crop'],
    deviceType: 'desktop',
    primaryColor: '#0047ff',
    status: 'published',
    isFeatured: true,
    year: '2024',
    techStack: ['Next.js 15', 'Go', 'Kubernetes', 'PostgreSQL'],
    url: '#'
  }
];

