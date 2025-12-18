const { db } = require('../config/firebase');

const collection = db.collection('blogs');

const getAllBlogs = async (req, res) => {
    try {
        const snapshot = await collection.orderBy('createdAt', 'desc').get();
        const blogs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const doc = await collection.doc(id).get();
        if (!doc.exists) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createBlog = async (req, res) => {
    try {
        const newBlog = { ...req.body, createdAt: new Date().toISOString() };
        const docRef = await collection.add(newBlog);
        res.status(201).json({ id: docRef.id, ...newBlog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        await collection.doc(id).update(req.body);
        res.status(200).json({ id, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        await collection.doc(id).delete();
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
