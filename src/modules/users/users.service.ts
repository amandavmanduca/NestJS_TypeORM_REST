import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const createdUser: User = this.userRepository.create(createUserDto);

    const savedUser = await this.userRepository.save(createdUser);
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userRepository.find();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const foundUser: User = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundUser) {
      throw new Error('USER_NOT_FOUND');
    }
    return foundUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const foundUser: User = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundUser) {
      throw new Error('USER_NOT_FOUND');
    }
    const updatedUser: User = this.userRepository.create({
      ...foundUser,
      ...updateUserDto,
    });
    const savedUser: User = await this.userRepository.save(updatedUser);
    return savedUser;
  }

  async remove(id: string) {
    const foundUser: User = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundUser) {
      throw new Error('USER_NOT_FOUND');
    }
    await this.userRepository.delete(foundUser.id);
  }
}
