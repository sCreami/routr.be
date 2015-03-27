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
        
    var signal = signals(db),
        zone = "E411 Louvain-la-Neuve",
        direction = "Bruxelles",
        kind = "Accident",
        author = "Foo",
        description = "Bloody";

sequence
    
    // Test ajout utilisateur  
    .then(function(next){
        user.addUser(client, passwd, email, function(error, result){ 
            assert(result !== null, "user `foo` is already in db");
            console.log("# addUser is correct");
            next();
        });
    }) 
    
    // Test lecture utilisateur
    .then(function(next){
        user.getUserInfo(client, function(error, result){
            assert(result !== null);
            assert(result._id === client);
            assert(result.password === passwd);
            assert(result.email === email);
            console.log("# getUserInfo is correct");
            next();
        });
    })
    
    // Test l'update utilisateur
    .then(function(next){
        passwd = "5678";
        email = "bar@bar.be";
        
        user.updateUser(client, passwd, email, function(error, result){
            assert(error === null);
            
            user.getUserInfo(client, function(error, result){
                assert(result !== null);
                assert(result._id === client);
                assert(result.password === passwd);
                assert(result.email === email);
                console.log("# updateUser is correct");
                next();
            });
        });
    })
    
    // Test ajout signalement
    .then(function(next){
        signal.addSignal(zone, direction, kind, author, description, function(error, result){
            assert(error === null);
            console.log("# addSignal is correct");
            next();
        });
    })
    
    // Test reception signalement
    .then(function(next){
        signal.getSignals(1000, function(error, result){
            assert(error === null);
            var follow;
            function find(source) {
                for (var i = 0; i < source.length; i++){
                    if (source[i].author === client){
                        follow = source[i]._id
                        return true;
                    }
                }
                return false;
            }
            assert(find(result));
            console.log("# getSignals is correct")
            next(follow);
        });
    })
    
    // Test reception signalement special
    .then(function(next, id){
        assert(typeof id !== undefined);
        signal.getSignalById(id, function(error, result){
            assert(error === null);
            assert(result.zone === zone);
            assert(result.direction === direction);
            assert(result.kind === kind);
            assert(result.author === author);
            assert(result.description === description);
            console.log("# getSignalById is correct");
            next();
        });
    })
    
    // Nettoie la bdd
    .then(function(next){
        db.collection('users').remove({'_id':client}, function(error, result){
            assert(error === null);
            
            db.collection('signals').remove({'author':client}, function(error, result){
                assert(error === null);
                
                console.log("DB: cleaning up");
                next();
            });
        });
    })
    
    // Test réussis
    .then(function(next){
        console.log("# TEST SUCCEEDED !");
        process.exit(0);
    })
});
