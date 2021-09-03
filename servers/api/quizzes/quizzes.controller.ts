import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateQuizDto } from './dto/create.quiz.dto';

@Controller('api/quizzes')
export class QuizzesController {
    constructor(private readonly quizService: QuizzesService) {}

    @Get()
    GetEveryQuizzes() {
        return this.quizService.getAll();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    createAQuiz(@Request() { user }, @Body() quizInfo: CreateQuizDto) {
        return this.quizService.create(user, quizInfo);
    }

    @Get('/:quizId')
    getAQuiz(@Request() { reqQuiz }) {
        return this.quizService.getOneById(reqQuiz);
    }
}
