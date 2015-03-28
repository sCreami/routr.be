"use strict";

module.exports = function(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500);
    res.render('error', { 
        partials: {header:'header',footer:'footer'},
        error: err
    });
}
