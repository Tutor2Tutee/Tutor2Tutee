const request = require('supertest');
const jwt = require('jsonwebtoken')
const app = require('../servers/server');
const User = require('../servers/models/userSchema');
const db = require('./testMongoDB');


beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

describe('test /users', () => {
    describe('POST /login', () => {

        let user1_id

        beforeAll((done) => {
            // create test account
            User.create(
                "test1@test.com",
                "testPassword",
                'testNickname',
                "2021-07-31"
            ).then(response => {
                user1_id = response._id
                done()
            }).catch(err => {
                done(err)
            })
        })

        it('should return 200, user._id and token', (done) => {
            request(app)
                .post('/api/users/login')
                .send(
                    {
                        email: "test1@test.com",
                        password: 'testPassword',
                    }
                )
                .then(response => {
                    expect(response.statusCode).toBe(200);
                    expect(response.body.message).toEqual("login is successful")
                    expect(response.body.user.toString()).toEqual(user1_id.toString())
                    done()
                })
                .catch(err => {
                    done(err)
                })
        });


        describe('Error Handling', () => {
            it('should return 400 and email is empty', (done) => {
                request(app)
                    .post('/api/users/login')
                    .send({
                        password: 'password'
                    })
                    .then(response => {
                        expect(response.statusCode).toBe(400)
                        expect(response.body.success).toBeFalsy()
                        expect(response.body.message).toBe('email is empty');
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            });

            it('should return 400 and password is empty', (done) => {
                request(app)
                    .post('/api/users/login')
                    .send({
                        email: 'email@email.com'
                    })
                    .then(response => {
                        expect(response.statusCode).toBe(400);
                        expect(response.body.success).toBeFalsy();
                        expect(response.body.message).toBe('password is empty')
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            });

            it('should return 400 and non exist user', (done) => {
                request(app)
                    .post('/api/users/login')
                    .send({
                        email: 'nonexistenceuser@test.com',
                        password: 'wrong password'
                    })
                    .then(response => {
                        expect(response.statusCode).toBe(400);
                        expect(response.body.success).toBeFalsy();
                        expect(response.body.message).toEqual('Failed to Login, non exist user');
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })

            });

            it('should return 400 and password is incorrect', (done) => {
                request(app)
                    .post('/api/users/login')
                    .send({
                        email: 'test1@test.com',
                        password: 'wrong_password'
                    })
                    .then(response => {
                        expect(response.statusCode).toBe(400);
                        expect(response.body.success).toBeFalsy()
                        expect(response.body.message).toEqual('Failed to Login, password is incorrect');
                        done()
                    })
                    .catch(err => done(err))

            });
        });


    })

    describe('POST /register', () => {
        it('should return 201', (done) => {
            request(app)
                .post('/api/users/register')
                .send({
                    email: 'test1@test.com',
                    password: 'testPassword',
                    nickname: 'testNickname',
                    birth: '2021-07-31'
                })
                .then(response => {
                    expect(response.statusCode).toBe(201);
                    expect(response.body.success).toBeTruthy()
                    expect(response.body.message).toEqual('test1@test.com' + ' registered')
                    done()
                })
                .catch(err => done(err))
        });


        describe('Error handling', () => {
            const wrongEmail = 'wrongEmail@test.com';
            const wrongPassword = 'wrongPassword';
            const wrongNickname = 'wrongNickname';
            const wrongBirth = "19971225"
            const matchingBirth = "2021-07-31"

            const registerURI = '/api/users/register'

            it('should return 400 and email is empty', (done) => {
                request(app)
                    .post(registerURI)
                    .send({
                        // email: wrongEmail,
                        password: wrongPassword,
                        nickname: wrongNickname,
                        birth: matchingBirth
                    })
                    .then(response => {
                        expect(response.statusCode).toBe(400);
                        expect(response.body.success).toBeFalsy();
                        expect(response.body.message).toEqual('email is empty')
                        done()
                    }).catch(err => done(err))
            });

            it('should return 400 and password is empty', (done) => {
                request(app)
                    .post(registerURI)
                    .send({
                        email: wrongEmail,
                        // password: wrongPassword,
                        nickname: wrongNickname,
                        birth: matchingBirth
                    })
                    .then(response => {
                        expect(response.statusCode).toBe(400);
                        expect(response.body.success).toBeFalsy()
                        expect(response.body.message).toEqual("password is empty")
                        done()
                    }).catch(err => done(err))
            });

            it('should return 400 and return nickname is empty', (done) => {
                request(app)
                    .post(registerURI)
                    .send({
                        email: wrongEmail,
                        password: wrongPassword,
                        // nickname:wrongNickname,
                        birth: matchingBirth
                    })
                    .then(response => {
                        expect(response.statusCode).toBe(400);
                        expect(response.body.success).toBeFalsy();
                        expect(response.body.message).toEqual('nickname is empty');
                        done()
                    })
                    .catch(err => done(err));
            });

            it('should return 400 and return birth is empty', (done) => {
                request(app)
                    .post(registerURI)
                    .send({
                        email: wrongEmail,
                        password: wrongPassword,
                        nickname: wrongNickname,
                        // birth:matchingBirth
                    })
                    .then(response => {
                        expect(response.statusCode).toBe(400);
                        expect(response.body.success).toBeFalsy();
                        expect(response.body.message).toEqual('birth is empty');
                        done()
                    }).catch(err => done(err))
            });

            it('should return 400 and return wrong date', (done) => {
                request(app)
                    .post(registerURI)
                    .send({
                        email: wrongEmail,
                        password: wrongPassword,
                        nickname: wrongNickname,
                        birth: wrongBirth
                    })
                    .then(response => {
                        expect(response.statusCode).toBe(400)
                        expect(response.body.success).toBeFalsy();
                        expect(response.body.message).toEqual('wrong date')
                        done()
                    }).catch(err => done(err))
            });
        });
    })

    describe('GET /:id', () => {

        let user1 = {}
        let user2 = {}

        const secret = app.get('jwt-secret')

        const GET_ID_URI = '/api/users'

        beforeAll(async () => {
            const User1 = await User.create(
                "test1@test.com",
                "testpassword",
                "testNickname",
                '2021-07-31'
            )
            const User2 = await User.create(
                "test2@test.com",
                'testpassword',
                'testNickname2',
                '2021-07-30'
            )
            user1._id = User1._id
            user1.email = User1.email

            user1.token = await jwt.sign(
                {
                    _id: User1._id,
                    email: User1.email
                },
                secret,
                {
                    expiresIn: '1d',
                    issuer: "Tutor2Tutee",
                    subject: 'user information'
                }
            )

            user2._id = User2._id

            user2.token = await jwt.sign(
                {
                    _id: User2._id,
                    email: User2.email
                },
                secret,
                {
                    expiresIn: '1d',
                    issuer: 'Tutor2Tutee',
                    subject: 'user information'
                }
            )
        })

        it('should return 200 and user info', (done) => {
            request(app)
                .get(GET_ID_URI + '/' + user1._id)
                .set('x-access-token', user1.token)
                .then(response => {
                    expect(response.statusCode).toBe(200);
                    expect(response.body.success).toBeTruthy();
                    expect(response.body.message).toEqual('success to find a user : ' + user1.email);
                    expect(response.body._id.toString()).toEqual(user1._id.toString())
                    done()
                }).catch(err => done(err))
        });

        describe('Error handling', function () {
            it('should return 403 and return not a matching user', (done) => {
                request(app)
                    .get(GET_ID_URI + '/' + user1._id)
                    .set('x-access-token', user2.token)
                    .then(response => {
                        expect(response.statusCode).toBe(403);
                        expect(response.body.success).toBeFalsy();
                        expect(response.body.message).toEqual('not a matching user')
                        done()
                    })
                    .catch(err => done(err))
            });

        });

    });
})


