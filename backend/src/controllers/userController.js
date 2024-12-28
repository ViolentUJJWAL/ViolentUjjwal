const hashPassword = require("../../utils/password");
const User = require("../models/user");
const bcrypt = require("bcryptjs")
const Skill = require("../models/skills");
const Experience = require("../models/experience");
const Project = require("../models/project");
const Testimonial = require("../models/testimonials");
const Contact = require("../models/contactUs");

exports.getProfile = async (req, res)=>{
    try {
        const user = await User.findById(req.user._id);
        user.password = "*****"
        return res.status(200).json({data: user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "error in sendotp"})
    }
}

exports.updateUser = async (req, res) => {
    try {
        const userId  = req.user._id;
        const updates = req.body;

        if (updates.password) {
            delete updates.password;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const userId  = req.user._id;
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        user.password = await hashPassword(newPassword);
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Seed Function
exports.seedUsers = async () => {
    try {
        const user = new User({
            name: "Ujjwal Kumar",
            username: "violentUjjwal",
            description1: "I'm a passionate web developer with expertise in React, Next.js, and modern web technologies. I love creating beautiful and functional website that solve real world problems.",
            description2: "A Full-Stack Developer with expertise in web development, WordPress, SEO, and the MERN stack.",
            description3Myjourney: "I started my journey in web development with a passion for creating intuitive and scalable applications. With proficiency in the MERN stack (MongoDB, Express.js, React, and Node.js), I have built Projects such as a full-stack food ordering website , a job portal, and even a LinkedIn clone. My projects demonstrate my ability to integrate powerful backend solutions with sleek, user-friendly frontend designs.",
            roles: ["Full Stack Developer", "Backend Developer"],
            githubLink: "https://github.com/ViolentUJJWAL",
            linkedinLink: "https://www.linkedin.com/in/violentujjwal",
            email: "ujjwal@gmail.com",
            phoneNumaber: "9999999999",
            resume: "https://drive.google.com/",
            password: await hashPassword("****"),
        });

        await user.save();
        console.log('User seeded successfully');
    } catch (error) {
        console.error('Error seeding user:', error.message);
    }
};

exports.getAllDataforUser = async (req, res)=>{
    try {
        const user = await User.findOne({username: "violentUjjwal"})
        const skill = await Skill.find()
        const experience = await Experience.find()
        const project = await Project.find()
        const testimonials = await Testimonial.find({verify: true})
        res.status(200).json({user, skill, experience, project, testimonials})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getAllDataforAdmin = async (req, res)=>{
    try {
        const user = await User.findOne({username: "violentUjjwal"})
        const skill = await Skill.find()
        const experience = await Experience.find()
        const project = await Project.find()
        const testimonials = await Testimonial.find()
        const contactUs = await Contact.find()
        res.status(200).json({user, skill, experience, project, testimonials,contactUs})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}