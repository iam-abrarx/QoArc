import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM job_openings ORDER BY created_at ASC`;
    const jobs = rows.map((r: any) => ({
      id: r.id,
      title: r.title,
      team: r.team,
      type: r.type,
      desc: r.description,
    }));
    return NextResponse.json(jobs);
  } catch (error: any) {
    console.error('GET /api/job-openings error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const sql = getDb();
    const body = await request.json();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    await sql`INSERT INTO job_openings (id, title, team, type, description)
      VALUES (${id}, ${body.title}, ${body.team}, ${body.type}, ${body.desc})`;

    return NextResponse.json({ id }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/job-openings error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
