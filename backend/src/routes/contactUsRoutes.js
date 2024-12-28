const express = require('express');
const router = express.Router();
const { addContact, updateResponse, deleteContact, validateContact, getContact } = require('../controllers/contactUsController');
const jwtToken = require('../../middlewares/jwtToken');

router.post('/', validateContact, addContact);
router.get('/',jwtToken, getContact);
router.patch('/:id/response',jwtToken, updateResponse);
router.delete('/:id',jwtToken, deleteContact);

module.exports = router;