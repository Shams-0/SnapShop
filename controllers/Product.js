const Product = require("../models/Product")

// Handle Add Product Post Request
exports.postAddProduct = async (req, res, next) => {
  try {
    const { products } = req.body;

    await Product.insertMany(products);

    return res.status(201).json({ message: "Products successfully added." });

  } catch (error) {
    console.log(error);
  }
}

// Handle Products get Request
exports.getAllProducts = async (req, res, next) => {
  try {

    const products = await Product.find();
    return res.status(201).json(products);

  } catch (error) {
    console.log(error);

  }
}

// Handle Products get Request
exports.getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);
    return res.status(201).json(product);

  } catch (error) {
    console.log(error);

  }
}
