import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { Ticket } from '../tickets/entities/ticket.entity';
import { Company } from '../companies/entities/company.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<{
    name: string;
    email: string;
    ticket_to_attend: Ticket[];
    created_tickets: Ticket[];
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Não autorizado');
    }
    return user;
  }
}
