var Article = require('../modles/article');

module.exports = function(app) {

    app.get('/apiSetup', function(req, res){

        var seedData = [
            {
                title: "first article",
                author: "admin",
                discription: "this my first article thank you"
            },
            {
                title: "second article",
                author: "admin",
                discription: "this my second article thank you"
            }
        
        
        ]
        Article.create(seedData, function(err, articles){

            res.send(articles);
        });

    });

    
}

