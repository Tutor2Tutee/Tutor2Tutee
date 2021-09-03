import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { QuizIdValidatorMiddleware } from '../common/middlewares/quiz.id.validator.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from '../common/schemas/quiz.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    ],
    controllers: [QuizzesController],
    providers: [QuizzesService],
})
export class QuizzesModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(QuizIdValidatorMiddleware)
            .forRoutes('api/quizzes/:quizId');
    }
}
