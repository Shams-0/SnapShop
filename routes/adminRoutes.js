const express = require('express');

const adminController = require("../controllers/Admin")

const router = express.Router();


router.get("/products", adminController.getProducts);

module.exports = router;