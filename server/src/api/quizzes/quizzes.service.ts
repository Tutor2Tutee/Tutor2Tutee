import { Injectable, Logger } from '@nestjs/common';
import { Quiz, QuizDocument } from '../common/schemas/quiz.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuizDto } from './dto/create.quiz.dto';

@Injectable()
export class QuizzesService {
    constructor(
        @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
    ) {}

    getAll() {
        return this.quizModel.find({});
    }

    async create(user, createQuizDto: CreateQuizDto) {
        const created_quiz = new this.quizModel({
            ...createQuizDto,
            creator: user._id,
        });

        Logger.log(created_quiz);
        await created_quiz.save();

        return created_quiz;
    }

    getOneById(reqQuiz: Quiz) {
        return reqQuiz;
    }
}
