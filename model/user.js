const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchSchema = new Schema({
  ticker: {
    type: String,
    require: true,
    unique: true,
  },
});

const portSchema = new Schema({
  ticker: {
    type: String,
    require: true,
  },
  value: {
    type: Number,
    default: 0,
  },
  ammount: {
    type: Number,
  },
});

const userSchema = new Schema({
  watch: [watchSchema],
  portfolio: [portSchema],
  googleId: String,
  name: String,
  email: String,
});

module.exports = mongoose.model("User", userSchema);
