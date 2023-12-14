require('dotenv').config();

const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body } = require('express-validator');
const bcrypt = require('bcryptjs');
// const passport = require('passport');
const jwt = require('jsonwebtoken');

// exports.home_get = asyncHandler(async (req, res, next) => {
//     res.json({
//         message: 'Home get'
//     })
// })


exports.signup_get = asyncHandler(async (req, res, next) => {

})

exports.signup_post = [

    body('username')
    .trim()
    .escape(),

    body('password')
    .trim()
    .escape(),

    asyncHandler(async (req, res, next) => {
        console.log(req.body)

        bcrypt.hash(req.body.password, 10, async( err, hashedPassword ) => {
            if (err) throw err;
            else {
                const user = new User({
                    username: req.body.username,
                    password: hashedPassword,
                })
                await user.save();
            }
        })
    })
]



exports.login_get = asyncHandler(async (req, res, next) => {

})

exports.login_post = asyncHandler(async (req, res, next) => {
    // authenticate user manually, which requires finding the user, and comparing password
    // requires req.user and req.password I believe
    // perhaps req.body.username and req.body.password
    console.log(req.body)

    try {
        const user = await User.findOne({ username: req.body.username })
        console.log(user)
        if (!user) {next(null, false, { message: 'incorrect username'})}

        const match = await bcrypt.compare(req.body.password, user.password);
        console.log(match)
        if (!match) {next(null, false, { message: 'incorrect password'})}

        next(null, user)

    } catch(err) {next(err)}
    
    console.log('validation passed')

    // jwt.sign({ user }, process.env.JWT_SECRET_KEY, ( err, token ) => {
    //     res.json(
    //         token
    //     )
    // })
})
