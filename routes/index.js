const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

function getToken(req, res, next) {
    const bearerAuth = req.headers['authorization'];

    console.log(bearerAuth)

    if (typeof bearerAuth !== 'undefined') {
        const bearerToken = bearerAuth.split(' ')[1];
        req.token = bearerToken;
        return next();
    }
    res.sendStatus(403);

}

/* GET home page. */
router.get('/home', userController.home_get);

router.get('/signup', userController.signup_get);

router.post('/signup', userController.signup_post);

router.get('/login', userController.login_get);

router.post('/login', userController.login_post);

router.get('/create_new_post', getToken, postController.post_form_get);

router.post('/create_new_post', postController.post_form_post);

// may need something to delete and update a post


router.get('/home/:postid', postController.post_get);

router.post('/home/:postid', commentController.comment_post);

router.put('/home/:postid', commentController.comment_update);

router.delete('/home/:postid', commentController.comment_delete);


module.exports = router;
