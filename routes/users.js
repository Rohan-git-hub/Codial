const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');
const postController = require('../controllers/post_controller');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.get('/post', postController.post);
router.get('/sign-in', usersController.signin);
router.get('/sign-up', usersController.signup);
router.post('/create', usersController.create);
router.post('/update/:id', usersController.update);
// use passport as a middleware to authenticate
router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);
router.get('/sign-out', usersController.destroySession);
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email',]}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);
module.exports = router;