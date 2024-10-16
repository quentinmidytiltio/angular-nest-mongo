import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type LocationDBODocument = HydratedDocument<LocationDBO>;

@Schema()
export class LocationDBO {
    _id: mongoose.Types.ObjectId

    @Prop()
    title: string;

    @Prop({ index: '2d' })
    coordinates: number[];
}

export const LocationSchema = SchemaFactory.createForClass(LocationDBO);