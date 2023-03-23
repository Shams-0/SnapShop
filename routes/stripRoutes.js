const express = require('express');

const stripeController = require("../controllers/Stripe");

const router = express.Router();

router.get("/config", stripeController.getPublishableKey);

router.post("/create-payment-intent", stripeController.postCreatePaymentIntent);

module.exports = router;