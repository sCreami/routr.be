"use strict";

var Signals = require('../models/Signals'),
    News = require('../models/News'),
	Users = require('../models/Users');

module.exports = function(app) {

    var db = app.get('db'),
        signals = new Signals(db),
        news = new News(db),
        users = new Users(db);

    return {
        home: function(req, res, next) {
            signals.getSignals(5, function(error, resultsList) {
                if(error) return next(error);

                news.getNews(3, function(error, resultsNews){
                    if(error) return(error)
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
                signals.getSignals(20, function(error, results) {
                    if(error) return next(error);
                    res.render('list', {
                        partials: {header:'header',footer:'footer'},
                        username: req.username,
                        signals: results,
                        isList : true
                    })
                });
            },
            more: function(req, res, next) {
                var id = parseFloat(req.params.id);
                signals.getSignalById(id, function(error, result) {
                    if(error) return next(error);
                    if(!result) res.status(400).send("Not found");
                    res.render('more', {
                        partials: {header:'header',footer:'footer'},
                        username: req.username,
                        id : id,
                        signal : result, 
                        isList : true
                    })
                });
            },
            rating: function(req, res, next) {
                var id = parseFloat(req.body.id),
                    username = req.username;
					
				if(!username) {
					console.log("Non-identifié tente de voter");
					res.status(403).send();
				} else {
					signals.getSignalById(id, function(error, result) {
						if(error) return next(error);
						if(result.voters.indexOf(username) > -1)
							res.status(403).send();
						else {
		               	 if(req.body.up) {
		                		signals.incrementRating(id, username, function(error, result) {
		                       	 if (error) res.status(403).send();
		                      	  res.status(204).send();
								});
		      			  } else {
		      				  signals.decrementRating(id, username, function(error, result) {
		      					  if (error) res.status(403).send();
		      					  res.status(204).send();
		      				  });
		     			   }
						}
					});
				}
            }
        },
        signal: {
            form: function(req, res, next) {
                res.render('signal', {
                    partials: {header:'header',footer:'footer'},
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

                    signals.addSignal(zone,direction,type,user,description, function(error, result) {
                        if (error) return next(error);
                        res.redirect('/list/' + result);
                    });
            }
        },
        account: {
            form: function(req, res, next) {
                users.getUserInfo(req.username, function(error, result) {
                    if(error) return next(error);
                    res.render('account', {
                        partials: {header:'header',footer:'footer'},
                        username: req.username,
                        email: result.email,
                        isAccount: true
                    })
                });
            }
        },
        contact: function(req, res, next) {
            res.render('contact', {
                partials: {header:'header',footer:'footer'},
                username: req.username,
                isContact: true
            })
        }
    }
}
