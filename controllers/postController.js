
const { verify } = require('jsonwebtoken');
const Post = require('../models/post');
const asyncHandler = require('express-async-handler');

// function getToken(req, res, next) {
//     const bearerAuth = req.headers['authorization'];
//     if (bearerAuth) {
//         const bearerToken = bearerAuth.split(' ')[1];
//         req.token = bearerToken;
//         return next();
//     }
//     res.sendStatus(403);
// }

exports.post_form_get = [
    asyncHandler(async (req, res, next) => {
        res.json({
            message: 'morning all'
        })
    })
]
exports.post_form_post = asyncHandler(async (req, res, next) => {

})
exports.post_get = asyncHandler(async (req, res, next) => {

})

exports.post_delete = asyncHandler(async (req, res, next) => {

})

exports.post_update = asyncHandler(async (req, res, next) => {

})
