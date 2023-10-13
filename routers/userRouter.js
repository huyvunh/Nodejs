const express = require('express');
var userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send("This is userRouter");
});

module.exports = userRouter;