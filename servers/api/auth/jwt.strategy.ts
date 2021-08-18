import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// simple jwt authentication
// http://www.passportjs.org/packages/passport-jwt/

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET,
        });
    }

    async validate(payload: any) {
        return { userId: payload.id, email: payload.email };
    }
}
