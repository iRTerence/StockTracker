var express = require("express");
var router = express.Router();
const User = require("../../model/user");
var userCtrl = require("../../controllers/users");
const passport = require("passport");

router.post("/add", function (req, res) {
  console.log(req.body);
});

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

router.get("/getuser", userCtrl.getUser);

router.get("/logout", userCtrl.logOut);

module.exports = router;
