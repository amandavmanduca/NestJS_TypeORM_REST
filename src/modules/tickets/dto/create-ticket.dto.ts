import { TicketStatusType } from '../entities/ticket.entity';

export class CreateTicketDto {
  status: TicketStatusType;
}
