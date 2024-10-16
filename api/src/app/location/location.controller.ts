import { Location } from '@angular-nest-mongo/shared-lib';
import { Body, Controller, Post, Request } from '@nestjs/common';
import { Public } from '../auth/auth.metadata';
import { LocationService } from './location.service';
import { ApiTags } from '@nestjs/swagger';

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
    @Post('location')
    async register(@Request() req, @Body() body: Location) {
        return this.locationService.create(body)
    }

}
