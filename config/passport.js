const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const Stocks = require("../model/user");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "509611698431-7bdm59euoq3bdbql5jcusf0tvqu6c718.apps.googleusercontent.com",
      clientSecret: "QWeXjVMB0hp08P6sm1CFlqFi",
      callbackURL: "/auth/google/callback",
    },

    function (accessToken, refreshToken, profile, cb) {
      Stocks.findOne({ googleId: profile.id }, function (err, stock) {
        if (err) return cb(err);
        if (stock) {
          return cb(null, stock);
        } else {
          var newStocks = new Stocks({
            name: profile.name.givenName,
            googleId: profile.id,
          });
          newStocks.save(function (err) {
            console.log(profile.id);
            if (err) return cb(err);
            return cb(null, newStocks);
          });
        }
      });
    }
  )
);

passport.serializeUser(function (stocks, done) {
  done(null, stocks.id);
});

passport.deserializeUser(function (id, done) {
  Stocks.findById(id, function (err, stocks) {
    done(err, stocks);
  });
});
