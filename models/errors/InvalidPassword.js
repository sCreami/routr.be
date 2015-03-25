'use strict';

// Fonction constructeur de l'erreur.
var InvalidPasswordError = function(username) {
    // Appeler le constructeur parent.
    Error.call(this);
    // Initialiser le message correspondant à cette erreur.
    this.message = "Mot de passe incorrect pour " + username;
};

// Établir l'héritage InvalidPasswordError -> Error.
InvalidPasswordError.prototype = new Error();

// Corriger l'attribut 'constructor', car il pointe vers Error.
InvalidPasswordError.constructor = InvalidPasswordError;

module.exports = InvalidPasswordError;
