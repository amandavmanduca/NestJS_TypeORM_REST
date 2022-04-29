import { Address } from 'src/modules/address.entity';

export class CreatePlaceDto {
  name: string;

  address: Address;
}
