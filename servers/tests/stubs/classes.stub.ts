import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { CreateClassDto } from '../../api/classes/dto/create.class.dto';

export const insert_a_class = async (
    creator: mongoose.Schema.Types.ObjectId,
    class_num: number,
    connection: Connection,
) => {
    const insert_class: CreateClassDto = {
        name: `testClass${class_num}`,
        classType: `recordedVideo`,
        point: 0,
        description: `testClass${class_num}`,
        max_capacity: 10,
    };
    const result = await connection.collection('classes').insertOne({
        ...insert_class,
        teacher: creator,
    });

    await connection
        .collection('users')
        .updateOne(
            { _id: creator },
            { $push: { teaching: result.ops[0]._id } },
        );

    return result.ops[0];
};
