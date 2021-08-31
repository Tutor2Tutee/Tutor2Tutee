import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './api/common/middlewares/logger.middleware';

const dbOpt = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
    dbName: 'Tutor2TuteeJEST',
};

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ApiModule,
        MongooseModule.forRoot(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/`,
            dbOpt,
        ),
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
