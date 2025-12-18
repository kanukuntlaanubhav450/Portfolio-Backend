const { db } = require('../config/firebase');

const collection = db.collection('experience');

const getAllExperience = async (req, res) => {
    try {
        // Sort logic can be added here or client side
        const snapshot = await collection.get();
        const experiences = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(experiences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createExperience = async (req, res) => {
    try {
        const docRef = await collection.add(req.body);
        const newExp = await docRef.get();
        res.status(201).json({ id: docRef.id, ...newExp.data() });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        await collection.doc(id).update(req.body);
        res.status(200).json({ id, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;
        await collection.doc(id).delete();
        res.status(200).json({ message: 'Experience deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllExperience, createExperience, updateExperience, deleteExperience };
