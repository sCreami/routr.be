"use strict";

module.exports = function Signals(db) {

    var signals = db.collection("signals");

    return {
        addSignals: function(date_added, date_latest_uprating, zone, direction, type, rating, author, done) {
            var entry = {
                date_added: new Date(),
                date_latest_uprating: new Date(),
                zone: zone,
                direction: direction,
                type: type,
                rating: 1,
                author: author, //put the current user here!
            };
            signals.insert(entry, function (error, result) {
                if (error) return done(error, null);
                console.log("DB: inserted signals ");
                return done(error, permalink);
            });
        },
        getSignals: function(count, done) {
            posts.find().sort('date').limit(count).toArray(function(error, items) {
                if (error) return done(error, null);
                console.log("Found " + items.length + " signals");
                return done(error, items);
            });
        },
        getSignalsByZone: function(zone, count, done) {
            posts.find({ zone : zone }).sort('date').limit(num).toArray(function(error, items) {
                if (error) return done(error, null);
                console.log("Found " + items.length + " signals");
                return done(error, items);
            });
        },
        incrementRating: function(_id, rating, done) {
            signals.update({_id: _id}, { $inc: {rating: 1}, function(error, count) {
                if (error) return done(error, null);
                console.log("incremented" + items.length + " signals");
                return done(error, count);
            });
        },
        incrementRating: function(_id, rating, done) {
            signals.update({_id: _id}, { $inc: {rating: -1}, function(error, count) {
                if (error) return done(error, null);
                console.log("decremented" + items.length + " signals");
                return done(error, count);
            });
        }

    };
};
