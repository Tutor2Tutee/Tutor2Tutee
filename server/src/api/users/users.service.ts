import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../common/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    create = async (userData: CreateUserDto) => {
        const { password, ...result } = userData;
        const rounds = 10;
        result['password'] = await bcrypt.hash(password, rounds);
        try {
            const createdUser = new this.userModel(result);
            return await createdUser.save();
        } catch (e) {
            throw new ConflictException(e);
        }
    };

    findOneByEmail = async (email: string): Promise<User> => {
        const user = await this.userModel.findOne({ email });
        if (!user) throw new NotFoundException(`user using ${email} not found`);
        return user;
    };

    findOneById = async (_id: string): Promise<User> => {
        const user = await this.userModel.findOne({ _id });
        if (!user) throw new NotFoundException(`id ${_id} not found`);
        return user;
    };

    updateOneById = async (_id: string, userData: UpdateUserDto) => {
        const updateUser = async (_id: string) => {
            try {
                return await this.userModel.updateOne(
                    { _id },
                    { $set: { ...userData } },
                );
            } catch (e) {
                throw new ConflictException(e);
            }
        };

        const result = await updateUser(_id);
        return {
            message: `successfully modified ${result.nModified} element`,
            nModified: result.nModified,
        };
    };

    deleteOneById = async (_id: string) => {
        const deleteUser = async (_id: string) => {
            try {
                return this.userModel.deleteOne({ _id });
            } catch (e) {
                throw new ConflictException(e);
            }
        };

        const result = await deleteUser(_id);
        if (result.n === 0) throw new NotFoundException(`id ${_id} not found`);
        return {
            message: `successfully deleted user ${_id}`,
            deletedCount: result.deletedCount,
        };
    };

    findAll = async () => {
        return this.userModel.find({});
    };
}
