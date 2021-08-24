var express = require("express");
var router = express.Router();
var stockCtrl = require("../../controllers/stocks");

/* GET users listing. */
router.post("/add", stockCtrl.addStock);

module.exports = router;
