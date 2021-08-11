const User = require("../model/user");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

async function login(req, res) {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });

  const { name, email, picture } = ticket.getPayload();
  const newUser = new User({
    name: name,
  });
  req.session.userId = newUser.id;
  res.status(201);
  res.json(newUser);
}

module.exports = { login };
