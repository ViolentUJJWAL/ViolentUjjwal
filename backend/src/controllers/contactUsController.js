const Contact = require('../models/contactUs');
const sendEmail = require("../../utils/sendMail")

exports.getContact = async (req, res) =>{
    try {
       const contact = await Contact.find()
        res.status(200).json({contact})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.addContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    await sendEmail(contact.email, 'Contact Received', 'Thank you for contacting us.');
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateResponse = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { response: req.body.response },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    await sendEmail(contact.email, 'Response to Your Query', contact.response);
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.validateContact = (req, res, next) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  next();
};