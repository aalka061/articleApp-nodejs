var User = require('../modles/user')
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var bcrypt = require('bcryptjs');


module.exports = function(app){

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({extended: true}));



    app.post('/api/users', function(req,res){

        const name = req.body.name;
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password
        const password2 = req.body.password2;


        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password2', 'Passwords do not match').equals(password);
         


        //  function isTaken (rest) {

        //     User.find({},{name: req.body.name}, function(err, users){
        //         if(err) {
        //           console.log(err);
                  
        //         }
        //         var message;
        //         if(users) {
        //           rest = users;
        //         } 
        //     });  
        //  }
        //  var rest = []

        //  console.log(isTaken(rest));
        //  console.log(rest)




        let errors = req.validationErrors();

        if(errors){
            res.send(errors)
        }
         else {
            let newUser = new User ({
                name: name,
                email: email,
                username: username,
                password: password
            });

            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(newUser.password, salt, function(err, hash){
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save(function(err){
                        if (err) throw err;
                        res.send("sucess")
                } );
            });
        

          
            })
           

        }
    } ) 
}