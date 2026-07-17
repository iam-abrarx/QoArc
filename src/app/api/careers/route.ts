import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { getDb } from '@/lib/db';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Kept under the platform serverless request-body cap (~4.5 MB) since the CV
// arrives base64-encoded inline. The client enforces a 3 MB file limit.
const MAX_CV_BYTES = 4 * 1024 * 1024;
const CV_TYPES: Record<string, string> = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
};

// Store an applicant CV (data URL) to Vercel Blob and return its asset record.
async function storeCv(dataUrl: string, fileName: string | undefined) {
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
  if (!match) return { error: 'Invalid CV file.' as const };

  const mime = match[1];
  const b64 = match[2];
  const ext = CV_TYPES[mime];
  if (!ext) return { error: 'CV must be a PDF or Word document.' as const };

  const size = Math.floor((b64.length * 3) / 4);
  if (size > MAX_CV_BYTES) return { error: 'CV file is too large.' as const };

  const buffer = Buffer.from(b64, 'base64');
  // Random, unguessable key. Vercel Blob URLs are public but the random suffix
  // keeps them from being enumerable.
  const blob = await put(`cvs/${crypto.randomUUID()}${ext}`, buffer, {
    access: 'public',
    addRandomSuffix: true,
    contentType: mime,
  });

  return {
    asset: {
      id: Date.now().toString(),
      name: (fileName || `cv${ext}`).slice(0, 200),
      url: blob.url,
      size,
    },
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const name = String(body?.name ?? '').trim();
    const email = String(body?.email ?? '').trim();
    const role = String(body?.role ?? '').trim();
    const videoUrl = String(body?.videoUrl ?? '').trim();

    if (!name || !email || !role) {
      return NextResponse.json(
        { success: false, error: 'Name, email and role are required.' },
        { status: 400 },
      );
    }
    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json(
        { success: false, error: 'A valid email is required.' },
        { status: 400 },
      );
    }

    const assets: unknown[] = [];
    if (body?.cvFile && typeof body.cvFile === 'string') {
      const result = await storeCv(body.cvFile, body?.cvFileName);
      if ('error' in result) {
        return NextResponse.json({ success: false, error: result.error }, { status: 400 });
      }
      assets.push(result.asset);
    }

    const sql = getDb();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const message = `Application for ${role.slice(0, 200)}\nVideo Introduction: ${videoUrl.slice(0, 500) || 'N/A'}`;

    await sql`INSERT INTO contact_submissions (id, name, email, company, phone, service, message, assets)
      VALUES (
        ${id}, ${name.slice(0, 200)}, ${email}, ${'N/A'}, ${'N/A'},
        ${`[CAREERS]: ${role.slice(0, 180)}`}, ${message}, ${JSON.stringify(assets)}
      )`;

    return NextResponse.json(
      { success: true, id, message: 'Application securely transmitted to recruitment nodes.' },
      { status: 201 },
    );
  } catch (error) {
    console.error('POST /api/careers error:', error);
    return NextResponse.json({ success: false, error: 'Transmission failure.' }, { status: 500 });
  }
}
