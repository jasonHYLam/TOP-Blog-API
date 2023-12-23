const asyncHandler = require('express-async-handler');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Post = require('../models/post');
require('dotenv').config();

exports.admin_login = [

    body('username').trim().escape(),
    body('password').trim().escape(),

    asyncHandler(async (req, res, next) => {
        // need to check admin password. set admin password in .env
        // use bcrypt to compare

        console.log(req.body)
        // may need to check for an admin status
        // now, how do i create this adminUser? i could potentially do something like populatedb.js

        if (req.body.username !== process.env.ADMIN_USERNAME) res.status(401).send({ success: false, message: 'Not right username'});

        if (req.body.password !== process.env.ADMIN_PASSWORD) res.status(401).send({ success: false, message: 'Not right password'});

        const user = await User.findOne({username: req.body.username})
        if (!user) res.status(401).send({ success: false, message: 'Invalid login'});

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) res.status(401).send({ success: false, message: 'Incorrect password'})



        if (!user.admin_status) res.status(401).send({ success: false, message: 'Not an admin!!'});

        // may need to sign a cookie at this stage
        jwt.sign({ sub: user._id }, process.env.JWT_SECRET_KEY, ( err, token ) => {
            if (err) throw err;
            console.log('lets see the token eh')
            console.log(token)
            res.cookie('adminToken', token, {httpOnly: true})
            .json({
                message: 'yatta...'
            })
        })
        // res.json() required to conditionally end fetch request
    })

]

exports.all_posts = asyncHandler(async (req, res, next) => {
    console.log(req.user)
    const user = req.user
    const allPosts = await Post.find({}).exec()
    res.json({
        message: 'Home get',
        allPosts,
        user,
    })
})

exports.create_post = asyncHandler(async (req, res, next) => {
    // console.log('checking req body')
    // console.log(req.body)
    console.log('ai no')
})