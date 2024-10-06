const express = require('express');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model
const router = express.Router();

// JWT Secret
const JWT_SECRET = '1dFkklKjg++349rJKLmYH$#!Ufy19sl%j09Blm2#KaLi'; // Use a secure secret in production

// Signup Route

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password,role } = req.body;
  try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword ,role: role || 'user',});
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
      // Log the error for debugging
      console.error('Registration error:', error);

      // Return a more specific error message
      if (error.code === 11000) { // Duplicate key error
          return res.status(400).json({ error: 'Email already exists' });
      }
      
      res.status(500).json({ error: 'Error registering user' });
  }
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request body

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user }); // Send token and user info as response
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
});


///fetch all users
const adminAuthMiddleware = (req, res, next) => {
    
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded,"??????????????")
        // if (decoded.role !== 'admin') {
        //     return res.status(403).json({ error: 'Access denied. Admins only' });
        // }
         req.user = decoded; // Attach user data to the request object
        next(); // Allow the request to proceed
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

// Route to fetch all users (admin only)
router.get('/users', adminAuthMiddleware, async (req, res) => {
    try {
        const users = await User.find({}, 'username email role'); // Fetch all users, limit fields to prevent exposing passwords
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Server error' });
    }
});













module.exports = router;
