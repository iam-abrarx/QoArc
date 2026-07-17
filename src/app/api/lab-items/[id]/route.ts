import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const sql = getDb();
    const { id } = await params;
    const body = await request.json();

    const { name, node, ...rest } = body;
    const jsonDesc = JSON.stringify({
      ...rest,
      slug: rest.slug || id,
      desc: rest.desc || rest.description || ''
    });

    await sql`UPDATE lab_items SET
      name = ${name}, description = ${jsonDesc}, node = ${node || null}
    WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('PUT /api/lab-items/[id] error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const sql = getDb();
    const { id } = await params;
    await sql`DELETE FROM lab_items WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('DELETE /api/lab-items/[id] error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
