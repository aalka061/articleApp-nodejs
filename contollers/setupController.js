var Article = require('../modles/article');

module.exports = function(app) {

    app.get('/apiSetup', function(req, res){

        var seedData = [
            {
                title: "first article",
                author: "admin"
            },
            {
                title: "second article",
                author: "admin"
            }
        
        
        ]
        Article.create(seedData, function(err, articles){

            res.send(articles);
        });

    });

    
}

