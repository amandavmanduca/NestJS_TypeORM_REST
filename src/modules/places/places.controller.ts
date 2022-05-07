import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('places')
@UseGuards(JwtAuthGuard)
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  async create(@Body() createPlaceDto: CreatePlaceDto): Promise<Place> {
    return await this.placesService.create(createPlaceDto);
  }

  @Get()
  async findAll(): Promise<Place[]> {
    return await this.placesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Place> {
    return await this.placesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlaceDto: UpdatePlaceDto,
  ): Promise<Place> {
    return await this.placesService.update(id, updatePlaceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.placesService.remove(id);
  }
}
