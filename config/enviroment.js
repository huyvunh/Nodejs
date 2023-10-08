var bodyParser = require("body-parser");
const express = require('express');
const path = require('path');  //trả về string nó là 1 đường dẫn

module.exports = function (app){
    
    //View Engine
    app.use(express.static(path.join(__dirname,'../client/public/'), {
        redirect : false,
        setHeaders : function (res, path, stat){
            res.set('x-timestamp', Date.now())
        }
    }));
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname,'../client/views'))
    // app.set('layouts', path.join(__dirname,'../client/layouts'))


    //BodyParse
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(bodyParser.json());

    
};
