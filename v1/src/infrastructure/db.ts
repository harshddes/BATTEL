// import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/zeroaccess');
    console.log('Demo mode: Skipping MongoDB connection');
    console.log('Note: Data will not persist between sessions');
  } catch (err) {
    console.error('DB connection error:', err);
    process.exit(1);
  }
}; 