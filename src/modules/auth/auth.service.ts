import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { Ticket } from '../tickets/entities/ticket.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<{
    name: string;
    email: string;
    ticket_to_attend: Ticket[];
    created_tickets: Ticket[];
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  } | null> {
    const user = await this.usersService.findByEmail(username);
    if (user) {
      const isValidPassword = compareSync(pass, user.password);
      if (isValidPassword) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      user: user,
      token: this.jwtService.sign(payload),
      session_duration_in_seconds: process.env.SESSION_DURATION_IN_SECONDS,
    };
  }
}
