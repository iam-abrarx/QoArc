// Seed script — run with: npx tsx src/lib/seed.ts
// This creates all tables and inserts the default data into Neon PostgreSQL.

import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not set. Pass it as an env var:');
  console.error('   DATABASE_URL="postgresql://..." npx tsx src/lib/seed.ts');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function seed() {
  console.log('🔧 Creating tables...');

  // --- Create tables ---
  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      client TEXT,
      slug TEXT,
      description TEXT NOT NULL,
      category TEXT,
      industry TEXT,
      services JSONB DEFAULT '[]',
      timeline TEXT,
      year TEXT,
      tech_stack JSONB DEFAULT '[]',
      hero_image TEXT,
      intro TEXT,
      duration TEXT,
      scope TEXT,
      platform TEXT,
      deliverables JSONB DEFAULT '[]',
      team_role TEXT,
      challenge TEXT,
      goal TEXT,
      solution TEXT,
      key_features JSONB DEFAULT '[]',
      design_direction TEXT,
      outcome TEXT,
      full_story TEXT,
      image_url TEXT NOT NULL,
      gallery_images JSONB DEFAULT '[]',
      mobile_mockups JSONB DEFAULT '[]',
      tablet_mockups JSONB DEFAULT '[]',
      desktop_mockups JSONB DEFAULT '[]',
      video_url TEXT,
      ui_components JSONB DEFAULT '[]',
      system_diagram TEXT,
      system_diagram_caption TEXT,
      testimonial JSONB,
      impact TEXT,
      related_project_ids JSONB DEFAULT '[]',
      url TEXT NOT NULL DEFAULT '#',
      meta_title TEXT,
      meta_description TEXT,
      og_image TEXT,
      is_featured BOOLEAN DEFAULT false,
      is_visible_on_home BOOLEAN DEFAULT true,
      status TEXT DEFAULT 'published',
      sort_order INTEGER DEFAULT 0,
      device_type TEXT DEFAULT 'desktop',
      primary_color TEXT DEFAULT '#002046',
      challenges TEXT,
      solutions TEXT,
      stats JSONB DEFAULT '[]',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`;

  await sql`
    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      company TEXT NOT NULL,
      logo_color TEXT DEFAULT 'text-[#0047AB]',
      author_name TEXT NOT NULL,
      author_title TEXT,
      author_image TEXT,
      author_linkedin TEXT DEFAULT '#',
      rating INTEGER DEFAULT 5,
      content TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`;

  await sql`
    CREATE TABLE IF NOT EXISTS job_openings (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      team TEXT NOT NULL,
      type TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`;

  await sql`
    CREATE TABLE IF NOT EXISTS partner_logos (
      id TEXT PRIMARY KEY,
      url TEXT NOT NULL,
      alt TEXT NOT NULL,
      is_wide BOOLEAN DEFAULT false,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`;

  await sql`
    CREATE TABLE IF NOT EXISTS lab_items (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      node TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`;

  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      phone TEXT,
      service TEXT,
      message TEXT NOT NULL,
      assets JSONB DEFAULT '[]',
      submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`;

  console.log('✅ Tables created.');

  // --- Seed testimonials ---
  console.log('📝 Seeding testimonials...');
  const testimonials = [
    { id: '1', company: 'BANcat', logo_color: 'text-[#cc0000]', author_name: 'Dr. Rafiq Ahmed', author_title: 'Director of Operations, BANCAT Bangladesh', author_image: 'https://69c86795a9fb0ef7c012e385.imgix.net/testimonial%20male.jpg', author_linkedin: '#', rating: 5, content: 'QOARC built a powerful platform for our cancer charity. It makes it simple for donors to find and support patients in real-time. The site is easy to use in both English and Bangla, helping us reach more people.' },
    { id: '2', company: 'AsiaLinkage', logo_color: 'text-[#002046]', author_name: 'Tanvir Hossain', author_title: 'CEO, AsiaLinkage International', author_image: 'https://69c86795a9fb0ef7c012e385.imgix.net/testimonial%20male.jpg', author_linkedin: '#', rating: 5, content: 'QOARC built a comprehensive digital catalogue for our business. They created a structured website where all our products are beautifully categorized and easily accessible to our clients. It completely transformed how we showcase our inventory.' },
    { id: '3', company: '2GO Bangladesh', logo_color: 'text-[#ff6600]', author_name: 'Nusrat Jahan', author_title: 'Head of Digital, 2GO', author_image: 'https://69c86795a9fb0ef7c012e385.imgix.net/testimonial%20female.jpg', author_linkedin: '#', rating: 5, content: 'Our new website is fast, modern, and looks great. QOARC made the shopping experience so much smoother for our customers. We\'ve seen a huge improvement in how people interact with our brand.' },
    { id: '4', company: 'Elizabeth Archer', logo_color: 'text-[#b8860b]', author_name: 'Elizabeth Archer', author_title: 'Director of Photography', author_image: 'https://69c86795a9fb0ef7c012e385.imgix.net/testimonial%20female.jpg', author_linkedin: '#', rating: 5, content: 'QOARC turned my photography portfolio into a high-end digital magazine. The cinematic feel and private client areas have completely changed how I present my work to filmmakers. It\'s truly elite.' },
    { id: '5', company: 'Nazmus Sakib Pharmacy', logo_color: 'text-[#008080]', author_name: 'Nazmus Sakib', author_title: 'Owner', author_image: 'https://69c86795a9fb0ef7c012e385.imgix.net/testimonial%20male.jpg', author_linkedin: '#', rating: 5, content: 'QOARC developed a fast, reliable inventory management system for our local pharmacy. It helps us keep track of medicines, sales, and stock levels effortlessly. The system is easy to use and has completely modernized our daily operations.' },
  ];

  for (const t of testimonials) {
    await sql`INSERT INTO testimonials (id, company, logo_color, author_name, author_title, author_image, author_linkedin, rating, content)
      VALUES (${t.id}, ${t.company}, ${t.logo_color}, ${t.author_name}, ${t.author_title}, ${t.author_image}, ${t.author_linkedin}, ${t.rating}, ${t.content})
      ON CONFLICT (id) DO NOTHING`;
  }
  console.log(`  ✅ ${testimonials.length} testimonials seeded.`);

  // --- Seed projects ---
  console.log('📝 Seeding projects...');
  const projects = [
    { id: 'aether-node', name: 'Aether Node: Distributed AI Infrastructure', client: 'NeuroFlow Systems', slug: 'aether-ai-infra', description: 'Infrastructure // Case Study', category: 'Infrastructure', industry: 'AI / LLM', challenge: 'Developing a sovereign, high-concurrency inference engine for distributed LLM architectures without centralized latency bottlenecks.', solution: 'Architected a decentralized node cluster with sub-millisecond data synchronization and tactical load-balancing across edge regions.', challenges: 'Developing a sovereign, high-concurrency inference engine for distributed LLM architectures without centralized latency bottlenecks.', solutions: 'Architected a decentralized node cluster with sub-millisecond data synchronization and tactical load-balancing across edge regions.', stats: [{ value: '0.4ms', label: 'Node Latency' }, { value: '100%', label: 'Sovereignty' }], image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop', desktop_mockups: ['https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop'], device_type: 'desktop', primary_color: '#0024ff', status: 'published', is_featured: true, year: '2024', tech_stack: ['Rust', 'gRPC', 'Next.js 15', 'PyTorch'], url: '#' },
    { id: 'quantus-fx', name: 'Quantus: High-Frequency Transaction Engine', client: 'Global Liquidity Hub', slug: 'quantus-fintech', description: 'Fintech // Case Study', category: 'Fintech', industry: 'Financial Services', challenge: 'Fragmented ledger synchronization and non-performant transaction routing resulted in significant slippage and data drift during high-volatility events.', solution: 'Engineered a reactive, event-driven transaction orchestration engine using WebSocket clusters and optimized linear algebra for real-time risk modeling.', challenges: 'Fragmented ledger synchronization and non-performant transaction routing resulted in significant slippage and data drift during high-volatility events.', solutions: 'Engineered a reactive, event-driven transaction orchestration engine using WebSocket clusters and optimized linear algebra for real-time risk modeling.', stats: [{ value: '1.2M', label: 'Events / Sec' }, { value: '< 2ms', label: 'Settlement' }], image_url: 'https://images.unsplash.com/photo-1611974714851-eb605161882b?q=80&w=2000&auto=format&fit=crop', mobile_mockups: ['https://images.unsplash.com/photo-1611974714851-eb605161882b?q=80&w=2000&auto=format&fit=crop'], device_type: 'mobile', primary_color: '#cc0000', status: 'published', is_featured: true, year: '2024', tech_stack: ['Node.js', 'Redis', 'Framer Motion', 'Prisma'], url: '#' },
    { id: 'sovereign-cloud', name: 'Sovereign Cloud: Enterprise Control Plane', client: 'DynaScale Global', slug: 'sovereign-saas', description: 'SaaS // Case Study', category: 'SaaS', industry: 'Cloud Infrastructure', challenge: 'Enterprise partners required a unified, multi-tenant interface to manage massive edge-compute clusters without compromising on design precision or security overhead.', solution: 'Built a cinematic, precision-engineered control plane with CAD-grid overlays and real-time node telemetry visualization.', challenges: 'Enterprise partners required a unified, multi-tenant interface to manage massive edge-compute clusters without compromising on design precision or security overhead.', solutions: 'Built a cinematic, precision-engineered control plane with CAD-grid overlays and real-time node telemetry visualization.', stats: [{ value: '42k+', label: 'Managed Nodes' }, { value: '99.999%', label: 'Uptime' }], image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop', desktop_mockups: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop'], device_type: 'desktop', primary_color: '#00c2ff', status: 'published', is_featured: true, year: '2023', tech_stack: ['TypeScript', 'Three.js', 'Terraform', 'Go'], url: '#' },
    { id: 'nexus-industrial', name: 'Nexus Ops: Predictive Maintenance Node', client: 'Industrial Corp', slug: 'nexus-iot', description: 'IoT // Case Study', category: 'IoT', industry: 'Manufacturing', challenge: 'Industrial manufacturing lines suffered from unexpected downtime and invisible inefficiencies across legacy sensor networks.', solution: 'Deployed a real-time predictive maintenance node using edge-AI to analyze vibration and thermal telemetry before failures occurs.', challenges: 'Industrial manufacturing lines suffered from unexpected downtime and invisible inefficiencies across legacy sensor networks.', solutions: 'Deployed a real-time predictive maintenance node using edge-AI to analyze vibration and thermal telemetry before failures occurs.', stats: [{ value: '30%', label: 'Zero-Downtime' }, { value: '85%', label: 'Accuracy' }], image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop', tablet_mockups: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop'], device_type: 'tablet', primary_color: '#ff4d00', status: 'published', is_featured: true, year: '2023', tech_stack: ['C++', 'Python', 'React', 'Socket.io'], url: '#' },
    { id: 'sentinel-vision', name: 'Sentinel: Precision Computer Vision', client: 'SecureGrid', slug: 'sentinel-ai-vision', description: 'Security // Case Study', category: 'AI', industry: 'Security', challenge: 'Legacy video monitoring systems lacked the sub-second classification depth required for high-risk industrial parameters.', solution: 'Architected a custom vision transformer model (ViT) optimized for the browser to maintain real-time tracking with zero server round-trips.', challenges: 'Legacy video monitoring systems lacked the sub-second classification depth required for high-risk industrial parameters.', solutions: 'Architected a custom vision transformer model (ViT) optimized for the browser to maintain real-time tracking with zero server round-trips.', stats: [{ value: '99.8%', label: 'Classification' }, { value: '0ms', label: 'Server Trip' }], image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop', mobile_mockups: ['https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop'], device_type: 'mobile', primary_color: '#0de3ff', status: 'published', is_featured: true, year: '2024', tech_stack: ['TensorFlow.js', 'Webhooks', 'Zustand'], url: '#' },
    { id: 'velocity-pay', name: 'Velocity: Enterprise Settlement Engine', client: 'Standard FinTech', slug: 'velocity-saas', description: 'Fintech // Case Study', category: 'SaaS', industry: 'Financial Services', challenge: 'Cross-border gross settlements took up to 3 days, severely impacting liquidity and architectural flexibility for global merchants.', solution: 'Implemented a high-concurrency payment gateway optimized for real-time gross settlement (RTGS) using atomic ledger locks.', challenges: 'Cross-border gross settlements took up to 3 days, severely impacting liquidity and architectural flexibility for global merchants.', solutions: 'Implemented a high-concurrency payment gateway optimized for real-time gross settlement (RTGS) using atomic ledger locks.', stats: [{ value: 'Instant', label: 'Liquidity' }, { value: '40%', label: 'Cost Reduction' }], image_url: 'https://images.unsplash.com/photo-1551288560-192895f8564a?q=80&w=2000&auto=format&fit=crop', desktop_mockups: ['https://images.unsplash.com/photo-1551288560-192895f8564a?q=80&w=2000&auto=format&fit=crop'], device_type: 'desktop', primary_color: '#0047ff', status: 'published', is_featured: true, year: '2024', tech_stack: ['Next.js 15', 'Go', 'Kubernetes', 'PostgreSQL'], url: '#' },
  ];

  for (const p of projects) {
    await sql`INSERT INTO projects (id, name, client, slug, description, category, industry, challenge, solution, challenges, solutions, stats, image_url, desktop_mockups, mobile_mockups, tablet_mockups, device_type, primary_color, status, is_featured, year, tech_stack, url)
      VALUES (${p.id}, ${p.name}, ${p.client}, ${p.slug}, ${p.description}, ${p.category}, ${p.industry}, ${p.challenge}, ${p.solution}, ${p.challenges}, ${p.solutions}, ${JSON.stringify(p.stats)}, ${p.image_url}, ${JSON.stringify((p as any).desktop_mockups || [])}, ${JSON.stringify((p as any).mobile_mockups || [])}, ${JSON.stringify((p as any).tablet_mockups || [])}, ${p.device_type}, ${p.primary_color}, ${p.status}, ${p.is_featured}, ${p.year}, ${JSON.stringify(p.tech_stack)}, ${p.url})
      ON CONFLICT (id) DO NOTHING`;
  }
  console.log(`  ✅ ${projects.length} projects seeded.`);

  // --- Seed job openings ---
  console.log('📝 Seeding job openings...');
  const jobs = [
    { id: '1', title: 'Senior AI Engineer', team: 'Intelligence Node', type: 'Full-time // Remote/Hybrid', description: 'Engineering RAG pipelines and GNN architectures for proprietary research nodes.' },
    { id: '2', title: 'Full-Stack Product Lead', team: 'SaaS Engineering', type: 'Full-time // Dhaka HQ', description: 'Leading the end-to-end build of sovereign software systems for US/EU startups.' },
    { id: '3', title: 'UX / Systems Designer', team: 'Strategic Design', type: 'Full-time // Remote/Hybrid', description: 'Designing high-fidelity "Intellectual Architect" interfaces for complex AI logic.' },
  ];

  for (const j of jobs) {
    await sql`INSERT INTO job_openings (id, title, team, type, description)
      VALUES (${j.id}, ${j.title}, ${j.team}, ${j.type}, ${j.description})
      ON CONFLICT (id) DO NOTHING`;
  }
  console.log(`  ✅ ${jobs.length} job openings seeded.`);

  // --- Seed lab items ---
  console.log('📝 Seeding lab items...');
  const labItems = [
    { id: '1', name: 'Animal weight estimation from images', description: 'A deep learning ML project for precision agriculture and livestock observation.', node: '0x01 // ARCHITECTURAL_RE' },
    { id: '2', name: 'Large scale PFAS generation for safety and toxicity analysis', description: 'GNN-based toxicity modeling for accelerated materials science.', node: '0x02 // NEURAL_KINETICS' },
  ];

  for (const l of labItems) {
    await sql`INSERT INTO lab_items (id, name, description, node)
      VALUES (${l.id}, ${l.name}, ${l.description}, ${l.node})
      ON CONFLICT (id) DO NOTHING`;
  }
  console.log(`  ✅ ${labItems.length} lab items seeded.`);

  console.log('\n🎉 Database seeded successfully!');
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
