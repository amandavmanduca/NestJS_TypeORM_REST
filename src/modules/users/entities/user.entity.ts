import { Exclude } from 'class-transformer';
import { hashPasswordTransform } from 'src/common/crypto';
import { Base } from 'src/modules/bases/entities/base.entity';
import { Company } from 'src/modules/companies/entities/company.entity';
import { Ticket } from 'src/modules/tickets/entities/ticket.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends Base {
  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column({
    transformer: hashPasswordTransform,
  })
  password: string;

  @OneToMany(() => Company, (item) => item.user, { nullable: true })
  companies: Company[];

  @OneToMany(() => Ticket, (item) => item.attendant_user, { nullable: true })
  ticket_to_attend: Ticket[];

  @OneToMany(() => Ticket, (item) => item.creator_user, { nullable: true })
  created_tickets: Ticket[];
}
