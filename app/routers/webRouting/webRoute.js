const express = require('express');
const router = express.Router();



const webController = require('../../controller/webController');

router.get(['/', '/index'], webController.renderHomePage);
router.get('/about', webController.renderAboutPage);


module.exports = router;