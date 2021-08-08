import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Class } from '../../classes/schemas/class.schema';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    password: string;

    @Prop()
    nickname: string;

    @Prop()
    birth: Date;

    @Prop()
    point: Number;

    @Prop({ types: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }] })
    listening: Class[];

    @Prop({ types: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }] })
    teaching: Class[];
}

export const UserSchema = SchemaFactory.createForClass(User);
