const asyncHandler = require('express-async-handler');
const { body } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.admin_login = [

    body('username').trim().escape(),
    body('password').trim().escape(),

    asyncHandler(async (req, res, next) => {
        // need to check admin password. set admin password in .env
        // use bcrypt to compare

        console.log(req.body)

        // const user = await User.findOne({})



    })

]
