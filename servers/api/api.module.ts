import { Module } from '@nestjs/common';
import { ClassesModule } from './classes/classes.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [ClassesModule, UsersModule],
    controllers: [],
})
export class ApiModule {}
