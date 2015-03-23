"use strict";

module.exports = function Signalements(db) {

    var signalements = db.collection("signalements");

    return {
        addSignalement: function(date_added, date_latest_upvote, zone, direction, type, vote, author, done) {
            var entry = {
                date_added: new Date(),
                date_latest_upvote: new Date(),
                zone: zone,
                direction: direction,
                type: type,
                vote: 1,
                author: author, //put the current user here!
            };
            signalements.insert(entry, function (error, result) {
                if (error) return done(error, null);
                console.log("DB: inserted signalements ");
                return done(error, permalink);
            });
        },
        getSignalements: function(count, done) {
            posts.find().sort('vote').limit(count).toArray(function(error, items) {
                if (error) return done(error, null);
                console.log("Found " + items.length + " signalements");
                return done(error, items);
            });
        },
        getPostsByZone: function(zone, count, done) {
            posts.find({ zone : zone }).sort('vote').limit(num).toArray(function(error, items) {
                if (error) return done(error, null);
                console.log("Found " + items.length + " posts");
                return done(error, items);
            });
        },
        addVote: function(user, vote, done) {
            signalements.update({permalink: permalink}, {'$push': {comments: comment}}, function(error, count) {
                if (error) return done(error, null);
                return done(error, count);
            });
        }
    };
};
