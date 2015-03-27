'use strict';

var express = require('express'),
    engines = require('consolidate'),
    path = require('path'),
    routes = require('./routes'),
    mongo = require('mongodb').MongoClient,
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override');

var url = process.env.MONGOHQ || 'mongodb://localhost/routr';

mongo.connect(url, function(err, db) {
  if(err) throw err;

  var app = express();

  app.engine('html', engines.hogan);

  app.set('db', db);
  app.set('home', __dirname);
  app.set('port', process.env.PORT || 8080);
  app.set('view engine', 'html'); // associer extension .html au moteur de templates
  app.set('views', path.join(__dirname, 'views'));

  // Middleware pour afficher les requêtes à la console.
  var styles = {
    production: 'common',
    development: 'dev'
  };
  var format = styles[app.settings.env];
  if (format)
    app.use(logger(format));

  // Middleware pour supporter les cookies.
  app.use(cookieParser());

  // Middleware pour gérer les requêtes POST.
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Support de la méthode HTTP DELETE.
  app.use(methodOverride());

  routes(app);

  app.listen(app.get('port'));

  console.log('Listening on port %d', app.get('port'));
});
