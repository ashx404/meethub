const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  date: {
    type: Date,
    default: () => Date.now() + 5.5 * 60 * 60 * 1000
  },
  Avatar: {
    type: String,
    default:
      " https://enterfind.files.wordpress.com/2013/05/windows8_account_picture.png"
  },
  firstLogin: { type: Boolean, default: true },

  google: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  meetup: {
    status: { type: Boolean, default: false },
    token: { type: String, default: " " },
    refreshToken: { type: String, default: " " },
    id: { type: String, default: " " }
  }
});

mongoose.model("User", UserSchema);
module.exports = mongoose.model("User");
