'use strict';

// Fonction constructeur de l'erreur.
var UnknownSignal = function(id) {
    // Appeler le constructeur parent.
    Error.call(this);
    // Initialiser le message correspondant à cette erreur.
    this.message = "Signalement "+id+" inconnu.";
};

// Établir l'héritage UnknownSignal -> Error.
UnknownSignal.prototype = new Error();

// Corriger l'attribut 'constructor', car il pointe vers Error.
UnknownSignal.constructor = UnknownSignal;

module.exports = UnknownSignal;
