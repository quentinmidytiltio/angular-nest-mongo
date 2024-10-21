import { ApiProperty } from '@nestjs/swagger';

export class Location {
    @ApiProperty()
    title!: string

    @ApiProperty()
    coordinates!: number[]
}

export class LocationSearchByDistance {
    @ApiProperty()
    distance!: number

    @ApiProperty()
    lat!: number

    @ApiProperty()
    lng!: number
}