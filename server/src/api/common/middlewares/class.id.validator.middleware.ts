import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class, ClassDocument } from '../schemas/class.schema';
import { Model } from 'mongoose';
import { NextFunction } from 'express';

@Injectable()
export class ClassIdValidatorMiddleware implements NestMiddleware {
    constructor(
        @InjectModel(Class.name) private classModel: Model<ClassDocument>,
    ) {}

    async use(req: any, res: Response, next: NextFunction): Promise<any> {
        // req.body._id should matches id of request
        const reqId: string = req.params.classId;
        const reqClass = await this.classModel.findOne({ _id: reqId });
        if (!reqClass) throw new NotFoundException(`id : ${reqId} not found`);

        req.reqClass = reqClass;
        next();
    }
}
