const { MongoClient } = require('mongodb');

const uri = process.env.URI;
const client = new MongoClient(uri);

async function getDatabase() {
    await client.connect();
    return client.db('korisnici');
}

async function findUserByUsername(name) {
    const db = await getDatabase();
    const users = db.collection('users');
    return users.findOne({ name });
}

async function findUserByEmail(email) {
    const db = await getDatabase();
    const users = db.collection('users');
    return users.findOne({ email });
}

async function createUser(user) {
    const db = await getDatabase();
    const users = db.collection('users');
    const result = await users.insertOne(user);
    return result;
}

module.exports = { findUserByUsername, findUserByEmail, createUser };