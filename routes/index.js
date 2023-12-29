const express = require('express');
const router = express.Router();
const { requireAuth, requireAdminAuth } = require('../authMiddleware/authMiddleware');

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const adminController = require('../controllers/adminController');

// Perhaps the semantic organisation of controller callbacks could be improved.

// Backend API routes for public site
router.get('/home', requireAuth, postController.home_get);
router.post('/signup', userController.signup_post);
router.post('/login', userController.login_post);
router.get('/home/:postid', requireAuth, postController.post_get);
router.get('/logout', userController.log_out);

// Backend API routes for public and admin site: can create/edit comments
router.post('/home/:postid', requireAuth, commentController.comment_post);
router.put('/home/:postid/:commentid', commentController.comment_update);


// Backend API routes for admin app
// Admins can create/edit/delete posts, and delete comments
router.post('/login_admin', adminController.admin_login)
router.get('/admin_all_posts', requireAdminAuth, adminController.all_posts);
router.post('/admin_create_post', requireAdminAuth, adminController.create_post);
router.get(`/admin_blog_post/:postid`, requireAdminAuth, adminController.blog_post)
router.put(`/admin_blog_post/:postid`, requireAdminAuth, adminController.blog_post_update)
router.put(`/admin_blog_post/:postid/change_publish`, requireAdminAuth, adminController.blog_post_change_publish)
router.delete(`/admin_blog_post/:postid/delete_post`, requireAdminAuth, adminController.blog_post_delete)
router.post('/admin_blog_post/:postid', requireAdminAuth, commentController.comment_post);

router.delete('/home/:postid/:commentid', commentController.comment_delete);

module.exports = router;
