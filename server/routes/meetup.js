const express = require("express");
const meetup = express.Router();
const cors = require("cors");
const passport = require("passport");
const MeetupStrategy = require("passport-meetup-oauth2").Strategy;
const User = require("../models/User");
var request = require("request");
var bodyParser = require("body-parser");
var keys = require("../keys.json");
const axios = require("axios");
meetup.use(cors());
meetup.use(passport.initialize());
meetup.use(passport.session());
meetup.use(bodyParser.urlencoded({ extended: false }));
// meetup strategy
var token = "";
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(
  new MeetupStrategy(
    {
      clientID: "",
      clientSecret: "",
      callbackURL: "/meetup/auth/meetup/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // store credentials
      id = require("../keys.json");
      console.log(accessToken);
      console.log(refreshToken);
      var userdbid = keys.userid;
      if (accessToken) {
        url =
          "https://api.meetup.com/2/member/self/?access_token=" + accessToken;
        request(url, function(error, response, body) {
          obj = JSON.parse(body);
          mid = obj.id;

          var id = { _id: userdbid };

          var newvalues = {
            $set: {
              "meetup.token": accessToken,
              "meetup.refreshToken": refreshToken,
              "meetup.status": true,
              "meetup.id": mid,
              firstLogin: false
            }
          };

          User.updateOne(id, newvalues, function(res, err) {
            console.log("1 document updated");
          });
        });
      }

      done(null, profile);
    }
  )
);

//self
meetup.get("/details", (req, res) => {
  userid = req.query._id;

  console.log(userid);
  User.findOne({ _id: userid }, function(err, user) {
    url =
      "https://api.meetup.com/2/member/self/?access_token=" + user.meetup.token;
    //  "https://api.meetup.com/delhincrstartups/events/263890374/rsvps?access_token=" +
    user.meetup.token;
    request(url, function(error, response, body) {
      obj = JSON.parse(body);
      console.log(response);
      if (error) {
        console.log(error);
      } else {
        console.log(obj);

        res.send(obj);
      }
    });
  });
});

//self activity
meetup.get("/eventdetails", (req, res) => {
  userid = req.query._id;

  User.findOne({ _id: userid }, function(err, user) {
    url =
      "https://api.meetup.com/self/events?access_token=" + user.meetup.token;
    request(url, function(error, response, body) {
      obj = JSON.parse(body);

      res.send(obj);
    });
  });
});

//find events
meetup.get("/findevents", (req, res) => {
  userid = req.query._id;

  User.findOne({ _id: userid }, function(err, user) {
    url =
      "https://api.meetup.com/find/upcoming_events?access_token=" +
      user.meetup.token +
      "&page=21&order=best";
    request(url, function(error, response, body) {
      obj = JSON.parse(body);
      res.send(obj);
    });
  });
});

//find groups
meetup.get("/groups", (req, res) => {
  userid = req.query._id;
  // count = req.quert.count;
  User.findOne({ _id: userid }, function(err, user) {
    url =
      "https://api.meetup.com/recommended/groups?access_token=" +
      user.meetup.token +
      "&page=15";
    request(url, function(error, response, body) {
      obj = JSON.parse(body);
      res.send(obj);
    });
  });
});

//rsvp route a9d7df41e14b22efc7d8b719988df50f
meetup.get("/rsvp", (req, res) => {
  // console.log(urlname, eventid, _id);
  User.findOne({ _id: req.query._id }, function(err, user) {
    postrsvp = async () => {
      let post = await axios({
        method: "post",
        url: `https://api.meetup.com/${req.query.urlname}/events/${req.query.eventid}/rsvps/?access_token=${user.meetup.teokn}&response=${req.query.res}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      console.log(post.data);
      res.json(post.data.body);
    };
    postrsvp();
  });
});

meetup.get(
  "/auth/meetup",
  passport.authenticate("meetup", {
    scope: ["ageless", "basic", "rsvp", "profile_edit"]
  })
);

meetup.get(
  "/auth/meetup/callback",
  passport.authenticate("meetup", {
    failureRedirect: "/login"
  }),
  function(req, res) {
    res.redirect("http://localhost:8080/#/user/profile");
  }
);

module.exports = meetup;
