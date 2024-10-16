import { User } from "./user.model"
import { ApiProperty } from '@nestjs/swagger';

export class LoginCredentials {
    @ApiProperty()
    username: string

    @ApiProperty()
    password: string

    constructor(email: string, password: string) {
        this.username = email
        this.password = password
    }
}

export class RegisterCredentials {
    @ApiProperty()
    email: string

    @ApiProperty()
    username: string

    @ApiProperty()
    password: string

    constructor(email: string, password: string) {
        this.email = email
        this.username = email
        this.password = password
    }
}

export interface AuthResponse {
    jwt: string;
    user: User;
}

export class ConfirmationCredentials {
    code!: string
    email!: string
}