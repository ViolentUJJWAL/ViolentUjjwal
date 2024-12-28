const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
    },
    liveLink: { type: String },
    gitLink: { type: String },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project