import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    const Tickets: Ticket[] = await this.ticketRepository.find();
    return Tickets;
  }

  async findOne(id: string): Promise<Ticket> {
    const foundTicket: Ticket = await this.ticketRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundTicket) {
      throw new Error('Ticket_NOT_FOUND');
    }
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
