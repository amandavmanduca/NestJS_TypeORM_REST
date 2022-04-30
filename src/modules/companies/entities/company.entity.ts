import { Base } from 'src/modules/bases/entities/base.entity';
import { Place } from 'src/modules/places/entities/place.entity';
import { Responsible } from 'src/modules/responsibles/entities/responsible.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Company extends Base {
  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  description: string;

  @OneToMany(() => Place, (item) => item.company, { nullable: true })
  places: Place[];

  @OneToMany(() => Responsible, (item) => item.company, { nullable: true })
  responsibles: Responsible[];

  @ManyToOne(() => User, (item) => item.companies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
