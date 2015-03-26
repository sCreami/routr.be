'use strict';

var assert = require('assert'),
    mongo = require('mongodb').MongoClient,
    sync = require('sequence'),
    users = require('./models/Users'),
    signals = require('./models/Signals'),
    news = require('./models/News'),
    comments = require('./models/Comments'),
    sequence = require('sequence').Sequence.create();

var url = 'mongodb://localhost/routr';

mongo.connect(url, function(err, db) {
    
    var user = users(db),
        client = "Foo",
        passwd = "1234",
        email = "foo@foo.be";

sequence
        
    .then(function(next){
        users(db).addUser(client, passwd, email, function(error, result) { 
            console.log(result)
            assert(result !== null);
            next();
        });
    }) 
    
    .then(function(next){
        users(db).getUserInfo(client, function(error, result) {
            assert(result !== null);
            assert(result._id == client);
            assert(result.password == passwd);
            assert(result.email == email);
            next();
        });
    })
    
    .then(function(next){
        process.exit(0); // Tests réussis !
    })
});
