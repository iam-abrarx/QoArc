import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // In a real application, you would send this to your HR system (e.g., Workday, Lever)
    // or a database. For now, we simulate a successful transmission.
    console.log('--- NEW CAREERS APPLICATION ---');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Data:', {
      name: data.name,
      email: data.email,
      role: data.role,
      videoUrl: data.videoUrl,
      cvSize: data.cvFile ? `${(data.cvFile.length * (3/4) / 1024 / 1024).toFixed(2)} MB (Base64)` : 'None'
    });
    console.log('-------------------------------');

    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({ 
      success: true, 
      message: 'Application securely transmitted to recruitment nodes.' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Transmission failure.' },
      { status: 500 }
    );
  }
}
