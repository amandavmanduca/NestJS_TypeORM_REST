import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResponsibleDto } from './dto/create-responsible.dto';
import { UpdateResponsibleDto } from './dto/update-responsible.dto';
import { Responsible } from './entities/responsible.entity';

@Injectable()
export class ResponsiblesService {
  constructor(
    @InjectRepository(Responsible)
    private responsibleRepository: Repository<Responsible>,
  ) {}
  async create(createResponsibleDto: CreateResponsibleDto) {
    const createdResponsible: Responsible =
      this.responsibleRepository.create(createResponsibleDto);

    const savedResponsible = await this.responsibleRepository.save(
      createdResponsible,
    );
    return savedResponsible;
  }

  async findAll(): Promise<Responsible[]> {
    const Responsibles: Responsible[] = await this.responsibleRepository.find();
    return Responsibles;
  }

  async findOne(id: string): Promise<Responsible> {
    const foundResponsible: Responsible =
      await this.responsibleRepository.findOne({
        where: {
          id: id,
        },
        relations: ['company'],
      });
    if (!foundResponsible) {
      throw new Error('RESPONSIBLE_NOT_FOUND');
    }
    return foundResponsible;
  }

  async update(id: string, updateResponsibleDto: UpdateResponsibleDto) {
    const foundResponsible: Responsible =
      await this.responsibleRepository.findOne({
        where: {
          id: id,
        },
      });
    if (!foundResponsible) {
      throw new Error('RESPONSIBLE_NOT_FOUND');
    }
    const updatedResponsible: Responsible = this.responsibleRepository.create({
      ...foundResponsible,
      ...updateResponsibleDto,
    });
    const savedResponsible: Responsible = await this.responsibleRepository.save(
      updatedResponsible,
    );
    return savedResponsible;
  }

  async remove(id: string) {
    const foundResponsible: Responsible =
      await this.responsibleRepository.findOne({
        where: {
          id: id,
        },
      });
    if (!foundResponsible) {
      throw new Error('RESPONSIBLE_NOT_FOUND');
    }
    await this.responsibleRepository.delete(foundResponsible.id);
  }
}
