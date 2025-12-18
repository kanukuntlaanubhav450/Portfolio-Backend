const { db } = require('../config/firebase');

const collection = db.collection('services');

const getAllServices = async (req, res) => {
    try {
        const snapshot = await collection.get();
        const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createService = async (req, res) => {
    try {
        const docRef = await collection.add(req.body);
        const newService = await docRef.get();
        res.status(201).json({ id: docRef.id, ...newService.data() });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        await collection.doc(id).update(req.body);
        res.status(200).json({ id, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        await collection.doc(id).delete();
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllServices, createService, updateService, deleteService };
