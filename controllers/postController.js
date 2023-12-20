const asyncHandler = require('express-async-handler');
const passport = require('passport');
const Post = require('../models/post');
const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.home_get = asyncHandler(async (req, res, next) => {
    console.log(req.user)
    const allPosts = await Post.find({}).exec()
    res.json({
        message: 'Home get',
        allPosts
    })
})

exports.post_form_get = [
    asyncHandler(async (req, res, next) => {
        res.json({
            message: 'morning all'
        })
    })
]
exports.post_form_post = asyncHandler(async (req, res, next) => {

})

exports.post_get = asyncHandler(async (req, res, next) => {

    // first i need to get the token from the cookie
    console.log(req.cookies)
    const user = req.user;
    console.log(user)

    // example postid: 656df059c219a1d542f440a1
    const [ post, comments] = await Promise.all([
        Post.findById(req.params.postid).exec(),
        Comment.find({post: req.params.postid}).populate('author'),
    ])

    res.json({
        post,
        comments,
        user,
    })
})

exports.post_delete = asyncHandler(async (req, res, next) => {
    await Post.findByIdAndDelete(req.params.postid);
    const allPosts = await Post.find().exec();

    res.json({
        message: 'Prey eliminated',
        allPosts,
    })
})

exports.post_update = asyncHandler(async (req, res, next) => {

})

