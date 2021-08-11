const User = require("../model/user");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "509611698431-7bdm59euoq3bdbql5jcusf0tvqu6c718.apps.googleusercontent.com"
);

async function googleLogin(req, res) {
  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: req.body.tokeId,
      audience:
        "509611698431-7bdm59euoq3bdbql5jcusf0tvqu6c718.apps.googleusercontent.com",
    })
    .then((response) => {
      let { name, email, email_verified } = response.payload;
      let newUser = new User({ name, email });
      newUser.save((err, data) => {
        // console.log(err);
      });
      req.session.userId = newUser.id;
      res.status(201);
      res.json(newUser);
    });
}

module.exports = { googleLogin };
