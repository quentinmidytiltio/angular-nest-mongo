import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { LocationDBO } from '../database/schemas/location.schema';
import { Connection, Model } from 'mongoose';
import { Location, User } from '@angular-nest-mongo/shared-lib'
import { toLocationDbo } from './assembler/location.assembler';
import { toUserDbo } from '../auth/assembler/user.assembler';
import { UserDBO } from '../database';

@Injectable()
export class LocationService {

    constructor(
        @InjectModel(LocationDBO.name) private locationModel: Model<LocationDBO>,
        @InjectModel(UserDBO.name) private userModel: Model<UserDBO>,
        @InjectConnection() private readonly connection: Connection
    ) {

    }

    async create(location: Location, user?: User) {
        // Initiate Transaction
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        try {
            // TODO EXERCISE : Create Location
            const createdCat = new this.locationModel(toLocationDbo(location));

            // TODO EXERCISE : Add Location to the current user
            if (user) {
                const userDbo = await this.userModel.findOne({
                    email: user.email,
                });

                createdCat.owner = userDbo
            }

            const result = createdCat.save();

            await transactionSession.commitTransaction();

            return result;
        } catch (err) {
            await transactionSession.abortTransaction();
            throw err;
        } finally {
            await transactionSession.endSession();
        }
    }

    async getAll() {
        // Initiate Transaction
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        try {
            // TODO EXERCISE : Get All Locations
            const allLocations = this.locationModel.find()

            await transactionSession.commitTransaction();

            return allLocations;
        } catch (err) {
            await transactionSession.abortTransaction();
            throw err;
        } finally {
            await transactionSession.endSession();
        }
    }

    async getUserLocations(user: User) {
        // Initiate Transaction
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        try {
            // TODO EXERCISE : Get All Locations related to the current user
            const userLocations = this.locationModel.find({
                owner: user.id
            })

            await transactionSession.commitTransaction();

            return userLocations;
        } catch (err) {
            await transactionSession.abortTransaction();
            throw err;
        } finally {
            await transactionSession.endSession();
        }
    }
}
