const User = require("../model/user");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

async function googleLogin(req, res) {
  const { tokenId } = req.body;
}

module.exports = { googleLogin };
