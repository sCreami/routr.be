"use strict";

//TODO !

module.exports = function Comments(db) {

    var comments = db.collection("comments");

    return {
        addComments: function(title, author, done) {
            var entry = {
                "date": new Date(),
                "title": title,
                "author": author
            };
            comments.insert(entry, function (error, result) {
                if (error) return done(error, null);
                console.log("DB: inserted comments");
                return done(error, items);
            });
        },
        getCommentsOfSignal: function(count, done) {
            comments.find().sort('date',-1).limit(count).toArray(function(error, items) {
                if (error) return done(error, null);
                console.log("Found " + items.length + " comments");
                return done(error, items);
            });
        }
    };
};
