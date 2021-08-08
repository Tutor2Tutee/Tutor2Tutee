import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

let mongoServer: MongoMemoryServer;

const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

export const mongooseTestModule = () =>
    MongooseModule.forRootAsync({
        useFactory: async () => {
            mongoServer = await MongoMemoryServer.create();
            return {
                uri: mongoServer.getUri(),
                ...mongooseOpts,
            };
        },
    });

export const closeMongoose = async () => {
    if (mongoose.connection) {
        // await mongoose.connection.dropDatabase();
        await mongoose.disconnect();
    }
    if (mongoServer) {
        await mongoServer.stop();
    }
};

export const clear = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
};
