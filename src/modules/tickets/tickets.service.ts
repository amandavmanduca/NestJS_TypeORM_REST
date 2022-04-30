import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { title } from 'process';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
  ) {}
  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const createdTicket: Ticket = this.ticketRepository.create(createTicketDto);

    const savedTicket = await this.ticketRepository.save(createdTicket);
    return savedTicket;
  }

  async findAll(): Promise<Ticket[]> {
    const tickets: Ticket[] = await this.ticketRepository.find({
      relations: ['place'],
    });
    const ticketsWithTitle: Ticket[] = tickets?.map((ticket: Ticket) => {
      ticket.title = ticket.id + ' ' + ticket.place.name;
      return ticket;
    });
    return ticketsWithTitle;
  }

  async findOne(id: string): Promise<Ticket> {
    const foundTicket: Ticket = await this.ticketRepository.findOne({
      where: {
        id: id,
      },
      relations: ['place'],
    });
    if (!foundTicket) {
      throw new Error('Ticket_NOT_FOUND');
    }
    foundTicket.title = foundTicket.id + ' ' + foundTicket.place.name;
    return foundTicket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const foundTicket: Ticket = await this.ticketRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundTicket) {
      throw new Error('Ticket_NOT_FOUND');
    }
    const updatedTicket: Ticket = this.ticketRepository.create({
      ...foundTicket,
      ...updateTicketDto,
    });
    const savedTicket: Ticket = await this.ticketRepository.save(updatedTicket);
    return savedTicket;
  }

  async remove(id: string) {
    const foundTicket: Ticket = await this.ticketRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundTicket) {
      throw new Error('Ticket_NOT_FOUND');
    }
    await this.ticketRepository.delete(foundTicket.id);
  }
}
