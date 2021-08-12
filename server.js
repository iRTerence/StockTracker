const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var passport = require("passport");
require("./config/passport");

const app = express();

require("./config/database");
require("dotenv").config();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));
app.use(cookieParser());
app.use(
  session({
    secret: "SEIRocks!",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

app.use("/api/users", require("./routes/api/users"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
