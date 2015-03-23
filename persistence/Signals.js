"use strict";

module.exports = function Signalements(db) {

    var signals = db.collection("signals");

    return {
        addSignals: function(zone, direction, type, username, description, done) {
            var entry = {
                date_added: new Date().getTime(),
                zone: zone,
                direction: direction,
                type: type,
                rating: 1,
                description: description,
                author: username //put the current user here!
            };
            posts.insert(entry, function (error, result) {
                if (error) return done(error, null);
                console.log("DB: inserted post " + entry.title);
                return done(error, permalink);
            });
        },
        getPosts: function(count, done) {
            posts.find().sort('date', -1).limit(count).toArray(function(error, items) {
                if (error) return done(error, null);
                console.log("Found " + items.length + " posts");
                return done(error, items);
            });
        },
        getSignalsByZone: function(zone, count, done) {
            signals.find({ zone : zone }).sort('date_added').limit(count).toArray(function(error, items) {
                if (error) return done(error, null);
                console.log("Found " + items.length + " posts");
                return done(error, items);
            });
        },
        getPostByPermalink: function(permalink, done) {
            posts.findOne({'permalink': permalink}, function(error, post) {
                if (error) return done(error, null);
                return done(error, post);
            });
        },
        addComment: function(permalink, name, email, body, done) {
            var comment = { author: name, body: body };
            if (email) comment.email = email;
            posts.update({permalink: permalink}, {'$push': {comments: comment}}, function(error, count) {
                if (error) return done(error, null);
                return done(error, count);
            });
        }
    };
};
