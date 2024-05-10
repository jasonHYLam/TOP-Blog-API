const asyncHandler = require("express-async-handler");
const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
const he = require("he");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
require("dotenv").config();

exports.admin_login = [
  body("username").trim().escape(),
  body("password").trim().escape(),

  asyncHandler(async (req, res, next) => {
    if (req.body.username !== process.env.ADMIN_USERNAME)
      res.status(401).send({ success: false, message: "Not right username" });

    if (req.body.password !== process.env.ADMIN_PASSWORD)
      res.status(401).send({ success: false, message: "Not right password" });

    const user = await User.findOne({ username: req.body.username });
    if (!user)
      res.status(401).send({ success: false, message: "Invalid login" });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match)
      res.status(401).send({ success: false, message: "Incorrect password" });

    if (!user.admin_status)
      res.status(401).send({ success: false, message: "Not an admin!" });

    jwt.sign({ sub: user._id }, process.env.JWT_SECRET_KEY, (err, token) => {
      if (err) throw err;
      res
        .cookie("adminToken", token, {
          httpOnly: process.env.MODE === "prod",
          secure: process.env.MODE === "prod",
          sameSite: process.env.MODE === "prod" ? "none" : "lax",
        })
        .json({});
    });
  }),
];

exports.logout = asyncHandler(async (req, res, next) => {
  req.user = null;
  res
    .clearCookie("adminToken", {
      httpOnly: process.env.MODE === "prod",
      secure: process.env.MODE === "prod",
      sameSite: process.env.MODE === "prod" ? "none" : "lax",
    })
    .json();
});

exports.all_posts = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const allPosts = await Post.find({}).populate("author").exec();
  res.json({
    message: "Home get",
    allPosts,
    user,
  });
});

exports.create_post = [
  body("title").trim().escape(),
  body("content").trim().escape(),

  asyncHandler(async (req, res, next) => {
    const author = await User.findById(req.user._id);

    const post = new Post({
      title: he.decode(req.body.title),
      content: he.decode(req.body.content),
      date: Date(),
      author: author,
    });

    await post.save();
  }),
];

exports.blog_post = asyncHandler(async (req, res, next) => {
  const [blogPost, comments] = await Promise.all([
    await Post.findById(req.params.postid)
      .populate("author", "username")
      .exec(),
    await Comment.find({ post: req.params.postid })
      .populate("author", "username")
      .exec(),
  ]);

  res.json({
    blogPost,
    comments,
  });
});

exports.blog_post_update = [
  body("title").trim().escape(),
  body("content").trim().escape(),

  asyncHandler(async (req, res, next) => {
    await Post.findByIdAndUpdate(req.params.postid, {
      title: he.decode(req.body.title),
      content: he.decode(req.body.content),
    });

    const [blogPost, comments] = await Promise.all([
      await Post.findById(req.params.postid)
        .populate("author", "username")
        .exec(),
      await Comment.find({ post: req.params.postid })
        .populate("author", "username")
        .exec(),
    ]);

    res.json({
      blogPost,
      comments,
    });
  }),
];

exports.blog_post_change_publish = asyncHandler(async (req, res, next) => {
  const postToUpdate = await Post.findById(req.params.postid).exec();

  if (postToUpdate.published_status === false) {
    await Post.findByIdAndUpdate(req.params.postid, {
      published_status: true,
    });
  } else if (postToUpdate.published_status === true) {
    await Post.findByIdAndUpdate(req.params.postid, {
      published_status: false,
    });
  }
});

exports.blog_post_delete = asyncHandler(async (req, res, next) => {
  await Post.findByIdAndDelete(req.params.postid);
});
