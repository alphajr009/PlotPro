import express from 'express';
const route = express.Router();

// Import the User model (default export)
import users from '../models/userModel.js';

// Login route
route.post('/login', async (req, resp) => {
    console.log('login => login service invoked...');

    try {
        const { username, password } = req.body; 

        if (!username || !password) {
            console.log('login => Missing username or password');
            return resp.status(400).json({ message: 'Username and password are required' });
        }

        // Check for the user in the database
        const user = await users.findOne({ username, password });

        if (!user) {
            console.log('login => Invalid username or password');
            return resp.status(400).json({ message: 'Invalid username or password' });
        }

        console.log('login => User authenticated:', user.username);
        return resp.status(200).json({
            message: 'Login successful',
            username: user.username,
            status: user.status,
        });
    } catch (err) {
        console.error('login => An error occurred:', err.message);
        return resp.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Default export of the route
export default route;
