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
    id: "bancat",
    name: "BANcat: Empowering Cancer Support",
    client: "Charity Foundation",
    slug: "bancat-charity",
    description: "Healthcare // Charity Platform",
    category: "Charity Platform",
    industry: "Healthcare",
    challenge: "Fragmented donor communication and slow fund allocation for patients in Bangladesh.",
    solution: "Built a bi-lingual (English/Bangla) platform that enables real-time patient support and transparent donation tracking.",
    challenges: "Fragmented donor communication and slow fund allocation for patients in Bangladesh.",
    solutions: "Built a bi-lingual (English/Bangla) platform that enables real-time patient support and transparent donation tracking.",
    stats: [
      { value: "99.9%", label: "Sync Accuracy" },
      { value: "500+", label: "Patients Supported" }
    ],
    imageUrl: "/images/projects/bancat/hero.png",
    desktopMockups: ["/images/projects/bancat/hero.png"],
    mobileMockups: ["/images/projects/bancat/mobile_v2.png"],
    deviceType: "mixed",
    primaryColor: "#cc0000",
    status: 'published',
    isFeatured: true,
    year: "2024",
    techStack: ["Next.js", "Prisma", "PostgreSQL"],
    url: "https://bancat.org.bd"
  },
  {
    id: "asialinkage",
    name: "AsiaLinkage: Industrial Accessories",
    client: "Industrial Corp",
    slug: "asialinkage-b2b",
    description: "B2B // Manufacturing",
    category: "Manufacturing",
    industry: "Garments Accessories",
    challenge: "Enterprise clients struggled to navigate the massive catalog of 5,000+ specialized garments accessories.",
    solution: "Developed a precision Product Category Display system with AI-assisted search for industrial procurement.",
    challenges: "Enterprise clients struggled to navigate the massive catalog of 5,000+ specialized garments accessories.",
    solutions: "Developed a precision Product Category Display system with AI-assisted search for industrial procurement.",
    stats: [
      { value: "42k+", label: "Network Nodes" },
      { value: "5k+", label: "Product SKUs" }
    ],
    imageUrl: "/images/projects/asialinkage/hero.png",
    desktopMockups: ["/images/projects/asialinkage/hero.png", "/images/projects/asialinkage/category.png"],
    mobileMockups: ["/images/projects/asialinkage/showcase.png"],
    deviceType: "desktop",
    primaryColor: "#002046",
    status: 'published',
    isFeatured: true,
    year: "2023",
    techStack: ["TypeScript", "ElasticSearch", "Tailwind CSS"],
    url: "https://asialinkage.com"
  },
  {
    id: "2go",
    name: "2GO Bangladesh: Premium Juice Brand",
    client: "2GO Fresh",
    slug: "2go-beverage",
    description: "Branding // E-Commerce",
    category: "E-Commerce",
    industry: "Food & Beverage",
    challenge: "Outdated brand perception and friction in the online ordering process during peak demand.",
    solution: "Designed an elegant, mobile-first product showcase and streamlined the checkout experience for instant juice delivery.",
    challenges: "Outdated brand perception and friction in the online ordering process during peak demand.",
    solutions: "Designed an elegant, mobile-first product showcase and streamlined the checkout experience for instant juice delivery.",
    stats: [
      { value: "150%", label: "UX Uplift" },
      { value: "2.5x", label: "Conversion Rate" }
    ],
    imageUrl: "/images/projects/2go/hero.png",
    mobileMockups: ["/images/projects/2go/mobile_v2.png", "/images/projects/2go/display.png", "/images/projects/2go/detail.png"],
    desktopMockups: ["/images/projects/2go/admin.png"],
    deviceType: "mixed",
    primaryColor: "#ff6600",
    status: 'published',
    isFeatured: true,
    year: "2024",
    techStack: ["React", "Stripe", "Framer Motion"],
    url: "https://bout2go.com"
  },
  {
    id: "elizabeth",
    name: "Elizabeth: Creative Portfolio",
    client: "Private Collection",
    slug: "liza-portfolio",
    description: "Creative Portfolio // Photography",
    category: "Creative Portfolio",
    industry: "Art & Media",
    challenge: "Traditional portfolio layouts failed to convey the cinematic scale and atmospheric depth of high-end photography.",
    solution: "Engineered a 'Theatre View' interactive engine that mimics a darkroom screening experience for private galleries.",
    challenges: "Traditional portfolio layouts failed to convey the cinematic scale and atmospheric depth of high-end photography.",
    solutions: "Engineered a 'Theatre View' interactive engine that mimics a darkroom screening experience for private galleries.",
    stats: [
      { value: "100/100", label: "Page Score" },
      { value: "Private", label: "Client Portal" }
    ],
    imageUrl: "/images/projects/liza/hero.png",
    desktopMockups: ["/images/projects/liza/hero.png", "/images/projects/liza/theatre.png"],
    mobileMockups: ["/images/projects/liza/loading.png"],
    deviceType: "desktop",
    primaryColor: "#b8860b",
    status: 'published',
    isFeatured: true,
    year: "2023",
    techStack: ["Three.js", "GSAP", "Next.js"],
    url: "#"
  }
];
