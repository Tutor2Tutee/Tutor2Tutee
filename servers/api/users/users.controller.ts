import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@Body() userData: CreateUserDto): Promise<User> {
        return await this.usersService.create(userData);
    }
}
