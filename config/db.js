const mongoose = require('mongoose');

const dbUri = 'mongodb+srv://danny:danny_123@cluster0.8yp9gqt.mongodb.net/probando?retryWrites=true&w=majority';

const connection = mongoose.createConnection(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.on('open', () => {
    console.log("MongoDB Connected");
})
.on('error', (error) => {
    console.error("MongoDB Connection error:", error);
});

module.exports = connection;
