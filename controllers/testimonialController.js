const { db } = require('../config/firebase');

const collection = db.collection('testimonials');

const getAllTestimonials = async (req, res) => {
    try {
        const snapshot = await collection.get();
        const testimonials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTestimonial = async (req, res) => {
    try {
        const docRef = await collection.add(req.body);
        const newTestimonial = await docRef.get();
        res.status(201).json({ id: docRef.id, ...newTestimonial.data() });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        await collection.doc(id).update(req.body);
        res.status(200).json({ id, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        await collection.doc(id).delete();
        res.status(200).json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };
