"use strict";

var assert = require('assert'),
    InvalidPasswordError = require('./errors/InvalidPassword'),
    UnknownUserError = require('./errors/UnknownUser');

module.exports = function Users(db) {

    var users = db.collection("users");

    return {
        addUser: function(username, password, email, done) {
            // Normalement, on devrait encrypter le mot de passe à ce point-ci.
            var entry = {
                _id: username,
                password: password
            };
            if(email) {
                entry.email = email;
            }
            users.insert(entry, function (error, result) {
                if (error) return done(error, null);
                console.log("DB: inserted user " + username);
                return done(null, result[0]);
            });
        },
        validateLogin: function(username, password, done) {
            users.findOne({ '_id' : username }, function(error, user) {
                if (error) return done(error, null);
                if (!user) return done(new UnknownUserError(username), null);
                if (user.password !== password)
                    return done(new InvalidPasswordError(user), null);
                return done(null, user); // réussi
            });
        },
        updateUser: function(username, password, email, done) {
            users.update({'_id' : username },{'$push': {username: username, password: password, email: email}}, function(error, user) {
                    if (error) return done(error, null);
                    console.log("DB: updated user " + username);
                    return done(null, user);
            });
            return done(errors, null);
        }
    };
};
