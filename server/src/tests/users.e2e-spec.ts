import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { ApiModule } from '../api/api.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ConfigModule } from '@nestjs/config';
import request from 'supertest';
import mongoose, { Connection, Mongoose } from 'mongoose';
import { get_user, insert_a_user } from './stubs/user.stub';

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

describe('Users', () => {
    beforeEach(async () => {
        for (let collectionsKey in connection.collections) {
            await connection.collection(collectionsKey).deleteMany({});
        }
    });

    it('should register a user', async () => {
        let registerUser: any = get_user(1);
        await request(app.getHttpServer())
            .post('/api/users/register')
            .send(registerUser)
            .expect(201)
            .then(({ body }) => {
                expect(body.email).toBe(registerUser.email);
                expect(body.nickname).toBe(registerUser.nickname);
                expect(body.birth).toBe(
                    new Date(registerUser.birth).toISOString(),
                );
            });
    });

    it('should login a user', async () => {
        const user1 = get_user(1);
        const created_user = await insert_a_user(user1, connection);

        await request(app.getHttpServer())
            .post('/api/users/login')
            .send({
                email: user1.email,
                password: user1.password,
            })
            .expect(201)
            .then(({ body }) => {
                expect(body.id.toString()).toBe(created_user._id.toString());
                expect(body.access_token).toBeDefined();
            });
    });

    it('should get a single user', async () => {
        const registerUser = get_user(1);
        const result = await insert_a_user(registerUser, connection);

        await request(app.getHttpServer())
            .get('/api/users/' + result._id)
            .set('x-access-token', result.token)
            .expect(200)
            .then(({ body }) => {
                expect(body._id.toString()).toBe(result._id.toString());
            });
    });

    it('should patch one user', async () => {
        const register_user = get_user(1);
        const patch_user = get_user(2);
        const result = await insert_a_user(register_user, connection);

        await request(app.getHttpServer())
            .patch('/api/users/' + result._id)
            .send({
                nickname: patch_user.nickname,
            })
            .set('x-access-token', result.token)
            .expect(200)
            .then(({ body }) => {
                expect(body.nModified).toBe(1);
            });
    });
});
