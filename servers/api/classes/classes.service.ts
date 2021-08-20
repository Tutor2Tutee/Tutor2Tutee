import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class, ClassDocument } from './schemas/class.schema';
import { Model } from 'mongoose';
import { CreateClassDto } from './dto/create.class.dto';
import * as mongoose from 'mongoose';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class ClassesService {
    constructor(
        @InjectModel(Class.name) private classModel: Model<ClassDocument>,
        @InjectModel(User.name) private userModel: Model<ClassDocument>,
    ) {}

    create = async (
        createClassDto: CreateClassDto,
        teacher: mongoose.Schema.Types.ObjectId,
    ) => {
        const created_class = new this.classModel({
            teacher,
            ...createClassDto,
        });

        await this.userModel.updateOne(
            { _id: teacher },
            { $push: { teaching: created_class._id } },
        );

        return created_class.save();
    };

    async findAll(): Promise<Class[]> {
        return this.classModel.find().exec();
    }
}
