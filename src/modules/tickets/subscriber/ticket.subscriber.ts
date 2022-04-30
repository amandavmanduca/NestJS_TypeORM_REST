import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';

@EventSubscriber()
export class TicketSubscriber implements EntitySubscriberInterface<Ticket> {
  listenTo(): typeof Ticket {
    return Ticket;
  }
}
