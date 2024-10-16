import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationDBO, LocationSchema } from '../database/schemas/location.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: LocationDBO.name, schema: LocationSchema }])],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule { }
