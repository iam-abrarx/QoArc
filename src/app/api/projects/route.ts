import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM projects ORDER BY created_at DESC`;

    // Map snake_case DB columns to camelCase for the frontend
    const projects = rows.map((r: any) => ({
      id: r.id,
      name: r.name,
      client: r.client,
      slug: r.slug,
      description: r.description,
      category: r.category,
      industry: r.industry,
      services: r.services || [],
      timeline: r.timeline,
      year: r.year,
      techStack: r.tech_stack || [],
      heroImage: r.hero_image,
      intro: r.intro,
      duration: r.duration,
      scope: r.scope,
      platform: r.platform,
      deliverables: r.deliverables || [],
      teamRole: r.team_role,
      challenge: r.challenge,
      goal: r.goal,
      solution: r.solution,
      keyFeatures: r.key_features || [],
      designDirection: r.design_direction,
      outcome: r.outcome,
      fullStory: r.full_story,
      imageUrl: r.image_url,
      galleryImages: r.gallery_images || [],
      mobileMockups: r.mobile_mockups || [],
      tabletMockups: r.tablet_mockups || [],
      desktopMockups: r.desktop_mockups || [],
      videoUrl: r.video_url,
      uiComponents: r.ui_components || [],
      systemDiagram: r.system_diagram,
      systemDiagramCaption: r.system_diagram_caption,
      testimonial: r.testimonial,
      impact: r.impact,
      relatedProjectIds: r.related_project_ids || [],
      url: r.url,
      metaTitle: r.meta_title,
      metaDescription: r.meta_description,
      ogImage: r.og_image,
      isFeatured: r.is_featured,
      isVisibleOnHome: r.is_visible_on_home,
      status: r.status,
      order: r.sort_order,
      deviceType: r.device_type,
      primaryColor: r.primary_color,
      challenges: r.challenges,
      solutions: r.solutions,
      stats: r.stats || [],
    }));

    return NextResponse.json(projects);
  } catch (error: any) {
    console.error('GET /api/projects error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const sql = getDb();
    const body = await request.json();
    const id = body.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    await sql`INSERT INTO projects (
      id, name, client, slug, description, category, industry, services, timeline, year,
      tech_stack, hero_image, intro, duration, scope, platform, deliverables, team_role,
      challenge, goal, solution, key_features, design_direction, outcome, full_story,
      image_url, gallery_images, mobile_mockups, tablet_mockups, desktop_mockups,
      video_url, ui_components, system_diagram, system_diagram_caption, testimonial,
      impact, related_project_ids, url, meta_title, meta_description, og_image,
      is_featured, is_visible_on_home, status, sort_order, device_type, primary_color,
      challenges, solutions, stats
    ) VALUES (
      ${id}, ${body.name}, ${body.client || null}, ${body.slug || null},
      ${body.description}, ${body.category || null}, ${body.industry || null},
      ${JSON.stringify(body.services || [])}, ${body.timeline || null}, ${body.year || null},
      ${JSON.stringify(body.techStack || [])}, ${body.heroImage || null}, ${body.intro || null},
      ${body.duration || null}, ${body.scope || null}, ${body.platform || null},
      ${JSON.stringify(body.deliverables || [])}, ${body.teamRole || null},
      ${body.challenge || null}, ${body.goal || null}, ${body.solution || null},
      ${JSON.stringify(body.keyFeatures || [])}, ${body.designDirection || null},
      ${body.outcome || null}, ${body.fullStory || null},
      ${body.imageUrl}, ${JSON.stringify(body.galleryImages || [])},
      ${JSON.stringify(body.mobileMockups || [])}, ${JSON.stringify(body.tabletMockups || [])},
      ${JSON.stringify(body.desktopMockups || [])}, ${body.videoUrl || null},
      ${JSON.stringify(body.uiComponents || [])}, ${body.systemDiagram || null},
      ${body.systemDiagramCaption || null}, ${body.testimonial ? JSON.stringify(body.testimonial) : null},
      ${body.impact || null}, ${JSON.stringify(body.relatedProjectIds || [])},
      ${body.url || '#'}, ${body.metaTitle || null}, ${body.metaDescription || null},
      ${body.ogImage || null}, ${body.isFeatured || false}, ${body.isVisibleOnHome !== false},
      ${body.status || 'published'}, ${body.order || 0}, ${body.deviceType || 'desktop'},
      ${body.primaryColor || '#002046'}, ${body.challenges || null}, ${body.solutions || null},
      ${JSON.stringify(body.stats || [])}
    )`;

    return NextResponse.json({ id }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/projects error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
