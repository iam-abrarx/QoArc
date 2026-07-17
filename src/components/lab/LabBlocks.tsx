"use client";

import React from 'react';
import { LabBlock, headingId } from '@/lib/labBlocks';
import { renderInline } from '@/lib/sanitize';

/** Renders a Lab article's block document in the academic-paper theme. */
export default function LabBlocks({ blocks }: { blocks: LabBlock[] }) {
  let headingCount = 0;

  return (
    <div className="space-y-10">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading': {
            headingCount += 1;
            const id = headingId(block.text, i);
            const num = String(headingCount).padStart(2, '0');
            if (block.level === 3) {
              return (
                <h3 key={i} id={id} className="scroll-mt-28 text-base font-display font-bold text-primary/90 pt-2">
                  {block.text}
                </h3>
              );
            }
            return (
              <h2 key={i} id={id} className="scroll-mt-28 text-lg font-display font-bold text-primary flex items-center gap-3 pt-8 border-t border-primary/5 first:border-0 first:pt-0">
                <span className="text-[#cc0000] font-mono text-xs">{num} //</span> {block.text}
              </h2>
            );
          }

          case 'paragraph':
            return (
              <p
                key={i}
                className="text-lg text-primary/75 leading-relaxed font-sans"
                dangerouslySetInnerHTML={{ __html: renderInline(block.text) }}
              />
            );

          case 'image':
            return (
              <figure key={i} className="space-y-3">
                <div className="border border-primary/10 bg-primary/5 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={block.url} alt={block.caption || ''} className="w-full h-auto object-cover" />
                </div>
                {block.caption && (
                  <figcaption className="text-xs text-primary/40 font-sans italic text-center">{block.caption}</figcaption>
                )}
              </figure>
            );

          case 'quote':
            return (
              <blockquote key={i} className="bg-[#cc0000]/5 border-l-2 border-[#cc0000] p-6 md:p-8 space-y-3">
                <p
                  className="text-lg text-primary/80 font-fraunces font-light italic leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderInline(block.text) }}
                />
                {block.attribution && (
                  <cite className="block text-xs font-bold uppercase tracking-widest text-primary/50 not-italic">— {block.attribution}</cite>
                )}
              </blockquote>
            );

          case 'code':
            return (
              <div key={i} className="bg-primary text-white/90 overflow-hidden shadow-premium">
                {block.language && (
                  <div className="px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-white/40 border-b border-white/10">
                    {block.language}
                  </div>
                )}
                <pre className="p-5 overflow-x-auto text-sm font-mono leading-relaxed"><code>{block.code}</code></pre>
              </div>
            );

          case 'list':
            return React.createElement(
              block.ordered ? 'ol' : 'ul',
              { key: i, className: `${block.ordered ? 'list-decimal' : 'list-disc'} pl-6 space-y-2 text-lg text-primary/75 font-sans marker:text-[#cc0000]` },
              block.items.filter((it) => it.trim()).map((item, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
              )),
            );

          case 'metrics':
            return (
              <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {block.items.filter((m) => m.label || m.val).map((m, j) => (
                  <div key={j} className="bg-[#f8fafc] border border-primary/5 p-6 text-center shadow-sm">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-primary/40 mb-2">{m.label}</div>
                    <div className="text-3xl font-display font-bold text-primary leading-none">{m.val}</div>
                  </div>
                ))}
              </div>
            );

          case 'divider':
            return <hr key={i} className="border-t border-primary/10" />;

          default:
            return null;
        }
      })}
    </div>
  );
}
