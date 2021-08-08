import { Controller, Get } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { Class } from './schemas/class.schema';

@Controller('classes')
export class ClassesController {
    constructor(private readonly classesService: ClassesService) {}

    @Get('/')
    async getAll(): Promise<Class[]> {
        return await this.classesService.findAll();
    }
}
