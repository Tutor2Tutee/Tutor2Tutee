import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { Class } from '../common/schemas/class.schema';
import { CreateClassDto } from './dto/create.class.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/classes')
@ApiTags('Classes API')
export class ClassesController {
    constructor(private readonly classesService: ClassesService) {}

    @Get('/')
    async getAll(): Promise<Class[]> {
        return await this.classesService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async create(@Request() req, @Body() classData: CreateClassDto) {
        return await this.classesService.create(classData, req.user._id);
    }

    @Get('/:classId')
    async getOne(@Request() { reqClass }): Promise<Class> {
        return reqClass;
    }

    @Post('/:classId')
    @UseGuards(JwtAuthGuard)
    async join(@Request() { user, reqClass }) {
        return this.classesService.join(user, reqClass);
    }

    @Delete('/:classId')
    @UseGuards(JwtAuthGuard)
    async delete(@Request() { user, reqClass }) {
        return this.classesService.delete(user, reqClass);
    }
}
