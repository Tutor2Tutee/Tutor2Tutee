import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MockApiModule } from './MockApiModule';

describe('classes', function () {
    let app: INestApplication;

    beforeAll(async () => {
        app = await MockApiModule.get();
    });

    afterAll(async () => await MockApiModule.close());

    describe(' / GET', () => {
        it('should return 200 and classes', async () => {
            await request(app.getHttpServer())
                .get('/api/classes')
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                })
                .catch(console.log);
        });
    });
});
