const express = require('express');
const router = express.Router();



const webController = require('../../controller/webController');

router.get(['/', '/index'], webController.renderHomePage);
router.get('/about', webController.renderAboutPage);

router.post('/createStudent', webController.createStudent);
router.post('/getDataStudent', webController.getDataStudent);
router.post('/getStudentById', webController.getStudentById);

module.exports = router;