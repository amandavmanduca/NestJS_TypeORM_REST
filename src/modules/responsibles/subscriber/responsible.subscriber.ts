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
    if (
      event?.entity?.company?.id &&
      event?.entity?.isCompanyMainResponsible === true
    ) {
      await handleUniqueCompanyResponsible(event);
    }
    if (
      event?.entity?.isPlaceMainResponsible === true &&
      event?.entity?.place?.id
    ) {
      await handleUniquePlaceResponsible(event);
    }
  }

  async beforeUpdate(event: UpdateEvent<Responsible>) {
    if (
      event?.entity?.company?.id &&
      event?.entity?.isCompanyMainResponsible === true
    ) {
      await handleUniqueCompanyResponsible(event);
    }
    if (
      event?.entity?.isPlaceMainResponsible === true &&
      event?.entity?.place?.id
    ) {
      await handleUniquePlaceResponsible(event);
    }
  }
}

async function handleUniqueCompanyResponsible(
  event: InsertEvent<Responsible> | UpdateEvent<Responsible>,
) {
  const currentMainResponsible = await event.manager
    .getRepository(Responsible)
    .findOne({
      relations: ['company'],
      where: {
        isCompanyMainResponsible: true,
        company: {
          id: event.entity.company.id,
        },
      },
    });
  if (currentMainResponsible) {
    const updatedPreviousResponsible = event.manager
      .getRepository(Responsible)
      .create({
        isCompanyMainResponsible: false,
      });
    await event.manager.getRepository(Responsible).save({
      ...currentMainResponsible,
      ...updatedPreviousResponsible,
    });
  }
}

async function handleUniquePlaceResponsible(
  event: InsertEvent<Responsible> | UpdateEvent<Responsible>,
) {
  const currentMainResponsible = await event.manager
    .getRepository(Responsible)
    .findOne({
      relations: ['place'],
      where: {
        isPlaceMainResponsible: true,
        place: {
          id: event.entity.place.id,
        },
      },
    });
  if (currentMainResponsible) {
    const updatedPreviousResponsible = event.manager
      .getRepository(Responsible)
      .create({
        isPlaceMainResponsible: false,
      });
    await event.manager.getRepository(Responsible).save({
      ...currentMainResponsible,
      ...updatedPreviousResponsible,
    });
  }
}
