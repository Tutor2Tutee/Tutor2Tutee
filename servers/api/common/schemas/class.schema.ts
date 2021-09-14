import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';

export type ClassDocument = Class & Document;

export type ClassType =
    | 'recordedVideo'
    | 'onlineMeeting'
    | 'offlineMeeting'
    | 'question&Answer';

export type ClassState = 'Pending' | 'Processing' | 'Ended';

@Schema()
export class Class {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ default: Date.now })
    created: Date;

    @Prop({
        default: 0,
        min: 0,
        max: 50,
    })
    point: number;

    @Prop({ required: true })
    classType: ClassType;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true, min: 0 })
    max_capacity: number;

    @Prop({ default: 'Pending' })
    state: ClassState;

    @Prop({
        required: true,
        type: SchemaTypes.ObjectId,
        ref: 'User',
    })
    teacher: UserDocument | string | Types.ObjectId;

    @Prop({ types: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    listener: User[];
}

export const ClassSchema = SchemaFactory.createForClass(Class);
