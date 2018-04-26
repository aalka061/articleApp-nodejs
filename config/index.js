var config = require('./config');

module.exports = {

    get_db_connection_string: function() {

        return "mongodb://"+config.db_name+":"+config.db_pwd+
        "@ds257589.mlab.com:57589/article_db";
    }
}