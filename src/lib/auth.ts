// Session auth using an HMAC-signed cookie. Web Crypto is used so the same
// code runs in both the Edge middleware and Node route handlers.

export const SESSION_COOKIE = 'qoarc_session';
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours (seconds)

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error('SESSION_SECRET environment variable is not set (min 16 chars)');
  }
  return secret;
}

function base64url(bytes: Uint8Array): string {
  let str = '';
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64urlDecode(input: string): Uint8Array {
  const pad = input.length % 4 ? '='.repeat(4 - (input.length % 4)) : '';
  const b64 = input.replace(/-/g, '+').replace(/_/g, '/') + pad;
  const str = atob(b64);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i);
  return bytes;
}

async function hmac(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return base64url(new Uint8Array(sig));
}

// Constant-time string comparison to avoid signature timing leaks.
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload = base64url(new TextEncoder().encode(JSON.stringify({ exp })));
  const sig = await hmac(payload, getSecret());
  return `${payload}.${sig}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  let expected: string;
  try {
    expected = await hmac(payload, getSecret());
  } catch {
    return false;
  }
  if (!timingSafeEqual(sig, expected)) return false;
  try {
    const { exp } = JSON.parse(new TextDecoder().decode(base64urlDecode(payload)));
    return typeof exp === 'number' && exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

// Constant-time password check against ADMIN_PASSWORD.
export function verifyPassword(input: string | undefined | null): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error('ADMIN_PASSWORD environment variable is not set');
  if (typeof input !== 'string') return false;
  return timingSafeEqual(input, expected);
}
