// Block-based content model for Lab articles (a lightweight Gutenberg-style
// document). The whole array is persisted inside the lab item's JSON blob, so
// no schema change is needed.

export type LabBlock =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; url: string; caption?: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'code'; code: string; language?: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'metrics'; items: { label: string; val: string }[] }
  | { type: 'divider' };

export type LabBlockType = LabBlock['type'];

export const BLOCK_LABELS: Record<LabBlockType, string> = {
  heading: 'Heading',
  paragraph: 'Paragraph',
  image: 'Image',
  quote: 'Quote',
  code: 'Code',
  list: 'List',
  metrics: 'Metrics',
  divider: 'Divider',
};

export function createBlock(type: LabBlockType): LabBlock {
  switch (type) {
    case 'heading': return { type: 'heading', level: 2, text: '' };
    case 'paragraph': return { type: 'paragraph', text: '' };
    case 'image': return { type: 'image', url: '', caption: '' };
    case 'quote': return { type: 'quote', text: '', attribution: '' };
    case 'code': return { type: 'code', code: '', language: '' };
    case 'list': return { type: 'list', ordered: false, items: [''] };
    case 'metrics': return { type: 'metrics', items: [{ label: '', val: '' }] };
    case 'divider': return { type: 'divider' };
  }
}

/** Stable, index-scoped anchor id for a heading (must match on editor + renderer). */
export function headingId(text: string, index: number): string {
  const base = text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return base ? `${base}-${index}` : `section-${index}`;
}

export interface TocEntry { id: string; text: string; level: 2 | 3; }

/** Build a table of contents from the heading blocks in a document. */
export function getToc(blocks: LabBlock[]): TocEntry[] {
  const toc: TocEntry[] = [];
  blocks.forEach((b, i) => {
    if (b.type === 'heading' && b.text.trim()) {
      toc.push({ id: headingId(b.text, i), text: b.text, level: b.level });
    }
  });
  return toc;
}

export function hasBlockContent(content: unknown): content is LabBlock[] {
  return Array.isArray(content) && content.length > 0;
}
