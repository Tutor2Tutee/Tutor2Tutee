import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    Request,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { Class } from './schemas/class.schema';
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
        return await this.classesService.create(classData, req.user.userId);
    }
}
