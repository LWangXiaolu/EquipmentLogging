const express = require('express'),
  router = express.Router(), //#A
  resources = require('./../resources/model');

router.get('/', function (req, res) { //#B

  res.send(resources.sensor);  //#C

});
module.exports = router; //#F
