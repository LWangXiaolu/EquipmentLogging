const express = require('express'),
  router = express.Router(),
  resources = require('./../resources/model');

router.get('/', function (req, res) {
  res.send(resources.sensor);
});
module.exports = router;
