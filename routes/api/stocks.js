var express = require("express");
var router = express.Router();
var stockCtrl = require("../../controllers/stocks");

/* GET users listing. */
router.post("/addwatch", stockCtrl.addWatch);
router.post("/addport", stockCtrl.addPort);

module.exports = router;
