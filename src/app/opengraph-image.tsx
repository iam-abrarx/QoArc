import { ImageResponse } from 'next/og';

export const alt = 'QOARC — Architecting Autonomous Intelligence';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Default social share card, applied site-wide via the file convention.
// Individual routes can still override with their own openGraph.images.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #001028 0%, #002046 55%, #0b1a3a 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 20, height: 20, background: '#0047ff', borderRadius: 4 }} />
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 8 }}>QOARC</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, maxWidth: 940 }}>
            Architecting Autonomous Intelligence
          </div>
          <div style={{ fontSize: 30, color: 'rgba(255,255,255,0.65)', maxWidth: 900 }}>
            AI product studio — intelligent SaaS, automation, and end-to-end software.
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, color: 'rgba(255,255,255,0.5)' }}>
          <div style={{ width: 60, height: 3, background: '#0047ff' }} />
          www.qoarc.com
        </div>
      </div>
    ),
    { ...size },
  );
}
