const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

exports.requireAuth = (req, res, next) => {

    console.log('checking cookies')
    console.log(req.cookies)
    let token = null;
    if (req.cookies) {
        if (req.cookies.token) token = req.cookies.token
        else if (req.cookies.adminToken) token = req.cookies.adminToken
    }
    console.log(`checking token: ${token}`)

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) return next() 

        try {
            const user = await User.findById(decoded.sub)
            req.user = user;
            next() 
        } catch {next()}
    })
}