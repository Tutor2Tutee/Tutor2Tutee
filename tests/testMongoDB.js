// Dummy MongoDB server for test purpose
// Do not use this for production level!!!

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../servers-old/models/userSchema');
const Class = require('../servers-old/models/classSchema');

let mongoServer;

module.exports.connect = async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    };

    await mongoose.connect(uri, mongooseOpts);
};

module.exports.closeDatabase = async () => {
    if (mongoose.connection) {
        await mongoose.connection.dropDatabase();
        await mongoose.disconnect();
    }
    if (mongoServer) {
        await mongoServer.stop();
    }
};

module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
};

module.exports.createUser = async ({ email, password, nickname, birth }) => {
    const created_user = await User.create(email, password, nickname, birth);
    return created_user._id;
};

module.exports.createClass = async ({
    creator,
    name,
    point,
    classType,
    description,
}) => {
    const created_class = await Class.create(
        creator,
        name,
        point,
        classType,
        description,
    );
    return created_class._id;
};
