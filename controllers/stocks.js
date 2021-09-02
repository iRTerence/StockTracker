const axios = require("axios");
const User = require("../model/user");

async function editPortfolio(req, res) {
  console.log(req.body);
  console.log(req.params.id);
  User.findOne({
    "portfolio._id": req.params.id,
  })
    .then((stock) => {
      let newStock = stock.portfolio.id(req.params.id);
      newStock.average = req.body.average;
      newStock.holdings = req.body.holdings;
      return stock.save();
    })
    .then((data) => {
      res.send(data);
    });
}

async function deleteWatch(req, res) {
  //used mongoose method to find and delete the item based on the req.params.id (the mongoose id for each stock)
  User.findOneAndUpdate(
    { "watch._id": req.params.id },
    {
      $pull: { watch: { _id: req.params.id } },
    },
    { new: true },
    function (err, doc) {
      console.log(err, doc);
      res.send(doc);
    }
  );
}

async function deletePortfolio(req, res) {
  //used mongoose method to find and delete the item based on the req.params.id (the mongoose id for each stock)
  User.findOneAndUpdate(
    { "portfolio._id": req.params.id },
    {
      $pull: { portfolio: { _id: req.params.id } },
    },
    { new: true },
    function (err, doc) {
      console.log(err, doc);
      res.send(doc);
    }
  );
}

//Adds to the logged in user watch list
function addWatch(req, res) {
  let ticker = req.body;
  User.findById(req.user._id, async function (err, user) {
    user.watch.push(ticker);
    console.log(user);
    let saved = await user.save();
    res.send(saved);
  });
}

//Adds to the logged in user portfolio list
function addPort(req, res) {
  let ticker = req.body;
  User.findById(req.user._id, async function (err, user) {
    user.portfolio.push(ticker);
    console.log(user);
    let saved = await user.save();
    res.send(saved);
  });
}

module.exports = {
  addWatch,
  addPort,
  deleteWatch,
  deletePortfolio,
  editPortfolio,
};
