import type { MetadataRoute } from 'next';
import { SITE, absoluteUrl } from '@/lib/seo';
import { initialProjects } from '@/lib/portfolio';

// Static, well-known route slugs (kept in sync with the route data maps).
const SERVICE_PAGES = ['ai-integration', 'automation', 'saas-development', 'technical-consulting'];
const CUSTOM_SOFTWARE = [
  'web-app-development', 'mobile-app-development', 'mvp-development',
  'enterprise-software-development', 'saas-development', 'custom-crm', 'erp-development',
];
const IT_CONSULTING = ['gtm-strategy-consulting', 'digital-transformation-consulting', 'solution-architecture'];
const AI_DATA = [
  'machine-learning-development', 'mlops-consulting', 'computer-vision',
  'natural-language-processing', 'business-intelligence', 'predictive-analytics',
  'rpa-development', 'intelligent-process-automation',
];
const INDUSTRIES = ['fintech', 'healthcare', 'retail-ecommerce', 'manufacturing'];
const LAB_FALLBACK = ['pfas-rigidity', 'animal-weight', 'bancat-tech', 'cow-project'];

async function fetchSlugs(path: string): Promise<string[]> {
  try {
    const res = await fetch(absoluteUrl(path), { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const rows = await res.json();
    return Array.isArray(rows) ? rows.map((r: any) => r.slug || r.id).filter(Boolean) : [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly',
  ): MetadataRoute.Sitemap[number] => ({ url: absoluteUrl(path), lastModified: now, changeFrequency, priority });

  // Dynamic slugs (best effort; fall back to known static content).
  const [labSlugs] = await Promise.all([
    fetchSlugs('/api/lab-items'),
  ]);
  const labs = Array.from(new Set([...LAB_FALLBACK, ...labSlugs]));

  return [
    entry('/', 1.0, 'weekly'),
    entry('/services', 0.9),
    ...SERVICE_PAGES.map((s) => entry(`/services/${s}`, 0.8)),
    ...CUSTOM_SOFTWARE.map((s) => entry(`/services/custom-software/${s}`, 0.7)),
    ...IT_CONSULTING.map((s) => entry(`/services/it-consulting/${s}`, 0.7)),
    ...AI_DATA.map((s) => entry(`/ai-data/${s}`, 0.7)),
    ...INDUSTRIES.map((s) => entry(`/industries/${s}`, 0.7)),
    entry('/lab', 0.9, 'weekly'),
    ...labs.map((s) => entry(`/lab/${s}`, 0.7)),
    entry('/pricing', 0.7),
    entry('/studio', 0.6),
    entry('/insights', 0.6),
    entry('/about', 0.7),
    entry('/about/team', 0.5),
    entry('/about/how-we-work', 0.5),
    entry('/about/careers', 0.6),
    entry('/terms', 0.3, 'yearly'),
    entry('/privacy-policy', 0.3, 'yearly'),
  ];
}
