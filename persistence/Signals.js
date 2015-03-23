"use strict";

module.exports = function Signalements(db) {

    var signals = db.collection("signals");

    return {
        addPost: function(date_added, date_latest_upvote, zone, direction, type, vote, author) {
            var entry = {
                date_added: new Date(),
                date_latest_upvote: new Date(),
                zone: zone,
                direction: direction,
                type, type,
                vote, vote,
                author: author, //put the current user here!
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
        getPostsByTag: function(tag, count, done) {
            posts.find({ tags : tag }).sort('date', -1).limit(num).toArray(function(error, items) {
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
