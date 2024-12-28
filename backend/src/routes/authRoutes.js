const express = require('express');
const { sendOtp, verifyOtp, logout } = require('../controllers/authController');
const router = express.Router();

// Update User Details
router.post("/login/send-otp", sendOtp);
router.post("/login/verify-otp", verifyOtp);
router.get("/logout", logout);

module.exports = router;