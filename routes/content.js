"use strict";

//var Posts = require('../persistence/Posts')
var Signals = require('../persistence/Signals')

module.exports = function(app) {

    var db = app.get("db")

    return {
        home: function(req, res, next) {
            res.render('index', {
                partials:{header:'header',footer:'footer'},
                username: req.username
            });
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
        }
    }
}
