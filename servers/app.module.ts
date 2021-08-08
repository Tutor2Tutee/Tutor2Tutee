import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

const dbOpt = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
    dbName: 'Tutor2TuteeJEST',
};

@Module({
    imports: [
        ApiModule,
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/`,
            dbOpt,
        ),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
