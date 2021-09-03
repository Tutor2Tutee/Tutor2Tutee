import { Module } from '@nestjs/common';
import { ClassesModule } from './classes/classes.module';
import { UsersModule } from './users/users.module';
import { QuizzesModule } from './quizzes/quizzes.module';

@Module({
    imports: [ClassesModule, UsersModule, QuizzesModule],
    controllers: [],
})
export class ApiModule {}
