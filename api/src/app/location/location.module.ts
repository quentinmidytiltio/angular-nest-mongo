import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationDBO, LocationSchema } from '../database/schemas/location.schema';
import { UserDBO, UserSchema } from '../database';

@Module({
  imports: [MongooseModule.forFeature([
    { name: LocationDBO.name, schema: LocationSchema },
    { name: UserDBO.name, schema: UserSchema }
  ])],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule { }
