import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place) private placeRepository: Repository<Place>,
  ) {}
  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const createdPlace: Place = this.placeRepository.create(createPlaceDto);

    const savedPlace = await this.placeRepository.save(createdPlace);
    return savedPlace;
  }

  async findAll(): Promise<Place[]> {
    const places: Place[] = await this.placeRepository.find();
    return places;
  }

  async findOne(id: string): Promise<Place> {
    const foundPlace: Place = await this.placeRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundPlace) {
      throw new Error('PLACE_NOT_FOUND');
    }
    return foundPlace;
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    const foundPlace: Place = await this.placeRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundPlace) {
      throw new Error('PLACE_NOT_FOUND');
    }
    const updatedPlace: Place = this.placeRepository.create({
      ...foundPlace,
      ...updatePlaceDto,
    });
    const savedPlace: Place = await this.placeRepository.save(updatedPlace);
    return savedPlace;
  }

  async remove(id: string) {
    const foundPlace: Place = await this.placeRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundPlace) {
      throw new Error('PLACE_NOT_FOUND');
    }
    await this.placeRepository.delete(foundPlace.id);
  }
}
