import {
    ConflictException,
    HttpCode,
    HttpException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, set } from 'mongoose';
import { CreateUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update.user.dto';
import { log } from 'util';
import { rejects } from 'assert';

const getHash = async (str: string, rounds: number): Promise<String> =>
    await bcrypt.hash(str, rounds);

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    create = async (userData: CreateUserDto) => {
        const { password, ...result } = userData;
        const rounds = 10;
        result['password'] = await getHash(password, rounds);
        const createdUser = new this.userModel(result);
        return createdUser.save();
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
        const updateUser = async () => {
            try {
                return await this.userModel.updateOne(
                    { _id },
                    { $set: { ...userData } },
                );
            } catch (e) {
                throw new ConflictException(e);
            }
        };

        const result = await updateUser();
        if (result.n === 0) throw new NotFoundException(`id ${_id} not found`);
        return { n: result.n, nModified: result.nModified };
    };
}
