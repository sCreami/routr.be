"use strict";

var Users = require('../models/Users'),
    Sessions = require('../models/Sessions'),
    InvalidPasswordError = require('../models/errors/InvalidPassword'),
    UnknownUserError = require('../models/errors/UnknownUser');

module.exports = function(app) {

    var db = app.get("db"),
        users = new Users(db),
        sessions = new Sessions(db);

    return {
        authentication: {
            check: function(req, res, next) {
                var sessionId = req.cookies.session;
                sessions.getUsername(sessionId, function(error, username) {
                    if (!error && username) req.username = username;
                    next();
                });
            }
        },
        login: {
            input: function(req, res, next) {
                res.render("login", {
                    partials:{header:'header',footer:'footer'}
                });
            },
            perform: function(req, res, next) {
                var username = req.body.username;
                var password = req.body.password;
                console.log("Login: username: " + username + ", pass: " + password);
                users.validateLogin(username, password, function(error, user) {
                    if (!error) {
                        sessions.startSession(username, function(error, sessionId) {
                            if (!error) {
                                res.cookie('session', sessionId);
                                res.redirect('/');
                            }
                            else
                                next(error);
                        });
                    }
                    else {
                        var answer = { username: username, errors: {} };
                            answer.partials = {header:'header',footer:'footer'};
                            answer.username = "";

                        if (error instanceof UnknownUserError) {
                            answer.errors.username = error;
                            res.render("login", answer);
                        }
                        else if (error instanceof InvalidPasswordError) {
                            answer.errors.password = error;
                            res.render("login", answer);
                        }
                        else {
                            next(error); // passer erreur au gestionnaire suivant
                        }
                    }
                });
            }
        },
        logout: {
            perform: function(req, res, next) {
                var sessionId = req.cookies.session;
                sessions.endSession(sessionId, function (error) {
                    res.cookie('session', '');
                    res.redirect('/');
                });
            }
        },
        signup: {
            input: function(req, res, next) {
                res.render("signup", {
                    partials:{header:'header',footer:'footer'},
                    isSignup: true
                });
            },
            validate: function(req, res, next) {
                var username = req.body.username,
                    password = req.body.password,
                    verify = req.body.verify,
                    email = req.body.email,
                    usernameRE = /^[a-zA-Z0-9_-]{3,20}$/,
                    passwordRE = /^.{3,20}$/,
                    emailRE = /^[\S]+@[\S]+\.[\S]+$/,
                    answer = { username: username, email: email, errors: {} },
                    errors = answer.errors;
                if (!usernameRE.test(username)) {
                    errors.username = "Invalid username: must be alphanumeric and have between 3 and 20 characters";
                }
                if (!passwordRE.test(password)) {
                    errors.password = "Invalid password: must have at least 3 and at most 20 caracters";
                }
                if (password != verify) {
                    errors.verify = "Passwords must match";
                }
                if (email != "") {
                    if (!emailRE.test(email)) {
                        errors.email = "Invalid email address";
                    }
                }
                if(Object.keys(errors).length === 0)
                    // Validé : passer la requête au gestionnaire suivant.
                    next();
                else {
                    // Échec : retourner à la page d'enregistrement.
                    answer.partials = {header:'header',footer:'footer'};
                    answer.isSignup = true;
                    answer.username = "";
                    res.render("signup", answer);
                }
            },
            perform: function(req, res, next) {
                var username = req.body.username,
                    password = req.body.password,
                    email = req.body.email,
                    answer = { username: username, email: email, errors: {} },
                    errors = answer.errors;

                users.addUser(username, password, email, function(error, user) {
                    if (error) {
                        if (error.code == '11000') {
                            errors.username = "Username already in use.";
                            answer.partials = {header:'header',footer:'footer'};
                            answer.isSignup = true;
                            answer.username = "";
                            res.render("signup", answer);
                        }
                        else
                            next(error); // faire appel au prochain gestionnaire
                    }
                    else {
                        sessions.startSession(username, function(error, sessionId) {
                            if (error)
                                next(error);
                            res.cookie('session', sessionId);
                            res.redirect('/');
                        });
                    }
                });
            }
        },
        account : {
            validate: function(req, res, next) {
                var password = req.body.password,
                    verify = req.body.verify,
                    email = req.body.email,
                    passwordRE = /^.{3,20}$/,
                    emailRE = /^[\S]+@[\S]+\.[\S]+$/,
                    errors = {};

                if (!passwordRE.test(password))
                    errors.password = "Mot de passe invalide: Il doit avoir au moins 3 et au max 20 caractères";
                if (password != verify)
                    errors.verify = "Les mots de passe doivent coïncider";
                if (email != "")
                    if (!emailRE.test(email))
                        errors.email = "Adresse email invalide";

                if(Object.keys(errors).length === 0)
                    next();
                else {
                    res.render('account', {
                        partials: {header:'header',footer:'footer'},
                        username: req.username,
                        email: email,
                        isAccount: true,
                        errors: errors
                    })
                }
            },
            save: function(req, res, next) {
                var password = req.body.password,
                    email = req.body.email,
                    username = req.username;

                users.updateUser(username, password, email, function(errorUpdate, result) {
                    if(errorUpdate) return next(errorUpdate);
                    res.render('account', {
                        partials: {header:'header',footer:'footer'},
                        username: username,
                        email: email,
                        isAccount: true,
                        alert: "Vos informations ont été mises à jour."
                    })
                });
            }
        }
    };
};
