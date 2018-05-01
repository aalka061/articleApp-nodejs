var Article = require('../modles/article');
var bodyParser = require('body-parser');

module.exports = function(app){

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({extended: true}));

    
    // api to list all articles 
    app.get('/api/articles', function(req, res){
        Article.find({}, function(err, articles){
            res.send(articles);
        })
  
    })

    //api to get a specific article by title  

    app.get('/api/articles/:title', function(req, res){
        Article.find({title: req.params.title}, function(err, article){
            if (err) throw err;
            res.send(article);
        })
  
    })

    //api to get a specific article by id  

    app.get('/api/articles/:id', function(req, res){
        Article.find({ _id: req.params.id}, function(err, article){
            if (err) throw err;
            res.send(article);
        })
  
    })

    // //api to get a specific article by author  

    // app.get('/api/articles/:author', function(req, res){
    //     Article.find({author: req.params.author}, function(err, article){
    //         if (err) throw err;
    //         res.send(article);
    //     })
  
    // })

    //api to upate article or add a new one
    app.post('/api/article', function(req, res){ 

        if(req.body.id){
            Article.findByIdAndUpdate(req.body.id, {
                title: req.body.title,
                author: req.body.author,
                discription: req.body.discription
            }, function(err) {
                if (err) throw err;
                res.redirect('/articles') ;
            })
        } else {
            Article.create ({
                title: req.body.title,
                author: req.body.author,
                discription: req.body.discription
             }, function(err){
                 if (err) throw err;
                 res.redirect('/articles') ;

             } )
        }

    })


    //api to delete article from database 

    app.delete('/api/article', function(req, res){

        Article.findByIdAndRemove(req.body.id, function(err){
            if (err) throw err; 
            res.send("Success: document has been deleted")
        })
    })


    app.get('/articles/edit/:id', function(req, res){

         Article.findById(req.params.id, function(err, article){
             if (err) throw err;
             res.render('articles/edit', {article: article});


        })
    
    })
    
    
    


}