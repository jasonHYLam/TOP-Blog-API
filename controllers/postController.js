
const { verify } = require('jsonwebtoken');
const Post = require('../models/post');
const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');

// function getToken(req, res, next) {
//     const bearerAuth = req.headers['authorization'];
//     if (bearerAuth) {
//         const bearerToken = bearerAuth.split(' ')[1];
//         req.token = bearerToken;
//         return next();
//     }
//     res.sendStatus(403);
// }

exports.home_get = asyncHandler(async (req, res, next) => {
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

    console.log('anything to console log?')
    console.log(req.params.postid)
    // example postid: 656df059c219a1d542f440a1
    const [ post, comments] = await Promise.all([
        Post.findById(req.params.postid).exec(),
        Comment.find({post: req.params.postid})

        // Comment.aggregate({from: 'comment'})
    ])

    res.json({
        post,
        comments,
    })
})

exports.post_delete = asyncHandler(async (req, res, next) => {

})

exports.post_update = asyncHandler(async (req, res, next) => {

})
