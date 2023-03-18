const express = require('express');

const authController = require("../controllers/Auth");

const router = express.Router();

// POST /api/vi/sign-up 
router.post("/sign-up", authController.postSignUp);

// POST /api/vi/login 
router.post("/login", authController.postLogin);

// POST /api/vi/forget-password 
router.post("/forget-password", authController.postForgetPassword);

// POST /api/vi/reset-password 
router.post("/reset-password", authController.postResetPassword);

module.exports = router;