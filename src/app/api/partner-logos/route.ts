import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM partner_logos ORDER BY created_at ASC`;
    const logos = rows.map((r: any) => ({
      id: r.id,
      url: r.url,
      alt: r.alt,
      isWide: r.is_wide,
    }));
    return NextResponse.json(logos);
  } catch (error: any) {
    console.error('GET /api/partner-logos error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const sql = getDb();
    const body = await request.json();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    await sql`INSERT INTO partner_logos (id, url, alt, is_wide)
      VALUES (${id}, ${body.url}, ${body.alt}, ${body.isWide || false})`;

    return NextResponse.json({ id }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/partner-logos error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
