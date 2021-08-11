var express = require("express");
var router = express.Router();
var stocksCtrl = require("../../controllers/users");

/* GET users listing. */
router.post("/login", stocksCtrl.login);

module.exports = router;
