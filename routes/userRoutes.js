const express = require('express');

const userController = require("../controllers/User");


const router = express.Router()

// Get /api/v1/profile/:id
router.get("/profile/:id", userController.getProfile)
router.post("/edit-profile/:id", userController.postEditProfile)

// router.patch("/edit-profile", userController.patchEditPorfile);

module.exports = router;