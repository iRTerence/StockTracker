var express = require("express");
var router = express.Router();
const User = require("../../model/user");
var stocksCtrl = require("../../controllers/users");
const passport = require("passport");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

router.get("/getuser", stocksCtrl.getUser);

router.get("/logout", stocksCtrl.logOut);

module.exports = router;
