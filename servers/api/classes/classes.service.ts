import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from '../common/schemas/user.schema';
import { CreateClassDto } from './dto/create.class.dto';
import { Class, ClassDocument } from '../common/schemas/class.schema';

@Injectable()
export class ClassesService {
    constructor(
        @InjectModel(Class.name) private classModel: Model<ClassDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async create(
        createClassDto: CreateClassDto,
        teacherId: mongoose.Schema.Types.ObjectId,
    ) {
        try {
            const created_class = new this.classModel({
                teacher: teacherId,
                ...createClassDto,
            });

            await this.userModel.updateOne(
                { _id: teacherId },
                { $push: { teaching: created_class._id } },
            );

            return created_class.save();
        } catch (e) {
            throw new ConflictException(e);
        }
    }

    async join(user, reqClass) {
        const joining_class = await this.classModel.findOne({
            _id: reqClass._id,
        });
        if (joining_class.state !== 'Pending') {
            throw new ConflictException(`you can join when class is pending`);
        }

        if (joining_class.listener.length === joining_class.max_capacity) {
            throw new ConflictException('class already meet is max capacity');
        }

        const joining_user = await this.userModel.findOne({ _id: user._id });

        if (joining_class.teacher === joining_user._id) {
            throw new ConflictException(`tutor can't be a tutee of its class`);
        }

        if (joining_class.listener.includes(joining_user._id)) {
            throw new ConflictException(`user already a member of class`);
        }

        if (joining_class.point > joining_user.point) {
            throw new ConflictException(`not enough point to join a class`);
        }

        joining_user.point -= joining_class.point;

        joining_class.listener.push(joining_user._id);
        joining_user.listening.push(joining_class._id);

        await joining_class.save();
        await joining_user.save();

        return {
            success: true,
            message: 'successfully submitted class',
        };
    }

    async delete({ userId }, reqClass) {
        return this.classModel.deleteOne({
            _id: reqClass._id,
        });
    }

    async findAll(): Promise<Class[]> {
        return this.classModel.find();
    }
}
