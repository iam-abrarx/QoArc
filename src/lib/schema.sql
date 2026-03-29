-- QoArc Database Schema
-- Run this against Neon PostgreSQL to create all tables

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
);

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
);

CREATE TABLE IF NOT EXISTS job_openings (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  team TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS partner_logos (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  alt TEXT NOT NULL,
  is_wide BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lab_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  node TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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
);
