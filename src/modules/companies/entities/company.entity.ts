import { Base } from 'src/modules/bases/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Company extends Base {
  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  description: string;
}
