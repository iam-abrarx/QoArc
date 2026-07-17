"use client";

import React, { useState } from 'react';
import { UploadCloud, Loader2, X, ImageOff, Plus } from 'lucide-react';

type Notify = (message: string, type?: 'success' | 'error' | 'info') => void;

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('/api/upload', { method: 'POST', body: formData });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.url) throw new Error(data.error || 'Upload failed');
  return data.url as string;
}

function validImage(file: File, notify?: Notify): boolean {
  if (!file.type.startsWith('image/')) {
    notify?.('Please choose an image file.', 'error');
    return false;
  }
  if (file.size > MAX_IMAGE_BYTES) {
    notify?.('Image must be under 5MB.', 'error');
    return false;
  }
  return true;
}

/** Small square/landscape thumbnail that previews an image URL with graceful fallbacks. */
function Thumb({ url, fit = 'cover', className = '' }: { url?: string; fit?: 'cover' | 'contain'; className?: string }) {
  const [broken, setBroken] = useState(false);
  React.useEffect(() => { setBroken(false); }, [url]);

  if (!url) {
    return (
      <div className={`flex items-center justify-center bg-bg-dark border border-dashed border-white/15 text-white/25 ${className}`}>
        <ImageOff size={22} />
      </div>
    );
  }
  if (broken) {
    return (
      <div className={`flex flex-col items-center justify-center gap-1 bg-bg-dark border border-dashed border-red-500/30 text-red-400/70 text-[9px] font-bold uppercase tracking-wider ${className}`}>
        <ImageOff size={20} />
        <span>Invalid URL</span>
      </div>
    );
  }
  return (
    <div className={`bg-bg-dark border border-white/10 overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt="preview"
        onError={() => setBroken(true)}
        className={`w-full h-full ${fit === 'contain' ? 'object-contain p-2' : 'object-cover'}`}
      />
    </div>
  );
}

interface ImageInputProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  notify?: Notify;
  fit?: 'cover' | 'contain';
  /** Preview box size classes. */
  previewClass?: string;
  required?: boolean;
  hint?: React.ReactNode;
}

/** A single image field: live preview + URL input + inline upload + clear. */
export function ImageInput({
  label,
  value,
  onChange,
  placeholder = 'https://… or upload',
  notify,
  fit = 'cover',
  previewClass = 'w-28 h-24',
  required,
  hint,
}: ImageInputProps) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file?: File) => {
    if (!file || !validImage(file, notify)) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      onChange(url);
      notify?.('Image uploaded.', 'success');
    } catch (err: any) {
      notify?.(err?.message || 'Upload failed.', 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black flex items-center gap-2">
          {label} {hint}
        </label>
      )}
      <div className="flex gap-4">
        <Thumb url={value} fit={fit} className={`${previewClass} flex-shrink-0 rounded-none`} />
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <input
            type="text"
            value={value}
            required={required}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-bg-dark border border-white/5 rounded-none px-4 py-3 focus:border-accent-blue outline-none text-xs text-white"
          />
          <div className="flex items-center gap-2">
            <label className="cursor-pointer bg-accent-blue/10 hover:bg-accent-blue hover:text-white text-accent-blue px-4 py-2.5 rounded-none font-black transition-all flex items-center justify-center gap-2 border border-accent-blue/20 tracking-widest text-[10px] uppercase">
              {uploading ? <Loader2 size={13} className="animate-spin" /> : <UploadCloud size={13} />}
              {uploading ? 'Uploading' : 'Upload'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={(e) => { handleFile(e.target.files?.[0]); e.target.value = ''; }}
              />
            </label>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-3 py-2.5 rounded-none text-[10px] uppercase tracking-widest font-black text-white/50 hover:text-white bg-white/5 hover:bg-red-500/80 border border-white/5 transition-all flex items-center gap-1.5"
              >
                <X size={12} /> Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ImageArrayInputProps {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  notify?: Notify;
  fit?: 'cover' | 'contain';
  columns?: 1 | 2 | 3;
}

/** A repeatable grid of image fields (gallery, mockups). Each card previews,
 * uploads/replaces, and removes; a footer button appends new slots. */
export function ImageArrayInput({ label, values, onChange, notify, fit = 'cover', columns = 2 }: ImageArrayInputProps) {
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

  const update = (idx: number, val: string) => onChange(values.map((v, i) => (i === idx ? val : v)));
  const remove = (idx: number) => onChange(values.filter((_, i) => i !== idx));
  const addEmpty = () => onChange([...values, '']);

  const uploadInto = async (idx: number, file?: File, append = false) => {
    if (!file || !validImage(file, notify)) return;
    setUploadingIdx(append ? -2 : idx);
    try {
      const url = await uploadFile(file);
      if (append) onChange([...values, url]);
      else update(idx, url);
      notify?.('Image uploaded.', 'success');
    } catch (err: any) {
      notify?.(err?.message || 'Upload failed.', 'error');
    } finally {
      setUploadingIdx(null);
    }
  };

  const gridCols = columns === 3 ? 'md:grid-cols-3' : columns === 1 ? 'grid-cols-1' : 'md:grid-cols-2';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <label className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-black">{label}</label>
        <span className="text-[10px] text-white/40 font-bold">{values.length} item{values.length === 1 ? '' : 's'}</span>
      </div>

      <div className={`grid grid-cols-1 ${gridCols} gap-4`}>
        {values.map((img, idx) => (
          <div key={idx} className="bg-bg-dark/60 border border-white/5 p-3 space-y-2 group">
            <Thumb url={img} fit={fit} className="w-full aspect-video rounded-none" />
            <input
              type="text"
              value={img}
              onChange={(e) => update(idx, e.target.value)}
              placeholder="Image URL…"
              className="w-full bg-bg-dark border border-white/5 px-3 py-2 outline-none text-[11px] text-white focus:border-accent-blue"
            />
            <div className="flex items-center gap-2">
              <label className="flex-1 cursor-pointer bg-accent-blue/10 hover:bg-accent-blue hover:text-white text-accent-blue px-3 py-2 rounded-none font-black transition-all flex items-center justify-center gap-1.5 border border-accent-blue/20 tracking-widest text-[9px] uppercase">
                {uploadingIdx === idx ? <Loader2 size={12} className="animate-spin" /> : <UploadCloud size={12} />}
                {uploadingIdx === idx ? 'Uploading' : 'Replace'}
                <input type="file" accept="image/*" className="hidden" disabled={uploadingIdx !== null}
                  onChange={(e) => { uploadInto(idx, e.target.files?.[0]); e.target.value = ''; }} />
              </label>
              <button type="button" onClick={() => remove(idx)}
                className="w-9 h-9 flex items-center justify-center text-red-500 bg-red-500/5 hover:bg-red-500 hover:text-white rounded-none transition-all flex-shrink-0">
                <X size={14} />
              </button>
            </div>
          </div>
        ))}

        {/* Upload-to-add tile */}
        <label className="cursor-pointer flex flex-col items-center justify-center gap-2 aspect-video min-h-[120px] bg-bg-dark/30 border-2 border-dashed border-white/10 hover:border-accent-blue/40 text-white/40 hover:text-accent-blue transition-all">
          {uploadingIdx === -2 ? <Loader2 size={24} className="animate-spin" /> : <UploadCloud size={24} />}
          <span className="text-[9px] uppercase tracking-widest font-black">{uploadingIdx === -2 ? 'Uploading' : 'Upload image'}</span>
          <input type="file" accept="image/*" className="hidden" disabled={uploadingIdx !== null}
            onChange={(e) => { uploadInto(-1, e.target.files?.[0], true); e.target.value = ''; }} />
        </label>
      </div>

      <button type="button" onClick={addEmpty}
        className="text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-accent-blue flex items-center gap-1.5 transition-colors">
        <Plus size={12} /> Add URL manually
      </button>
    </div>
  );
}
