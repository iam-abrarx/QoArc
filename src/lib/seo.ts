// Centralized SEO configuration and JSON-LD (schema.org) structured-data
// builders. Every builder returns a plain object ready to be serialized into a
// <script type="application/ld+json"> tag via the <JsonLd> component.

export const SITE = {
  url: (process.env.NEXT_PUBLIC_APP_URL || 'https://www.qoarc.com').replace(/\/+$/, ''),
  name: 'QOARC',
  legalName: 'QOARC',
  description:
    'A full-service AI product studio. We build intelligent SaaS, automate business operations, and ship end-to-end software products.',
  logo: '/favicon.svg',
  ogImage: '/og-image.png',
  twitter: '@qoarc',
  email: 'office@qoarc.com',
  sameAs: [
    'https://www.linkedin.com/company/qoarc',
    'https://x.com/qoarc',
  ] as string[],
};

/** Resolve a path to an absolute URL against the site origin. */
export function absoluteUrl(path = ''): string {
  if (!path) return SITE.url;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE.url}${path.startsWith('/') ? '' : '/'}${path}`;
}

/** Best-effort conversion of a human date string to ISO 8601. */
export function toIsoDate(input?: string): string | undefined {
  if (!input) return undefined;
  const d = new Date(input);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: absoluteUrl(SITE.logo),
    description: SITE.description,
    email: SITE.email,
    sameAs: SITE.sameAs,
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { '@id': `${SITE.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function webPageSchema({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { '@id': `${SITE.url}/#website` },
    publisher: { '@id': `${SITE.url}/#organization` },
  };
}

export function collectionPageSchema({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { '@id': `${SITE.url}/#website` },
  };
}

export function articleSchema(a: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  section?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: a.title,
    description: a.description,
    url: absoluteUrl(a.path),
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(a.path) },
    image: a.image ? absoluteUrl(a.image) : absoluteUrl(SITE.ogImage),
    datePublished: a.datePublished,
    dateModified: a.dateModified || a.datePublished,
    articleSection: a.section,
    author: { '@type': 'Organization', name: a.authorName || `${SITE.name} Labs`, url: SITE.url },
    publisher: { '@id': `${SITE.url}/#organization` },
  };
}

export function serviceSchema(s: { name: string; description: string; path: string; image?: string; serviceType?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    description: s.description,
    serviceType: s.serviceType || s.name,
    url: absoluteUrl(s.path),
    ...(s.image ? { image: absoluteUrl(s.image) } : {}),
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: 'Worldwide',
  };
}

export function creativeWorkSchema(w: {
  name: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: w.name,
    description: w.description,
    url: absoluteUrl(w.path),
    ...(w.image ? { image: absoluteUrl(w.image) } : {}),
    ...(w.datePublished ? { datePublished: w.datePublished } : {}),
    ...(w.keywords && w.keywords.length ? { keywords: w.keywords.join(', ') } : {}),
    creator: { '@id': `${SITE.url}/#organization` },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

export function jobPostingSchema(j: {
  title: string;
  description: string;
  employmentType?: string;
  datePosted?: string;
  path?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: j.title,
    description: j.description,
    datePosted: j.datePosted || new Date().toISOString().slice(0, 10),
    employmentType: j.employmentType || 'FULL_TIME',
    hiringOrganization: { '@id': `${SITE.url}/#organization`, name: SITE.name, sameAs: SITE.url },
    jobLocationType: 'TELECOMMUTE',
    applicantLocationRequirements: { '@type': 'Country', name: 'Worldwide' },
    directApply: true,
    url: j.path ? absoluteUrl(j.path) : absoluteUrl('/about/careers'),
  };
}
