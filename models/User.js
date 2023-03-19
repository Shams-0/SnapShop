const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: false,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("User", userSchema);