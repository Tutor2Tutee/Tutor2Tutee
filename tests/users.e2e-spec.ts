import { INestApplication } from '@nestjs/common';
import { closeMongoose } from './MongooseTestModule';
import * as request from 'supertest';
import { MockApiModule } from './MockApiModule';
describe('users', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await MockApiModule.get();
    });

    afterAll(async () => {
        await closeMongoose();
    });

    describe(' /register POST', function () {
        it('should return 201 created', async () => {
            await request(app.getHttpServer())
                .post('/api/users/register')
                .send({
                    email: 'test@test.com',
                    password: 'testPassword',
                    nickname: 'testNickname',
                    birth: '1997-12-25',
                })
                .then(({ body, statusCode }) => {
                    expect(statusCode).toBe(201);
                });
            await MockApiModule.clear();
        });

        it('should return 400', async () => {
            await request(app.getHttpServer())
                .post('/api/users/register')
                .send({
                    email: 'test@test.com',
                })
                .then(({ body, statusCode }) => {
                    expect(statusCode).toBe(400);
                });
        });
    });

    describe('/users/login POST', () => {
        it('should return 200', async () => {
            await request(app.getHttpServer())
                .post('/api/users/register')
                .send({
                    email: 'test1@test.com',
                    password: 'testPassword',
                    nickname: 'test2Nickname',
                    birth: '1997-12-25',
                });

            await request(app.getHttpServer())
                .post('/api/users/login')
                .send({
                    email: 'test1@test.com',
                    password: 'testPassword',
                })
                .then(({ body, statusCode }) => {
                    expect(statusCode).toBe(201);
                    expect(body.access_token).not.toBeUndefined();
                });

            await MockApiModule.clear();
        });
    });

    describe('/users/:id GET', () => {
        it('should return a user with 200', async () => {
            let token = '';
            let id = '';
            await request(app.getHttpServer())
                .post('/api/users/register')
                .send({
                    email: 'testid@test.com',
                    password: 'testPassword',
                    nickname: 'testid',
                    birth: '1997-12-25',
                })
                .then(({ body }) => {
                    id = body._id;
                });

            await request(app.getHttpServer())
                .post('/api/users/login')
                .send({
                    email: 'testid@test.com',
                    password: 'testPassword',
                })
                .then(({ body, statusCode }) => {
                    token = body.access_token;
                });

            await request(app.getHttpServer())
                .get('/api/users/' + id)
                .set('x-access-token', token)
                .expect(200)
                .then((response) => {
                    expect(response.body).toBeDefined();
                });

            await MockApiModule.clear();
        });
    });

    describe('/users/:id PATCH', () => {
        it('should return a user patched', async () => {
            let token = '';
            let id = '';
            await request(app.getHttpServer())
                .post('/api/users/register')
                .send({
                    email: 'testpatch@test.com',
                    password: 'testPassword',
                    nickname: 'testpatch',
                    birth: '1997-12-25',
                })
                .then(({ body }) => {
                    id = body._id;
                });

            await request(app.getHttpServer())
                .post('/api/users/login')
                .send({
                    email: 'testpatch@test.com',
                    password: 'testPassword',
                })
                .then(({ body, statusCode }) => {
                    token = body.access_token;
                });

            await request(app.getHttpServer())
                .patch('/api/users/' + id)
                .set('x-access-token', token)
                .send({
                    nickname: 'fancyNickname',
                })
                .expect(200)
                .then((response) => {
                    expect(response.body).toBeDefined();
                });

            await MockApiModule.clear();
        });
        it('should return error', async () => {
            let token = '';
            let id = '';
            await request(app.getHttpServer())
                .post('/api/users/register')
                .send({
                    email: 'testpatch@test.com',
                    password: 'testPassword',
                    nickname: 'testpatch',
                    birth: '1997-12-25',
                })
                .then(({ body }) => {
                    id = body._id;
                });
            await request(app.getHttpServer())
                .post('/api/users/register')
                .send({
                    email: 'testpatch2@test.com',
                    password: 'testPassword',
                    nickname: 'test2patch',
                    birth: '1997-12-25',
                })
                .then(({ body }) => {
                    id = body._id;
                });
            await request(app.getHttpServer())
                .post('/api/users/login')
                .send({
                    email: 'test2patch@test.com',
                    password: 'testPassword',
                })
                .then(({ body, statusCode }) => {
                    token = body.access_token;
                });

            await request(app.getHttpServer())
                .patch('/api/users/' + id)
                .set('x-access-token', token)
                .send({
                    nickname: 'testPatch',
                })
                .expect(200)
                .then((response) => {
                    expect(response.body).toBeDefined();
                });
            await MockApiModule.clear();
        });
    });
});
