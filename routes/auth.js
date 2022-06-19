const express = require('express');
const { route } = require('express/lib/router');
const router = express.Router();
const { register, login, resetPassword, forgetPassword } = require("../controller/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgetpassword").post(forgetPassword);
router.route("/resetpassword/:resetToken").put(resetPassword);

module.exports = router;

