const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastName: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: String,
  gender: String,
  city: String,
  state: String,
  country: String,
  bio: String,
  token: {
    type: String,
    required: false,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  order: [{
    type: Schema.Types.ObjectId,
    ref: "Order"
  }]
});

module.exports = mongoose.model("User", userSchema);