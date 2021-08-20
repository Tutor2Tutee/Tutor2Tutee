import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create.user.dto';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update.user.dto';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiHeader,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { LoginResponse } from './response_entities/login.response';
import { LoginUserDto } from './dto/login.user.dto';
import { IdParamsUserDto } from './dto/id.params.user.dto';

@Controller('api/users')
@ApiTags('Users API')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @Post('/register')
    @ApiOperation({
        summary: 'user register API',
        description: 'register a single user',
    })
    @ApiCreatedResponse({ description: 'create a user', type: User })
    async createUser(@Body() userData: CreateUserDto): Promise<User> {
        return await this.usersService.create(userData);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    @ApiOperation({
        summary: 'user login',
        description: 'login and get a jwt token',
    })
    @ApiResponse({
        status: 201,
        description: 'successfully logged in',
        type: LoginResponse,
    })
    @ApiResponse({ status: 401, description: 'problem with authentication.' })
    @ApiBody({ description: 'contains jwt token', type: LoginUserDto })
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @ApiOperation({
        summary: 'get ones profile',
        description: 'show every info except password',
    })
    @ApiResponse({
        status: 200,
        description: 'successfully find a user',
        type: User,
    })
    @ApiResponse({
        status: 400,
        description: 'requested user doesnt exist',
    })
    @ApiHeader({
        name: 'x-access-token',
        description: 'jwt-token for param id',
        required: true,
    })
    @ApiParam({ name: 'id', description: 'user ObjectId(Not a user email!)' })
    async findOne(@Param() params: IdParamsUserDto) {
        return this.usersService.findOneById(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    @ApiOperation({
        summary: 'update ones profile',
    })
    @ApiBody({
        description: 'not every element of body have to be fulfilled',
        type: UpdateUserDto,
    })
    @ApiResponse({
        status: 200,
        description: 'successfully modified a user',
        type: User,
    })
    @ApiHeader({
        name: 'x-access-token',
        description: 'jwt-token for param id',
        required: true,
    })
    @ApiParam({ name: 'id', description: 'user ObjectId(Not a user email!)' })
    async updateOne(
        @Param() params: IdParamsUserDto,
        @Body() userData: UpdateUserDto,
    ) {
        return this.usersService.updateOneById(params.id, userData);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async deleteOne(@Param() params: IdParamsUserDto) {
        return this.usersService.deleteOneById(params.id);
    }
}
