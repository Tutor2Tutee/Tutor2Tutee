// Dummy MongoDB server for test purpose
// Do not use this for production level!!!

const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');

let mongoServer;

module.exports.connect = async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }

    await mongoose.connect(uri, mongooseOpts);
}

module.exports.closeDatabase = async () => {
    if (mongoose.connection) {
        await mongoose.connection.dropDatabase();
        await mongoose.disconnect();
    }
    if (mongoServer) {
        await mongoServer.stop();
    }
}

module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
}