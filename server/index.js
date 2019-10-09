var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const passport = require("passport");
var mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const cookieSession = require("cookie-session");

const hostname = "127.0.0.1";
var port = process.env.PORT || 5000;
var app = express();
app.use(express.static("./dist/spa"));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoURI = "mongodb://localhost:27017/meetify2";

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

var Users = require("./routes/user");

var meetup = require("./routes/meetup");
app.use("/meetup", meetup);

app.use("/users", Users);
app.listen(port, hostname, function() {
  console.log("Server is running on port: " + port);
});
