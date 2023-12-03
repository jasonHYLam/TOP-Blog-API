#! /usr/bin/env node

require('dotenv').config();

const Comment = require('./models/comment');
const Post = require('./models/post');
const User = require('./models/user');

const comments = [];
const posts = [];
const users = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));

async function main() {
    console.log('Debug: About to connect');
    await mongoose.connect(mongoDB);
    console.log('Debug: Should be connected');
    // await createComments();
    // await createPosts();
    await createUsers();
    console.log('Debug: Closing mongoose');
    mongoose.connection.close();
    console.log('Debug: ');

}

async function userCreate( index, username, password ) {
    const user = new User({
        username,
        password,
    });
    await user.save();
    users[index] = user;
    console.log(`Added user: ${username}`);
}

async function createUsers() {
    console.log('Adding users');
    await Promise.all([
        userCreate(0, 'haachama', 'a'),
        userCreate(0, 'coco', 'a'),
        userCreate(0, 'marine', 'a'),
    ])
}

