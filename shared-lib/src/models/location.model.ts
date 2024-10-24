import { ApiProperty } from '@nestjs/swagger';

export class Location {
    title!: string

    coordinates!: number[]
}

export class LocationSearchByDistance {
    distance!: number

    lat!: number

    lng!: number
}