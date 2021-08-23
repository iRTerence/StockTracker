var express = require("express");
var router = express.Router();
var stockCtrl = require("../../controllers/stocks");

/* GET users listing. */
router.post("/add", function (req, res) {
  console.log(req.body);
});

module.exports = router;
