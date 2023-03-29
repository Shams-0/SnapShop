const express = require('express');

const userController = require("../controllers/User");


const router = express.Router()

router.patch("/edit-profile", userController.patchEditPorfile);

module.exports = router;