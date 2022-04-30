import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { PlaceSubscriber } from './subscriber/place.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Place])],
  controllers: [PlacesController],
  providers: [PlacesService, PlaceSubscriber],
})
export class PlacesModule {}
