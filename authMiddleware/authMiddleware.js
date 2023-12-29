const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

// To access public routes, the normal token is used.
// To access admin routes, the adminToken is required.

// This checks req.cookies and the token attached to it (from res.cookie method)
// If req.cookies.token exists, then verify it with jwt.verify, and attach the
// corresponding user to req.user
exports.requireAuth = (req, res, next) => {

    let token = null;
    if (req.cookies && req.cookies.token) token = req.cookies.token

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) return next() 

        try {
            const user = await User.findById(decoded.sub)
            req.user = user;
            next() 
        } catch {next()}
    })
}

// This checks req.cookies and the token attached to it (from res.cookie method)
// If req.cookies.adminToken exists, then verify it with jwt.verify, and attach the
// corresponding user to req.user
exports.requireAdminAuth = (req, res, next) => {
    console.log('calling requireAdminAuthhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')

    let token = null;
    if (req.cookies && req.cookies.adminToken) token = req.cookies.adminToken

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) return next() 

        try {
            const user = await User.findById(decoded.sub)
            req.user = user;
            console.log('checking out user')
            console.log(user)
            next() 
        } catch {next()}
    })
}