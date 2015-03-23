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
            var username = req.body.username,
                password = req.body.password,
                verify = req.body.verify,
                email = req.body.email,
                usernameRE = /^[a-zA-Z0-9_-]{3,20}$/,
                passwordRE = /^.{3,20}$/,
                emailRE = /^[\S]+@[\S]+\.[\S]+$/;
                
            if (!usernameRE.test(username))
                errors.username = "Invalid username: must be alphanumeric and have between 3 and 20 characters";
            if (!passwordRE.test(password))
                errors.password = "Invalid password: must have at least 3 and at most 20 caracters";
            if (password != verify)
                errors.verify = "Passwords must match";
            if (email != "") {
                if (!emailRE.test(email)) {
                    errors.email = "Invalid email address";
                }
            }
            if(Object.keys(errors).length === 0)
                next();
            else {
                users.update({'_id' : username },{'$push': {username: username, password: password, email: email}}, function(error, user) {
                    if (error) return done(error, null);
                    console.log("DB: updated user " + username);
                    return done(null, user);
                });
            }
            return done(errors, null);
        }
    };
};
