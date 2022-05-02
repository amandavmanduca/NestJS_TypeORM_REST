import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Responsible } from '../responsibles/entities/responsible.entity';
import { Ticket, TicketStatusType } from '../tickets/entities/ticket.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place) private placeRepository: Repository<Place>,
    @InjectRepository(Responsible)
    private responsibleRepository: Repository<Responsible>,
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}
  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const createdPlace: Place = this.placeRepository.create(createPlaceDto);

    const savedPlace = await this.placeRepository.save(createdPlace);

    if (createPlaceDto.responsibles) {
      await Promise.all(
        createPlaceDto.responsibles.map(async (responsible: Responsible) => {
          const createdResponsible = this.responsibleRepository.create({
            ...responsible,
            place: {
              id: savedPlace.id,
            },
          });
          await this.responsibleRepository.save(createdResponsible);
        }),
      );
    }

    return savedPlace;
  }

  async findAll(): Promise<Place[]> {
    const places: Place[] = await this.placeRepository.find();
    return places;
  }

  async findOne(id: string): Promise<Place> {
    const foundPlace: Place = await this.placeRepository.findOne({
      where: {
        id: id,
      },
      relations: ['tickets', 'company', 'responsibles'],
    });
    if (!foundPlace) {
      throw new Error('PLACE_NOT_FOUND');
    }
    return foundPlace;
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    const foundPlace: Place = await this.placeRepository.findOne({
      where: {
        id: id,
      },
      relations: ['tickets'],
    });
    if (!foundPlace) {
      throw new Error('PLACE_NOT_FOUND');
    }
    const updatedPlace: Place = this.placeRepository.create({
      ...foundPlace,
      ...updatePlaceDto,
    });

    const savedPlace: Place = await this.placeRepository.save(updatedPlace);

    if (foundPlace.tickets) {
      await this.handleUpdatedPlaceTickets(savedPlace, updatePlaceDto);
    }
    return savedPlace;
  }

  async remove(id: string) {
    const foundPlace: Place = await this.placeRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundPlace) {
      throw new Error('PLACE_NOT_FOUND');
    }
    await this.placeRepository.delete(foundPlace.id);
  }

  async handleUpdatedPlaceTickets(
    updatedPlace: Place,
    updatePlaceDto: UpdatePlaceDto,
  ) {
    const unfinishedTicket = updatedPlace.tickets.find(
      (ticket) => ticket.status !== TicketStatusType.FINISHED,
    );
    if (unfinishedTicket) {
      await this.updateUnfinishedTicket(unfinishedTicket, updatePlaceDto);
    } else {
      await this.createNewTicket(updatedPlace, updatePlaceDto);
    }
  }

  async createNewTicket(updatedPlace: Place, updatePlaceDto: UpdatePlaceDto) {
    const newTicket = this.ticketRepository.create({
      status: TicketStatusType.PENDING,
      place: {
        id: updatedPlace.id,
      },
      attendant_user: {
        id: updatePlaceDto.attendant_userId,
      },
      creator_user: {
        id: updatePlaceDto.creator_userId,
      },
    });
    await this.ticketRepository.save(newTicket);
  }

  async updateUnfinishedTicket(
    unfinishedTicket: Ticket,
    updatePlaceDto: UpdatePlaceDto,
  ) {
    const currentTicket = this.ticketRepository.create({
      ...unfinishedTicket,
      attendant_user: {
        id: updatePlaceDto.attendant_userId,
      },
      creator_user: {
        id: updatePlaceDto.creator_userId,
      },
      updatedAt: new Date(),
    });
    await this.ticketRepository.save(currentTicket);
  }
}
