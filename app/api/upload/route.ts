import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import File from '@/models/File';

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const file = await File.create({
      title,
      content,
    });

    return NextResponse.json({ 
      message: 'File uploaded successfully',
      file 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
} 