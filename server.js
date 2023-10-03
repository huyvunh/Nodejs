const express = require('express');
const app = express();
app.set('trust proxy', 1);

require('./config/enviroment')(app);
require('./app/routers/router')(app);

// app.use('/', function(req, res){
//     res.status(404).json({ error: "Not Found"});
// });

var server = require('http').createServer(app);
let port = 5000;
server.listen(port, function () {
    console.log('Server is running');
});