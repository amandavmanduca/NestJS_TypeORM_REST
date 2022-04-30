import {
  Ticket,
  TicketStatusType,
} from 'src/modules/tickets/entities/ticket.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { Place } from '../entities/place.entity';

@EventSubscriber()
export class PlaceSubscriber implements EntitySubscriberInterface<Place> {
  listenTo(): typeof Place {
    return Place;
  }

  async afterUpdate(event: UpdateEvent<Place>) {
    const place = await event.manager.getRepository(Place).findOne({
      where: {
        id: event.entity.id,
      },
      relations: ['tickets'],
    });
    if (place.tickets) {
      const unfinishedTicket = place.tickets.find(
        (ticket) => ticket.status !== TicketStatusType.FINISHED,
      );
      if (unfinishedTicket) {
        await updateUnfinishedTicket(event, unfinishedTicket);
      } else {
        await createNewTicket(event);
      }
    }
  }
}

async function createNewTicket(event: UpdateEvent<Place>) {
  const newTicket = event.manager.getRepository(Ticket).create({
    status: TicketStatusType.PENDING,
    place: {
      id: event.entity.id,
    },
  });
  await event.manager.getRepository(Ticket).save(newTicket);
}

async function updateUnfinishedTicket(
  event: UpdateEvent<Place>,
  unfinishedTicket: Ticket,
) {
  const currentTicket = event.manager.getRepository(Ticket).create({
    ...unfinishedTicket,
    status: TicketStatusType.PENDING,
    updatedAt: new Date(),
  });
  await event.manager.getRepository(Ticket).save(currentTicket);
}
