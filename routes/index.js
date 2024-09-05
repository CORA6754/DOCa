const express = require('express');
const { findUserByUsername, createUser, findUserByEmail } = require('../database/config');
const router = express.Router();
const userController  = require("../app/controllers/UserController")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');









const User = require('../app/models/User'); // Prilagodite putanju



router.post('/a', userController.register);


router.post('/register', async (req, res) => {
    const { name, password, email } = req.body;

    if (!name || !password) {
        return res.status(400).json({ message: 'name and password are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await findUserByUsername(name);
        if (existingUser) {
            return res.status(400).json({ message: 'name already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the new user to the database
        const newUser = await createUser({ name, password: hashedPassword, email });

        // Create a JWT
        const token = jwt.sign({ userId: newUser.insertedId }, 'secret', { expiresIn: '1h' });

        // Send the JWT back to the client
        res.status(201).json({ message: "Uspesno ste se registrovali" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Retrieve the user by email
        const user = await findUserByEmail(email); // Change this to your function that finds by email
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create a JWT
        const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });

        // Send the JWT back to the client
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
