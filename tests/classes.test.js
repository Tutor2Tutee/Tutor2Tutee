const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../servers/server')

describe('test /classes', () => {
    beforeAll((done) => {
        mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true,
            dbName: 'Tutor2TuteeTest'
        }).then(() => {
            done()
        }).catch((err) => {
            console.error(err)
            done()
        })
    })

    test('should return every classes', (done) => {
        request(app)
            .get('/api/classes')
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBeTruthy();
                expect(response.body.message).toBe('success');
                done();
            })
    })

    afterAll((done) => {
        mongoose.disconnect(done)
    })
})



