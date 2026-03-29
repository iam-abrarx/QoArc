import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const sql = getDb();
    const { id } = await params;
    const body = await request.json();

    await sql`UPDATE projects SET
      name = ${body.name}, client = ${body.client || null}, slug = ${body.slug || null},
      description = ${body.description}, category = ${body.category || null},
      industry = ${body.industry || null}, services = ${JSON.stringify(body.services || [])},
      year = ${body.year || null}, tech_stack = ${JSON.stringify(body.techStack || [])},
      hero_image = ${body.heroImage || null}, intro = ${body.intro || null},
      duration = ${body.duration || null}, scope = ${body.scope || null},
      platform = ${body.platform || null}, deliverables = ${JSON.stringify(body.deliverables || [])},
      team_role = ${body.teamRole || null}, challenge = ${body.challenge || null},
      goal = ${body.goal || null}, solution = ${body.solution || null},
      key_features = ${JSON.stringify(body.keyFeatures || [])},
      design_direction = ${body.designDirection || null}, outcome = ${body.outcome || null},
      image_url = ${body.imageUrl}, gallery_images = ${JSON.stringify(body.galleryImages || [])},
      mobile_mockups = ${JSON.stringify(body.mobileMockups || [])},
      tablet_mockups = ${JSON.stringify(body.tabletMockups || [])},
      desktop_mockups = ${JSON.stringify(body.desktopMockups || [])},
      video_url = ${body.videoUrl || null}, url = ${body.url || '#'},
      meta_title = ${body.metaTitle || null}, meta_description = ${body.metaDescription || null},
      is_featured = ${body.isFeatured || false}, status = ${body.status || 'published'},
      device_type = ${body.deviceType || 'desktop'}, primary_color = ${body.primaryColor || '#002046'},
      challenges = ${body.challenges || null}, solutions = ${body.solutions || null},
      stats = ${JSON.stringify(body.stats || [])}
    WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('PUT /api/projects/[id] error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const sql = getDb();
    const { id } = await params;
    await sql`DELETE FROM projects WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('DELETE /api/projects/[id] error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
