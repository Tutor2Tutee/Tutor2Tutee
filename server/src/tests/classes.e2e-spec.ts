import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { ApiModule } from '../api/api.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ConfigModule } from '@nestjs/config';
import request from 'supertest';
import mongoose, { Connection, Mongoose } from 'mongoose';
import { get_user, insert_a_user } from './stubs/user.stub';
import { insert_a_class } from './stubs/classes.stub';

let mongod: MongoMemoryServer;
let app: INestApplication;
let connection: Connection;
let mongoConnection: Mongoose;

beforeAll(async () => {
    // TODO: when getting connection if keeps returns a two connection
    mongod = await MongoMemoryServer.create();
    const moduleRef = await Test.createTestingModule({
        imports: [
            ApiModule,
            ConfigModule.forRoot({ isGlobal: true }),
            MongooseModule.forRootAsync({
                useFactory: async () => ({
                    uri: mongod.getUri(),
                    useUnifiedTopology: true,
                    useNewUrlParser: true,
                    useCreateIndex: true,
                }),
            }),
        ],
    }).compile();

    mongoConnection = await mongoose.connect(mongod.getUri(), {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });

    // first connection contains nothing and when inserting a entity it keeps stores at second connection
    // console.log(mongoConnection.connections);
    connection = mongoConnection.connections[1];

    app = moduleRef.createNestApplication();
    await app.init();
});

afterAll(async () => {
    await app.close();
    await mongoConnection.disconnect();
    await mongod.stop(true);
});

describe('Classes', () => {
    beforeEach(async () => {
        for (let collectionsKey in connection.collections) {
            await connection.collection(collectionsKey).deleteMany({});
        }
    });

    it('should return array of classes', async () => {
        const user1 = get_user(1);
        const created_user = await insert_a_user(user1, connection);
        await insert_a_class(created_user._id, 1, connection);

        await request(app.getHttpServer()).get('/api/classes').expect(200);
    });

    it('should create class', async () => {
        const created_user = await insert_a_user(get_user(1), connection);

        await request(app.getHttpServer())
            .post('/api/classes')
            .send({
                name: 'testClass1',
                classType: 'recordedVideo',
                point: 0,
                description: 'testClass1',
                max_capacity: 10,
            })
            .set('x-access-token', created_user.token)
            .expect(201);
    });

    it('should get a class', async () => {
        const created_user = await insert_a_user(get_user(1), connection);
        const created_class = await insert_a_class(
            created_user._id,
            1,
            connection,
        );

        await request(app.getHttpServer())
            .get('/api/classes/' + created_class._id)
            .expect(200);
    });

    it('should join a class', async () => {
        const creator = await insert_a_user(get_user(1), connection);
        const joiner = await insert_a_user(get_user(2), connection);

        const created_class = await insert_a_class(creator._id, 1, connection);
        await request(app.getHttpServer())
            .post('/api/classes/' + created_class._id)
            .set('x-access-token', joiner.token)
            .expect(201);
    });

    it('should delete a class', async () => {
        const creator = await insert_a_user(get_user(1), connection);
        const created_class = await insert_a_class(creator._id, 1, connection);

        await request(app.getHttpServer())
            .delete('/api/classes/' + created_class._id)
            .set('x-access-token', creator.token)
            .expect(200);
    });
});
