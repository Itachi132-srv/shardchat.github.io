const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { email, username, displayName, password } = req.body;

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            username,
            displayName,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: "Account created successfully", userId: savedUser._id });
    } catch (err) {
        res.status(500).json({ error: "Email or username already exists." });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) return res.status(404).json({ error: "Account not found." });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: "Incorrect email or password." });

        // Create JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { httpOnly: true, secure: true }).json({
            message: "Logged in successfully",
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

