const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

exports.requireAuth = (req, res, next) => {

    console.log('checking cookies')
    console.log(req.cookies)
    let token = null;
    if (req.cookies && req.cookies.token) token = req.cookies.token
    console.log(`checking token: ${token}`)

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) return next() 
        console.log('checking out decoded token')
        console.log(decoded)

        try {
            const user = await User.findById(decoded.sub)
            console.log('checking out user')
            console.log(user)
            req.user = user;
            next() 
        } catch {next()}
    })
}

exports.requireAdminAuth = (req, res, next) => {

    console.log('checking cookies')
    console.log(req.cookies)
    let token = null;
    if (req.cookies && req.cookies.adminToken) token = req.cookies.adminToken
    console.log(`checking token: ${token}`)

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) return next() 
        console.log('checking out decoded token')
        console.log(decoded)

        try {
            const user = await User.findById(decoded.sub)
            console.log('checking out user')
            console.log(user)
            req.user = user;
            next() 
        } catch {next()}
    })
}