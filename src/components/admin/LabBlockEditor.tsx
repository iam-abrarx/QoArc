"use client";

import React, { useState } from 'react';
import {
  Heading, Pilcrow, Image as ImageIcon, Quote, Code2, List as ListIcon,
  BarChart3, Minus, ChevronUp, ChevronDown, Trash2, Plus, GripVertical,
} from 'lucide-react';
import { LabBlock, LabBlockType, BLOCK_LABELS, createBlock } from '@/lib/labBlocks';
import { ImageInput } from '@/components/admin/ImageInput';

type Notify = (message: string, type?: 'success' | 'error' | 'info') => void;

const PALETTE: { type: LabBlockType; icon: React.ComponentType<{ size?: number }> }[] = [
  { type: 'heading', icon: Heading },
  { type: 'paragraph', icon: Pilcrow },
  { type: 'image', icon: ImageIcon },
  { type: 'quote', icon: Quote },
  { type: 'code', icon: Code2 },
  { type: 'list', icon: ListIcon },
  { type: 'metrics', icon: BarChart3 },
  { type: 'divider', icon: Minus },
];

const inputCls = 'w-full bg-bg-dark border border-white/5 rounded-none px-4 py-3 focus:border-accent-blue outline-none text-sm text-white';

export default function LabBlockEditor({
  blocks,
  onChange,
  notify,
}: {
  blocks: LabBlock[];
  onChange: (next: LabBlock[]) => void;
  notify?: Notify;
}) {
  const [addingAt, setAddingAt] = useState<number | null>(null);

  const setBlock = (idx: number, next: LabBlock) => onChange(blocks.map((b, i) => (i === idx ? next : b)));
  const removeBlock = (idx: number) => onChange(blocks.filter((_, i) => i !== idx));
  const move = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= blocks.length) return;
    const next = [...blocks];
    [next[idx], next[j]] = [next[j], next[idx]];
    onChange(next);
  };
  const insertAt = (idx: number, type: LabBlockType) => {
    const next = [...blocks];
    next.splice(idx, 0, createBlock(type));
    onChange(next);
    setAddingAt(null);
  };

  const AddBar = ({ index }: { index: number }) => (
    <div className="relative">
      {addingAt === index ? (
        <div className="bg-bg-dark border border-accent-blue/30 p-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PALETTE.map(({ type, icon: Icon }) => (
            <button
              key={type}
              type="button"
              onClick={() => insertAt(index, type)}
              className="flex items-center gap-2 px-3 py-2.5 text-[11px] font-black uppercase tracking-wider text-white/70 hover:text-white bg-white/5 hover:bg-accent-blue transition-all"
            >
              <Icon size={14} /> {BLOCK_LABELS[type]}
            </button>
          ))}
          <button type="button" onClick={() => setAddingAt(null)} className="col-span-2 sm:col-span-4 text-[10px] uppercase tracking-widest text-white/40 hover:text-white py-1">
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAddingAt(index)}
          className="w-full flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-accent-blue border border-dashed border-white/10 hover:border-accent-blue/40 transition-all"
        >
          <Plus size={12} /> Add block
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-3">
      <AddBar index={0} />

      {blocks.map((block, idx) => (
        <div key={idx} className="space-y-3">
          <div className="bg-bg-dark/60 border border-white/10 group">
            {/* Block toolbar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 bg-white/[0.02]">
              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent-blue">
                <GripVertical size={13} className="text-white/20" /> {BLOCK_LABELS[block.type]}
              </span>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => move(idx, -1)} disabled={idx === 0} className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-all"><ChevronUp size={14} /></button>
                <button type="button" onClick={() => move(idx, 1)} disabled={idx === blocks.length - 1} className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-all"><ChevronDown size={14} /></button>
                <button type="button" onClick={() => removeBlock(idx)} className="p-1.5 text-red-500/70 hover:text-white hover:bg-red-500 transition-all"><Trash2 size={14} /></button>
              </div>
            </div>

            {/* Block body */}
            <div className="p-4">
              <BlockBody block={block} onChange={(b) => setBlock(idx, b)} notify={notify} />
            </div>
          </div>

          <AddBar index={idx + 1} />
        </div>
      ))}

      {blocks.length === 0 && (
        <p className="text-center text-white/30 text-xs py-6 italic">No content blocks yet. Add your first block above.</p>
      )}
    </div>
  );
}

function BlockBody({ block, onChange, notify }: { block: LabBlock; onChange: (b: LabBlock) => void; notify?: Notify }) {
  switch (block.type) {
    case 'heading':
      return (
        <div className="flex gap-3">
          <select
            value={block.level}
            onChange={(e) => onChange({ ...block, level: Number(e.target.value) as 2 | 3 })}
            className="bg-bg-dark border border-white/5 px-3 py-3 text-sm text-white outline-none focus:border-accent-blue"
          >
            <option value={2}>H2</option>
            <option value={3}>H3</option>
          </select>
          <input
            value={block.text}
            onChange={(e) => onChange({ ...block, text: e.target.value })}
            placeholder="Heading text…"
            className={`${inputCls} font-display font-bold text-lg`}
          />
        </div>
      );

    case 'paragraph':
      return (
        <textarea
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
          placeholder="Write a paragraph… supports **bold**, *italic*, `code`, and [links](https://…)"
          className={`${inputCls} min-h-[120px] leading-relaxed`}
        />
      );

    case 'image':
      return (
        <div className="space-y-3">
          <ImageInput label="Image" value={block.url} onChange={(url) => onChange({ ...block, url })} notify={notify} previewClass="w-32 h-24" />
          <input value={block.caption || ''} onChange={(e) => onChange({ ...block, caption: e.target.value })} placeholder="Caption (optional)" className={inputCls} />
        </div>
      );

    case 'quote':
      return (
        <div className="space-y-3">
          <textarea value={block.text} onChange={(e) => onChange({ ...block, text: e.target.value })} placeholder="Quote text…" className={`${inputCls} min-h-[90px] italic`} />
          <input value={block.attribution || ''} onChange={(e) => onChange({ ...block, attribution: e.target.value })} placeholder="Attribution (optional)" className={inputCls} />
        </div>
      );

    case 'code':
      return (
        <div className="space-y-3">
          <input value={block.language || ''} onChange={(e) => onChange({ ...block, language: e.target.value })} placeholder="Language (e.g. python, ts)" className={`${inputCls} font-mono`} />
          <textarea value={block.code} onChange={(e) => onChange({ ...block, code: e.target.value })} placeholder="Code…" className={`${inputCls} min-h-[140px] font-mono text-xs`} spellCheck={false} />
        </div>
      );

    case 'list':
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-white/60 cursor-pointer">
              <input type="checkbox" checked={block.ordered} onChange={(e) => onChange({ ...block, ordered: e.target.checked })} className="accent-accent-blue w-4 h-4" />
              Ordered (numbered)
            </label>
          </div>
          {block.items.map((item, j) => (
            <div key={j} className="flex gap-2">
              <span className="text-white/30 text-sm py-3 w-5 text-right">{block.ordered ? `${j + 1}.` : '•'}</span>
              <input
                value={item}
                onChange={(e) => onChange({ ...block, items: block.items.map((it, k) => (k === j ? e.target.value : it)) })}
                placeholder="List item…"
                className={inputCls}
              />
              <button type="button" onClick={() => onChange({ ...block, items: block.items.filter((_, k) => k !== j) })} className="px-3 text-red-500 hover:text-white hover:bg-red-500 transition-all">×</button>
            </div>
          ))}
          <button type="button" onClick={() => onChange({ ...block, items: [...block.items, ''] })} className="text-[10px] font-black uppercase tracking-widest text-accent-blue hover:text-white flex items-center gap-1.5">
            <Plus size={12} /> Add item
          </button>
        </div>
      );

    case 'metrics':
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {block.items.map((m, j) => (
              <div key={j} className="flex flex-col gap-2 p-3 bg-bg-dark border border-white/5 relative group/metric">
                <button type="button" onClick={() => onChange({ ...block, items: block.items.filter((_, k) => k !== j) })} className="absolute top-1 right-2 text-red-500 opacity-0 group-hover/metric:opacity-100 font-bold">×</button>
                <input value={m.val} onChange={(e) => onChange({ ...block, items: block.items.map((it, k) => (k === j ? { ...it, val: e.target.value } : it)) })} placeholder="Value (99.9%)" className="bg-transparent border-b border-white/10 py-1 text-xl font-display text-accent-blue outline-none" />
                <input value={m.label} onChange={(e) => onChange({ ...block, items: block.items.map((it, k) => (k === j ? { ...it, label: e.target.value } : it)) })} placeholder="Label" className="bg-transparent text-[10px] uppercase tracking-widest text-white/60 outline-none" />
              </div>
            ))}
          </div>
          <button type="button" onClick={() => onChange({ ...block, items: [...block.items, { label: '', val: '' }] })} className="text-[10px] font-black uppercase tracking-widest text-accent-blue hover:text-white flex items-center gap-1.5">
            <Plus size={12} /> Add metric
          </button>
        </div>
      );

    case 'divider':
      return <div className="text-center text-white/20 text-xs uppercase tracking-widest py-2">— Section divider —</div>;

    default:
      return null;
  }
}
