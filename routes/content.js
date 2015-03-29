"use strict";

var Signals = require('../models/Signals'),
    News = require('../models/News'),
    Users = require('../models/Users'),
    Comments = require('../models/Comments');

module.exports = function(app) {

    var db = app.get('db'),
        signals = new Signals(db),
        news = new News(db),
        users = new Users(db),
        comments = new Comments(db);

    return {
        home: function(req, res, next) {
            signals.getSignals(5, function(error, resultsList) {
                if(error) return next(error);

                news.getNews(3, function(error, resultsNews){
                    if(error) return(error)
                    res.render('index', {
                        partials: {header:'header',footer:'footer'},
                        username: req.username,
                        signals: resultsList,
                        news: resultsNews
                    })
                })
            })
        },
        list: {
            default: function(req, res, next) {
                res.render('list', {
                    partials: {header:'header',footer:'footer'},
                    username: req.username,
                    isList : true
                })
            },
            more: {
                default: function(req, res, next) {
                    var id = parseFloat(req.params.id);

                    signals.getSignalById(id, function(error, resultSignal) {
                        if(error) return next(error);
                        if(!resultSignal) res.status(400).send("Not found");

                        comments.getCommentsOfSignal(id, 4, function(error, resultComments) {
                            if(error) return next(error);

                            res.render('more', {
                                partials: {header:'header',footer:'footer'},
                                username: req.username,
                                signal : resultSignal,
                                comments :  resultComments,
                                isList : true
                            })
                        });
                    });
                },
                validateComment: function(req, res, next) {
                    var author = req.username,
                        content = req.body.content,
                        id = parseFloat(req.params.id),
                        errors = {};

                    if(author == "")
                        errors.author = "Erreur d'auteur.";
                    if(content == "")
                        errors.author = "Vous devez écrire un contenu.";

                    if(Object.keys(errors).length === 0) {
                        next();    
                    } else {
                        signals.getSignalById(id, function(error, resultSignal) {
                            if(error) return next(error);
                            if(!resultSignal) res.status(400).send("Not found");

                            comments.getCommentsOfSignal(id, 4, function(error, resultComments) {
                                if(error) return next(error);

                                res.render('more', {
                                    partials: {header:'header',footer:'footer'},
                                    username: req.username,
                                    signal : resultSignal,
                                    comments :  resultComments,
                                    isList : true
                                })
                            });
                        });
                    }
                },
                saveComment: function(req, res, next) {
                    var author = req.username,
                        content = req.body.content,
                        id = parseFloat(req.params.id);

                    comments.addCommentToSignal(author, content, id, function(error, result) {
                        if(error) return next(error);
                        res.redirect('/list/' + id);
                    });
                }
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

                        if(result.voters.indexOf(username) > -1) { //username a déjà voté
                            res.status(403).send();
                        } else {
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
                            partials: {header:'header',footer:'footer'},
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
                    author;

                    if(req.username)
                        author = req.username;
                    else
                        author = "Anonyme";

                    signals.addSignal(zone,direction,type,author,description, function(error, result) {
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
