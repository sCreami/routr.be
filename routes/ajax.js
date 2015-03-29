"use strict";

var Signals = require('../models/Signals');

module.exports = function(app) {

    var db = app.get('db'),
        signals = new Signals(db);

    return {
        json: function(req, res, next) {
            signals.getSignals(30, function(error, results) {
                if(error) return next(error);
                res.json(results);
            });
        }
    }
}
