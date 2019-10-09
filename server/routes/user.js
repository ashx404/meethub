const express = require("express");
const users = express.Router();
var app = express();
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const MeetupStrategy = require("passport-meetup-oauth2").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const session = require("express-session");
var bodyParser = require("body-parser");
const User = require("../models/User");
const fs = require("fs");
var tokenAuth = "";

//middleware
users.use(cors());
process.env.SECRET_KEY = "s!dsf---bruhd@$XX$";

users.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "!@@@DsRRX33$"
  })
);

users.use(passport.initialize());
users.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  User.findById(_id).then(user => {
    done(null, user);
  });
});

//Twitter strategy
passport.use(
  new TwitterStrategy(
    {
      consumerKey: "",
      consumerSecret: "",
      callbackURL: "http://127.0.0.1:5000/users/auth/twitter/callback",
      userProfileURL:
        "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true"
    },
    function(token, tokenSecret, profile, done) {
      User.findOne({ "twitter.email": profile.emails[0].value }).then(
        currentUser => {
          if (currentUser) {
            done(null, currentUser);
          } else {
            const today = new Date();
            let y = profile.photos[0].value.replace("_normal", "");
            const data = {
              twitter: {
                id: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName
              },
              Avatar: y,

              created: today
            };
            User.create(data)
              .then(newUser => {
                console.log("New user created:" + newUser);
                done(null, newUser);
              })
              .catch(err => {
                console.log(err);
              });
          }
        }
      );
    }
  )
);

//google strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: "",
      clientSecret: "",
      callbackURL: "/users/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ "google.email": profile.emails[0].value }).then(
        currentUser => {
          if (currentUser) {
            console.log("User", currentUser);
            done(null, currentUser);
          } else {
            const today = new Date();
            const data = {
              google: {
                id: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName
              },
              Avatar: profile.photos[0].value,
              created: today
            };
            User.create(data)
              .then(newUser => {
                console.log("New user created:" + newUser);

                done(null, newUser);
              })
              .catch(err => {
                console.log(err);
              });
          }
        }
      );
    }
  )
);

//passport local strategy

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne(
      {
        username: username
      },
      function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }

        if (user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      }
    );
  })
);

//auth routes
//twitter auth routes
users.get("/auth/twitter", passport.authenticate("twitter"));

users.get(
  "/auth/twitter/callback",

  passport.authenticate("twitter", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.

    const payload = {
      _id: req.user._id,
      name: req.user.twitter.name,
      email: req.user.twitter.email,
      avatar: req.user.Avatar
    };
    let token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7d"
    });

    tokenAuth = { grantToken: token, firstLogin: req.user.firstLogin };
    console.log(tokenAuth);
    res.redirect("http://localhost:8080/#/api/auth");
  }
);

//google auth routes

users.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);

users.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    const payload = {
      _id: req.user._id,
      name: req.user.google.name,
      email: req.user.google.email,
      firstLogin: req.user.firstLogin,
      avatar: req.user.Avatar
    };
    let token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7d"
    });
    tokenAuth = { grantToken: token, firstLogin: req.user.firstLogin };
    console.log(tokenAuth);
    res.redirect("http://localhost:8080/#/api/auth");
  }
);

//after twitter and google profile route

users.get("/verify", (req, res) => {
  console.log(req.query);
  jwt.verify(req.query.token, process.env.SECRET_KEY, function(err, decoded) {
    if (err) {
      console.log(err);
      res.send({ status: 3000 });
    } else {
      res.send({ status: 6000 });
    }
  });
});

users.get("/status", (req, res) => {
  console.log(req.query.token);
  jwt.verify(req.query.token, process.env.SECRET_KEY, function(err, decoded) {
    if (err) {
      console.log(err);
      res.send({ status: 3000 });
    } else {
      console.log(decoded);
      const user = {
        userid: decoded._id
      };
      const jsonString = JSON.stringify(user);
      console.log("Updating id");
      fs.writeFile("./keys.json", jsonString, err => {
        if (err) {
          console.log("Error writing file", err);
        } else {
          console.log("Successfully wrote file");
        }
      });
      User.findOne({ _id: decoded._id }, function(err, user) {
        console.log(user.firstLogin);
        obj = { firstLogin: user.firstLogin, status: 6000 };
        console.log(obj);
        res.send(obj);
      });
    }
  });
});

users.get("/social", (req, res) => {
  if (!tokenAuth) {
    res.send({ status: 3000 });
  } else {
    res.send(tokenAuth);
  }
});

//user register (local)
users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.email,
    password: req.body.password,
    created: today
  };

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        User.create(userData)
          .then(user => {
            res.json({
              status: user.email + " registered",
              register: true
            });
          })
          .catch(err => {
            res.send("error: " + err);
          });
      } else {
        res.json({
          message: "User already exists",
          register: false
        });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

//user login (local)
users.post("/login", (req, res, next) => {
  return passport.authenticate("local", (err, passportUser, info) => {
    if (err) {
      return next(err);
    }

    let firstlog = false;
    if (passportUser) {
      const user = passportUser;
      firstlog = user.firstLogin;
      const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.Avatar
      };
      let token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "7d"
      });
      tokenAuth = { grantToken: token, firstLog: firstlog };
      res.json(tokenAuth);
    } else {
      res.json({ message: "User invalid" });
    }
  })(req, res, next);
});

module.exports = users;
