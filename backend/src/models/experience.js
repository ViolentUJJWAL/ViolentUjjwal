const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
    time: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String },
});

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience