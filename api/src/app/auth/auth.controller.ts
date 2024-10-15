import { Controller, Request, Post, UseGuards, Get, Body, Put, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiOkResponse, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { LoginCredentials, RegisterCredentials, User } from '@angular-nest-mongo/shared-lib';
import { Public } from './auth.metadata';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    /**
     *
     */
    constructor(private authService: AuthService) {

    }

    /**
     * POST Login
     * @param req 
     * @param body 
     * @returns 
     */
    @UseGuards(LocalAuthGuard)
    @Public()
    @Post('login')
    @ApiBody({
        description: "{username: string, password: string}"
    })
    async login(@Request() req, @Body() body: LoginCredentials) {
        return this.authService.login(req.user);
    }

    /**
     * GET Profile
     * @param req 
     * @returns 
     */
    @ApiExtraModels(User)
    @ApiResponse({
        status: 200,
        schema: {
            $ref: getSchemaPath(User),
        },
    })
    @Get('profile')
    @ApiBearerAuth()
    getProfile(@Request() req) {
        return req.user;
    }

    /**
     * POST Register
     */
    @Public()
    @Post('register')
    async register(@Request() req, @Body() body: RegisterCredentials) {
        return this.authService.create(body)
    }
}
