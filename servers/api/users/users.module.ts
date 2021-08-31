import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../common/schemas/user.schema';
import { AuthModule } from '../auth/auth.module';
import { UserIdValidatorMiddleware } from '../common/middlewares/user.id.validator.middleware';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        // To validate user by id
        consumer
            .apply(UserIdValidatorMiddleware)
            .exclude('api/users/login', 'api/users/register')
            .forRoutes('api/users/:userId');
    }
}
