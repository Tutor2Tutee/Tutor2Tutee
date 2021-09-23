import { Connection } from 'mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const jwtService = new JwtService(new JwtModule());

export const get_user = (
    number: number,
): { email: string; password: string; nickname: string; birth: string } => {
    return {
        email: `test${number}@test.com`,
        password: 'password',
        nickname: `nickname${number}`,
        birth: '1997-12-25',
    };
};

export const insert_a_user = async (user, connection: Connection) => {
    const result = await connection.collection('users').insertOne({
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
        nickname: user.nickname,
        birth: new Date(user.birth).toISOString(),
    });

    const created_user = result.ops[0];

    created_user.token = jwtService.sign(
        {
            email: created_user.email,
            id: created_user._id,
        },
        {
            secret: process.env.SECRET,
        },
    );

    return created_user;
};
