const express = require('express');

const productContorller = require("../controllers/Product")

const router = express.Router();

// POST /api/vi/admin/add-product  
router.post("/admin/add-product", productContorller.postAddProduct);

// get /api/vi/products  
router.get("/products", productContorller.getAllProducts);

// get /api/vi/product
router.get("/product/:id", productContorller.getProduct);

module.exports = router;