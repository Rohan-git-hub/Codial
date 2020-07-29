const express = require('express');
const router = express.Router();
const usersController = require('../controllers/admin_controller');
router.get('/pannel', usersController.profile);
module.exports = router;