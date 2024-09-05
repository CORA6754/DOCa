const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definišemo šemu za korisnike
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Kreiramo model na osnovu šeme i eksplicitno navodimo naziv kolekcije 'korisnici'
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
