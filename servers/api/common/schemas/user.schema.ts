import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Class } from './class.schema';
import { ApiProperty } from '@nestjs/swagger';
import { SchemaTypes } from 'mongoose';

export type UserDocument = User & Document;

export type UserType = 'Admin' | 'User';

@Schema()
export class User {
    @Prop({ unique: true, required: true })
    @ApiProperty()
    email: string;

    @Prop({ required: true, select: false })
    password: string;

    @Prop({ unique: true, required: true })
    @ApiProperty()
    nickname: string;

    @Prop({ required: true })
    @ApiProperty()
    birth: Date;

    @Prop({ min: 0, default: 0 })
    @ApiProperty()
    point: number;

    @Prop({ default: 'User' })
    @ApiProperty()
    userType: UserType;

    @Prop({ types: [{ type: SchemaTypes.ObjectId, ref: 'Class' }] })
    @ApiProperty()
    listening: Class[];

    @Prop({ types: [{ type: SchemaTypes.ObjectId, ref: 'Class' }] })
    @ApiProperty()
    teaching: Class[];
}

export const UserSchema = SchemaFactory.createForClass(User);
