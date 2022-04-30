import { Address } from 'src/modules/address.entity';
import { Responsible } from 'src/modules/responsibles/entities/responsible.entity';

export class CreatePlaceDto {
  name: string;

  address: Address;

  responsibles?: Responsible[];
}
