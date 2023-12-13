require('dotenv').config();

const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body } = require('express-validator');
const bcrypt = require('bcryptjs');

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
        console.log('I assume this is gonna work...')
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

    // try {
    //     const user = await User.findOne({ })

    // }
    console.log('looking through a glass onion')
    // const user = await User.findOne({ username: 'haachama' });

    // jwt.sign({ user }, process.env.JWT_SECRET_KEY, ( err, token ) => {
    //     res.json(
    //         token
    //     )
    // })
})
