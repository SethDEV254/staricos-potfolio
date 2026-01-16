const mongoose = require('mongoose');

const connectDB = async () => {
  // Skip database connection if no URI is provided
  if (!process.env.MONGODB_URI) {
    console.log('⚠️  MongoDB URI not provided - running without database');
    console.log('✅ Site will work, but contact form won\'t save to database');
    return null;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log('⚠️  Continuing without database - site will still work');
    return null;
  }
};

module.exports = connectDB;
