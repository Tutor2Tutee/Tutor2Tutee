import { Module } from '@nestjs/common';
import { ClassesController } from './classes/classes.controller';
import { ClassesModule } from './classes/classes.module';
import { UsersModule } from './users/users.module';

@Module({
    controllers: [],
    imports: [ClassesModule, UsersModule],
})
export class ApiModule {}
