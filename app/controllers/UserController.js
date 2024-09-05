const User = require('../models/User');

const register = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const newUser = new User({
            name: password,
            email: email,
            age: 30
        });

        // Save the new user to the database
        await newUser.save();

        // Send a response with a status code of 201 (Created)
        res.status(201).send(newUser);
    } catch (error) {
        // Handle errors, such as validation errors or database connection issues
        console.error('Error creating user:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = {
    register,
};
