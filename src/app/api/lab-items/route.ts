import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM lab_items ORDER BY created_at ASC`;
    const items = rows.map((r: any) => {
      try {
        const parsed = JSON.parse(r.description);
        return {
          id: r.id,
          name: r.name,
          node: r.node || '',
          ...parsed
        };
      } catch {
        // Fallback for non-JSON text descriptions in DB
        return {
          id: r.id,
          name: r.name,
          node: r.node || '',
          desc: r.description || '',
          slug: r.id,
          category: 'RESEARCH',
          date: 'July 17, 2026',
          readTime: '5 min read',
          imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
          featured: false,
          type: 'research',
          docId: 'QOARC-2026-GEN',
          abstract: r.description || '',
          metrics: [],
          motivation: '',
          methodology: '',
          tech: [],
          results: '',
          arxiv: '',
          license: 'Open source research under Apache 2.0 license'
        };
      }
    });
    return NextResponse.json(items);
  } catch (error: any) {
    console.error('GET /api/lab-items error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const sql = getDb();
    const body = await request.json();
    const id = body.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const { name, node, ...rest } = body;
    const jsonDesc = JSON.stringify({
      ...rest,
      slug: rest.slug || id,
      desc: rest.desc || rest.description || ''
    });

    await sql`INSERT INTO lab_items (id, name, description, node)
      VALUES (${id}, ${name}, ${jsonDesc}, ${node || null})`;

    return NextResponse.json({ id }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/lab-items error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
