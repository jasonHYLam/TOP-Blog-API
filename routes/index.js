const express = require('express');
const router = express.Router();
const { requireAuth, requireAdminAuth } = require('../authMiddleware/authMiddleware');

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const adminController = require('../controllers/adminController');

// const passport = require('passport');

// function getToken(req, res, next) {
//     const bearerAuth = req.headers['authorization'];

//     console.log(bearerAuth)

//     if (typeof bearerAuth !== 'undefined') {
//         const bearerToken = bearerAuth.split(' ')[1];
//         req.token = bearerToken;
//         return next();
//     }
//     res.sendStatus(403);

// }

/* GET home page. */
router.get('/home', requireAuth, postController.home_get);

router.get('/signup', userController.signup_get);

router.post('/signup', userController.signup_post);

router.get('/login', userController.login_get);

router.post('/login', userController.login_post);

// router.get('/create_new_post', getToken, postController.post_form_get);
router.get('/create_new_post', postController.post_form_get);


// may need something to delete and update a post
router.delete('/home/:postid', postController.post_delete);


router.get('/home/:postid', requireAuth, postController.post_get);

router.get('/logout', userController.log_out);

router.post('/home/:postid', requireAuth, commentController.comment_post);

router.put('/home/:postid/:commentid', commentController.comment_update);

router.delete('/home/:postid/:commentid', commentController.comment_delete);

// for admin app
router.post('/login_admin', adminController.admin_login)
router.get('/admin_all_posts', requireAdminAuth, adminController.all_posts);
router.post('/admin_create_post', requireAdminAuth, adminController.create_post);
router.get(`/admin_blog_post/:postid`, requireAdminAuth, adminController.blog_post)
router.put(`/admin_blog_post/:postid`, requireAdminAuth, adminController.blog_post_update)
router.put(`/admin_blog_post/:postid/change_publish`, requireAdminAuth, adminController.blog_post_change_publish)
router.delete(`/admin_blog_post/:postid/delete_post`, requireAdminAuth, adminController.blog_post_delete)


module.exports = router;
