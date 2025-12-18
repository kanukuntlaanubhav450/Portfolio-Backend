const { storage } = require('../config/firebase');
const multer = require('multer');

// Configure Multer to store in memory
const upload = multer({ storage: multer.memoryStorage() });

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const bucket = storage.bucket();
        const filename = `uploads/${Date.now()}_${req.file.originalname}`;
        const file = bucket.file(filename);

        const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
            },
        });

        stream.on('error', (e) => {
            console.error(e);
            res.status(500).json({ message: e.message });
        });

        stream.on('finish', async () => {
            try {
                // Make the file public and get the URL
                await file.makePublic();
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
                res.status(200).json({ url: publicUrl });
            } catch (error) {
                console.error("Error making file public:", error);
                res.status(500).json({ message: "Failed to generate public URL: " + error.message });
            }
        });

        stream.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { upload, uploadImage };
