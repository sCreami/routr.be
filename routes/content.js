"use strict";

//var Posts = require('../persistence/Posts')

module.exports = function(app) {

  var db = app.get("db")

  return {
    home: function(req, res, next) {
      res.render('index')
    }
  }
}