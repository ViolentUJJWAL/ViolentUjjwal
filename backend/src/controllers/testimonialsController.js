const Testimonial = require('../models/testimonials');


exports.validateTestimonial = (req, res, next) => {
    const { name, roles, company, review } = req.body;
    if (!name || !roles || !company || !review) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    next();
};

exports.addTestimonial = async (req, res) => {
    try {
        const testimonial = new Testimonial(req.body);
        await testimonial.save();
        res.status(201).json(testimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateVerify = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            { verify: true },
            { new: true }
        );
        if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
        res.status(200).json(testimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
        res.status(200).json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};