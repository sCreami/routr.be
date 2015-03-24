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
            validate: function(req, res, next) {
                var zone = req.body.zone,
                    direction = req.body.direction,
                    region = req.body.region,
                    type = req.body.type,
                    description = req.body.description,
                    errors = {};

                    if(zone === "")
                        errors.zone = "Vous devez spécifier une zone.";
                    if(direction === "")
                        errors.direction = "Vous devez spécifier une direction.";
                    if(description === "")
                        errors.description = "Une description est nécessaire.";

                    if(Object.keys(errors).length === 0)
                        next();    
                    else {
                        res.render('signal', {
                            partials:{header:'header',footer:'footer'},
                            username: req.username,
                            isSignal: true,
                            errors: errors
                        })
                    }
            },
            save: function(req, res, next) {
                var zone = req.body.zone,
                    direction = req.body.direction,
                    region = req.body.region,
                    type = req.body.type,
                    description = req.body.description,
                    user;

                    if(req.username)
                        user = req.username;
                    else
                        user = "Anonyme";

                    listing.addSignal(zone,direction,type,user,description, function(error, result) {
                        if (error) return next(error);
                        res.redirect('/list/' + result);
                    });
            }
        },
        account: {
            form: function(req, res, next) {
                res.render('account', {
                    partials:{header:'header',footer:'footer'},
                    username: req.username,
                    isAccount: true
                })
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
