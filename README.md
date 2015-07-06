# Routr.be [![Build Status](https://magnum.travis-ci.com/sCreami/routr.be.svg?token=yaRgVH99sKCMGz5Yvg8s&branch=node.js)](https://magnum.travis-ci.com/sCreami/routr.be) [![Dependency Status](https://david-dm.org/sCreami/routr.be.svg)](https://david-dm.org/sCreami/routr.be) [![devDependency Status](https://david-dm.org/sCreami/routr.be/dev-status.svg)](https://david-dm.org/sCreami/routr.be#info=devDependencies)
La liste coopérative des dérangements sur les grands axes routiers belges.

<p align="center">
  <img src="http://i.imgur.com/E1YMjBT.png"/>
</p>

## Avant de pusher
- Les fichiers doivent être encodés en utf-8.
- Le code doit être suffisement indenté.
- Une tabulation représente 4 espaces.
- Toutes les tabulations doivent être converties en espace.
- Utiliser les classes de bootstrap de mise en forme pour ne pas casser l'aspect _responsive_.
- Tout apport majeur tel que l'ajout d'un framework ou redesign doit d'abord être integré sur une branche séparée.

## Installation
> Testé sous Debian GNU/Linux 7 Wheezy avec <br>
> node.js : **0.10.37** et npm : **1.4.28**

- S'assurer de posséder build-essential `sudo apt-get install -y build-essential`
- Effectuer `sudo npm install --production` avec les droits pour résoudre les erreures
- Lancer la webapp grâce à `npm start`

## Dépendances
- node.js 0.10.37
- express 4.12.3
- mongodb 3.0
- angularJS 1.3.15
