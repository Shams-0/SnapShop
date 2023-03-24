require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, { apiVersion: "2022-08-01" });


exports.postCreatePaymentIntent = async (req, res, next) => {
  try {
    const { total } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: total,
      automatic_payment_methods: { enabled: true },
    });

    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
  }
}