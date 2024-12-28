const express = require('express');
const { updateUser, updatePassword, getProfile, getAllDataforAdmin, getAllDataforUser } = require('../controllers/userController');
const jwtToken = require('../../middlewares/jwtToken');
const router = express.Router();

router.get("/", jwtToken, getProfile)
router.get("/user", getAllDataforUser)
router.get("/admin",jwtToken, getAllDataforAdmin)
// Update User Details
router.put('/', jwtToken, updateUser);
// Update User Password
router.put('/password', jwtToken, updatePassword);

module.exports = router;