const express = require('express');
const router = express.Router();
const {requireAuth} = require('../authMiddleware/authMiddleware');

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

const passport = require('passport');

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
router.get('/home', postController.home_get);

router.get('/signup', userController.signup_get);

router.post('/signup', userController.signup_post);

router.get('/login', userController.login_get);

router.post('/login', userController.login_post);

router.get('/create_new_post', getToken, postController.post_form_get);

router.post('/create_new_post', postController.post_form_post);

// may need something to delete and update a post
router.delete('/home/:postid', postController.post_delete);


// router.get('/home/:postid', passport.authenticate('jwt', {session: false}), postController.post_get);
// router.get('/home/:postid', postController.post_get);
router.get('/home/:postid', requireAuth, postController.post_get);
// router.get('/home/authenticate', passport.authenticate('jwt', {session: false}));

router.get('/logout', userController.log_out);

router.post('/home/:postid', requireAuth, commentController.comment_post);

router.put('/home/:postid/:commentid', commentController.comment_update);

router.delete('/home/:postid/:commentid', commentController.comment_delete);


module.exports = router;
