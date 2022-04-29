import { Injectable } from '@nestjs/common';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';

@Injectable()
export class BasesService {
  create(createBaseDto: CreateBaseDto) {
    return 'This action adds a new base';
  }

  findAll() {
    return `This action returns all bases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} base`;
  }

  update(id: number, updateBaseDto: UpdateBaseDto) {
    return `This action updates a #${id} base`;
  }

  remove(id: number) {
    return `This action removes a #${id} base`;
  }
}
