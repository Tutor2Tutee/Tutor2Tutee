import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// simple jwt authentication
// http://www.passportjs.org/packages/passport-jwt/

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly config: ConfigService) {
        super({
            secretOrKey: config.get('SECRET'),
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
        });
    }

    async validate(payload: any) {
        return { userId: payload._id, email: payload.email };
    }
}
