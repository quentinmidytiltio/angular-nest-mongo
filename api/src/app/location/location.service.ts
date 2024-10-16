import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { LocationDBO } from '../database/schemas/location.schema';
import { Connection, Model } from 'mongoose';
import { Location } from '@angular-nest-mongo/shared-lib'
import { toLocationDbo } from './assembler/location.assembler';

@Injectable()
export class LocationService {

    constructor(
        @InjectModel(LocationDBO.name) private locationModel: Model<LocationDBO>,
        @InjectConnection() private readonly connection: Connection
    ) {

    }

    async create(location: Location) {
        // Initiate Transaction
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        try {
            // TODO EXERCISE : Create Location
            const createdCat = new this.locationModel(toLocationDbo(location));
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
}
