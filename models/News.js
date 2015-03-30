"use strict";

module.exports = function News(db) {

    var news = db.collection("news");

    return {
        addNews: function(title, author, content, done) {
            var today = new Date(),
                dd = today.getDate(),
                mm = today.getMonth()+1, //Janvier vaut 0!
                yyyy = today.getFullYear(),
                epoch = new Date().getTime();

            if(dd < 10)
                dd='0'+dd;
            if(mm < 10)
                mm='0'+mm;

                today = dd+'/'+mm+'/'+yyyy;

            var entry = {
                '_id': epoch,
                'date': today,
                'title': title,
                'author': author,
                'content': content
            };
            news.insert(entry, function (error, result) {
                if (error) return done(error, null);
                console.log("DB: inserted news");
                return done(null, result);
            });
        },
        getNews: function(count, done) {
            news.find({}).sort({'_id': -1}).limit(count).toArray(function(error, result) {
                if (error) return done(error, null);
                console.log("Found " + result.length + " news");
                return done(null, result);
            });
        }
    };
};
