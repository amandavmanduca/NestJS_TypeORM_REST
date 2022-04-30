import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from './entities/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketSubscriber } from './subscriber/ticket.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [TicketsController],
  providers: [TicketsService, TicketSubscriber],
})
export class TicketsModule {}
