const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    unique: true, //server side check
  },
  email: {
    type: String,
    unique: true, //server side check
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);