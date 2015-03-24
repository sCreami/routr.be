"use strict";

module.exports = function News(db) {

    var news = db.collection("news");

    return {
        addNews: function(title, author, done) {
            var entry = {
                "date": new Date(),
                "title": title,
                "author": author
            };
            news.insert(entry, function (error, result) {
                if (error) return done(error, null);
                console.log("DB: inserted news");
                return done(error, items);
            });
        },
        getNews: function(count, done) {
            news.find().sort('date',-1).limit(count).toArray(function(error, items) {
                if (error) return done(error, null);
                console.log("Found " + items.length + " news");
                return done(error, items);
            });
        }
    };
};
