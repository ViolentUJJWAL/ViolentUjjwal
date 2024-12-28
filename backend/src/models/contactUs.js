const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, match: /.+\@.+\..+/ },
  message: { type: String, required: true },
  response: { type: String, default: null }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact