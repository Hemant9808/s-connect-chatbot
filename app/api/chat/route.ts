// import { NextResponse } from 'next/server';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import connectDB, { connectToDatabase } from '@/lib/mongodb';
// import File from '@/models/File';


// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
// const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });


// export async function getAllCollectionsData() {
//   try {
//     const db = await connectToDatabase();
//     const collections = await db.connection.db.listCollections().toArray();

//     let data:any = {};

//     for (let col of collections) {
//       const model = db.connection.db.collection(col.name);
//       data[col.name] = await model.find({}).toArray(); // Fetch all documents
//     }
//     // console.log('Collections data:', data); 

//     return data;
//   } catch (error) {
//     console.error("Error fetching collections:", error);
//     throw new Error("Failed to fetch collections");
//   }
// }



// export async function POST(req: Request) {
//   try {
//     const { message } = await req.json();

//     // Connect to MongoDB
//     await connectDB();


//     const data =await getAllCollectionsData()
//     // console.log('Collections data:', data); 
//     const processedData =JSON.stringify(data);
//     console.log('Collections data:', processedData); 

//     // Fetch all files from the database
//     const files = await File.find({});
//     // console.log('Files:', files);
    
//     // Create context from files
//     const fileContext = files.map(file => `${file.title}:\n${file.content}`).join('\n\n');

//     // Create the prompt
//     const prompt = `You are a helpful assistant that can answer questions based on both general knowledge and the following documents:\n\n${processedData}\n\nWhen answering questions, first check if the information is available in the provided documents. If it is, use that information. If not, use your general knowledge.\n\nUser question: ${message}`;

//     // Generate response
//     const result = await model.generateContent(prompt);
//     // console.log('Gemini Response:', result);
//     const response = result.response;
//     const text = response.text().trim(); 

//     return NextResponse.json({ 
//       response: text
//     });
//   } catch (error: any) {
//     console.error('Error details:', error);
//     return NextResponse.json(
//       { 
//         error: error.message || 'Failed to process your request',
//         details: error.stack
//       },
//       { status: 500 }
//     );
//   }
// } 








import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import connectDB, { connectToDatabase } from '@/lib/mongodb';
import File from '@/models/File';

// Initialize AI model
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// ✅ Move `getAllCollectionsData` outside of exports
async function getAllCollectionsData() {
  try {
    const db = await connectToDatabase();
    const collections = await db.connection.db.listCollections().toArray();

    let data: any = {};

    for (let col of collections) {
      const model = db.connection.db.collection(col.name);
      data[col.name] = await model.find({}).toArray(); // Fetch all documents
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw new Error("Failed to fetch collections");
  }
}

// ✅ Only export HTTP methods
export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Connect to MongoDB
    await connectDB();

    // ✅ Call getAllCollectionsData properly
    const data = await getAllCollectionsData();
    const processedData = JSON.stringify(data);
    console.log('Collections data:', processedData);

    // Fetch all files from the database
    const files = await File.find({});
    
    // Create context from files
    const fileContext = files.map(file => `${file.title}:\n${file.content}`).join('\n\n');

    // Create the prompt
    const prompt = `You are a helpful assistant that can answer questions based on both general knowledge and the following documents:\n\n${processedData}\n\nWhen answering questions, first check if the information is available in the provided documents. If it is, use that information. If not, use your general knowledge.\n\nUser question: ${message}`;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text().trim();

    return NextResponse.json({ response: text });
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
