const asyncHandler = require('express-async-handler');
const passport = require('passport');
const Post = require('../models/post');
const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.home_get = asyncHandler(async (req, res, next) => {
    console.log(req.user)
    const user = req.user
    const allPosts = await Post.find({}).exec()
    res.json({
        message: 'Home get',
        allPosts,
        user,
    })
})

exports.post_get = asyncHandler(async (req, res, next) => {

    console.log('got the blog post page')
    // first i need to get the token from the cookie
    // console.log(req.cookies)
    const user = req.user;
    console.log(`checking out req.user for post get`)
    console.log(user)

    // example postid: 656df059c219a1d542f440a1
    const [ post, comments ] = await Promise.all([
        await Post.findById(req.params.postid).exec(),
        await Comment.find({post: req.params.postid}).populate('author').exec(),
    ])

    res.json({
        post,
        comments,
        user,
    })
})
