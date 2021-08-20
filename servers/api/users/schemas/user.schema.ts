import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Class } from '../../classes/schemas/class.schema';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

export type UserType = 'Admin' | 'User';

@Schema()
export class User {
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    @ApiProperty({ type: mongoose.Schema.Types.ObjectId })
    id: mongoose.Schema.Types.ObjectId;

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
    point: Number;

    @Prop({ default: 'User' })
    @ApiProperty()
    userType: UserType;

    @Prop({ types: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }] })
    @ApiProperty()
    listening: Class[];

    @Prop({ types: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }] })
    @ApiProperty()
    teaching: Class[];
}

export const UserSchema = SchemaFactory.createForClass(User);
