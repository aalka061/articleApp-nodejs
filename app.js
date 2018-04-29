var express = require("express");
var mongoose = require('mongoose');
var config = require('./config')
var apiSetup = require('./contollers/setupController')
var apiController = require ('./contollers/apiController');
var apiUsersSetupController = require("./contollers/setupControllerUser")
var apiUsersController = require("./contollers/userController")
var request = require('request');
var expressValidator = require('express-validator');

var app = new express();
var port = process.env.PORT || 3000;
app.use(expressValidator())


app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect(config.get_db_connection_string());

apiController(app)

app.get('/articles/new', function(req, res){
    res.render ('articles/new')
})


function home(req, res, next) {
    req.url = '/api/articles'
    //if we want to change the method: req.method = 'POST'
    return app._router.handle(req, res, next)
 }
app.get('/articles', function(req, res){
    var url ='http://localhost:3000/api/articles';
    request({url: url, json: true},  function(err,resp,body){
        if (err) throw err;
        res.render('articles/index', { data: body}) 
    })
 })

 app.get('/users/register', function(req, res){

    res.render('users/registration');
 })

 app.get('/users/login', function(req, res){

    res.render('users/login');
 })
 
    

 apiUsersSetupController(app)
 apiUsersController(app)
apiSetup(app);

app.listen(port);