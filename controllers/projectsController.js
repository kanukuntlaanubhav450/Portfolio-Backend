const { db } = require('../config/firebase');

const collection = db.collection('projects');

const getAllProjects = async (req, res) => {
    try {
        const snapshot = await collection.get();
        const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProject = async (req, res) => {
    try {
        const docRef = await collection.add(req.body);
        const newProject = await docRef.get();
        res.status(201).json({ id: docRef.id, ...newProject.data() });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        await collection.doc(id).update(req.body);
        res.status(200).json({ id, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        await collection.doc(id).delete();
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllProjects, createProject, updateProject, deleteProject };
