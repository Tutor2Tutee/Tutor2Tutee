import { Test } from '@nestjs/testing';
import { ApiModule } from '../servers/api/api.module';
import { ConfigModule } from '@nestjs/config';
import {
    clearMongoose,
    closeMongoose,
    mongooseTestModule,
} from './MongooseTestModule';
import { ValidationPipe } from '@nestjs/common';

export class MockApiModule {
    static get = async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [
                ApiModule,
                ConfigModule.forRoot({ isGlobal: true }),
                mongooseTestModule(),
            ],
        }).compile();

        const app = moduleFixture.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
            }),
        );
        return await app.init();
    };
    static clear = async () => await clearMongoose();
    static close = async () => await closeMongoose();
}
