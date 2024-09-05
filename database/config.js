const mongoose = require('mongoose');
const User = require('../app/models/User');

mongoose.connect(process.env.URI)
    .then(() => {
        console.log('MongoDB connected successfully');

        /*const newUser = new User({
            name: 'Iva',
            email: 'iabnoooo.dooe@example.com',
            age: 30
        });

        return newUser.save();*/
    })
