import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { closeMongoose, mongooseTestModule } from './MongooseTestModule';
import * as request from 'supertest';
import { ApiModule } from '../servers/api/api.module';
import { Class } from '../servers/api/classes/schemas/class.schema';

describe('classes', function () {
    let app: INestApplication;
    console.log('this is test');

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [
                ApiModule,
                ConfigModule.forRoot({ isGlobal: true }),
                mongooseTestModule(),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await closeMongoose();
    });

    describe(' / GET', function () {
        it('should return 400', function (done) {
            Class.create();

            request(app.getHttpServer())
                .get('/classes')
                .then((res) => {
                    console.log(res.body);
                    expect(res.statusCode).toBe(200);
                    done();
                })
                .catch((err) => done(err));
        });
    });
});
