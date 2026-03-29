import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM contact_submissions ORDER BY submitted_at DESC`;
    const submissions = rows.map((r: any) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      company: r.company,
      phone: r.phone,
      service: r.service,
      message: r.message,
      date: r.submitted_at ? new Date(r.submitted_at).toLocaleString() : '',
      assets: r.assets || [],
    }));
    return NextResponse.json(submissions);
  } catch (error: any) {
    console.error('GET /api/submissions error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const sql = getDb();
    const body = await request.json();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    await sql`INSERT INTO contact_submissions (id, name, email, company, phone, service, message, assets)
      VALUES (${id}, ${body.name}, ${body.email}, ${body.company || null}, ${body.phone || null}, ${body.service || null}, ${body.message}, ${JSON.stringify(body.assets || [])})`;

    return NextResponse.json({ id }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/submissions error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
