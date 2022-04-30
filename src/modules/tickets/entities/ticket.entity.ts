import { Base } from 'src/modules/bases/entities/base.entity';
import { Place } from 'src/modules/places/entities/place.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => Place, (item) => item.tickets, { onDelete: 'CASCADE' })
  @JoinColumn()
  place: Place;
}
