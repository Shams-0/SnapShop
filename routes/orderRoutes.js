const express = require('express');

const orderController = require("../controllers/Order");

const router = express.Router();


router.post("/place-order", orderController.postPlaceOrder);

module.exports = router;