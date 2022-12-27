const express = require('express');
const router = express.Router();
const {loginUserController, signUpUserController} = require('../controllers/userController');

router.post('/loginUser', loginUserController);
router.post('/signUpUser', signUpUserController);

router.post

module.exports = router;