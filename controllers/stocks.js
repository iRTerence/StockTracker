const axios = require("axios");

async function addStock(req, res) {
  await console.log(req.body);
}

module.exports = { addStock };
