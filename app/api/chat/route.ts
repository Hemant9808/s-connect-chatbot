import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import connectDB from '@/lib/mongodb';
import File from '@/models/File';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Connect to MongoDB
    await connectDB();

    // Fetch all files from the database
    const files = await File.find({});
    
    // Create context from files
    const fileContext = files.map(file => `${file.title}:\n${file.content}`).join('\n\n');

    // Create the prompt
    const prompt = `You are a helpful assistant that can answer questions based on both general knowledge and the following documents:\n\n${fileContext}\n\nWhen answering questions, first check if the information is available in the provided documents. If it is, use that information. If not, use your general knowledge.\n\nUser question: ${message}`;

    // Generate response
    const result = await model.generateContent(prompt);
    console.log('Gemini Response:', result);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ 
      response: text
    });
  } catch (error: any) {
    console.error('Error details:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to process your request',
        details: error.stack
      },
      { status: 500 }
    );
  }
} 