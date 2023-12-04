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

async function postCreate( index, title, text, comments, date, likes) {
    const post = new Post({
        title,
        text,
        comments: [],
        date: Date(),
        likes: 0,
    });
    await post.save();
    posts[index] = post;
    console.log(`Added user: ${title}`);
}

async function createPosts() {
    console.log('Adding posts');
    await Promise.all([
        postCreate(0,
            'First Blog Post',
            'Gonna try time travelling, will update you in the next post!',
            ),

        postCreate(1,
            'Welcome to lovetown',
            'Tom and Merry are the heroes of Lovetown!',
            ),
    ])
}

async function commentCreate( index, text, author, childComments, timeStamp) {
    const user = new User({
        username,
        password,
    });
    await user.save();
    users[index] = user;
    console.log(`Added user: ${username}`);
}
