// Minimal HTML-safe formatting helpers. We escape all HTML first, then apply a
// tiny allowlist of formatting (bold, and validated links) on the escaped
// string. Because the formatting markers (**, [](), -) are plain ASCII, they
// survive escaping, so no attacker-supplied HTML can reach the DOM.

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Escapes HTML, then renders **bold** only. Safe for untrusted text.
export function renderBold(input: string, tag: 'b' | 'strong' = 'b'): string {
  return escapeHtml(input).replace(
    /\*\*(.*?)\*\*/g,
    `<${tag}>$1</${tag}>`,
  );
}

const SAFE_URL_SCHEME = /^(https?:|mailto:)/i;

export function isSafeUrl(url: string): boolean {
  const trimmed = url.trim().replace(/&amp;/g, '&');
  // Reject scheme-relative and any non-http(s)/mailto scheme (blocks
  // javascript:, data:, vbscript:, etc.).
  if (trimmed.startsWith('//')) return false;
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return SAFE_URL_SCHEME.test(trimmed);
  return true; // relative URL (e.g. /contact)
}
