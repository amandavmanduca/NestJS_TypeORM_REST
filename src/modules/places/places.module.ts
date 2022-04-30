import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { Responsible } from '../responsibles/entities/responsible.entity';
import { Ticket } from '../tickets/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place, Responsible, Ticket])],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
