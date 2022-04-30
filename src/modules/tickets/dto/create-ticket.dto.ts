import { User } from 'src/modules/users/entities/user.entity';
import { TicketStatusType } from '../entities/ticket.entity';

export class CreateTicketDto {
  status: TicketStatusType;

  attendant_user: User;

  creator_user: User;
}
