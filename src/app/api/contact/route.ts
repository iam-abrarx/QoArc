import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const name = String(body?.name ?? '').trim();
    const email = String(body?.email ?? '').trim();
    const message = String(body?.message ?? '').trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email and message are required.' },
        { status: 400 },
      );
    }
    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json(
        { success: false, error: 'A valid email is required.' },
        { status: 400 },
      );
    }

    const sql = getDb();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    await sql`INSERT INTO contact_submissions (id, name, email, company, phone, service, message, assets)
      VALUES (
        ${id}, ${name.slice(0, 200)}, ${email}, ${body?.company ? String(body.company).slice(0, 200) : null},
        ${body?.phone ? String(body.phone).slice(0, 50) : null},
        ${body?.service ? String(body.service).slice(0, 200) : null},
        ${message.slice(0, 5000)}, ${JSON.stringify(Array.isArray(body?.assets) ? body.assets : [])}
      )`;

    return NextResponse.json(
      { success: true, id, message: 'Brief securely transmitted to architectural node.' },
      { status: 201 },
    );
  } catch (error) {
    console.error('POST /api/contact error:', error);
    return NextResponse.json({ success: false, error: 'Transmission failure.' }, { status: 500 });
  }
}
