const mongoose = require('mongoose');
const User = require('../app/models/User'); // Putanja do userModel.js

const uri = 'mongodb+srv://cora:6AZqlDugB3SsenBu@cluster0.ng2bv.mongodb.net/korisnici?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully to the database "korisnici"');

    // Kreiramo novog korisnika
    const newUser = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30
    });

    // Čuvamo korisnika u kolekciji 'users'
    return newUser.save();
  })
  .then(() => {
    console.log('User successfully saved');
    mongoose.connection.close(); // Zatvorimo konekciju kada završimo
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.connection.close(); // Zatvorimo konekciju u slučaju greške
  });
