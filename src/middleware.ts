import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';

// Public API endpoints that never require authentication.
// - GET on content collections powers the public site.
// - POST on contact/careers/submissions are the public lead-capture forms.
// Everything else under /api (all mutations, /api/upload, and reading PII via
// /api/submissions GET) requires a valid admin session.

const PUBLIC_GET_PREFIXES = [
  '/api/projects',
  '/api/testimonials',
  '/api/lab-items',
  '/api/job-openings',
  '/api/partner-logos',
];

const PUBLIC_POST_PATHS = new Set([
  '/api/contact',
  '/api/careers',
  '/api/submissions', // public contact form writes here
]);

function isPublic(pathname: string, method: string): boolean {
  if (pathname.startsWith('/api/auth/')) return true;
  if (method === 'GET' || method === 'HEAD') {
    return PUBLIC_GET_PREFIXES.some(
      (p) => pathname === p || pathname.startsWith(p + '/'),
    );
  }
  if (method === 'POST') {
    return PUBLIC_POST_PATHS.has(pathname);
  }
  return false; // PUT / PATCH / DELETE and everything else -> protected
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  if (isPublic(pathname, method)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (await verifySessionToken(token)) {
    return NextResponse.next();
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export const config = {
  matcher: ['/api/:path*'],
};
