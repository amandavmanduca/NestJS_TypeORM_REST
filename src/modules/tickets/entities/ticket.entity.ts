import { Base } from 'src/modules/bases/entities/base.entity';
import { Column, Entity } from 'typeorm';

export enum TicketStatusType {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}

@Entity()
export class Ticket extends Base {
  @Column({ nullable: true })
  title: string;

  @Column({
    type: 'enum',
    enum: TicketStatusType,
    default: TicketStatusType.PENDING,
  })
  status: TicketStatusType;
}
