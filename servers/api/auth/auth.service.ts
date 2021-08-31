import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../common/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async validateUser(
        email: string,
        password: string,
    ): Promise<{ _id: mongoose.Schema.Types.ObjectId; email: string }> | null {
        const user = await this.userModel
            .findOne({ email })
            .select('+password')
            .exec();
        if (user && (await bcrypt.compare(password, user.password))) {
            return { _id: user._id, email: user.email };
        }

        return null;
    }

    async login(user: {
        email: string;
        _id: mongoose.Schema.Types.ObjectId;
    }): Promise<{ id: mongoose.Schema.Types.ObjectId; access_token: string }> {
        const payload = { email: user.email, id: user._id };
        return {
            id: user._id,
            access_token: this.jwtService.sign(payload),
        };
    }
}
