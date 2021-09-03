import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from '../common/schemas/class.schema';
import { User, UserSchema } from '../common/schemas/user.schema';
import { ClassIdValidatorMiddleware } from '../common/middlewares/class.id.validator.middleware';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [ClassesController],
    providers: [ClassesService],
})
export class ClassesModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // to validate a class by id
        // if class is not found return 404 error
        consumer
            .apply(ClassIdValidatorMiddleware)
            .forRoutes('api/classes/:classId');
    }
}
