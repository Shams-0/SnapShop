const Order = require("../models/Order");

exports.postPlaceOrder = async (req, res, next) => {
  try {

    const { cart, id, total } = req.body;
    console.log("Cart: ", cart);
    console.log("Id: ", id);

    // const orderObject = {product: };
    const products = cart.map(item => ({ product: item.id, quantity: item.amount }));

    const order = new Order({ products: products, total: total, userId: id });
    await order.save();

    return res.status(201).json({ message: "Your order successfully placed!" })
  } catch (error) {
    console.log(error);
  }
}