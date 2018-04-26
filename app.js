var express = require("express");
var mongoose = require('mongoose');
var config = require('./config')
var apiSetup = require('./contollers/setupController')
var apiController = require ('./contollers/apiController')


var app = new express();
var port = process.env.PORT || 3000;


app.use('/assets', express.static(__dirname + './public'));

app.set('view engine', 'ejs');

mongoose.connect(config.get_db_connection_string());

apiController(app)

app.get('/articles/new', function(req, res){
    res.render ('articles/new')
})

//apiSetup(app);

app.listen(port);