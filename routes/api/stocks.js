var express = require("express");
var router = express.Router();
var stockCtrl = require("../../controllers/stocks");

/* GET users listing. */
router.post("/addwatch", stockCtrl.addWatch);
router.post("/addport", stockCtrl.addPort);
router.delete("/delwatch/:id", stockCtrl.deleteWatch);

module.exports = router;
