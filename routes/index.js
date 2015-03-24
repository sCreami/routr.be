'use strict';

var express = require('express'),
    path = require('path');

module.exports = exports = function(app) {

    var handlers = {
        session: require('./session')(app),
        content: require('./content')(app),
        error: require('./error')
    };

    app.use(handlers.session.authentication.check);

    // Index
    app.get('/', handlers.content.home);

    // liste
    app.get('/list', handlers.content.list.default);
    app.get('/list/:id', handlers.content.list.more);
    //app.get('/list/up/:id', handlers.content.list.more);
    //app.get('/list/down/:id', handlers.content.list.more);

    // Signalement
    app.get('/signal', handlers.content.signal.form);
    app.post('/signal', handlers.content.signal.validate);
    app.post('/signal', handlers.content.signal.save);

    // Enregistrement
    app.get('/signup', handlers.session.signup.input);
    app.post('/signup', handlers.session.signup.validate);
    app.post('/signup', handlers.session.signup.perform);

    // Connexion
    app.get('/login', handlers.session.login.input);
    app.post('/login', handlers.session.login.perform);

    // Mon compte
    app.get('/account', handlers.content.account.form);
    app.post('/account', handlers.session.account.validate);
    app.post('/account', handlers.session.account.save);

    // Déconnexion
    app.get('/logout', handlers.session.logout.perform);

    // Contact
    app.get('/contact', handlers.content.contact);

    app.use(express.static(app.get("views")));

    app.use(handlers.error);
};
