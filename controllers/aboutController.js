const { db } = require('../config/firebase');

const collection = db.collection('about');

// About is usually a single document, so we can treat it as such or a collection.
// For simplicity, we'll fetch the first document or create one if not exists.
const getAbout = async (req, res) => {
    try {
        const snapshot = await collection.limit(1).get();
        if (snapshot.empty) {
            return res.status(200).json({});
        }
        const doc = snapshot.docs[0];
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAbout = async (req, res) => {
    try {
        const snapshot = await collection.limit(1).get();
        if (snapshot.empty) {
            // Create new
            const docRef = await collection.add(req.body);
            const newAbout = await docRef.get();
            return res.status(201).json({ id: docRef.id, ...newAbout.data() });
        } else {
            // Update existing
            const doc = snapshot.docs[0];
            await collection.doc(doc.id).update(req.body);
            res.status(200).json({ id: doc.id, ...req.body });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAbout, updateAbout };
