import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Responsible } from '../entities/responsible.entity';

@EventSubscriber()
export class ResponsibleSubscriber
  implements EntitySubscriberInterface<Responsible>
{

  listenTo(): typeof Responsible {
    return Responsible;
  }

  async beforeInsert(event: InsertEvent<Responsible>) {
    if (event.entity.isMainResponsible === true && event.entity.company.id) {
      const currentMainResponsible = await event.manager
        .getRepository(Responsible)
        .findOne({
          relations: ['company'],
          where: {
            isMainResponsible: true,
            company: {
              id: event.entity.company.id,
            },
          },
        });
      if (currentMainResponsible) {
        const updatedPreviousResponsible = event.manager
          .getRepository(Responsible)
          .create({
            isMainResponsible: false,
          });
        await event.manager.getRepository(Responsible).save({
          ...currentMainResponsible,
          ...updatedPreviousResponsible,
        });
      }
    }
  }

  async beforeUpdate(event: UpdateEvent<Responsible>) {
    if (event.entity.isDefault === true && event.entity.company.id) {
      const currentMainResponsible = await event.manager
        .getRepository(Responsible)
        .findOne({
          relations: ['company'],
          where: {
            isMainResponsible: true,
            company: {
              id: event.entity.company.id,
            },
          },
        });
      if (currentMainResponsible) {
        const updatedPreviousResponsible = event.manager
          .getRepository(Responsible)
          .create({
            isMainResponsible: false,
          });
        await event.manager.getRepository(Responsible).save({
          ...currentMainResponsible,
          ...updatedPreviousResponsible,
        });
      }
    }
  }
}
