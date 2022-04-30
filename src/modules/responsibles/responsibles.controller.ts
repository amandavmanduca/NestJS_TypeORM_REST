import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResponsiblesService } from './responsibles.service';
import { CreateResponsibleDto } from './dto/create-responsible.dto';
import { UpdateResponsibleDto } from './dto/update-responsible.dto';
import { Responsible } from './entities/responsible.entity';

@Controller('responsibles')
export class ResponsiblesController {
  constructor(private readonly responsiblesService: ResponsiblesService) {}

  @Post()
  async create(
    @Body() createResponsibleDto: CreateResponsibleDto,
  ): Promise<Responsible> {
    return this.responsiblesService.create(createResponsibleDto);
  }

  @Get()
  async findAll(): Promise<Responsible[]> {
    return this.responsiblesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Responsible> {
    return this.responsiblesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateResponsibleDto: UpdateResponsibleDto,
  ): Promise<Responsible> {
    return this.responsiblesService.update(id, updateResponsibleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.responsiblesService.remove(id);
  }
}
