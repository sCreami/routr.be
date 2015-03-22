"use strict";

//var Posts = require('../persistence/Posts')

module.exports = function(app) {

  var db = app.get("db")

  return {
    home: function(req, res, next) {
		  res.render('index', {
        partials:{header:'header',footer:'footer'},
        username: req.username
      })
    },
    list: function(req, res, next) {
    	res.render('list', {
        partials:{header:'header',footer:'footer'},
        username: req.username
      })
    },
    signal: function(req, res, next) {
    	res.render('signal', {
        partials:{header:'header',footer:'footer'},
        username: req.username
      })
    }
  }
}
