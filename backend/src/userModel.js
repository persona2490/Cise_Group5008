// models/userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    // ... other fields if needed
});

module.exports = mongoose.model('User', userSchema);