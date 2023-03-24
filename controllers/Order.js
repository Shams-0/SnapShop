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


[
  {
    id: '641760ff97516a15de4d60b3',
    name: 'accent chair',
    mainColor: '#00ff00',
    amount: 3,
    image: 'https://images.unsplash.com/photo-1416339684178-3a239570f315?auto=format&fit=crop&w=400&q=80',
    price: 25999,
    max: 4
  },
  {
    id: '641760ff97516a15de4d60b4',
    name: 'albany sectional',
    mainColor: '#000',
    amount: 2,
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=400&q=80',
    price: 109999,
    max: 4
  },
  {
    id: '641760ff97516a15de4d60b9',
    name: 'entertainment center',
    mainColor: '#000',
    amount: 1,
    image: 'https://images.unsplash.com/photo-1611755489400-3c53602ab783?auto=format&fit=crop&w=400&q=80',
    price: 59999,
    max: 4
  }
]