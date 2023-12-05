
require('dotenv').config();

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');



// exports.home_get = asyncHandler(async (req, res, next) => {
//     res.json({
//         message: 'Home get'
//     })
// })


exports.signup_get = asyncHandler(async (req, res, next) => {

})

exports.signup_post = asyncHandler(async (req, res, next) => {

})

exports.login_get = asyncHandler(async (req, res, next) => {

})

exports.login_post = asyncHandler(async (req, res, next) => {
    // authenticate user manually, which requires finding the user, and comparing password
    // requires req.user and req.password I believe
    // perhaps req.body.username and req.body.password

    // try {
    //     const user = await User.findOne({ })

    // }
    const user = await User.findOne({ username: 'haachama' });

    jwt.sign({ user }, process.env.JWT_SECRET_KEY, ( err, token ) => {
        res.json(
            token
        )
    })
})