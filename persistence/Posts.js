"use strict";

module.exports = function Posts(db) {

    var posts = db.collection("posts");

    return {
        addPost: function(title, content, tags, author, done) {
            var permalink = title.replace( /\s/g, '_' );
            permalink = permalink.replace( /\W/g, '' );
            var entry = {
                title: title,
                author: author,
                content: content,
                permalink: permalink,
                tags: tags,
                comments: [],
                date: new Date()
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
