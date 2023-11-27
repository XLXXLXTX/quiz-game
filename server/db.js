/* define and configure db connection and create methods for queries */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {

    // load db uri for mongoose connection 
    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.zmy1u5t.mongodb.net/${process.env.MONGODB_DB}`;

    console.log(uri)
    await mongoose.connect(uri);

    console.log('✅ Connected to MongoDB! ');
  } catch (error) {
    console.error('❌ Error in the connection :', error);
  }
};

module.exports = { connectDB };
