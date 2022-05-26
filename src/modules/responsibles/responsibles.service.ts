import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { checkValidUUID } from 'src/common/checkValidUUID';
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
    if (!id || checkValidUUID(id) === false) {
      throw new BadRequestException('Campos inválidos');
    }
    const foundResponsible: Responsible =
      await this.responsibleRepository.findOne({
        where: {
          id: id,
        },
        relations: ['company', 'place'],
      });
    if (!foundResponsible) {
      throw new NotFoundException('Responsável não encontrado');
    }
    return foundResponsible;
  }

  async update(id: string, updateResponsibleDto: UpdateResponsibleDto) {
    if (!id || checkValidUUID(id) === false) {
      throw new BadRequestException('Campos inválidos');
    }
    const foundResponsible: Responsible =
      await this.responsibleRepository.findOne({
        where: {
          id: id,
        },
      });
    if (!foundResponsible) {
      throw new NotFoundException('Responsável não encontrado');
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
    if (!id || checkValidUUID(id) === false) {
      throw new BadRequestException('Campos inválidos');
    }
    const foundResponsible: Responsible =
      await this.responsibleRepository.findOne({
        where: {
          id: id,
        },
      });
    if (!foundResponsible) {
      throw new NotFoundException('Responsável não encontrado');
    }
    await this.responsibleRepository.delete(foundResponsible.id);
  }
}
