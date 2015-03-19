var express = require('express');
var router = express.Router();

// Connection URL
var url = 'mongodb://10.211.55.21:27017/routr';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to database in signaler");

  router.get('/', function(req, res, next) {
  	res.render('signaler', db);
	});

  db.close();
});

module.exports = router;