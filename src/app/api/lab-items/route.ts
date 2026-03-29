import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM lab_items ORDER BY created_at ASC`;
    const items = rows.map((r: any) => ({
      id: r.id,
      name: r.name,
      desc: r.description,
      node: r.node,
    }));
    return NextResponse.json(items);
  } catch (error: any) {
    console.error('GET /api/lab-items error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const sql = getDb();
    const body = await request.json();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    await sql`INSERT INTO lab_items (id, name, description, node)
      VALUES (${id}, ${body.name}, ${body.desc}, ${body.node || null})`;

    return NextResponse.json({ id }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/lab-items error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
