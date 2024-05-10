const Comment = require("../models/comment");
const User = require("../models/user");
const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

exports.comment_post = asyncHandler(async (req, res, next) => {
  const author = await User.findOne({ username: req.user.username }).exec();
  const post = await Post.findById(req.params.postid).exec();

  const newComment = new Comment({
    text: req.body.comment,
    author,
    post,
    timeStamp: Date(),
  });

  await newComment.save();

  res.json({
    message: "Added new comment",
    post,
  });
});

exports.comment_delete = asyncHandler(async (req, res, next) => {
  const postId = req.params.postid;
  const commentId = req.params.commentid;
  await Comment.findByIdAndDelete(commentId);

  const [post, comments] = await Promise.all([
    await Post.findById(postId).exec(),
    await Comment.find({ post: postId }).exec(),
  ]);

  res.json({
    message: "Deleted a comment I guess",
    post,
    comments,
  });
});

exports.comment_update = asyncHandler(async (req, res, next) => {
  await Comment.findByIdAndUpdate(req.params.commentid, {
    text: "Updated this comment, hahaha",
  });

  const [post, comments] = await Promise.all([
    await Post.findById(req.params.postid).exec(),
    await Comment.findById(req.params.commentid).exec(),
  ]);

  res.json({
    message: "Updated a comment I guess",
    post,
    comments,
  });
});
