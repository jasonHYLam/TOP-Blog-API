const asyncHandler = require('express-async-handler');
const Post = require('../models/post');
const Comment = require('../models/comment');
require('dotenv').config();

exports.home_get = asyncHandler(async (req, res, next) => {
    console.log(req.user)
    const user = req.user
    const allPosts = await Post.find({}).populate('author', 'username').exec()
    res.json({
        message: 'Home get',
        allPosts,
        user,
    })
})

exports.post_get = asyncHandler(async (req, res, next) => {

    const user = req.user;

    // example postid: 656df059c219a1d542f440a1
    const [ post, comments ] = await Promise.all([
        await Post.findById(req.params.postid).populate('author', 'username').exec(),
        await Comment.find({post: req.params.postid}).populate('author', 'username').exec(),
    ])

    res.json({
        post,
        comments,
        user,
    })
})
