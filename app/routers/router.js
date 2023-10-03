module.exports = function(app){
    
    const userRouter = require("./routing/userRouter");
    app.use(userRouter);




    app.use(function(req, res){
        res.status(404).json({error: "Not Found"});
    });
};