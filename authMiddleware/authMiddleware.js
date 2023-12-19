const jwt = require('jsonwebtoken');
require('dotenv').config();

const requireAuth = (req, res, next) => {

    const token = req.cookies ? req.cookies.token : null;

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log(err)
            next()
        } else {
        console.log(decoded)
        next()
        }

    })

}