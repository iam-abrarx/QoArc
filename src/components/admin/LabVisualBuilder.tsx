"use client";

import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  Heading2, Heading3, Pilcrow, Image as ImageIcon, Quote, Code2,
  List as ListIcon, ListOrdered, BarChart3, Minus, ChevronUp, ChevronDown,
  Trash2, Plus, UploadCloud, Loader2, X, Calendar, Clock, Terminal,
} from 'lucide-react';
import { LabBlock, LabBlockType, BLOCK_LABELS, createBlock } from '@/lib/labBlocks';

type Notify = (message: string, type?: 'success' | 'error' | 'info') => void;

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

async function uploadImage(file: File, notify?: Notify): Promise<string | null> {
  if (!file.type.startsWith('image/')) { notify?.('Please choose an image file.', 'error'); return null; }
  if (file.size > MAX_IMAGE_BYTES) { notify?.('Image must be under 5MB.', 'error'); return null; }
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.url) throw new Error(data.error || 'Upload failed');
    return data.url as string;
  } catch (err: any) {
    notify?.(err?.message || 'Upload failed.', 'error');
    return null;
  }
}

/** Textarea that grows with its content and looks like the final rendered text. */
function AutoTextarea({
  value, onChange, placeholder, className = '',
}: { value: string; onChange: (v: string) => void; placeholder?: string; className?: string }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = '0px';
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);
  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-transparent resize-none overflow-hidden outline-none placeholder:text-primary/55 focus:bg-[#0047ff]/[0.03] transition-colors rounded-sm ${className}`}
    />
  );
}

const PALETTE: { type: LabBlockType; icon: React.ComponentType<{ size?: number }> }[] = [
  { type: 'heading', icon: Heading2 },
  { type: 'paragraph', icon: Pilcrow },
  { type: 'image', icon: ImageIcon },
  { type: 'quote', icon: Quote },
  { type: 'code', icon: Code2 },
  { type: 'list', icon: ListIcon },
  { type: 'metrics', icon: BarChart3 },
  { type: 'divider', icon: Minus },
];

/** Thin insert bar between blocks; expands into the block palette. */
function InsertBar({ open, onToggle, onInsert }: { open: boolean; onToggle: () => void; onInsert: (t: LabBlockType) => void }) {
  return (
    <div className="relative py-1 group/insert">
      {open ? (
        <div className="bg-white border border-[#0047ff]/30 shadow-lg p-2 grid grid-cols-4 gap-1.5 z-20 relative">
          {PALETTE.map(({ type, icon: Icon }) => (
            <button
              key={type}
              type="button"
              onClick={() => onInsert(type)}
              className="flex items-center gap-1.5 px-2.5 py-2 text-[10px] font-bold uppercase tracking-wider text-primary/60 hover:text-white hover:bg-[#0047ff] transition-all"
            >
              <Icon size={13} /> {BLOCK_LABELS[type]}
            </button>
          ))}
          <button type="button" onClick={onToggle} className="col-span-4 text-[9px] uppercase tracking-widest text-primary/55 hover:text-primary py-1">
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center gap-3 opacity-0 group-hover/insert:opacity-100 focus:opacity-100 transition-opacity"
        >
          <div className="flex-1 h-px bg-[#0047ff]/30" />
          <span className="w-6 h-6 flex items-center justify-center bg-[#0047ff] text-white rounded-full shadow"><Plus size={13} /></span>
          <div className="flex-1 h-px bg-[#0047ff]/30" />
        </button>
      )}
    </div>
  );
}

/** Floating per-block toolbar (appears on hover). */
function BlockToolbar({
  label, idx, count, onMove, onRemove, extra,
}: {
  label: string; idx: number; count: number;
  onMove: (dir: -1 | 1) => void; onRemove: () => void;
  extra?: React.ReactNode;
}) {
  return (
    <div className="absolute -top-3.5 right-2 z-10 hidden group-hover/block:flex items-center bg-white border border-primary/15 shadow-md text-primary/60">
      <span className="px-2.5 text-[8px] font-black uppercase tracking-[0.25em] text-[#0047ff] border-r border-primary/10">{label}</span>
      {extra}
      <button type="button" onClick={() => onMove(-1)} disabled={idx === 0} className="p-1.5 hover:bg-primary/5 disabled:opacity-20"><ChevronUp size={13} /></button>
      <button type="button" onClick={() => onMove(1)} disabled={idx === count - 1} className="p-1.5 hover:bg-primary/5 disabled:opacity-20"><ChevronDown size={13} /></button>
      <button type="button" onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-500 hover:text-white"><Trash2 size={13} /></button>
    </div>
  );
}

/** Click-to-upload image frame used by the cover and image blocks. */
function EditableImage({
  url, onUpload, onClear, notify, aspect = 'aspect-video', hint,
}: { url?: string; onUpload: (url: string) => void; onClear?: () => void; notify?: Notify; aspect?: string; hint: string }) {
  const [busy, setBusy] = useState(false);
  const handle = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    const uploaded = await uploadImage(file, notify);
    if (uploaded) onUpload(uploaded);
    setBusy(false);
  };
  if (!url) {
    return (
      <label className={`cursor-pointer ${aspect} w-full flex flex-col items-center justify-center gap-2 bg-primary/[0.03] border-2 border-dashed border-primary/15 hover:border-[#0047ff]/50 text-primary/50 hover:text-[#0047ff] transition-all`}>
        {busy ? <Loader2 size={26} className="animate-spin" /> : <UploadCloud size={26} />}
        <span className="text-[10px] uppercase tracking-widest font-bold">{busy ? 'Uploading…' : hint}</span>
        <input type="file" accept="image/*" className="hidden" disabled={busy} onChange={(e) => { handle(e.target.files?.[0]); e.target.value = ''; }} />
      </label>
    );
  }
  return (
    <div className={`relative ${aspect} w-full border border-primary/10 bg-primary/5 overflow-hidden group/img`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-primary/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-3">
        <label className="cursor-pointer bg-white text-primary px-4 py-2 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#0047ff] hover:text-white transition-colors">
          {busy ? <Loader2 size={13} className="animate-spin" /> : <UploadCloud size={13} />} Replace
          <input type="file" accept="image/*" className="hidden" disabled={busy} onChange={(e) => { handle(e.target.files?.[0]); e.target.value = ''; }} />
        </label>
        {onClear && (
          <button type="button" onClick={onClear} className="bg-white text-red-600 px-4 py-2 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-red-600 hover:text-white transition-colors">
            <X size={13} /> Remove
          </button>
        )}
      </div>
    </div>
  );
}

export interface LabArticleDraft {
  name?: string;
  category?: string;
  date?: string;
  readTime?: string;
  docId?: string;
  imageUrl?: string;
  content?: LabBlock[];
  [key: string]: any;
}

export default function LabVisualBuilder({
  item, onChange, notify,
}: { item: LabArticleDraft; onChange: (patch: Partial<LabArticleDraft>) => void; notify?: Notify }) {
  const blocks: LabBlock[] = Array.isArray(item.content) ? item.content : [];
  const [insertAt, setInsertAt] = useState<number | null>(null);

  const setBlocks = (next: LabBlock[]) => onChange({ content: next });
  const setBlock = (idx: number, b: LabBlock) => setBlocks(blocks.map((x, i) => (i === idx ? b : x)));
  const removeBlock = (idx: number) => setBlocks(blocks.filter((_, i) => i !== idx));
  const move = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= blocks.length) return;
    const next = [...blocks];
    [next[idx], next[j]] = [next[j], next[idx]];
    setBlocks(next);
  };
  const insert = (idx: number, type: LabBlockType) => {
    const next = [...blocks];
    next.splice(idx, 0, createBlock(type));
    setBlocks(next);
    setInsertAt(null);
  };

  // Numbered section prefix for level-2 headings, mirroring the public renderer.
  let h2Count = 0;

  const metaInput = 'bg-transparent outline-none focus:bg-[#0047ff]/[0.05] rounded-sm placeholder:text-primary/55';

  return (
    <div className="bg-white border border-primary/10 shadow-premium relative overflow-visible text-primary">
      {/* Paper top gradient — same as the public article */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary via-[#cc0000] to-primary z-10"></div>

      <div className="p-6 md:p-14 space-y-10">
        {/* Header — inline editable, mirrors the published header */}
        <div className="border-b border-primary/10 pb-8 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-[9px] font-bold tracking-widest text-primary/55 uppercase">
            <span>QOARC Research Publications</span>
            <span className="flex items-center gap-1">
              No.
              <input
                value={item.docId || ''}
                onChange={(e) => onChange({ docId: e.target.value })}
                placeholder="QOARC-2026-001"
                className={`${metaInput} w-40 uppercase`}
              />
            </span>
          </div>

          <AutoTextarea
            value={item.name || ''}
            onChange={(v) => onChange({ name: v.replace(/\n/g, ' ') })}
            placeholder="Article title…"
            className="text-4xl md:text-5xl font-display font-extrabold text-primary leading-tight"
          />

          <div className="pt-2 flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-bold text-primary/60 font-mono items-center">
            <span className="flex items-center gap-1.5 text-[#cc0000]">
              <input
                value={item.category || ''}
                onChange={(e) => onChange({ category: e.target.value })}
                placeholder="RESEARCH // GNN"
                className={`${metaInput} w-40 uppercase text-[#cc0000]`}
              />
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={12} className="text-[#cc0000]" />
              <input value={item.date || ''} onChange={(e) => onChange({ date: e.target.value })} placeholder="July 18, 2026" className={`${metaInput} w-28`} />
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-[#cc0000]" />
              <input value={item.readTime || ''} onChange={(e) => onChange({ readTime: e.target.value })} placeholder="5 min read" className={`${metaInput} w-24`} />
            </span>
            <span className="flex items-center gap-1.5"><Terminal size={12} className="text-[#cc0000]" /> AUTHOR: QOARC LABS</span>
          </div>
        </div>

        {/* Cover image */}
        <EditableImage
          url={item.imageUrl}
          onUpload={(url) => onChange({ imageUrl: url })}
          onClear={() => onChange({ imageUrl: '' })}
          notify={notify}
          hint="Add cover image"
        />

        {/* Blocks — edit in place */}
        <div>
          <InsertBar open={insertAt === 0} onToggle={() => setInsertAt(insertAt === 0 ? null : 0)} onInsert={(t) => insert(0, t)} />

          {blocks.length === 0 && (
            <p className="text-center text-primary/50 text-sm italic py-10">
              Empty article — hover above and press + to add your first block.
            </p>
          )}

          {blocks.map((block, idx) => {
            const chrome = 'relative group/block';
            let body: React.ReactNode = null;
            let extra: React.ReactNode = null;

            switch (block.type) {
              case 'heading': {
                if (block.level === 2) h2Count += 1;
                const num = String(h2Count).padStart(2, '0');
                extra = (
                  <button
                    type="button"
                    onClick={() => setBlock(idx, { ...block, level: block.level === 2 ? 3 : 2 })}
                    className="p-1.5 hover:bg-primary/5 border-r border-primary/10"
                    title="Toggle H2 / H3"
                  >
                    {block.level === 2 ? <Heading2 size={13} /> : <Heading3 size={13} />}
                  </button>
                );
                body = block.level === 3 ? (
                  <input
                    value={block.text}
                    onChange={(e) => setBlock(idx, { ...block, text: e.target.value })}
                    placeholder="Subheading…"
                    className={`${metaInput} w-full text-base font-display font-bold text-primary/90 pt-2`}
                  />
                ) : (
                  <div className="flex items-center gap-3 pt-6 border-t border-primary/5">
                    <span className="text-[#cc0000] font-mono text-xs shrink-0">{num} //</span>
                    <input
                      value={block.text}
                      onChange={(e) => setBlock(idx, { ...block, text: e.target.value })}
                      placeholder="Section heading…"
                      className={`${metaInput} w-full text-lg font-display font-bold text-primary`}
                    />
                  </div>
                );
                break;
              }

              case 'paragraph':
                body = (
                  <AutoTextarea
                    value={block.text}
                    onChange={(v) => setBlock(idx, { ...block, text: v })}
                    placeholder="Write… supports **bold**, *italic*, `code`, [links](https://…)"
                    className="text-lg text-primary/75 leading-relaxed font-sans"
                  />
                );
                break;

              case 'image':
                body = (
                  <figure className="space-y-2">
                    <EditableImage
                      url={block.url}
                      onUpload={(url) => setBlock(idx, { ...block, url })}
                      notify={notify}
                      hint="Upload image"
                    />
                    <input
                      value={block.caption || ''}
                      onChange={(e) => setBlock(idx, { ...block, caption: e.target.value })}
                      placeholder="Caption (optional)…"
                      className={`${metaInput} w-full text-xs text-primary/55 italic text-center`}
                    />
                  </figure>
                );
                break;

              case 'quote':
                body = (
                  <blockquote className="bg-[#cc0000]/5 border-l-2 border-[#cc0000] p-6 space-y-2">
                    <AutoTextarea
                      value={block.text}
                      onChange={(v) => setBlock(idx, { ...block, text: v })}
                      placeholder="Quote…"
                      className="text-lg text-primary/80 font-fraunces font-light italic leading-relaxed"
                    />
                    <input
                      value={block.attribution || ''}
                      onChange={(e) => setBlock(idx, { ...block, attribution: e.target.value })}
                      placeholder="— Attribution (optional)"
                      className={`${metaInput} w-full text-xs font-bold uppercase tracking-widest text-primary/50`}
                    />
                  </blockquote>
                );
                break;

              case 'code':
                body = (
                  <div className="bg-primary text-white/90 overflow-hidden">
                    <input
                      value={block.language || ''}
                      onChange={(e) => setBlock(idx, { ...block, language: e.target.value })}
                      placeholder="language"
                      className="w-full bg-transparent px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-white/60 border-b border-white/10 outline-none placeholder:text-white/40"
                    />
                    <AutoTextarea
                      value={block.code}
                      onChange={(v) => setBlock(idx, { ...block, code: v })}
                      placeholder={'// code…'}
                      className="p-5 text-sm font-mono leading-relaxed text-white/90 placeholder:text-white/40"
                    />
                  </div>
                );
                break;

              case 'list':
                extra = (
                  <button
                    type="button"
                    onClick={() => setBlock(idx, { ...block, ordered: !block.ordered })}
                    className="p-1.5 hover:bg-primary/5 border-r border-primary/10"
                    title="Toggle ordered / bullet"
                  >
                    {block.ordered ? <ListOrdered size={13} /> : <ListIcon size={13} />}
                  </button>
                );
                body = (
                  <div className="pl-2 space-y-1.5">
                    {block.items.map((it, j) => (
                      <div key={j} className="flex items-center gap-3 group/item">
                        <span className="text-[#cc0000] font-bold w-5 text-right shrink-0">{block.ordered ? `${j + 1}.` : '•'}</span>
                        <input
                          value={it}
                          onChange={(e) => setBlock(idx, { ...block, items: block.items.map((x, k) => (k === j ? e.target.value : x)) })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const items = [...block.items];
                              items.splice(j + 1, 0, '');
                              setBlock(idx, { ...block, items });
                            }
                          }}
                          placeholder="List item…"
                          className={`${metaInput} flex-1 text-lg text-primary/75`}
                        />
                        <button
                          type="button"
                          onClick={() => setBlock(idx, { ...block, items: block.items.filter((_, k) => k !== j) })}
                          className="opacity-0 group-hover/item:opacity-100 text-red-500 hover:text-red-700 shrink-0"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setBlock(idx, { ...block, items: [...block.items, ''] })}
                      className="text-[10px] font-bold uppercase tracking-widest text-[#0047ff] hover:underline flex items-center gap-1 pl-8"
                    >
                      <Plus size={11} /> Add item
                    </button>
                  </div>
                );
                break;

              case 'metrics':
                body = (
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {block.items.map((m, j) => (
                        <div key={j} className="relative bg-[#f8fafc] border border-primary/5 p-5 text-center shadow-sm group/metric">
                          <button
                            type="button"
                            onClick={() => setBlock(idx, { ...block, items: block.items.filter((_, k) => k !== j) })}
                            className="absolute top-1 right-1.5 text-red-500 opacity-0 group-hover/metric:opacity-100"
                          >
                            <X size={13} />
                          </button>
                          <input
                            value={m.label}
                            onChange={(e) => setBlock(idx, { ...block, items: block.items.map((x, k) => (k === j ? { ...x, label: e.target.value } : x)) })}
                            placeholder="LABEL"
                            className={`${metaInput} w-full text-[9px] font-bold uppercase tracking-widest text-primary/55 text-center mb-2`}
                          />
                          <input
                            value={m.val}
                            onChange={(e) => setBlock(idx, { ...block, items: block.items.map((x, k) => (k === j ? { ...x, val: e.target.value } : x)) })}
                            placeholder="99.9%"
                            className={`${metaInput} w-full text-3xl font-display font-bold text-primary text-center leading-none`}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setBlock(idx, { ...block, items: [...block.items, { label: '', val: '' }] })}
                      className="text-[10px] font-bold uppercase tracking-widest text-[#0047ff] hover:underline flex items-center gap-1"
                    >
                      <Plus size={11} /> Add metric
                    </button>
                  </div>
                );
                break;

              case 'divider':
                body = <hr className="border-t border-primary/10 my-4" />;
                break;
            }

            return (
              <React.Fragment key={idx}>
                <div className={`${chrome} -mx-3 px-3 py-1.5 border border-transparent hover:border-[#0047ff]/25 transition-colors`}>
                  <BlockToolbar
                    label={BLOCK_LABELS[block.type]}
                    idx={idx}
                    count={blocks.length}
                    onMove={(d) => move(idx, d)}
                    onRemove={() => removeBlock(idx)}
                    extra={extra}
                  />
                  {body}
                </div>
                <InsertBar
                  open={insertAt === idx + 1}
                  onToggle={() => setInsertAt(insertAt === idx + 1 ? null : idx + 1)}
                  onInsert={(t) => insert(idx + 1, t)}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
