import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class, ClassDocument } from './schemas/class.schema';
import { Model } from 'mongoose';

@Injectable()
export class ClassesService {
    constructor(
        @InjectModel(Class.name) private classModel: Model<ClassDocument>,
    ) {}

    async findAll(): Promise<Class[]> {
        console.log('find all called');
        return this.classModel.find().exec();
    }
}
