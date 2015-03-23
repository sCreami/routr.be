"use strict";

module.exports = function Signals(db) {

    var signals = db.collection("signals");

    return {
        addSignals: function(zone, direction, kind, username, description, done) {
            var entry = {
                dateAdded: new Date().getTime(),
                zone: zone,
                direction: direction,
                kind: kind,
                rating: 1,
                description: description,
                author: username //put the current user here!
            };
            signals.insert(entry, function (error, result) {
                if (error) return done(error, null);
                console.log("DB: inserted signals ");
                return done(error, items);
            });
        },
        getSignals: function(count, done) {
            signals.find().sort('dateAdded',-1).limit(count).toArray(function(error, items) {
                if (error) return done(error, null);
                console.log("Found " + items.length + " signals");
                return done(error, items);
            });
        },
        getSignalsByZone: function(zone, count, done) {
            signals.find({ zone : zone }).sort('dateAdded',-1).limit(count).toArray(function(error, items) {
                if (error) return done(error, null);
                console.log("Found " + items.length + " signals");
                return done(error, items);
            });
        },
        incrementRating: function(id, rating, done) {
            signals.update({_id: id}, { $inc: {rating: 1}}, function(error, items) {
                if (error) return done(error, null);
                console.log("incremented" + items.length + " signals");
                return done(error, items);
            });
        },
        decrementRating: function(id, rating, done) {
            signals.update({_id: id}, { $inc: {rating: -1}}, function(error, items) {
                if (error) return done(error, null);
                console.log("decremented" + items.length + " signals");
                return done(error, items);
            });
        }

    };
};
