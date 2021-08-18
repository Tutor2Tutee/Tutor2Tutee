import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userModel.findOne({ email }).exec();

        if (user && user.password === password) {
            return { _id: user._id, email: user.email };
        }

        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, id: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}