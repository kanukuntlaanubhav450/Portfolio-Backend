const { db } = require('../config/firebase');

const collection = db.collection('skills');

const getAllSkills = async (req, res) => {
    try {
        const snapshot = await collection.get();
        const skills = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createSkill = async (req, res) => {
    try {
        const docRef = await collection.add(req.body);
        const newSkill = await docRef.get();
        res.status(201).json({ id: docRef.id, ...newSkill.data() });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSkill = async (req, res) => {
    try {
        const { id } = req.params;
        await collection.doc(id).update(req.body);
        res.status(200).json({ id, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;
        await collection.doc(id).delete();
        res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllSkills, createSkill, updateSkill, deleteSkill };
