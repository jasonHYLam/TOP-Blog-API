
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

exports.home_get = asyncHandler(async (req, res, next) => {
    res.json({
        message: 'Home get'
    })

})


exports.signup_get = asyncHandler(async (req, res, next) => {

})

exports.signup_post = asyncHandler(async (req, res, next) => {

})

exports.login_get = asyncHandler(async (req, res, next) => {

})

exports.login_post = asyncHandler(async (req, res, next) => {

})
