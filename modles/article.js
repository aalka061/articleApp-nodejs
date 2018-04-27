var mongoose = require("mongoose");


var articleSchema = mongoose.Schema (
    {
        title: {type: String, required: true}, 
        author: {type: String, required: true},
        discription: String
    },

    {
        timestamps: true
    }
)

var Article = mongoose.model('article',articleSchema);

module.exports = Article;