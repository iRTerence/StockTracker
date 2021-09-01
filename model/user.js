const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchSchema = new Schema({
  ticker: {
    type: String,
    unique: true,
  },
});

const portSchema = new Schema({
  ticker: {
    type: String,
    require: true,
    unique: true,
  },
  average: {
    type: Number,
    default: 0,
  },
  holdings: {
    type: Number,
    default: 0,
  },
});

const userSchema = new Schema({
  watch: [watchSchema],
  portfolio: [portSchema],
  googleId: String,
  name: String,
});

module.exports = mongoose.model("User", userSchema);
