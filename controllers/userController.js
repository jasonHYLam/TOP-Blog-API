require("dotenv").config();

const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup_post = [
  body("username").trim().escape(),

  body("password").trim().escape(),

  asyncHandler(async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) throw err;
      else {
        const user = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        await user.save();
      }
    });
  }),
];

exports.login_post = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user)
    res
      .status(401)
      .send({ success: false, message: "Incorrect username/password" });

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!user || !match)
    res
      .status(401)
      .send({ success: false, message: "Incorrect username/password" });

  jwt.sign({ sub: user._id }, process.env.JWT_SECRET_KEY, (err, token) => {
    if (err) {
      res.send({ msg: err });
    }

    res
      .cookie("token", token, {
        httpOnly: process.env.MODE === "prod",
        secure: process.env.MODE === "prod",
        sameSite: process.env.MODE === "prod" ? "none" : "lax",
      })
      .json({});
  });
});

exports.log_out = asyncHandler(async (req, res, next) => {
  req.user = null;
  res
    .clearCookie("token", {
      httpOnly: process.env.MODE === "prod",
      secure: process.env.MODE === "prod",
      sameSite: process.env.MODE === "prod" ? "none" : "lax",
    })
    .json({ message: "heh" });
});
