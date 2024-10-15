export class User {
    id!: string
    firstname!: string
    lastname!: string
    phone!: string
    email!: string
    provider!: string
    confirmed!: boolean
    blocked!: boolean
    createdAt!: Date
    updatedAt!: Date
    password?: string
    role!: string

    constructor() {

    }
}