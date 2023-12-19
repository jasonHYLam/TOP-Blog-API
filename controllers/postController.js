const asyncHandler = require('express-async-handler');
const passport = require('passport');
const Post = require('../models/post');
const Comment = require('../models/comment');

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

    passport.authenticate('jwt', {session: false}),

    console.log('looking for COOKIES')
    console.log(req.cookies)
    // example postid: 656df059c219a1d542f440a1
    const [ post, comments] = await Promise.all([
        Post.findById(req.params.postid).exec(),
        Comment.find({post: req.params.postid})
    ])

    res.json({
        post,
        comments,
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
