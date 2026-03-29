import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const sql = getDb();
    const { id } = await params;
    const body = await request.json();

    await sql`UPDATE testimonials SET
      company = ${body.company}, logo_color = ${body.logoColor || 'text-[#0047AB]'},
      author_name = ${body.authorName}, author_title = ${body.authorTitle || null},
      author_image = ${body.authorImage || null}, author_linkedin = ${body.authorLinkedin || '#'},
      rating = ${body.rating || 5}, content = ${body.content}
    WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('PUT /api/testimonials/[id] error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const sql = getDb();
    const { id } = await params;
    await sql`DELETE FROM testimonials WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('DELETE /api/testimonials/[id] error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
