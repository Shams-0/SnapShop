const express = require('express');

const userController = require("../controllers/User");
const upload = require("../middlewares/multer");


const router = express.Router()

router.patch("/edit-profile", upload.single("image"), userController.patchEditPorfile);

module.exports = router;