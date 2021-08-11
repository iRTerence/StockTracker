var express = require("express");
var router = express.Router();
const User = require("../../model/user");
var stocksCtrl = require("../../controllers/users");

/* GET users listing. */
router.post("/googlelogin", stocksCtrl.googleLogin);

router.use(async (req, res, next) => {
  const loggedInUser = await User.find({ id: req.session.userId });
  req.user = loggedInUser;
  next();
});

router.delete("/googlelogout", async (req, res) => {
  await req.session.destroy();
  res.status(200);
  res.json({
    message: "Logged out successfully",
  });
});

module.exports = router;
