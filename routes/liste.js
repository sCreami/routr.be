var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('liste', { title: '2' });
});

module.exports = router;
