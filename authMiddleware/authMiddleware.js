const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

exports.requireAuth = (req, res, next) => {

    const token = req.cookies ? req.cookies.token : null;

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) return next() 

        try {
            const user = await User.findById(decoded.sub)
            req.user = user;
            next() 
        } catch {next()}
    })
}