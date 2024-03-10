const express = require("express");
const controller = require('../controllers/usercontroller');
const router = express.Router();

router.post("/login", controller.postLogin);
router.post("/register", controller.postRegister);

module.exports = router;