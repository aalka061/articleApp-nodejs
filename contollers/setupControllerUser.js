var User = require('../modles/user');

module.exports = function(app) {

    app.get('/api/users-setup', function(req, res){

        var seedData = 
            {
                name: "abdullah",
                email: "alkaf@gmail.com",
                username: "aalkaf",
                password: "aa"

            }
        
        
        
        User.create(seedData, function(err, users){

            res.send(users);
        });

    });

    
}

