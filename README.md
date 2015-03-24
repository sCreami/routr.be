![dependancies](https://david-dm.org/sCreami/routr.be.svg)

# Routr.be
La liste coopérative des dérangements sur les grands axes routiers belges.

<p align="center">
  <img src="http://i.imgur.com/E1YMjBT.png"/>
</p>

## A respecter ##
- Les fichiers doivent être encodé en utf-8.
- Le code doit être suffisement indenté.
- Une tabulation représente 4 espaces.
- Toutes les tabulations doivent être converties en espace.
- Tout apport majeur tel que l'ajout d'un framework ou redesign doit d'abord être integré sur une branche séparée.
- Utiliser les classes de bootstrap de mise en forme pour ne pas casser l'aspect _responsive_.

## Installation ##
> Testé sous Debian GNU/Linux 7 Wheezy
> 
- S'assurer de posséder build-essential `sudo apt-get install -y build-essential`
- Effectuer `sudo npm install` avec les droits pour résoudre les erreures
- Lancer la webapp grâce à `node app`

## Dépendance ##
- body-parser : ^1.12.0
- consolidate : ^0.11.0
- cookie-parser : ^1.3.4
- express : ^4.12.2
- hogan.js : ^3.0.2
- method-override : ^2.3.1
- mongodb : ^1.4.34
- morgan : ^1.5.1
