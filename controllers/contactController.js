const { db } = require('../config/firebase');

const collection = db.collection('messages');

const sendMessage = async (req, res) => {
    try {
        const messageData = {
            ...req.body,
            createdAt: new Date().toISOString(),
            read: false
        };

        const docRef = await collection.add(messageData);

        // TODO: Integrate Nodemailer or SendGrid here to send email notification
        // e.g. await sendEmail(req.body.email, req.body.message);

        res.status(201).json({ message: 'Message sent successfully', id: docRef.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllMessages = async (req, res) => {
    try {
        const snapshot = await collection.orderBy('createdAt', 'desc').get();
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        await collection.doc(id).update({ read: true });
        res.status(200).json({ message: 'Marked as read' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { sendMessage, getAllMessages, markAsRead };
