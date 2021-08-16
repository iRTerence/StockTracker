var express = require("express");
var router = express.Router();
const User = require("../../model/user");
var stocksCtrl = require("../../controllers/users");
const passport = require("passport");

/* GET users listing. */
// router.post("/googlelogin", stocksCtrl.googleLogin);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

router.get("/getuser", stocksCtrl.getUser);

module.exports = router;
