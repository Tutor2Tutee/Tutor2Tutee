import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../common/schemas/user.schema';
import { CreateUserDto } from './dto/create.user.dto';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update.user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/users')
@ApiTags('Users API')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    // TEST PURPOSE
    // @Get('/')
    // async findAll(): Promise<User[]> {
    //     return await this.usersService.findAll();
    // }

    @Post('/register')
    async createUser(@Body() userData: CreateUserDto): Promise<User> {
        return await this.usersService.create(userData);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:userId')
    findOne(@Request() { reqUser }) {
        return reqUser;
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:userId')
    async updateOne(@Request() { reqUser }, @Body() userData: UpdateUserDto) {
        return this.usersService.updateOneById(reqUser._id, userData);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:userId')
    async deleteOne(@Request() { reqUser }) {
        return this.usersService.deleteOneById(reqUser._id);
    }
}
