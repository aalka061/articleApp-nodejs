
var express = require("express");
var mongoose = require('mongoose');
var config = require('./config')
var apiSetup = require('./contollers/setupController')
var apiController = require ('./contollers/apiController');
var apiUsersSetupController = require("./contollers/setupControllerUser")
var apiUsersController = require("./contollers/userController")
var request = require('request');
var expressValidator = require('express-validator');
var session = require('express-session')
var passport = require('passport');
var flash = require('connect-flash');
var app = new express();




var port = process.env.PORT || 3000;

app.use(session({
    secret: 'login_secret',
    name: 'login',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.use(expressValidator())
app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//express messages middleware
app.use(require('connect-flash')());


app.use(function(req, res, next){
    res.locals.messages = require('express-messages')(req, res);
    next();
})


//database connection 
mongoose.connect(config.get_db_connection_string());



 
require('./config/passport')(passport);
 app.use(passport.initialize());
 app.use(passport.session());

 app.get('*', function(req, res, next){
    res.locals.user = req.user || null; 
    console.log(req.user)
    next();
})

// calling apis for the articles 
apiController(app)


apiUsersSetupController(app)
apiUsersController(app)
apiSetup(app);
//routing 
app.get('/articles/new', function(req, res){
    res.render ('articles/new')
})

 
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





    



app.listen(port);