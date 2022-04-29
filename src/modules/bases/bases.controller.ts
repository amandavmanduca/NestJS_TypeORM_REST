import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BasesService } from './bases.service';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';

@Controller('bases')
export class BasesController {
  constructor(private readonly basesService: BasesService) {}

  @Post()
  create(@Body() createBaseDto: CreateBaseDto) {
    return this.basesService.create(createBaseDto);
  }

  @Get()
  findAll() {
    return this.basesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaseDto: UpdateBaseDto) {
    return this.basesService.update(+id, updateBaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basesService.remove(+id);
  }
}
