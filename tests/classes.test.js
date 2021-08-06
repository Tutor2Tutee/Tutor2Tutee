const request = require('supertest')
const app = require('../servers/server')
const db = require("./testMongoDB");
const User = require('../servers/models/userSchema')
const Class = require("../servers/models/classSchema")
const tokenizer = require('./tokenizer')

beforeAll(async () => await db.connect());
afterAll(async () => await db.closeDatabase());
// afterEach(async () => await db.clearDatabase());

describe('test /classes', () => {

    describe("GET /", () => {
        let user1 = {
            email: 'test1GET@test.com',
            password: 'testPassword',
            nickname: 'testNickname',
            birth: '2021-08-03'
        }

        let class1 = {
            name: 'testClassGET',
            point: 5,
            classType: "recordedVideo",
            description: "This is description"
        }

        beforeAll(async () => {
            let created_user = await User.create(
                user1.email,
                user1.password,
                user1.nickname,
                user1.birth
            )
            user1._id = created_user._id
            let created_class = await Class.create(
                user1._id,
                class1.name,
                class1.point,
                class1.classType,
                class1.description
            )
            class1._id = created_class._id
        })

        afterAll(async () => await db.clearDatabase())

        it('should return 200 and every classes', (done) => {
            request(app)
                .get('/api/classes')
                .then(response => {
                    expect(response.statusCode).toBe(200);
                    expect(response.body.success).toBeTruthy();
                    expect(response.body.message).toBe('success');
                    expect(response.body.classes.length).toBe(1)
                    done();
                })
                .catch(err => {
                    done(err);
                })
        })

        // There is low margin of error in get /api/classes so no Error Handling
    })

    describe("POST /", () => {
        let user1 = {
            email: 'test1POST@test.com',
            password: 'testPassword',
            nickname: 'testNicknamePOST',
            birth: '2021-08-03'
        }

        let user2 = {
            email: 'test2POST@test.com',
            password: 'testPassword',
            nickname: 'testNickname2POST',
            birth: '2021-08-05'
        }

        let class1 = {
            name: "testClass POST",
            point: 10,
            classType: 'recordedVideo',
            description: 'this is a test description'
        }

        let test_class = {
            name: 'test_class POST',
            point: 10,
            classType: 'recordedVideo',
            description: 'this is a test description, to mock existing class'
        }

        beforeAll(async () => {
            let created_user1 = await User.create(
                user1.email,
                user1.password,
                user1.nickname,
                user1.birth
            )
            user1._id = created_user1._id
            user1.token = await tokenizer.getToken(user1)

            let created_user2 = await User.create(
                user2.email,
                user2.password,
                user2.nickname,
                user2.birth
            )
            user2._id = created_user2._id;
            user2.token = await tokenizer.getToken(user2)


            // create mock Class
            await Class.create(
                user1._id,
                test_class.name,
                test_class.point,
                test_class.classType,
                test_class.description
            )

        })

        afterAll(async () => await db.clearDatabase())

        const URI = '/api/classes'
        it('should return 200 and class created', async function () {
            await request(app)
                .post(URI)
                .set('x-access-token', user1.token)
                .send({
                    name: class1.name,
                    point: class1.point,
                    classType: class1.classType,
                    description: class1.description
                })
                .then(response => {
                    expect(response.statusCode).toBe(201);
                    expect(response.body.success).toBeTruthy();
                    expect(response.body.message).toEqual("class '" + class1.name + "' created")
                });

        });
        describe("Error Handling", () => {
            it('should return 400 and class name is already exist ', async function () {
                await request(app)
                    .post(URI)
                    .set('x-access-token', user1.token)
                    .send({
                            name: test_class.name,
                            point: test_class.point,
                            classType: test_class.classType,
                            description: test_class.description
                        }
                    )
                    .then(response => {
                        expect(response.statusCode).toBe(400)
                        expect(response.body.success).toBeFalsy();
                        expect(response.body.message).toEqual("class name is already exists")
                    })
            });

            it('should return 400 and name is empty', async function () {
                await request(app)
                    .post(URI)
                    .set('x-access-token', user1.token)
                    .send({
                        // name: "not a class name",
                        point: test_class.point,
                        classType: test_class.classType,
                        description: test_class.description
                    })
                    .then(response => {
                        expect(response.statusCode).toBe(400);
                        expect(response.body.success).toBeFalsy();
                        expect(response.body.message).toEqual('name is empty')
                    })
            });

            it('should return 400 and point is empty', async function () {
                await request(app)
                    .post(URI)
                    .set('x-access-token', user1.token)
                    .send({
                        name: "not a class name",
                        // point: test_class.point,
                        classType: test_class.classType,
                        description: test_class.description
                    })
                    .then(response => {
                        expect(response.statusCode).toBe(400);
                        expect(response.body.success).toBeFalsy();
                        expect(response.body.message).toEqual('point is empty')
                    })
            });

            it('should return 400 and classType is empty', async function () {
                await request(app)
                    .post(URI)
                    .set('x-access-token', user1.token)
                    .send({
                        name: "not a class name",
                        point: test_class.point,
                        // classType: test_class.classType,
                        description: test_class.description
                    })
                    .then(response => {
                        expect(response.statusCode).toBe(400);
                        expect(response.body.success).toBeFalsy();
                        expect(response.body.message).toEqual('classType is empty')
                    })
            });

            it('should return 400 and description is empty', async function () {
                await request(app)
                    .post(URI)
                    .set('x-access-token', user1.token)
                    .send({
                        name: "not a class name",
                        point: test_class.point,
                        classType: test_class.classType,
                        // description: test_class.description
                    })
                    .then(response => {
                        expect(response.statusCode).toBe(400);
                        expect(response.body.success).toBeFalsy();
                        expect(response.body.message).toEqual('description is empty')
                    })
            });
        })

    })

    describe("GET /:id", () => {

        const URI = "/api/classes/"

        let user1 = {
            email: 'user1GETID@test.com',
            password: 'testPassword',
            nickname: 'testNicknameGETID',
            birth: '2021-08-06'
        }

        let class1 = {
            name: 'test class 1 GET ID',
            point: 10,
            classType: 'recordedVideo',
            description: 'this is a test description for test class 1'
        }

        let class2 = {
            name: 'test class 2 GET ID',
            point: 10,
            classType: 'recordedVideo',
            description: 'this is a test description for test class 2'
        }

        beforeAll(async () => {
            const created_user1 = await User.create(
                user1.email,
                user1.password,
                user1.nickname,
                user1.birth
            )

            user1._id = created_user1._id

            const created_class1 = await Class.create(
                user1._id,
                class1.name,
                class1.point,
                class1.classType,
                class1.description
            )

            class1._id = created_class1._id


        })

        afterAll(async () => await db.clearDatabase())

        it('should return 200 and matching class', async function () {
            await request(app)
                .get(URI + class1._id)
                .send()
                .then(response => {
                    expect(response.statusCode).toBe(200)
                    expect(response.body.success).toBeTruthy();
                    expect(response.body.message).toEqual('successfully find : ' + class1._id)
                    expect(response.body.data).not.toBeUndefined()
                })

        });

        describe("Error Handling", () => {
            it('should return 400 and wrong id format, check id length', async function () {
                await request(app)
                    .get(URI + class1._id + 'this_is_wrong_id_format')
                    .expect(400)
                    .then(({body: {success, message}}) => {
                            expect(success).toBeFalsy();
                            expect(message).toEqual("wrong id format, check id length")
                        }
                    )
            });

            it("should return 404 and id doesn't exist", async function () {
                let mock_class = await Class.create(
                    user1._id,
                    class2.name,
                    class2.point,
                    class2.classType,
                    class2.description
                )

                await Class.deleteOne({_id: mock_class._id})


                await request(app)
                    .get(URI + mock_class._id)
                    .expect(404)
                    .then(({body: {success, message}}) => {
                        expect(success).toBeFalsy()
                        expect(message).toEqual("id doesn't exist")
                    })
            });
        })


    })

    describe('POST /:id', () => {

        const URI = "/api/classes/"

        let user1 = {
            email: 'user1POSTID@test.com',
            password: 'testPassword',
            nickname: 'testNickname1POSTID',
            birth: '2021-08-06'
        }
        let user2 = {
            email: 'user2POSTID@test.com',
            password: 'testPassword',
            nickname: 'testNickname2POSTID',
            birth: '2021-08-06'
        }
        let user3 = {
            email: 'user3POSTID@test.com',
            password: 'testPassword',
            nickname: 'testNickname3POSTID',
            birth: '2021-08-06'
        }

        let class1 = {
            name: 'test class 1 POST /:ID',
            point: 10,
            classType: 'recordedVideo',
            description: 'this is a test description for test class 1'
        }
        let class2 = {
            name: 'test class 2 POST /:ID',
            point: 10,
            classType: 'recordedVideo',
            description: 'this is a test description for test class 1'
        }

        beforeAll(async () => {
            // creator
            user1._id = await db.createUser(user1)
            // attender
            user2._id = await db.createUser(user2)
            // already attended
            user3._id = await db.createUser(user3)

            user1.token = await tokenizer.getToken(user1)
            user2.token = await tokenizer.getToken(user2)
            user3.token = await tokenizer.getToken(user3)


            class1._id = await db.createClass({
                creator: user1._id,
                ...class1
            })

            await Class.findById(class1._id)
                .then(_class => {
                    _class.registerClassById(user3._id)
                })
        })

        afterAll(async () => await db.clearDatabase())

        it('should return 201 and return successfully attended class', async function () {
            await request(app)
                .post(URI + class1._id)
                .set('x-access-token', user2.token)
                .send()
                .expect(201)
                .then(({body: {success, message}}) => {
                    expect(success).toBeTruthy()
                    expect(message).toEqual('successfully attended class : ' + class1.name)
                })
        });

        describe('Error Handling', function () {
            it("should return 404 and id doesn't exit", async function () {
                let mock_class = await Class.create(
                    user1._id,
                    class2.name,
                    class2.point,
                    class2.classType,
                    class2.description
                )
                await Class.deleteOne({_id: mock_class._id})
                await request(app)
                    .post(URI + mock_class._id)
                    .set('x-access-token', user2.token)
                    .expect(404)
                    .then(({body: {success, message}}) => {
                        expect(success).toBeFalsy()
                        expect(message).toEqual("id doesn't exist")
                    })
            });

            it('should return 400 and owner cant register its class', async function () {
                await request(app)
                    .post(URI + class1._id)
                    .set('x-access-token', user1.token)
                    .expect(400)
                    .then(({body: {success, message}}) => {
                        expect(success).toBeFalsy()
                        expect(message).toEqual("owner can't register it's class")
                    })
            });

            it('should return 400 and already a member', async function () {
                await request(app)
                    .post(URI + class1._id)
                    .set('x-access-token', user3.token)
                    .expect(400)
                    .then(({body: {success, message}}) => {
                        expect(success).toBeFalsy()
                        expect(message).toEqual("already a member")
                    })
            });
        });
    })

    describe('PUT /:id', () => {
        const URI = '/api/classes/'

        let user1 = {
            email: 'user1PUT@test.com',
            password: 'testPassword',
            nickname: 'testNickname1PUT',
            birth: '2021-08-06'
        }
        let user2 = {
            email: 'user2PUT@test.com',
            password: 'testPassword',
            nickname: 'testNickname2PUT',
            birth: '2021-08-06'
        }
        let user3 = {
            email: 'user3PUT@test.com',
            password: 'testPassword',
            nickname: 'testNickname3PUT',
            birth: '2021-08-06'
        }

        let class1 = {
            name: 'test class 1 PUT',
            point: 10,
            classType: 'recordedVideo',
            description: 'this is a test description for test class 1'
        }
        let class2 = {
            name: 'test class 2 PUT',
            point: 10,
            classType: 'recordedVideo',
            description: 'this is a test description for test class 1'
        }

        beforeAll(async () => {
            user1._id = await db.createUser(user1)
            user2._id = await db.createUser(user2)
            user3._id = await db.createUser(user3)

            user1.token = await tokenizer.getToken(user1)
            user2.token = await tokenizer.getToken(user2)
            user3.token = await tokenizer.getToken(user3)

            class1._id = await db.createClass({
                creator: user1._id, ...class1
            })
        })

        afterAll(async () => await db.clearDatabase())

        it('should return 201 and successfully modified everything', async function () {
            await request(app)
                .put(URI + class1._id)
                .set('x-access-token', user1.token)
                .send({
                    name: 'test1changed',
                    point: 15,
                    type: 'onlineMeeting',
                    description: 'changed description'
                })
                .expect(201)
                .then(({body: {success, message, changed}}) => {
                        expect(success).toBeTruthy();
                        expect(message).toEqual("successfully modified")
                        expect(changed).toEqual(['name', 'point', 'type', 'description'].join(", "))
                    }
                )
        });

        it('should return 201 and successfully modified name', async function () {
            await request(app)
                .put(URI + class1._id)
                .set('x-access-token', user1.token)
                .send({
                    name: 'test2changed'
                })
                .expect(201)
                .then(({body: {success, message, changed}}) => {
                    expect(success).toBeTruthy();
                    expect(message).toEqual("successfully modified")
                    expect(changed).toEqual('name')
                })
        });

        it('should return 201 and successfully modified point', async function () {
            await request(app)
                .put(URI + class1._id)
                .set('x-access-token', user1.token)
                .send({
                    point: 25
                })
                .expect(201)
                .then(({body: {success, message, changed}}) => {
                    expect(success).toBeTruthy();
                    expect(message).toEqual('successfully modified')
                    expect(changed).toEqual('point')
                })
        });

        it('should return 201 and successfully modified classType', async function () {
            await request(app)
                .put(URI + class1._id)
                .set('x-access-token', user1.token)
                .send({
                    type: 'offlineMeeting'
                })
                .expect(201)
                .then(({body: {success, message, changed}}) => {
                    expect(success).toBeTruthy();
                    expect(message).toEqual('successfully modified')
                    expect(changed).toEqual('type')
                })
        });

        it('should return 201 and successfully modified description', async function () {
            await request(app)
                .put(URI + class1._id)
                .set('x-access-token', user1.token)
                .send({
                    description: 'testDescription'
                })
                .expect(201)
                .then(({body: {success, message, changed}}) => {
                    expect(success).toBeTruthy();
                    expect(message).toEqual('successfully modified')
                    expect(changed).toEqual('description')
                })
        });

        it('should return 200 and nothing modified', async function () {
            await request(app)
                .put(URI + class1._id)
                .set('x-access-token', user1.token)
                .send()
                .expect(200)
                .then(({body: {success, message}}) => {
                    expect(success).toBeTruthy()
                    expect(message).toEqual("nothing modified")
                })
        });

        it('should return 200 and nothing modified', async function () {
            class2._id = await db.createClass({
                creator: user2._id,
                ...class2
            })

            await request(app)
                .put(URI + class2._id)
                .set('x-access-token', user2.token)
                .send({
                    name: class2.name,
                    point: class2.point,
                    type: class2.classType,
                    description: class2.description
                })
                .expect(200)
                .then(({body: {success, message}}) => {
                    expect(success).toBeTruthy()
                    expect(message).toEqual("nothing modified")
                })


            await Class.deleteOne({_id: class2._id})

        });

        describe('Error Handling', function () {
            it('should return 404 and id doesnt exist', async function () {

                class2._id = await db.createClass({
                    creator: user1._id,
                    ...class2
                })

                await Class.deleteOne({_id: class2._id})

                await request(app)
                    .put(URI + class2._id)
                    .set('x-access-token', user1.token)
                    .send()
                    .expect(404)
                    .then(({body: {success, message}}) => {
                        expect(success).toBeFalsy()
                        expect(message).toEqual("id doesn't exist")
                    })
            });

            it('should return 400 and only can be modified by teacher', async function () {
                await request(app)
                    .put(URI + class1._id)
                    .set('x-access-token', user2.token)
                    .send()
                    .expect(400)
                    .then(({body : {success, message}})=> {
                        expect(success).toBeFalsy()
                        expect(message).toEqual("only can be modified by teacher")
                    })
            });

            it('should return 400 and class name already exists', async function () {

                class2._id = await db.createClass({
                    creator:user1._id,
                    ...class2
                })

                await request(app)
                    .put(URI + class1._id)
                    .set('x-access-token', user1.token)
                    .send({
                        name:class2.name
                    })
                    .expect(400)
                    .then(({body:{success, message}})=> {
                        expect(success).toBeFalsy()
                        expect(message).toEqual('class name already exists')
                    })
            });
        });
    });

    describe('DELETE /:id', ()=> {
        const URI = '/api/classes/'

        let user1 = {
            email: 'user1DELETEID@test.com',
            password: 'testPassword',
            nickname: 'testNickname1DELETEID',
            birth: '2021-08-06'
        }
        let user2 = {
            email: 'user2DELETEID@test.com',
            password: 'testPassword',
            nickname: 'testNickname2DELETEID',
            birth: '2021-08-06'
        }
        let user3 = {
            email: 'user3DELETEID@test.com',
            password: 'testPassword',
            nickname: 'testNickname3DELETEID',
            birth: '2021-08-06'
        }

        let class1 = {
            name: 'test class 1 DELETE',
            point: 10,
            classType: 'recordedVideo',
            description: 'this is a test description for test class 1'
        }
        let class2 = {
            name: 'test class 2 DELETE',
            point: 10,
            classType: 'recordedVideo',
            description: 'this is a test description for test class 1'
        }

        beforeAll(async () => {
            user1._id = await db.createUser(user1)
            user2._id = await db.createUser(user2)
            user3._id = await db.createUser(user3)

            user1.token = await tokenizer.getToken(user1)
            user2.token = await tokenizer.getToken(user2)
            user3.token = await tokenizer.getToken(user3)
        })

        afterAll(async () => await db.clearDatabase())

        it('should return 200 and successfully deleted', async function () {
            class1._id = await db.createClass({
                creator: user1._id, ...class1
            })

            await request(app)
                .delete(URI + class1._id)
                .set('x-access-token', user1.token)
                .expect(200)
                .then(({body:{success, message}})=> {
                    expect(success).toBeTruthy()
                    expect(message).toEqual("successfully deleted : " + class1.name)
                })
        });

        describe('Error Handling', function () {

            it("should return id doesn't exist",async function () {
                let mock_class = await db.createClass({
                    creator:user2._id,
                    ...class2
                })

                await Class.deleteOne({_id:mock_class})

                await request(app)
                    .delete(URI + mock_class)
                    .set('x-access-token', user2.token)
                    .expect(404)
                    .then(({body:{success, message}})=> {
                        expect(success).toBeFalsy()
                        expect(message).toEqual("id doesn't exist")
                    })

            });

        });
    });
})


