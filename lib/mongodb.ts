import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }
    
    // if (mongoose.connection.readyState >= 1) {
      // console.log('MongoDB is already connected');
    //   return;
    // }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB is already connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export default connectDB; 



const DATABASE_URL = process.env.MONGODB_URI;

if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable");
}
//@ts-ignore
let cached = global.mongoose;

if (!cached) {
  //@ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect("mongodb+srv://hemant9808:ySEEecsHJArJfzfA@mydb.ovbqzxf.mongodb.net/sharda", {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
