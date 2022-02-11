const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt; //to extract token from req object
const jwt = require("jsonwebtoken"); //to sign and verify tokens

const config = require("./config.js");

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => {
  //user object
  return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

//configure the web token strategy for passport
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("JWT payload: ", jwt_payload);
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false); //false, no user found
      } else if (user) {
        return done(null, user); //passport loads user info to req object
      } else {
        return done(null, false); //no err, no user match
      }
    });
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });

exports.verifyAdmin = function (req, res, next) {
  if (req.user.admin === true) {
    return next();
  } else {
    const err = new Error(
      "You do not have the proper permissions to perform this operation!"
    );
    err.status = 403;
    return next(err);
  }
};