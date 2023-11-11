module.exports = function (app) {

    const userRouter = require("./routing/userRouter");
    app.use(userRouter);


    const webRoute = require('./webrouting/webRoute');
    app.use(webRoute);

    // const botRoute = require('./routing/botRoute');
    // app.use(botRoute);

    app.use(function (req, res) {
        res.status(404).json({ error: "Not Found" });
    });
};