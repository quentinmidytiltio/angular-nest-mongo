import { ApiProperty } from '@nestjs/swagger';

export class PasswordChange {
    @ApiProperty()
    password!: string

    @ApiProperty()
    currentPassword!: string

    @ApiProperty()
    passwordConfirmation!: string
}