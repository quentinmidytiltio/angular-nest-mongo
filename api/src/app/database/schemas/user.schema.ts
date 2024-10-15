import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDBODocument = HydratedDocument<UserDBO>;

@Schema()
export class UserDBO {
    _id: mongoose.Types.ObjectId

    @Prop()
    email: string;

    @Prop()
    firstname: string;

    @Prop()
    lastname: string;

    @Prop()
    hashedPassword: string
}

export const UserSchema = SchemaFactory.createForClass(UserDBO);