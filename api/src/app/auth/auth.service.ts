
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import bcrypt from "bcrypt";
import { UserDBO, UserSchema } from '../database';
import { CommonError, RegisterCredentials, User } from '@angular-nest-mongo/shared-lib';
import { toUser, toUserDbo } from './assembler/user.assembler';
import { AuthError } from '@angular-nest-mongo/shared-lib';
import { Connection, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(UserDBO.name) private userModel: Model<UserDBO>,
        @InjectConnection() private readonly connection: Connection
    ) { }

    async create(registerCredentials: RegisterCredentials): Promise<UserDBO> {
        console.log(registerCredentials)

        // Splitting credentials into user and password
        const user = {
            email: registerCredentials.email.toLowerCase()
        } as User

        const password = registerCredentials.password

        // Initiate Transaction
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        try {

            // TODO EXERCISE : Check if a user is already in the database
            const userDbo = await this.userModel.exists({
                email: user.email,
            });

            console.log(userDbo)

            if (userDbo) {
                // Handle Error for already existing user
                throw new HttpException(AuthError.userAlreadyExisting, HttpStatus.FORBIDDEN)
            } else {

                // Generate hash for creation
                const saltOrRounds = 10;
                const hash = await bcrypt.hash(password, saltOrRounds);

                // TODO EXERCISE : Create UserDbo
                const createdCat = new this.userModel(toUserDbo(user, hash));
                const result = createdCat.save();

                await transactionSession.commitTransaction();

                return result;
            }

        } catch (err) {
            await transactionSession.abortTransaction();
            throw err;
        } finally {
            await transactionSession.endSession();
        }
    }

    async login(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            jwt: this.jwtService.sign(payload),
            user
        };
    }

    async validateUser(email: string, password: string): Promise<User> {

        // Initiate Transaction
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        try {
            // TODO EXERCISE :  Match user by email
            const userDbo = await this.userModel.findOne({
                email: email,
            });

            console.log(userDbo)
            console.log(password)

            const isMatch = await bcrypt.compare(password, userDbo.hashedPassword);

            if (isMatch) {
                const user = toUser(userDbo)
                return user;
            } else {
                return null;
            }

        } catch (err) {
            await transactionSession.abortTransaction();
            throw err;
        } finally {
            await transactionSession.endSession();
        }
    }
}