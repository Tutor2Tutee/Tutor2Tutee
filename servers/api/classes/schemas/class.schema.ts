import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type ClassDocument = Class & Document;

@Schema()
export class Class {
    @Prop()
    id: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
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
    classType:
        | 'recordedVideo'
        | 'onlineMeeting'
        | 'offlineMeeting'
        | 'Question&Answer';

    @Prop({ required: true })
    description: string;

    @Prop()
    teacher: User;

    @Prop()
    listener: User[];

    static create({ name, teacher, point, classType }) {
        const created_class = new this({
            name,
            teacher,
            point,
            description,
            classType,
        });
    }
}

export const ClassSchema = SchemaFactory.createForClass(Class);