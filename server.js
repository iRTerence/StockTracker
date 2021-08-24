const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
let bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var passport = require("passport");
require("./config/passport");

const app = express();
const cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
require("./config/database");
require("dotenv").config();

const userRouter = require("./routes/api/users");
const stockRouter = require("./routes/api/stocks");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded());
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
    successRedirect: "http://localhost:3000",
    failureRedirect: "http://localhost:3000/login",
  })
);

app.get("/getuser", (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

app.use("/api/users", userRouter);
app.use("/api/stocks", stockRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
