// backend/config/db.js
const mongoose = require('mongoose');
const User = require('../models/User');

const adminCredentials = {
  name: 'Admin',
  email: 'admin@gmail.com',
  password: '1234',  // Hardcoded admin password
  isAdmin: true,
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Check if admin already exists
    const admin = await User.findOne({ email: adminCredentials.email });

    if (admin) {
      console.log('Admin already exists');
    } else {
      // Create admin
      const createdAdmin = await User.create(adminCredentials);
      if (createdAdmin) {
        console.log('Admin registered successfully');
      }
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
