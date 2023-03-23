require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, { apiVersion: "2022-08-01" });

exports.getPublishableKey = async (req, res, next) => {
  res.status(200).json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
}

exports.postCreatePaymentIntent = async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: 20099,
      automatic_payment_methods: { enabled: true },
    });
    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
  }
}