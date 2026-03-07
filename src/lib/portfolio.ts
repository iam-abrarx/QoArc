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
}

export const initialProjects: PortfolioItem[] = [
  {
    id: '2go-juice-system',
    name: '2GO Bangladesh — Fresh Juice System',
    client: '2GO Bangladesh',
    slug: '2go-juice-system',
    description: 'A revolutionary fresh juice brand and integrated retail system providing healthy, affordable, and high-quality beverages across Dhaka.',
    category: 'Branding & Retail',
    industry: 'Food & Beverage',
    services: ['Brand Identity', 'Retail System Design', 'Digital Experience', 'Supply Chain Integration'],
    year: '2024',
    techStack: ['Freshness Optimization', 'Retail OS', 'Inventory Intelligence'],
    heroImage: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=2670',
    intro: 'The Mastermind of Freshness. 2GO is redefining the beverage industry in Bangladesh with a focus on hygiene, health, and a premium "grab-and-go" experience.',
    duration: 'Ongoing',
    scope: 'Developing a scalable retail model from brand identity to the proprietary fruit-sourcing and inventory management system.',
    platform: 'Retail + Digital Ecosystem',
    deliverables: ['Visual Identity System', 'Store Design Guidelines', 'Inventory Management App', 'Customer Loyalty Platform'],
    teamRole: 'Strategic Partners',
    challenge: 'The juice market in Dhaka is fragmented between unhygienic street vendors and over-priced imported brands. There was no "middle-ground" offering high-quality, fresh, and affordable juices for the daily commuter.',
    goal: 'Create a brand that feels premium yet accessible, backed by a robust system that ensures 100% freshness and high throughput across multiple retail touchpoints.',
    solution: 'We developed a clean, minimalist brand identity centered around "2GO" logic—speed and health. The system includes optimized fruit-to-juice workflows and a digital dashboard for tracking stock and freshness levels in real-time.',
    keyFeatures: [
      'Hygiene-first processing standards',
      'Real-time inventory and freshness tracking',
      'Minimalist kiosk design for high-traffic areas',
      'Scalable franchise model with digital oversight'
    ],
    designDirection: 'Vibrant, clean, and energetic. Using a "Mastermind" aesthetic with bold typography and high-fidelity product photography.',
    outcome: 'Successfully launched multiple outlets with high customer retention. Proven model for rapid expansion in urban centers.',
    imageUrl: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=2670',
    galleryImages: [
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=2671',
      'https://images.unsplash.com/photo-1525904097878-94fb15835963?auto=format&fit=crop&q=80&w=2670'
    ],
    url: 'https://2go.qoarc.com',
    status: 'published',
    isFeatured: true
  },
  {
    id: 'bancat-cancer-aid',
    name: 'BANCAT — Holistic Cancer Care',
    client: 'BANCAT',
    slug: 'bancat-cancer-aid',
    description: 'Transforming the cancer journey in Bangladesh into a cohesive, dignified experience through holistic care, housing, and psychological support.',
    category: 'NGO & Healthcare',
    industry: 'Social Impact',
    services: ['Digital Strategy', 'Service Design', 'Psychosocial Integration', 'Community Advocacy'],
    year: '2024',
    techStack: ['Care Economy Model', 'Holistic Wellness Ecosystem', 'Durbar Volunteer Network'],
    heroImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2670',
    intro: 'Care is Cure. BANCAT goes beyond medical treatment to develop a comprehensive cancer wellness ecosystem that ensures no patient fights alone.',
    duration: 'Since 2019',
    scope: 'Scaling holistic support across Mosabbir Alok Nibash (Care Homes), Alokon (Mental Health), and Alok Katha (Empowerment).',
    platform: 'Holistic Care Network',
    deliverables: ['Care Home Infrastructure', 'Mental Health Sanctuary', 'Alok Katha Craft Initiative', 'Durbar Volunteer Movement'],
    teamRole: 'Digital & Strategic Partners',
    challenge: 'A cancer diagnosis in Bangladesh often triggers a battle against both the disease and a systemic healthcare gap that leaves rural patients logistically stranded.',
    goal: 'Close the gap between diagnosis and recovery by providing medical, financial, emotional, and psychosocial support.',
    solution: 'Established the "Care is Cure" philosophy, building physical infrastructure like Mosabbir Alok Nibash (85-bed facility) and digital support systems for 2,000+ patients.',
    keyFeatures: [
      'Mosabbir Alok Nibash: Holistic care homes',
      'Alokon: Specialized oncology psychological therapy',
      'Alok Katha: Empowerment through handcrafted goods',
      'BANCAT Durbar: 2,000+ member strong youth volunteer network'
    ],
    designDirection: 'Compassionate and resilient. Soft, hopeful tones and powerful imagery of "Warriors" shifting the narrative to empowerment.',
    outcome: '2,000+ patients served. 10 million+ awareness reach. Bangladesh\'s first holistic hospice and care home model.',
    imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=2670',
    galleryImages: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2670',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=2670'
    ],
    url: 'https://bancat.org.bd',
    status: 'published',
    isFeatured: true
  },
  {
    id: 'liza-dop-portfolio',
    name: 'Liza Kalinina — Cinematography',
    client: 'Liza Kalinina',
    slug: 'liza-dop-portfolio',
    description: 'A premium visual storytelling portfolio for an international Director of Photography specializing in high-end commercial and narrative cinema.',
    category: 'Branding',
    industry: 'Film & Media',
    services: ['Portfolio Strategy', 'Visual Direction', 'Reel Curation', 'Digital Experience'],
    year: '2024',
    techStack: ['Cinematography', 'Digital Mastermind', 'Visual R&D'],
    heroImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=2670',
    intro: 'Capturing the unseen. Liza Kalinina is a DOP focused on the interplay of light, shadow, and human emotion.',
    duration: '3 Months',
    scope: 'Curating a decade of visual excellence into a high-performance digital showcase for global agency acquisition.',
    platform: 'Web Portfolio',
    deliverables: ['Premium Portfolio Hub', 'Showreel Strategy', 'Component-Based Case Studies'],
    teamRole: 'Creative & Technical Direction',
    challenge: 'Building a digital stage that breathes with the films, ensuring heavy video assets load instantly without compromising 4K visual quality.',
    goal: 'Create a "Digital Mastermind" for the artist—a platform that presents relevant reels to different creative directors.',
    solution: 'Video-first architecture with custom WebGL transitions and a sophisticated asset pipeline prioritizing visual fidelity.',
    keyFeatures: [
      'Interactive Cinematic Showreel Header',
      'Dynamic Genre-Based Reel Switching',
      'High-Performance Video Asset Pipeline',
      'Bespoke Dark Aesthetic Typography'
    ],
    designDirection: 'Cinematic Noir. Deep blacks and monochromatic typography allowing the imagery to take center stage.',
    outcome: 'Featured in multiple design galleries. 40% increase in international inquiries from production houses.',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2670',
    galleryImages: [
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=2670',
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2670'
    ],
    url: 'https://lizakalinina.com',
    status: 'published',
    isFeatured: false
  }
];

