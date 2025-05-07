const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // ✅ Import bcrypt for password hashing
const User = require("../models/User");

const router = express.Router();

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Find user in database
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // ✅ Verify hashed password using bcrypt
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // ✅ Generate JWT token
        const token = jwt.sign(
            { id: user.idusers, email: user.email },
            "your_secret_key",
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token, userId: user.idusers });
    } catch (error) {
        res.status(500).json({ error: "Error logging in user" });
    }
};const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log("Received signup data:", { name, email, password }); // ✅ Debugging check

        // ✅ Check if the email is already registered
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use!" });
        }

        // ✅ Hash password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Save new user to database
        const newUser = await User.create({ name, email, password: hashedPassword });

        // ✅ Generate JWT token for immediate login
        const token = jwt.sign(
            { id: newUser.idusers, email: newUser.email },
            "your_secret_key",
            { expiresIn: "1h" }
        );

        res.status(201).json({ 
            message: "Signup successful! Logging in...",
            token, 
            userId: newUser.idusers 
        });

    } catch (error) {
        console.error("Signup error:", error); // ✅ Logs error details
        res.status(500).json({ error: "Error signing up user" });
    }
};
// ✅ Register routes
router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router;