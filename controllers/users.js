require("dotenv").config();
const User = require("../model/user");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleLogin(req, res) {
  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: req.body.tokeId,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    .then((response) => {
      let { name, email, email_verified } = response.payload;
      let newUser = new User({ name, email });
      newUser.save((err, data) => {});
      req.session.userId = newUser.id;
      res.status(201);
      res.json(newUser);
    });
}

function getUser(req, res) {
  console.log(req.user);
  res.send(req.user);
}

function logOut(req, res) {
  if (req.user) {
    req.logout();
    res.send("done");
  }
}

module.exports = { googleLogin, getUser, logOut };
