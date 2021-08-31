import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../common/schemas/user.schema';
import { Model } from 'mongoose';

// simple jwt authentication
// http://www.passportjs.org/packages/passport-jwt/

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly config: ConfigService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {
        super({
            secretOrKey: config.get('SECRET'),
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
        });
    }

    validate = async ({ id }: { id: string }): Promise<User> => {
        const user = await this.userModel.findOne({ _id: id });
        if (!user)
            throw new NotFoundException(
                `when validating a user, user doesn't exists `,
            );
        return user;
    };
}
