import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type QuizDocument = Quiz & Document;

@Schema()
class QuizQuestion {
    @Prop({ required: true })
    prompt: string;

    @Prop({ required: true })
    answers: string[];

    @Prop({ required: true })
    correct: number;
}

@Schema()
export class Quiz {
    @Prop({ required: true, unique: true })
    title: string;

    @Prop({ default: Date.now() })
    created: Date;

    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    })
    creator: User;

    @Prop({ required: true })
    questions: QuizQuestion[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
