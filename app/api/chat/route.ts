import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import connectDB from '@/lib/mongodb';
import File from '@/models/File';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Connect to MongoDB
    await connectDB();

    // Fetch all files from the database
    const files = await File.find({});
    
    // Create context from files
    const fileContext = files.map(file => `${file.title}:\n${file.content}`).join('\n\n');

    // Create messages array with system message and context
    const messages = [
      {
        role: 'system',
        content: `You are a helpful assistant that can answer questions based on both general knowledge and the following documents:\n\n${fileContext}\n\nWhen answering questions, first check if the information is available in the provided documents. If it is, use that information. If not, use your general knowledge.`
      },
      {
        role: 'user',
        content: message
      }
    ];

    // Get response from OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages as any,
    });

    return NextResponse.json({ 
      response: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
} 