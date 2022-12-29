const express = require('express');
const router = express.Router();
const {loginUserController, signUpUserController, getUser, getUserController} = require('../controllers/userController');
const authUser = require('../middlewares/authUser');

router.post('/loginUser', loginUserController);
router.post('/signUpUser', signUpUserController);
router.get('/getUser', authUser, getUserController);

router.post

module.exports = router;