import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { UserDBO } from './user.schema';

export type LocationDBODocument = HydratedDocument<LocationDBO>;

@Schema()
export class LocationDBO {
    _id: mongoose.Types.ObjectId

    @Prop()
    title: string;

    @Prop({ index: '2d' })
    coordinates: number[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserDBO.name })
    owner: UserDBO;
}

export const LocationSchema = SchemaFactory.createForClass(LocationDBO);