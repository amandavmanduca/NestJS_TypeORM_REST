import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { checkValidUUID } from 'src/common/checkValidUUID';
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
    if (
      !createUserDto.email ||
      !createUserDto.name ||
      !createUserDto.password
    ) {
      throw new BadRequestException('Campos inválidos');
    }
    const createdUser: User = this.userRepository.create(createUserDto);

    const savedUser = await this.userRepository.save(createdUser);
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userRepository.find();
    return users;
  }

  async findOne(id: string): Promise<User> {
    if (!id || checkValidUUID(id) === false) {
      console.log('entrei no if');
      throw new BadRequestException('Campos inválidos');
    }
    const foundUser: User = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: ['companies', 'ticket_to_attend', 'created_tickets'],
    });
    if (!foundUser) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return foundUser;
  }

  async findByEmail(email: string): Promise<User> {
    if (!email) {
      throw new BadRequestException('Campos inválidos');
    }
    const foundUser: User = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!foundUser) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return foundUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!id || checkValidUUID(id) === false) {
      throw new BadRequestException('Campos inválidos');
    }
    const foundUser: User = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundUser) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const updatedUser: User = this.userRepository.create({
      ...foundUser,
      ...updateUserDto,
    });
    const savedUser: User = await this.userRepository.save(updatedUser);
    return savedUser;
  }

  async remove(id: string) {
    if (!id || checkValidUUID(id) === false) {
      throw new BadRequestException('Campos inválidos');
    }
    const foundUser: User = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundUser) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.userRepository.delete(foundUser.id);
  }
}
