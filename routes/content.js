"use strict";

var Signals = require('../database/Signals'),
    News = require('../database/News'),
    assert = require('assert');

module.exports = function(app) {

    var db = app.get("db"),
        listing = new Signals(db),
        news = new News(db);

    return {
        home: function(req, res, next) {
            listing.getSignals(5, function(errorList, resultsList) {
                if(errorList) return next(errorList);

                news.getNews(3, function(errorNews, resultsNews){
                    if(errorNews) return(errorNews)

                    res.render('index', {
                        partials:{header:'header',footer:'footer'},
                        username: req.username,
                        signals: resultsList,
                        news: resultsNews
                    })
                })
            })
        },
        list: {
            default: function(req, res, next) {
                listing.getSignals(20, function(error, results) {
                    if(error) return next(error);
                    res.render('list', {
                        partials:{header:'header',footer:'footer'},
                        username: req.username,
                        signals: results,
                        isList : true
                    })
                })
            },
            more: function(req, res, next) {
                var id = parseFloat(req.params.id);

                listing.getSignalById(id, function(error, result) {
                    if(error) return next(error);
                    if (!result) res.status(400).send("Not found");
                    res.render('more', {
                        partials:{header:'header',footer:'footer'},
                        username: req.username,
                        id : id,
                        signal : result, 
                        isList : true
                    })
                })
            }
        },
        signal: {
            form: function(req, res, next) {
                res.render('signal', {
                    partials:{header:'header',footer:'footer'},
                    username: req.username,
                    isSignal: true
                })
            },
            save: function(req, res, next) {
                // TODO
            }
        },
        account: {
            form: function(req, res, next) {
                res.render('account', {
                    partials:{header:'header',footer:'footer'},
                    username: req.username,
                    isAccount: true
                })
            },
            //FIX UP
            validate: function(req, res, next) {
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
                if (email != "")
                    if (!emailRE.test(email))
                        errors.email = "Invalid email address";

                if(Object.keys(errors).length === 0)
                    next();    
                else {
                    res.render('account', {
                        partials:{header:'header',footer:'footer'},
                        username: req.username,
                        isAccount: true
                    })
                }
            },
            save: function(req, res, next) {
                // TODO
            }
        },
        contact: function(req, res, next) {
            res.render('contact', {
                partials:{header:'header',footer:'footer'},
                username: req.username,
                isContact: true
            })
        }
    }
}
