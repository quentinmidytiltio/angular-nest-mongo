import { User } from "./user.model"

export class LoginCredentials {
    username: string

    password: string

    constructor(email: string, password: string) {
        this.username = email
        this.password = password
    }
}

export class RegisterCredentials {
    email: string

    username: string

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