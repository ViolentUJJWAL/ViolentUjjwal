const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
    icon: {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
    },
    name: { type: String, required: true },
});

const Skill = mongoose.model("Skill", skillsSchema);
module.exports = Skill