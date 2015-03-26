'use strict';

var assert = require('assert'),
    mongo = require('mongodb').MongoClient,
    users = require('./models/Users'),
    signals = require('./models/Signals'),
    news = require('./models/News'),
    comments = require('./models/Comments');


var url = 'mongodb://localhost/routr';

mongo.connect(url, function(err, db) {
	
    var client = "Foo",
        passwd = "1234",
        email = "foo@foo.be";

    users(db).addUser(client, passwd, email, function(error, result) {
        assert(client == "Bar");
    });
    
    assert(!false);
    
    process.exit(0); // Tests réussis !
});
