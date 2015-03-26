'use strict';

var assert = require('assert'),
    mongo = require('mongodb').MongoClient,
    users = require('./models/Users'),
    signals = require('./models/Signals'),
    news = require('./models/News'),
    comments = require('./models/Comments');


var url = 'mongodb://localhost/routr';
var value = null;

mongo.connect(url, function(err, db) {
	
    var client = "Foo",
        passwd = "1234",
        email = "foo@foo.be";

    users(db).addUser(client, passwd, email, function(error, result) { value = result });
    
    assert(value === null);
    console.log(value);
    
    users(db).getUserInfo(client, function(error, user) { value = user });
    
    console.log(value);
    assert((typeof value === 'null') == false);
    assert(value.username == client);
    assert(value.password == passwd);
    assert(value.email == email);
    
    process.exit(0); // Tests réussis !
});
