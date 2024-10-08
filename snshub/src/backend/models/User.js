// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure unique email
    password: { type: String, required: true },
    role:{type:String}
});

const User = mongoose.model('User', userSchema);
module.exports = User;
