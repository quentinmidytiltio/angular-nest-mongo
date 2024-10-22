
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

    async create(registerCredentials: RegisterCredentials): Promise<User> {
        console.log(registerCredentials)

        // Initiate Transaction
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        try {

            // TODO EXERCISE : Check if a user is already in the database
            const userDbo = null

            console.log(userDbo)

            if (userDbo) {
                // Handle Error for already existing user
                throw new HttpException(AuthError.userAlreadyExisting, HttpStatus.FORBIDDEN)
            } else {

                // TODO MORE : Crypt Password - Generate hash for creation
                /*const saltOrRounds = 10;
                const hash = await bcrypt.hash(password, saltOrRounds);*/

                // TODO EXERCISE : insert the good object
                // Look at UserDbo class
                // Create UserDbo
                const createdCat = new this.userModel({
                    email: "quentin.midy@tiltio.fr",
                    firstname: "Quentin",
                    lastname: "Midy",
                    hashedPassword: "P@ssword123"
                });

                const result = await createdCat.save();

                await transactionSession.commitTransaction();

                return toUser(result);
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

    async validateUser(userEmail: string, password: string): Promise<User> {

        // Initiate Transaction
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        try {
            // TODO EXERCISE :  Retrieve the user in the db from his email
            const userDbo = await this.userModel.findOne({});

            console.log(userDbo)
            console.log(password)

            const isMatch = password == userDbo.hashedPassword;

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

    async query(): Promise<User[]> {
        // Initiate Transaction
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        try {
            // TODO EXERCISE :  Change the query 
            const usersDbo = await this.userModel.find({}).sort({
                firstname: -1
            });

            console.log(usersDbo)

            const users = usersDbo.map(userDbo => toUser(userDbo))
            return users;

        } catch (err) {
            await transactionSession.abortTransaction();
            throw err;
        } finally {
            await transactionSession.endSession();
        }
    }
}