import { ApiProperty } from '@nestjs/swagger';

export class Location {
    @ApiProperty()
    title!: string

    @ApiProperty()
    coordinates!: number[]
}