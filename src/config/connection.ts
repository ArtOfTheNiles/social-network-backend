import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

if(!process.env.DB_URL) {
  throw new Error('DB_URL is not defined! Please check your environment variables.');
}

try {
  mongoose.connect(process.env.DB_URL);
} catch (error) {
  console.error('Failed to connect to Mongo Database:', error);
}

export default mongoose.connection;
