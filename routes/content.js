"use strict";

var Signals = require('../database/Signals')

module.exports = function(app) {

    var db = app.get("db")

    return {
        home: function(req, res, next) {
            var listing = new Signals(db);

            listing.getSignals(5, function(error, results) {
                if(error) return next(error);
                res.render('index', {
                    partials:{header:'header',footer:'footer'},
                    username: req.username,
                    signals: results
                })
            })
        },
        list: function(req, res, next) {
            var listing = new Signals(db);

            listing.getSignals(20, function(error, results) {
                if(error) return next(error);
                res.render('list', {
                    partials:{header:'header',footer:'footer'},
                    username: req.username,
                    signals: results
                })
            })
        },
        signal: {
            form: function(req, res, next) {
                res.render('signal', {
                    partials:{header:'header',footer:'footer'},
                    username: req.username
                });
            },
            save: function(req, res, next) {
                // TODO
            }
        },
        account: {
            form: function(req, res, next) {
                res.render('account', {
                    partials:{header:'header',footer:'footer'},
                    username: req.username
                });
            },
            save: function(req, res, next) {
                // TODO
            }
        },
        contact: function(req, res, next) {
            res.render('contact', {
                partials:{header:'header',footer:'footer'},
                username: req.username
            });
        }
    }
}
