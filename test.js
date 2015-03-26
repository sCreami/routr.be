'use strict';

var assert = require('assert'),
    mongo = require('mongodb').MongoClient,
    sequence = require('sequence').Sequence.create(),
    users = require('./models/Users'),
    signals = require('./models/Signals'),
    news = require('./models/News'),
    comments = require('./models/Comments');

var url = 'mongodb://localhost/routr';

mongo.connect(url, function(err, db) {
    
    var user = users(db),
        client = "Foo",
        passwd = "1234",
        email = "foo@foo.be";

sequence
    
    // Test ajout utilisateur  
    .then(function(next){
        user.addUser(client, passwd, email, function(error, result) { 
            assert(result !== null);
            console.log("# addUser is correct");
            next();
        });
    }) 
    
    // Test lecture utilisateur
    .then(function(next){
        user.getUserInfo(client, function(error, result) {
            assert(result !== null);
            assert(result._id == client);
            assert(result.password == passwd);
            assert(result.email == email);
            console.log("# getUserInfo is correct")
            next();
        });
    })
    
    .then(function(next){
        process.exit(0); // Tests réussis !
    })
});
