// scripts/fetchUserName.js

const mongoose = require('mongoose');
const User = require('./userModel');

mongoose.connect('mongodb+srv://Duhang:[YOUR_PASSWORD]@cise.jgh9sxb.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    fetchUserName();
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

async function fetchUserName() {
    const userId = "651b95ee552de6a4341e01db";  // Your user's ID

    try {
        const user = await User.findById(userId);
        if (user) {
            console.log("User's name:", user.name);
        } else {
            console.log("User not found.");
        }
        // Close the database connection after fetching the name
        mongoose.connection.close();
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}