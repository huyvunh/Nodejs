const express = require("express");
const router = express.Router();
const userController = require('../../controller/userController');
router.get('/v1/user/getUserInfo', userController.getUserInfo);
router.post('/v1/user/createUser', userController.createUser);
router.get('/demo', userController.demo);
router.post('/demoABC', userController.demoABC);

module.exports = router;