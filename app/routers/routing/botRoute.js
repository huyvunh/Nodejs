const express = require("express");
const router = express.Router();
const botController = require('../../controller/botController');


router.post('/v1/bot/sendMessage', botController.sendMessage);


module.exports = router;