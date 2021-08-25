const axios = require("axios");
const User = require("../model/user");

function addStock(req, res) {
  let ticker = req.body;
  User.findById(req.user._id, async function (err, user) {
    user.watch.push(ticker);
    console.log(user);
    let saved = await user.save();
    res.send(saved);
  });
  // let savedUser = await user.save();
  // console.log(`User: ${user.watch}`);
}

module.exports = { addStock };
