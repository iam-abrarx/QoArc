import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

// This route is protected by middleware (admin session required).
const MAX_BYTES = 15 * 1024 * 1024; // 15 MB
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
  'video/mp4',
  'video/webm',
  'application/pdf',
]);

function safeExtension(name: string): string {
  const match = /\.([a-zA-Z0-9]{1,8})$/.exec(name || '');
  return match ? `.${match[1].toLowerCase()}` : '';
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.size === 0 || file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'File size out of allowed range' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    // Never trust the client-supplied filename for the stored key. Generate a
    // random name and keep only a validated extension. `addRandomSuffix` guards
    // against collisions as well.
    const key = `uploads/${crypto.randomUUID()}${safeExtension(file.name)}`;

    const blob = await put(key, file, {
      access: 'public',
      addRandomSuffix: true,
      contentType: file.type,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error('POST /api/upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
