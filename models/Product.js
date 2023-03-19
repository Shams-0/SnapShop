const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  image: [String],
  colors: [String],
  company: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: String,
  reviews: Number,
  stars: Schema.Types.Decimal128,
  shipping: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Product", productSchema);