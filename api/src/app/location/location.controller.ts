import { Location } from '@angular-nest-mongo/shared-lib';
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { Public } from '../auth/auth.metadata';
import { LocationService } from './location.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('location')
@Controller('location')
export class LocationController {

    /**
     *
     */
    constructor(private locationService: LocationService) {

    }

    /**
     * POST create new location
     */
    @Public()
    @Post('')
    async createLocationPublic(@Request() req, @Body() body: Location) {
        return this.locationService.create(body)
    }

    /**
     * POST create new location
     */
    @ApiBearerAuth()
    @Post('users')
    async createLocationUser(@Request() req, @Body() body: Location) {
        const user = req.user;
        return this.locationService.create(body, user)
    }

    /**
     * GET all locations
     */
    @Public()
    @Get('')
    async getAllLocations(@Request() req) {
        return this.locationService.getAll()
    }

    /**
     * GET all locations related to the current user
     */
    @ApiBearerAuth()
    @Get('mine')
    async getMine(@Request() req) {
        const user = req.user;
        return this.locationService.getUserLocations(user)
    }

}
