import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { title } from 'process';
import { checkValidUUID } from 'src/common/checkValidUUID';
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
    if (
      !createTicketDto.attendant_user ||
      !createTicketDto.creator_user ||
      !createTicketDto.status
    ) {
      throw new BadRequestException('Campos inválidos');
    }
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
    if (!id || checkValidUUID(id) === false) {
      throw new BadRequestException('Campos inválidos');
    }
    const foundTicket: Ticket = await this.ticketRepository.findOne({
      where: {
        id: id,
      },
      relations: ['place', 'attendant_user', 'creator_user'],
    });
    if (!foundTicket) {
      throw new NotFoundException('Ticket não encontrado');
    }
    foundTicket.title = foundTicket.id + ' ' + foundTicket.place.name;
    delete foundTicket?.attendant_user?.password;
    delete foundTicket?.creator_user?.password;
    return foundTicket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    if (!id || checkValidUUID(id) === false) {
      throw new BadRequestException('Campos inválidos');
    }
    const foundTicket: Ticket = await this.ticketRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundTicket) {
      throw new NotFoundException('Ticket não encontrado');
    }
    const updatedTicket: Ticket = this.ticketRepository.create({
      ...foundTicket,
      ...updateTicketDto,
    });
    const savedTicket: Ticket = await this.ticketRepository.save(updatedTicket);
    return savedTicket;
  }

  async remove(id: string) {
    if (!id || checkValidUUID(id) === false) {
      throw new BadRequestException('Campos inválidos');
    }
    const foundTicket: Ticket = await this.ticketRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundTicket) {
      throw new NotFoundException('Ticket não encontrado');
    }
    await this.ticketRepository.delete(foundTicket.id);
  }
}
