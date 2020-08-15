const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');
const postController = require('../controllers/post_controller');

router.get('/profile', passport.checkAuthentication, usersController.profile);
router.get('/post', postController.post);
router.get('/sign-in', usersController.signin);
router.get('/sign-up', usersController.signup);
router.post('/create', usersController.create);
// use passport as a middleware to authenticate
router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);
router.get('/sign-out', usersController.destroySession);
module.exports = router;