import { User } from "@angular-nest-mongo/shared-lib";
import { UserDBO } from "../../database/";

export function toUser(userDbo: UserDBO): User {
    if (userDbo) {
        return {
            id: userDbo._id ? userDbo._id.toString() : null,
            email: userDbo.email,
            firstname: userDbo.firstname,
            lastname: userDbo.lastname,
        } as User
    } else {
        return null
    }
}

export function toUserDbo(user: User, hashedPassword: string): UserDBO {
    if (user) {
        return {
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            hashedPassword: hashedPassword
        } as UserDBO
    } else {
        return null
    }
}