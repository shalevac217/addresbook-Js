const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving users' });
    }
};

// Get a user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user' });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
};

// Login function (JWT authentication)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user in database
        const user = await User.findOne({ where: { email } });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.idusers, email: user.email },
            'your_secret_key', // Replace with a secure key in `.env`
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token, userId: user.idusers });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in user' });
    }
};

module.exports = { getAllUsers, getUserById, createUser, deleteUser, loginUser };
