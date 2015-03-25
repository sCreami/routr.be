"use strict";

//TODO !

module.exports = function Comments(db) {

    var comments = db.collection("comments");

    return {
        addCommentToSignal: function(date, author, content, signal, done) {
            var today = new Date(),
                dd = today.getDate(),
                mm = today.getMonth()+1, //Janvier vaut 0!
                yyyy = today.getFullYear(),
                epoch = new Date().getTime();

            if(dd<10)
                dd='0'+dd;
            if(mm<10)
                mm='0'+mm;

                today = dd+'/'+mm+'/'+yyyy;

            var entry = {
                '_id': epoch,
                'date': today,
                'author': author,
                'content': content,
                'signal': signal
            };
            comments.insert(entry, function (error, result) {
                if (error) return done(error, null);
                console.log("DB: inserted comments from " + author + " of " + signal);
                return done(error, items);
            });
        },
        getCommentsOfSignal: function(signal, count, done) {
            comments.find({'signal': signal}).sort('_id',-1).limit(count).toArray(function(error, items) {
                if (error) return done(error, null);
                console.log("Found " + items.length + " comments");
                return done(error, items);
            });
        }
    };
};
