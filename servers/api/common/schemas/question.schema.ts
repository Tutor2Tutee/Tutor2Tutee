import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { SchemaTypes, Types } from 'mongoose';

export type QuestionDocument = Question & Document;

export type voteThreshold = -1 | 1;

@Schema()
class Voter {
    @Prop({ required: true })
    userId: Types.ObjectId;

    @Prop({ required: true })
    vote: voteThreshold;
}

@Schema()
class Answer {
    @Prop({ required: true, minlength: 0 })
    description: string;

    @Prop({
        default: 0,
    })
    vote: number;

    @Prop({
        types: [Voter],
    })
    voter: Voter[];

    @Prop({
        type: SchemaTypes.ObjectId,
    })
    creator: User;
}

@Schema()
export class Question {
    @Prop({ required: true, unique: true })
    title: string;

    @Prop({ default: Date.now() })
    created: Date;

    @Prop({
        required: true,
        type: SchemaTypes.ObjectId,
        ref: 'User',
    })
    creator: User;

    @Prop({
        default: 0,
    })
    vote: number;

    @Prop({
        types: [Voter],
    })
    voter: Voter[];

    @Prop({
        default: 0,
        min: 0,
        max: 50,
    })
    reward: number;

    @Prop({
        required: true,
        minlength: 0,
    })
    description: string;

    @Prop({})
    answers: Answer[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
