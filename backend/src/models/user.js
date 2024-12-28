const mongoose = require('mongoose');
// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        immmutable: true,
    },
    description1: {
        type: String,
        required: [true, 'Description1 is required'],
    },
    description2: {
        type: String,
        required: [true, 'Description2 is required'],
    },
    description3Myjourney: {
        type: String,
        required: [true, 'Description3 is required'],
    },
    roles: {
        type: [String],
        required: [true, 'Roles are required'],
    },
    githubLink: {
        type: String,
        required: [true, 'GitHub link is required'],
        validate: {
            validator: (v) => /^https:\/\/github\.com\/.+/.test(v),
            message: 'Invalid GitHub link',
        },
    },
    linkedinLink: {
        type: String,
        required: [true, 'LinkedIn link is required'],
        validate: {
            validator: (v) => /^https:\/\/www\.linkedin\.com\/.+/.test(v),
            message: 'Invalid LinkedIn link',
        },
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: (v) => /\S+@\S+\.\S+/.test(v),
            message: 'Invalid email format',
        },
    },
    phoneNumaber: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: (v) => /^\d{10}$/.test(v),
            message: 'Phone number must be 10 digits',
        },
    },
    resume: {
        type: String,
        required: [true, 'Resume link is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    otp: {
        type: String,
    },
    otpExpire: {
        type: Date
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;