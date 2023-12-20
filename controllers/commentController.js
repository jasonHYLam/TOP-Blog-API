const Comment = require('../models/comment');
const User = require('../models/user');
const Post = require('../models/post');
const asyncHandler = require('express-async-handler');

exports.comment_post = asyncHandler(async (req, res, next) => {

    console.log('checking out req.user for comment POST')
    console.log(req.user)

    console.log('checking out req.body')
    console.log(req.body)

    const author = await User.findOne({ username: 'marine' }).exec();
    console.log(author)
    // const post = await Post.findById(req.params.postid).exec();
    // console.log(req.params)
    // console.log(req.params.postid)
    // // for some reason, unable to access post. i can access req.params
    // console.log(post)

    // const newComment = new Comment({
    //     text: "testing new commento",
    //     author,
    //     post,
    //     timeStamp: Date(),
    // });

    // await newComment.save();

    // const comments = await Comment.find({ post: req.params.postid}).exec();

    // // res.json({
    // //     message: 'On your way'
    // // })
    // res.json({
    //     message: 'Added new comment',
    //     post,
    //     comments,
    // })
})

exports.comment_delete = asyncHandler(async (req, res, next) => {
    // how would i get the comment to delete? also, would i delete a comment in the post page?
    const postId = req.params.postid;
    const commentId = req.params.commentid;
    await Comment.findByIdAndDelete(commentId);

    const [ post, comments ] = await Promise.all([
        await Post.findById(postId).exec(),
        await Comment.find({ post: postId }).exec(),
    ])

    res.json({
        message: 'Deleted a comment I guess',
        post,
        comments,
    })

})

exports.comment_update = asyncHandler(async (req, res, next) => {

    // get post and comment 
    await Comment.findByIdAndUpdate(req.params.commentid, {
        text: 'Updated this comment, hahaha'
    })

    const [ post, comments ] = await Promise.all([
        await Post.findById(req.params.postid).exec(),
        await Comment.findById(req.params.commentid).exec(),
    ]);

    res.json({
        message: 'Updated a comment I guess',
        post,
        comments
    })
})