
const LocalStrategy = require('passport-local').Strategy;
const User = require('../modles/user');
const config = require('../config');
const bcrypt = require('bcryptjs');


module.exports = function(passport){

    passport.use( new LocalStrategy (function(username, password, done){

        //match username
        let query = {username: username}; 

        User.findOne(query, function(err, user ){

            if (err) throw err; 

            if(!user) {
                return done (null, false, {messages : "no user found"})
            }

            bcrypt.compare(password, user.password, function(err, isMatched ){
                if (err) throw err;
                if(isMatched){
                    return done(null,user);
                } else {
                    return done(null, false, {messages: "wrong password"})
                }
            })

            
        })

    }  ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
      

}