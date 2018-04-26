var mongoose = require("mongoose");


var articleSchema = mongoose.Schema (
    {
        title: {type: String, required: true}, 
        author: {type: String, required: true} 

    },

    {
        timestamps: true
    }
)

var Article = mongoose.model('article',articleSchema);

module.exports = Article;