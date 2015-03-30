"use strict";

var UnknownSignalError = require('./errors/UnknownSignal');

module.exports = function Signals(db) {

    var signals = db.collection("signals");

    return {
        addSignal: function(zone, direction, kind, username, description, done) {
            var today = new Date(),
                dd = today.getDate(),
                mm = today.getMonth()+1, //Janvier vaut 0!
                yyyy = today.getFullYear(),
                epoch = new Date().getTime(),
                voters = new Array();

                voters.push(username);

            if(dd<10)
                dd='0'+dd;
            if(mm<10)
                mm='0'+mm;

                today = dd+'/'+mm+'/'+yyyy;

            var entry = {
                '_id': epoch,
                'dateAdded': today,
                'zone': zone,
                'direction': direction,
                'kind': kind,
                'rating': 1,
                'description': description,
                'author': username,
                'voters': voters
            };
            signals.insert(entry, function (error, result) {
                if(error) return done(error, null);
                console.log("DB: inserted signal "+ zone);
                return done(error, epoch);
            });
        },
        getSignals: function(count, done) {
            signals.find({}).sort({'_id': -1}).limit(count).toArray(function(error, items) {
                if(error) return done(error, null);
                console.log("Found " + items.length + " signals");
                return done(error, items);
            });
        },
        getSignalById: function(id, done) {
            signals.findOne({'_id': id}, function(error, item) {
                if(error) return done(error, null);
                if(!item) return done(new UnknownSignalError(id), null);
                console.log("Showing more of "+ id);
                return done(error, item);
            });
        },
        // getSignalsByZone: function(zone, count, done) {
        //     signals.find({ zone : zone }).sort('dateAdded',-1).limit(count).toArray(function(error, items) {
        //         if (error) return done(error, null);
        //         console.log("Found " + items.length + " signals");
        //         return done(error, items);
        //     });
        // },
        incrementRating: function(id, username, done) {
            signals.update({'_id': id}, { $inc: {'rating': 1}}, function(error, items) {
                if(error) return done(error, null);
                signals.update({'_id': id}, {$push: {'voters': username}}, function(error, items) {
                    if (error) return done(error, null);
                    console.log("incremented signal " + id);
                    return done(error, items); 
                });
            });
        },
        decrementRating: function(id, username, done) {
            signals.update({'_id': id}, { $inc: {'rating': -1}}, function(error, items) {
                if(error) return done(error, null);
                signals.update({'_id': id}, {$push: {'voters': username}}, function(error, items) {
                    if (error) return done(error, null);
                    console.log("decremented signal " + id);
                    return done(error, items); 
                });
            });
        }
    };
};
