const axios = require("axios");
const User = require("../model/user");

function addWatch(req, res) {
  let ticker = req.body;
  User.findById(req.user._id, async function (err, user) {
    user.watch.push(ticker);
    console.log(user);
    let saved = await user.save();
    res.send(saved);
  });
}

function addPort(req, res) {
  let ticker = req.body;
  User.findById(req.user._id, async function (err, user) {
    user.portfolio.push(ticker);
    console.log(user);
    let saved = await user.save();
    res.send(saved);
  });
}

module.exports = { addWatch, addPort };
