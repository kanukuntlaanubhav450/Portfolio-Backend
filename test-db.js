
const { admin, db } = require('./config/firebase');

async function testConnection() {
    try {
        console.log("Testing Firestore connection...");
        const collections = await db.listCollections();
        console.log("Collections:", collections.map(c => c.id));

        if (collections.length === 0) {
            console.log("No collections found. Creating initial collections...");
            await db.collection('testimonials').add({
                name: "Test User",
                role: "Tester",
                quote: "Initial test quote",
                createdAt: new Date().toISOString()
            });
            await db.collection('blogs').add({
                title: "Test Blog",
                summary: "This is a test blog",
                content: "Test content",
                createdAt: new Date().toISOString()
            });
            console.log("Initial collections created.");
        } else {
            console.log("Collections exist.");
        }
        process.exit(0);
    } catch (error) {
        console.error("Connection failed:", error);
        process.exit(1);
    }
}

testConnection();
