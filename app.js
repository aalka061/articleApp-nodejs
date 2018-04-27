var express = require("express");
var mongoose = require('mongoose');
var config = require('./config')
var apiSetup = require('./contollers/setupController')
var apiController = require ('./contollers/apiController')
var request = require('request');

var app = new express();
var port = process.env.PORT || 3000;


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
 
    



apiSetup(app);

app.listen(port);