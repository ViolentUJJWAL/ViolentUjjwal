const express = require('express');
const router = express.Router();
const { addTestimonial, updateVerify, deleteTestimonial,validateTestimonial } = require('../controllers/testimonialsController');
const jwtToken = require('../../middlewares/jwtToken');

router.post('/', validateTestimonial, addTestimonial);
router.patch('/:id/verify',jwtToken, updateVerify);
router.delete('/:id',jwtToken, deleteTestimonial);

module.exports = router;