import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserIdValidatorMiddleware implements NestMiddleware {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async use(req: any, res: any, next: () => void): Promise<any> {
        const reqId: string = req.params.userId;
        const reqUser = await this.userModel.findOne({ _id: reqId });
        if (!reqUser) throw new NotFoundException(`id : ${reqId} not found`);

        req.reqUser = reqUser;
        next();
    }
}
