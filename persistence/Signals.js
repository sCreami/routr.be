"use strict";

module.exports = function Signals(db) {

    var signals = db.collection("signals");

    return {
        addSignals: function(date_added,  zone, direction, type, rating, username, done) {
            var entry = {
                date_added: new Date(),
                zone: zone,
                direction: direction,
                type: type,
                rating: 1,
                author: username //put the current user here!
            };
            signals.insert(entry, function (error, result) {
                if (error) return done(error, null);
                console.log("DB: inserted signals ");
                return done(error, items);
            });
        },
        getSignals: function(count, done) {
            signals.find().sort('date_added').limit(count).toArray(function(error, items) {
                if (error) return done(error, null);
                console.log("Found " + items.length + " signals");
                return done(error, items);
            });
        },
        getSignalsByZone: function(zone, count, done) {
            signals.find({ zone : zone }).sort('date_added').limit(num).toArray(function(error, items) {
                if (error) return done(error, null);
                console.log("Found " + items.length + " signals");
                return done(error, items);
            });
        },
        incrementRating: function(_id, rating, done) {
            signals.update({_id: _id}, { $inc: {rating: 1}, function(error, items) {
                if (error) return done(error, null);
                console.log("incremented" + items.length + " signals");
                return done(error, items);
            });
        },
        incrementRating: function(_id, rating, done) {
            signals.update({_id: _id}, { $inc: {rating: -1}, function(error, items) {
                if (error) return done(error, null);
                console.log("decremented" + items.length + " signals");
                return done(error, items);
            });
        }

    };
};
