import { Base } from 'src/modules/bases/entities/base.entity';
import { Place } from 'src/modules/places/entities/place.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

export enum TicketStatusType {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}

@Entity()
export class Ticket extends Base {
  @Column({
    type: 'enum',
    enum: TicketStatusType,
    default: TicketStatusType.PENDING,
  })
  status: TicketStatusType;

  @ManyToOne(() => Place, (item) => item.tickets, { onDelete: 'CASCADE' })
  @JoinColumn()
  place: Place;

  title: string;

  @ManyToOne(() => User, (item) => item.ticket_to_attend, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  attendant_user: User;

  @ManyToOne(() => User, (item) => item.created_tickets, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  creator_user: User;
}
