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

/**
 * Escape HTML, then apply a safe subset of inline markdown:
 * **bold**, *italic*, `code`, and [label](url) links with scheme validation.
 * Because the markers are ASCII they survive escaping, so no raw HTML can pass.
 */
export function renderInline(input: string): string {
  let s = escapeHtml(input);
  s = s.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-primary/10 text-[#cc0000] text-[0.85em] font-mono rounded-sm">$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, label, url) =>
    isSafeUrl(url)
      ? `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-[#cc0000] underline underline-offset-2 hover:opacity-70 transition-opacity">${label}</a>`
      : label,
  );
  return s;
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
