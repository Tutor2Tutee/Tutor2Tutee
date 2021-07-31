const request = require('supertest')
const app = require('../servers/server')
const db = require("./testMongoDB");

beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

describe('test /classes', () => {
    test('should return every classes', (done) => {
        request(app)
            .get('/api/classes')
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBeTruthy();
                expect(response.body.message).toBe('success');
                done();
            })
            .catch(err => {
                done(err);
            })

    })

})


