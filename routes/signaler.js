var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signaler', { title: '3' });
});

module.exports = router;
