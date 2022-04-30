import { Base } from 'src/modules/bases/entities/base.entity';
import { Place } from 'src/modules/places/entities/place.entity';
import { Responsible } from 'src/modules/responsibles/entities/responsible.entity';
import { Column, Entity, OneToMany } from 'typeorm';

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
}
