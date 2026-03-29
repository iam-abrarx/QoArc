import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM testimonials ORDER BY created_at ASC`;
    const testimonials = rows.map((r: any) => ({
      id: r.id,
      company: r.company,
      logoColor: r.logo_color,
      authorName: r.author_name,
      authorTitle: r.author_title,
      authorImage: r.author_image,
      authorLinkedin: r.author_linkedin,
      rating: r.rating,
      content: r.content,
    }));
    return NextResponse.json(testimonials);
  } catch (error: any) {
    console.error('GET /api/testimonials error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const sql = getDb();
    const body = await request.json();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    await sql`INSERT INTO testimonials (id, company, logo_color, author_name, author_title, author_image, author_linkedin, rating, content)
      VALUES (${id}, ${body.company}, ${body.logoColor || 'text-[#0047AB]'}, ${body.authorName}, ${body.authorTitle || null}, ${body.authorImage || null}, ${body.authorLinkedin || '#'}, ${body.rating || 5}, ${body.content})`;

    return NextResponse.json({ id }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/testimonials error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
