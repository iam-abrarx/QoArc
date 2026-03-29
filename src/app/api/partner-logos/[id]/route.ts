import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const sql = getDb();
    const { id } = await params;
    await sql`DELETE FROM partner_logos WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('DELETE /api/partner-logos/[id] error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
