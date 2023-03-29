const Order = require("../models/Order");
const User = require("../models/User");

exports.postPlaceOrder = async (req, res, next) => {
  try {

    const { cart, id, total } = req.body;
    console.log("Cart: ", cart);
    console.log("Id: ", id);

    // const orderObject = {product: };
    const products = cart.map(item => ({ product: item.id, quantity: item.amount }));

    const order = new Order({ products: products, total: total, userId: id });
    const user = await User.findById(id);

    user.order.push(order._id);

    await order.save();
    await user.save();

    return res.status(201).json({ message: "Your order successfully placed!" })
  } catch (error) {
    console.log(error);
  }
}

exports.getOrder = async (req, res, next) => {
  const user = await User.findById("6421f63c7e66881b64d4f9f6").populate('order');
  res.status(201).json({ order: user.order })
}