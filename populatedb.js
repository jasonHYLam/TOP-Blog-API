#! /usr/bin/env node

require('dotenv').config();

const Comment = require('./models/comment');
const Post = require('./models/post');
const User = require('./models/user');

const comments = [];
const posts = [];
const users = [];

const mongoose = require('mongoose');
const { post } = require('./routes');
mongoose.set('strictQuery', false);

const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));

async function main() {
    console.log('Debug: About to connect');
    await mongoose.connect(mongoDB);
    console.log('Debug: Should be connected');
    await createUsers();
    await createPosts();
    await createComments();
    await createChildComments();
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

async function postCreate( index, title, text) {
    const post = new Post({
        title,
        text,
        date: Date(),
        likes: 0,
    });
    await post.save();
    posts[index] = post;
    console.log(`Added post: ${title}`);
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

async function commentCreate( index, text, author, post, parentComment) {
    const comment = new Comment({
        text,
        author,
        post,
        parentComment,
        timeStamp: Date(),
    });
    await comment.save();
    comments[index] = comment;
    console.log(`Added comment: ${text}`);
}

async function createComments() {
    await Promise.all([
        commentCreate(0,
            "This is the worst post I've ever seen.",
            users[1],
            posts[0],
            null,
            ),

        commentCreate(1,
            "Now this is what I'm talking about!",
            users[1],
            posts[1],
            ),
    ])
}

async function createChildComments() {
    await Promise.all([
        commentCreate(2,
            "Test child comment. Please work.",
            users[1],
            null,
            comments[0],
            )
    ])
}