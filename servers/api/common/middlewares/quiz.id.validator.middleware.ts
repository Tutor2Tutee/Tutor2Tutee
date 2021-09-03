import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz, QuizDocument } from '../schemas/quiz.schema';
import { Model } from 'mongoose';

@Injectable()
export class QuizIdValidatorMiddleware implements NestMiddleware {
    constructor(
        @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
    ) {}

    async use(req: any, res: any, next: () => void): Promise<any> {
        const reqQuizId = req.params.quizId;
        const reqQuiz = await this.quizModel.findOne({ _id: reqQuizId });
        if (!reqQuiz)
            throw new NotFoundException(`id : ${reqQuizId} not found`);

        req.reqQuiz = reqQuiz;
        next();
    }
}
